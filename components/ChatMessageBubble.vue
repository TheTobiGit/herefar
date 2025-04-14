<template>
  <div 
    class="flex mb-4"
    :class="{ 'justify-end': message.isUser }"
  >
    <!-- User message bubble (right aligned) -->
    <div v-if="message.isUser" 
      class="max-w-[75%] bg-[#25262B] text-gray-200 px-4 py-2.5 rounded-lg border border-[#313236] shadow-sm"
    >
      <p>{{ message.text }}</p>
    </div>
    
    <!-- Response message bubble (left aligned) - Includes optional place results -->
    <div v-else class="max-w-[90%]"> <!-- Increased max width for extended cards -->
      <!-- Text message -->
      <div v-if="message.text" 
        class="bg-[#25262B] text-gray-200 px-4 py-2.5 rounded-lg border border-[#313236] shadow-sm mb-3"
      >
        <p>{{ message.text }}</p>
      </div>
      
      <!-- Place search results -->
      <div v-if="message.hasPlaceResults && message.placeResults && message.placeResults.length > 0" 
        class="space-y-2"
      >
        <!-- Show extended card for single specific place results -->
        <ExtendedPlaceCard 
          v-if="message.placeResults.length === 1 && isSingleSpecificPlace"
          :entity="message.placeResults[0]"
        />
        
        <!-- Regular place cards for multiple results -->
        <template v-else>
          <PlaceCard 
            v-for="place in message.placeResults" 
            :key="place.id || `place-${$index}`"
            :entity="place" 
            size="small" 
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Entity } from '~/types/Entity';

// Import PlaceCard component explicitly since it's used here
import PlaceCard from '~/components/PlaceCard.vue';
import ExtendedPlaceCard from '~/components/ExtendedPlaceCard.vue';

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

// Computed property to determine if this is a single specific place result
// This determines when to use the extended card
const isSingleSpecificPlace = computed(() => {
  return props.message.placeResults?.length === 1 && !props.message.text;
});
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style> 