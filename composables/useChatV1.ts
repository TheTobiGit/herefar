import { ref } from 'vue'; // Import ref explicitly for composables
import type { Entity } from '~/types/Entity';
import { dummyEntities } from '~/data/entities';
import { useIntentRecognizerV1 } from './useIntentRecognizerV1'; // Import the V1 intent recognizer
import type { IntentRecognitionResult } from './useIntentRecognizerV1'; // Import the result type from V1

// Define message interface within the composable
// (Could be moved to types/index.ts later if needed elsewhere)
interface Message {
  text: string;
  isUser: boolean;
  time: string;
  hasPlaceResults?: boolean;
  placeResults?: Entity[];
  isExpandedPlace?: boolean; // Flag for expanded place message
  isCompanyWithBranches?: boolean; // Flag for company with branches message
  companyEntity?: Entity; // Parent company entity for branch listings
}

// Helper function to generate placeholder URLs (Keep this if not defined elsewhere)
const generatePlaceholderUrl = (text: string, width = 600, height = 300, bgColor = '25262B', textColor = '9CA3AF') => {
  const encodedText = encodeURIComponent(text);
  return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}/png?text=${encodedText}`;
};

// TODO: Move getRandomDistance to a more appropriate composable (e.g., usePageInfo)
// Temporary definition here for simulateResponse
const getRandomDistance = () => (Math.random() * 2 + 0.1).toFixed(1);

/**
 * Utility function to get the current time formatted as HH:MM AM/PM.
 */
const getCurrentTimeFormatted = (): string => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

/**
 * Composable for managing chat state and interactions (Version 1).
 */
export const useChatV1 = () => {
  // --- State --- 
  const messages = ref<Message[]>([]);
  const isTyping = ref(false);
  const messageInput = ref('');

  // Get the intent recognizer function
  const { recognizeIntent } = useIntentRecognizerV1();
  
  // --- Core Logic --- 

  // Updated simulateResponse to handle all intents including companies with branches
  const simulateResponse = (userMessageText: string) => {
    isTyping.value = true;
    const delayDuration = 1500;

    setTimeout(() => {
      isTyping.value = false;
      const recognitionResult: IntentRecognitionResult = recognizeIntent(userMessageText);
      let responseMessage: Message;

      switch (recognitionResult.intent) {
        case 'find_food':
          let foodEntities = dummyEntities.filter(entity => entity.category === 'Food');
          foodEntities = foodEntities.map(entity => ({ ...entity, distance: getRandomDistance() })).slice(0, 3);
          
          // Array of possible introductory phrases for food results
          const foodIntroPhrases = [
            "Here are some places to get food nearby:",
            "Found a few spots to eat:",
            "You could eat at one of these places:",
            "Check out these food options:",
          ];
          
          // Randomly select an intro phrase
          const randomFoodIntro = foodIntroPhrases[Math.floor(Math.random() * foodIntroPhrases.length)];
          
          responseMessage = {
            text: foodEntities.length > 0 
              ? randomFoodIntro // Use the randomly selected phrase
              : 'Sorry, I couldn\'t find any specific food places right now.', 
            isUser: false,
            time: getCurrentTimeFormatted(),
            hasPlaceResults: foodEntities.length > 0,
            placeResults: foodEntities.length > 0 ? foodEntities : undefined
          };
          break;

        case 'find_by_tag':
          // Filter entities by the extracted tag (case-insensitive)
          const tagToSearch = recognitionResult.extractedTag?.toLowerCase();
          let taggedEntities = tagToSearch
            ? dummyEntities.filter(entity =>
                entity.tags?.some(tag => tag.toLowerCase() === tagToSearch)
              )
            : [];

          // Add distance and limit results
          taggedEntities = taggedEntities.map(entity => ({ ...entity, distance: getRandomDistance() })).slice(0, 5); // Show up to 5 results for tags

          responseMessage = {
            text: taggedEntities.length > 0
              ? `Okay, I found these places tagged with \'${recognitionResult.extractedTag}\':` // Use original casing of tag
              : `Sorry, I couldn\'t find any places tagged with \'${recognitionResult.extractedTag}\'.`,
            isUser: false,
            time: getCurrentTimeFormatted(),
            hasPlaceResults: taggedEntities.length > 0,
            placeResults: taggedEntities.length > 0 ? taggedEntities : undefined
          };
          break;
          
        case 'find_company':
          // Handle parent company with branches
          const company = recognitionResult.matchedCompany;
          const branches = recognitionResult.relatedBranches || [];
          
          if (company && branches.length > 0) {
            // Add distance to branches for display
            const branchesWithDistance = branches.map((branch: Entity) => ({
              ...branch, 
              distance: getRandomDistance() 
            }));
            
            responseMessage = {
              text: `Here are the ${company.name} branches:`,
              isUser: false,
              time: getCurrentTimeFormatted(),
              hasPlaceResults: true,
              placeResults: branchesWithDistance,
              isCompanyWithBranches: true,
              companyEntity: company
            };
          } else if (company) {
            // If we have company but no branches, return the company info
            responseMessage = {
              text: '', // No text for direct company result
              isUser: false,
              time: getCurrentTimeFormatted(),
              hasPlaceResults: true,
              placeResults: [{ ...company, distance: getRandomDistance() }],
              isExpandedPlace: true // Show as expanded place
            };
          } else {
            // Fallback - shouldn't happen with correct intent recognition
            responseMessage = {
              text: "Sorry, I couldn't find any branches for that company.",
              isUser: false,
              time: getCurrentTimeFormatted(),
            };
          }
          break;

        case 'find_specific_place':
          const matchedEntity = recognitionResult.matchedEntity;
          if (matchedEntity) {
            // Add distance to the single matched entity
            const entityWithDistance = { ...matchedEntity, distance: getRandomDistance() };
            responseMessage = {
              text: '', // Remove text entirely, name is in the card
              isUser: false,
              time: getCurrentTimeFormatted(),
              hasPlaceResults: true,
              placeResults: [entityWithDistance], // Array containing the single entity
              isExpandedPlace: true // Mark as expanded initially
            };
          } else {
            // This case shouldn't ideally happen if recognizer works correctly, but good to have a fallback
            responseMessage = {
              text: "Sorry, I couldn't find the specific place you mentioned.",
              isUser: false,
              time: getCurrentTimeFormatted(),
            };
          }
          break;

        // case 'find_emergency':
        //   // ... implementation ...
        //   break;
        // case 'specific_place_search':
        //   // ... implementation ...
        //   break;

        default: // 'unknown' intent
          responseMessage = {
            text: "Sorry, I didn't quite understand that. Could you please rephrase?", // Updated fallback message
            isUser: false,
            time: getCurrentTimeFormatted(),
          };
          break;
      }

      messages.value.push(responseMessage);
      
      // TODO: Trigger scroll from component

    }, delayDuration);
  };

  // Handle sending a message
  const sendMessage = () => {
    const trimmedMessage = messageInput.value.trim();
    if (!trimmedMessage) return;
    
    // Add user message
    messages.value.push({
      text: trimmedMessage,
      isUser: true,
      time: getCurrentTimeFormatted()
    });
    
    // Store message text before clearing
    const userMessageText = trimmedMessage;
    
    // Clear input
    messageInput.value = '';
    
    // TODO: Trigger scroll from component

    // Simulate AI response after a short delay
    setTimeout(() => simulateResponse(userMessageText), 300); 
  };
  
  // Function to handle clicking on a simple PlaceCard
  const showExpandedPlace = (entityId: string) => {
    const entity = dummyEntities.find(e => e.id === entityId);
    if (!entity) return;
    
    // Find and remove the original message containing this place (if multiple)
    const originalMessageIndex = messages.value.findIndex(msg => 
      msg.placeResults?.some(p => p.id === entityId)
    );
    
    // Create a new message with just the expanded place
    const expandedMessage: Message = {
      text: '', // No text needed for expanded card
      isUser: false,
      time: getCurrentTimeFormatted(),
      hasPlaceResults: true,
      placeResults: [{ ...entity, distance: getRandomDistance() }], // Add distance
      isExpandedPlace: true // Mark as expanded
    };
    
    // If the original message was found, replace it
    if (originalMessageIndex !== -1) {
      // Check if the original message had only one place result (the one being expanded)
      if (messages.value[originalMessageIndex].placeResults?.length === 1) {
        messages.value.splice(originalMessageIndex, 1, expandedMessage);
      } else {
        // If the original message had multiple places, just add the new expanded one
        // Maybe refine this later - remove the specific simple card?
        messages.value.push(expandedMessage);
      }
    } else {
      // If the original message wasn't found (shouldn't happen often), just add the new one
      messages.value.push(expandedMessage);
    }
  };

  // Return reactive state and methods
  return {
    messages,
    isTyping,
    messageInput,
    sendMessage,
    showExpandedPlace // Expose the new function
  };
}; 