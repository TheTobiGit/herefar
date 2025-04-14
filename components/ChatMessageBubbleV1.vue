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
    <div v-else class="max-w-[90%] w-full"> <!-- Increased max width and ensure full width -->
      <!-- Text message -->
      <div v-if="message.text" 
        class="bg-[#25262B] text-gray-200 px-4 py-2.5 rounded-lg border border-[#313236] shadow-sm mb-3"
      >
        <p>{{ message.text }}</p>
      </div>
      
      <!-- Company with Branches Results -->
      <div v-if="message.isCompanyWithBranches && message.companyEntity && message.placeResults && message.placeResults.length > 0" 
          class="space-y-3"
      >
        <!-- Parent Company Header -->
        <div class="bg-[#25262B] text-gray-200 px-4 py-3 rounded-lg border border-[#313236] shadow-sm">
          <h3 class="font-medium text-base mb-1">{{ message.companyEntity.name }}</h3>
          <p class="text-sm text-gray-400">{{ message.placeResults.length }} {{ message.placeResults.length === 1 ? 'branch' : 'branches' }} found</p>
        </div>
        
        <!-- List of Branches -->
        <div class="space-y-2">
          <PlaceCard 
            v-for="branch in message.placeResults" 
            :key="branch.id" 
            :entity="branch" 
            size="small" 
            @click="emit('placeClick', branch.id)" 
          />
        </div>
      </div>
      
      <!-- Regular Place search results (if not showing company branches) -->
      <div v-else-if="message.hasPlaceResults && message.placeResults && message.placeResults.length > 0" 
        :class="{ 'space-y-2': !message.isExpandedPlace }" 
      >
        <!-- Show extended card for single specific place results or if message is marked as expanded -->
        <ExtendedPlaceCard 
          v-if="message.isExpandedPlace && message.placeResults.length === 1"
          :entity="message.placeResults[0]"
        />
        
        <!-- Regular place cards for multiple results -->
        <template v-else>
          <PlaceCard 
            v-for="place in message.placeResults" 
            :key="place.id || `place-${$index}`"
            :entity="place" 
            size="small" 
            @click="emit('placeClick', place.id)" 
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

// Define message interface (including the new flag)
interface Message {
  text: string;
  isUser: boolean;
  time: string; // Potentially useful for unique keys
  hasPlaceResults?: boolean;
  placeResults?: Entity[];
  isExpandedPlace?: boolean; // Flag for expanded place message
  isCompanyWithBranches?: boolean; // Flag for company with branches
  companyEntity?: Entity; // Parent company entity
}

// Define component props
interface ChatMessageBubbleProps {
  message: Message;
}

// Define props using the interface
const props = defineProps<ChatMessageBubbleProps>();

// Define emits
const emit = defineEmits<{ 
  (e: 'placeClick', id: string): void; // Emit when a simple place card is clicked
}>();

// No computed property needed anymore as we use the message.isExpandedPlace flag
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style> 