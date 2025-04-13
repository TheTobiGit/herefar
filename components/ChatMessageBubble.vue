<template>
  <div 
    class="flex"
    :class="{ 'justify-end': message.isUser }"
  >
    <!-- User message bubble (right aligned) -->
    <div v-if="message.isUser" 
      class="max-w-[75%] bg-[#25262B] text-gray-200 px-4 py-2.5 rounded-lg border border-[#313236] shadow-sm"
    >
      <p>{{ message.text }}</p>
    </div>
    
    <!-- Response message bubble (left aligned) - Includes optional place results -->
    <div v-else 
      class="max-w-[75%] bg-[#25262B] text-gray-200 px-4 py-2.5 rounded-lg border border-[#313236] shadow-sm"
    >
      <p>{{ message.text }}</p>
      
      <!-- Place search results -->
      <div v-if="message.hasPlaceResults && message.placeResults && message.placeResults.length > 0" 
        class="mt-3 space-y-2"
      >
        <!-- Use a more unique key if needed -->
        <PlaceCard 
          v-for="(place, placeIndex) in message.placeResults" 
          :key="`${message.time}-${placeIndex}`"
          :entity="place"
          size="small" 
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Entity } from '~/types/Entity';

// Import PlaceCard component explicitly since it's used here
import PlaceCard from '~/components/PlaceCard.vue';

// Define message interface (subset needed for this component)
interface Message {
  text: string;
  isUser: boolean;
  time: string; // Potentially useful for unique keys
  hasPlaceResults?: boolean;
  placeResults?: Entity[];
}

// Define component props
interface ChatMessageBubbleProps {
  message: Message;
}

// Define props using the interface
const props = defineProps<ChatMessageBubbleProps>();

// No specific logic needed in the script setup for this component yet
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style> 