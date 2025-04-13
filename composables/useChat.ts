import { ref } from 'vue'; // Import ref explicitly for composables
import type { Entity } from '~/types/Entity';
import { dummyEntities } from '~/data/entities';
import { useIntentRecognizer } from './useIntentRecognizer'; // Import the intent recognizer
import type { IntentRecognitionResult } from './useIntentRecognizer'; // Import the result type

// Define message interface within the composable
// (Could be moved to types/index.ts later if needed elsewhere)
interface Message {
  text: string;
  isUser: boolean;
  time: string;
  hasPlaceResults?: boolean;
  placeResults?: Entity[];
}

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
 * Composable for managing chat state and interactions.
 */
export const useChat = () => {
  // --- State --- 
  const messages = ref<Message[]>([]);
  const isTyping = ref(false);
  const messageInput = ref('');

  // Get the intent recognizer function
  const { recognizeIntent } = useIntentRecognizer();
  
  // --- Core Logic --- 

  // Updated simulateResponse to use dynamic intro text for food
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
              placeResults: [entityWithDistance] // Array containing the single entity
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

  // Return reactive state and methods
  return {
    messages,
    isTyping,
    messageInput,
    sendMessage,
    // Not returning simulateResponse as it's internal to sendMessage
    // Not returning scrollToBottom or getCurrentTimeFormatted as they are internal or handled elsewhere
  };
}; 