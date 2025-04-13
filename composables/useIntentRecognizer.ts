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

    // 1. Check for entity name match (specific place search) FIRST
    let bestMatch: Entity | null = null;
    let bestScore = 0.0;
    const nameMatchThreshold = 0.6; // Threshold for general includes match
    const startsWithScoreBoost = 0.9; // High score if name starts with query

    for (const entity of dummyEntities) {
      const entityNameLower = entity.name.toLowerCase();
      let currentScore = 0.0;

      // a. Exact match?
      if (entityNameLower === lowerCaseMessage) {
        currentScore = 1.0;
      // b. Name starts with query?
      } else if (entityNameLower.startsWith(lowerCaseMessage)) {
        // Assign a high score, potentially adjusted by length ratio for very short queries?
        // For now, let's keep it simple and boost significantly.
        currentScore = startsWithScoreBoost;
      // c. Name includes query (partial match)?
      } else if (entityNameLower.includes(lowerCaseMessage)) {
        currentScore = lowerCaseMessage.length / entityNameLower.length;
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

    // 2. Check for exact tag match (case-insensitive) - Only if no specific place was matched
    if (allTags.has(lowerCaseMessage)) {
      // Use the score calculated above to decide if a specific match was strong enough
      if (!bestMatch || bestScore < nameMatchThreshold) {
         const originalTag = uniqueTagsArray.find(tag => tag.toLowerCase() === lowerCaseMessage) || lowerCaseMessage;
         return { intent: 'find_by_tag', extractedTag: originalTag };
      }
    }

    // 3. Check for food keywords (prioritizing exact matches)
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

    // 4. Default to unknown intent
    return { intent: 'unknown' };
  };

  return {
    recognizeIntent,
    // Expose tags if needed elsewhere, though maybe not necessary for this composable's primary function
    // availableTags: uniqueTagsArray
  };
}; 