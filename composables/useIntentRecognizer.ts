import { ref } from 'vue';
import { dummyEntities } from '~/data/entities'; // Import entities to access tags
import type { Entity } from '~/types/Entity'; // Import Entity type

/**
 * Defines the possible intents the user might have.
 */
export type Intent =
  | 'find_food'
  | 'find_by_tag' // New intent for tag-based search
  | 'find_specific_place' // New intent for specific entity search
  | 'find_company' // New intent for parent company/organization search
  //| 'find_emergency' // Example for future expansion
  //| 'specific_place_search' // Example for future expansion
  | 'unknown';

/**
 * Represents the result of intent recognition.
 * Includes the recognized intent and any extracted parameters (like the tag).
 */
export interface IntentRecognitionResult {
  intent: Intent;
  extractedTag?: string; // Optional: the tag extracted from the message
  matchedEntity?: Entity; // For find_specific_place
  matchedCompany?: Entity; // For find_company
  relatedBranches?: Entity[]; // For branches related to a company
}

// Keywords for finding food (more natural phrases)
const foodKeywords: string[] = [
  'food', 'hungry', 'eat', 'bite', 'peckish',
  'get food', 'find food', 'looking for food', 'want to eat',
  'need food', 'something to eat', 'grab a bite',
  'where to eat', 'place to eat',
];

// --- Tag Recognition Logic ---

// 1. Extract all unique tags from the dummy data
// Use a Set for automatic deduplication and convert to lowercase for case-insensitive matching
const allTags = new Set<string>();
dummyEntities.forEach(entity => {
  if (entity.tags) {
    entity.tags.forEach(tag => allTags.add(tag.toLowerCase()));
  }
});

// Convert Set to Array for easier iteration if needed later
const uniqueTagsArray = Array.from(allTags);

// Pre-compute parent companies and their branches for faster lookups
const parentEntities = dummyEntities.filter(entity => entity.isParentEntity);
const branchMap = new Map<string, Entity[]>(); // Maps parent ID to array of branch entities

// Build the branch map
parentEntities.forEach(parent => {
  if (parent.branches) {
    const branches = dummyEntities.filter(entity => 
      parent.branches?.includes(entity.id)
    );
    branchMap.set(parent.id, branches);
  }
});

// --- Main Recognizer Function ---

/**
 * Recognizes the user's intent based on specific entity names, tags, or keywords.
 *
 * @param message - The user's input message.
 * @returns An IntentRecognitionResult object.
 */
export const useIntentRecognizer = () => {
  const recognizeIntent = (message: string): IntentRecognitionResult => {
    const lowerCaseMessage = message.toLowerCase().trim();
    if (!lowerCaseMessage) {
      return { intent: 'unknown' };
    }

    // --- Recognition Hierarchy (REVISED ORDER, IMPROVED SCORING) ---
    
    // 1. First, check for parent company/organization match
    let bestCompanyMatch: Entity | null = null;
    let bestCompanyScore = 0.0;
    const companyMatchThreshold = 0.7; // Higher threshold for company names
    
    for (const company of parentEntities) {
      const companyNameLower = company.name.toLowerCase();
      let currentScore = 0.0;
      
      // a. Exact match?
      if (companyNameLower === lowerCaseMessage) {
        currentScore = 1.0;
      // b. Name starts with query?
      } else if (companyNameLower.startsWith(lowerCaseMessage)) {
        currentScore = 0.95; // Very high score for company name starts with
      // c. Name includes query (partial match)?
      } else if (companyNameLower.includes(lowerCaseMessage)) {
        currentScore = lowerCaseMessage.length / companyNameLower.length;
        // Boost if it's a substantial part of the company name
        if (currentScore > 0.5) {
          currentScore += 0.2; // Additional boost
        }
      }
      
      // Update best match if current score is higher
      if (currentScore > bestCompanyScore) {
        bestCompanyScore = currentScore;
        bestCompanyMatch = company;
        // If it's an exact match, we can stop searching
        if (currentScore === 1.0) {
          break;
        }
      }
    }
    
    // If a parent company match was found with good confidence,
    // return it along with its branches
    if (bestCompanyMatch && bestCompanyScore >= companyMatchThreshold) {
      const branches = branchMap.get(bestCompanyMatch.id) || [];
      return { 
        intent: 'find_company', 
        matchedCompany: bestCompanyMatch,
        relatedBranches: branches
      };
    }

    // 2. Check for specific branch or standalone entity name match
    let bestMatch: Entity | null = null;
    let bestScore = 0.0;
    const nameMatchThreshold = 0.6; // Threshold for general includes match
    const startsWithScoreBoost = 0.9; // High score if name starts with query

    for (const entity of dummyEntities) {
      // Skip parent entities, we already checked them
      if (entity.isParentEntity) continue;
      
      const entityNameLower = entity.name.toLowerCase();
      let currentScore = 0.0;

      // a. Exact match?
      if (entityNameLower === lowerCaseMessage) {
        currentScore = 1.0;
      // b. Name starts with query?
      } else if (entityNameLower.startsWith(lowerCaseMessage)) {
        currentScore = startsWithScoreBoost;
      // c. Name includes query (partial match)?
      } else if (entityNameLower.includes(lowerCaseMessage)) {
        currentScore = lowerCaseMessage.length / entityNameLower.length;
      }
      // d. Check branch name too
      else if (entity.branchName && entity.branchName.toLowerCase().includes(lowerCaseMessage)) {
        currentScore = 0.7; // High score for branch name match
      }

      // Update best match if current score is higher
      if (currentScore > bestScore) {
          bestScore = currentScore;
          bestMatch = entity;
          // If it's an exact match, we can stop searching
          if (currentScore === 1.0) {
             break;
          }
      }
    }

    // If a specific match was found *above the general threshold*,
    // return it, unless the query was exactly a food keyword.
    if (bestMatch && bestScore >= nameMatchThreshold) {
      const isExactFoodKeyword = foodKeywords.some(kw => kw === lowerCaseMessage);
      if (!isExactFoodKeyword) {
        return { intent: 'find_specific_place', matchedEntity: bestMatch };
      }
    }

    // 3. Check for exact tag match (case-insensitive) - Only if no specific place was matched
    if (allTags.has(lowerCaseMessage)) {
      // Use the score calculated above to decide if a specific match was strong enough
      if (!bestMatch || bestScore < nameMatchThreshold) {
         const originalTag = uniqueTagsArray.find(tag => tag.toLowerCase() === lowerCaseMessage) || lowerCaseMessage;
         return { intent: 'find_by_tag', extractedTag: originalTag };
      }
    }

    // 4. Check for food keywords (prioritizing exact matches)
    if (foodKeywords.some(kw => kw === lowerCaseMessage)) {
        return { intent: 'find_food' };
    }
    if (foodKeywords.some(keyword => lowerCaseMessage.includes(keyword))) {
      if (!bestMatch || bestScore < nameMatchThreshold) {
         if (!allTags.has(lowerCaseMessage)) {
             return { intent: 'find_food' };
         }
      }
    }

    // 5. Default to unknown intent
    return { intent: 'unknown' };
  };

  return {
    recognizeIntent,
    // Expose tags if needed elsewhere, though maybe not necessary for this composable's primary function
    // availableTags: uniqueTagsArray
  };
}; 