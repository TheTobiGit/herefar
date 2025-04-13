import { ref } from 'vue'; // Import ref explicitly for composables
import type { Entity, EntityCategory } from '~/types/Entity';
import { dummyEntities } from '~/data/entities';

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
 * Composable for managing chat state and interactions.
 */
export const useChat = () => {
  // --- State --- 
  const messages = ref<Message[]>([]);
  const isTyping = ref(false);
  const messageInput = ref('');

  // --- Helper Functions --- 

  // Helper function to format current time for messages
  const getCurrentTimeFormatted = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };
  
  // --- Core Logic --- 

  // Simulate a response (incorporating place search logic)
  const simulateResponse = (userMessageText: string) => {
    // Show typing indicator
    isTyping.value = true;
    
    // Use the passed user message text
    const userMessage = userMessageText.toLowerCase();
    
    // Search delay duration
    const delayDuration = 1500; // Slightly shorter delay now
    
    // Simulate response delay
    setTimeout(() => {
      // Hide typing indicator
      isTyping.value = false;
      
      // Check if user is searching for a place (simple keyword detection)
      const placeKeywords = [
        'hospital', 'clinic', 'doctor', 'medical', 'pharmacy',
        'police', 'security', 'fire', 'station', 'emergency',
        'restaurant', 'food', 'cafe', 'kfc', 'dining', 'eat',
        'bank', 'atm', 'financial', 'money', 'cash',
        'school', 'university', 'college', 'education',
        'hotel', 'hostel', 'accommodation', 'staying',
        'shop', 'mall', 'store', 'market', 'retail', 'shopping',
        'government', 'ministry', 'municipal',
        'gas', 'petrol', 'electric', 'water', 'utility',
        'bus', 'taxi', 'transport', 'train'
      ];
      
      const isPlaceSearch = placeKeywords.some(keyword => userMessage.includes(keyword));
      
      // Search in entity names directly
      const nameSearchResults = dummyEntities.filter(entity => 
        entity.name.toLowerCase().includes(userMessage)
      );
      
      // Determine response type
      if (nameSearchResults.length > 0 || isPlaceSearch) {
        let relevantEntities: Entity[] = [];
        
        if (nameSearchResults.length > 0) {
          relevantEntities = nameSearchResults;
        } else {
          const categoryMap: Record<string, EntityCategory[]> = {
             // ... (keep the categoryMap as defined before) ...
             'hospital': ['Medical'], 'clinic': ['Medical'], 'doctor': ['Medical'], 'medical': ['Medical'],
             'police': ['Security'], 'security': ['Security'], 'station': ['Security', 'Transport'], 'emergency': ['Security', 'Medical'],
             'restaurant': ['Food'], 'food': ['Food'], 'cafe': ['Food'], 'kfc': ['Food'], 'dining': ['Food'], 'eat': ['Food'],
             'bank': ['Financial'], 'atm': ['Financial'], 'financial': ['Financial'], 'money': ['Financial'], 'cash': ['Financial'],
             'school': ['Education'], 'university': ['Education'], 'college': ['Education'], 'education': ['Education'],
             'hotel': ['Accommodation'], 'hostel': ['Accommodation'], 'accommodation': ['Accommodation'], 'staying': ['Accommodation'],
             'shop': ['Retail'], 'mall': ['Retail'], 'store': ['Retail'], 'market': ['Retail'], 'retail': ['Retail'], 'shopping': ['Retail'],
             'government': ['Government'], 'ministry': ['Government'], 'municipal': ['Government'],
             'gas': ['Utility'], 'petrol': ['Utility'], 'electric': ['Utility'], 'water': ['Utility'], 'utility': ['Utility'],
             'bus': ['Transport'], 'taxi': ['Transport'], 'transport': ['Transport'], 'train': ['Transport']
          };
          const relevantCategories = new Set<EntityCategory>();
          for (const [keyword, categories] of Object.entries(categoryMap)) {
            if (userMessage.includes(keyword)) {
              categories.forEach(category => relevantCategories.add(category));
            }
          }
          
          if (relevantCategories.size > 0) {
            relevantEntities = dummyEntities.filter(entity => 
              relevantCategories.has(entity.category)
            );
          } else {
            // Fallback if keywords detected but no specific category matched
            relevantEntities = dummyEntities.sort(() => 0.5 - Math.random()).slice(0, 3);
          }
        }
        
        // Add distance and limit results
        relevantEntities = relevantEntities.map(entity => ({ ...entity, distance: getRandomDistance() })).slice(0, 3);
        
        // Add place results message
        messages.value.push({
          text: relevantEntities.length > 0 
            ? `Here are some ${relevantEntities[0].category.toLowerCase()} places I found:` 
            : "Sorry, I couldn't find specific places for that. Here are some nearby options:",
          isUser: false,
          time: getCurrentTimeFormatted(),
          hasPlaceResults: true,
          placeResults: relevantEntities.length > 0 ? relevantEntities : dummyEntities.sort(() => 0.5 - Math.random()).slice(0, 3) // Show random if no specific found
        });
      } else {
        // Default response
        messages.value.push({
          text: "Okay, how can I assist you further?", // More neutral default
          isUser: false,
          time: getCurrentTimeFormatted()
        });
      }
      
      // TODO: Trigger scroll to bottom from the component after this message is added
      
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
    
    // TODO: Trigger scroll to bottom from the component after user message added

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