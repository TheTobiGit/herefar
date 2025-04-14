<template>
  <div 
    class="rounded-lg bg-[#25262B] border border-[#313236] hover:border-[#4D4F59] transition-all duration-150 overflow-hidden"
  >
    <!-- Header with name, category and distance -->
    <div class="p-4 border-b border-[#313236]">
      <div class="flex items-center mb-2">
        <!-- Entity Category Icon -->
        <div 
          class="rounded-full w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0"
          :class="[getCategoryBgColor(entity.category)]"
        >
          <Icon 
            :name="getCategoryIcon(entity.category)" 
            :class="[getCategoryTextColor(entity.category), 'w-5 h-5']"
          />
        </div>
        <!-- Entity Name and Verified Badge -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold text-gray-200">{{ entity.name }}</h3>
            <Icon 
              v-if="entity.isVerified" 
              name="heroicons:check-badge" 
              class="text-blue-400 flex-shrink-0 w-6 h-6 ml-2" 
            />
          </div>
          <p class="text-sm text-gray-400">{{ entity.category }}{{ entity.subCategory ? ` · ${entity.subCategory}` : '' }}</p>
        </div>
      </div>
      
      <!-- Tags if available -->
      <div v-if="entity.tags && entity.tags.length > 0" class="flex flex-wrap gap-2 mt-2">
        <span 
          v-for="tag in entity.tags" 
          :key="tag"
          class="px-2 py-1 bg-[#313236] text-xs text-gray-400 rounded-md"
        >
          {{ tag }}
        </span>
      </div>
    </div>
    
    <!-- Image if available -->
    <div v-if="entity.imageUrl" class="w-full h-48 relative">
      <NuxtImg 
        :src="entity.imageUrl"
        class="w-full h-full object-cover"
        alt=""
      />
    </div>
    
    <!-- Description if available -->
    <div v-if="entity.description" class="p-4 border-b border-[#313236]">
      <p class="text-sm text-gray-300">{{ entity.description }}</p>
    </div>
    
    <!-- Contact and Location Details -->
    <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Left column: Contact Info -->
      <div>
        <h4 class="text-sm font-medium text-gray-400 mb-2">Contact</h4>
        <div v-if="entity.contact" class="space-y-2">
          <!-- Phone -->
          <div v-if="entity.contact.phone" class="flex items-center">
            <Icon name="heroicons:phone" class="w-4 h-4 text-gray-400 mr-2" />
            <a :href="`tel:${entity.contact.phone}`" class="text-sm text-blue-400">{{ entity.contact.phone }}</a>
          </div>
          
          <!-- Email -->
          <div v-if="entity.contact.email" class="flex items-center">
            <Icon name="heroicons:envelope" class="w-4 h-4 text-gray-400 mr-2" />
            <a :href="`mailto:${entity.contact.email}`" class="text-sm text-blue-400">{{ entity.contact.email }}</a>
          </div>
          
          <!-- Website -->
          <div v-if="entity.contact.website" class="flex items-center">
            <Icon name="heroicons:globe-alt" class="w-4 h-4 text-gray-400 mr-2" />
            <a :href="entity.contact.website" target="_blank" rel="noopener" class="text-sm text-blue-400">Website</a>
          </div>
        </div>
      </div>
      
      <!-- Right column: Location Info -->
      <div>
        <h4 class="text-sm font-medium text-gray-400 mb-2">Location</h4>
        <div v-if="entity.location" class="space-y-2">
          <div class="flex">
            <Icon name="heroicons:map-pin" class="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
            <p class="text-sm text-gray-300">
              {{ entity.location.addressLine1 }}
              <span v-if="entity.location.addressLine2"><br/>{{ entity.location.addressLine2 }}</span><br/>
              {{ entity.location.city }}, {{ entity.location.stateProvince }}
            </p>
          </div>
          
          <!-- Distance -->
          <div v-if="entity.distance" class="flex items-center">
            <Icon name="heroicons:arrow-right-circle" class="w-4 h-4 text-gray-400 mr-2" />
            <p class="text-sm text-gray-300">{{ entity.distance }}km away</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Opening Hours if available -->
    <div v-if="entity.openingHours" class="p-4 border-t border-[#313236]">
      <div class="flex items-center">
        <Icon name="heroicons:clock" class="w-4 h-4 text-gray-400 mr-2" />
        <p class="text-sm text-gray-300">{{ entity.openingHours }}</p>
      </div>
    </div>
    
    <!-- Action Buttons -->
    <div class="p-4 border-t border-[#313236] flex justify-between">
      <button class="px-4 py-2 bg-[#313236] hover:bg-[#3D3E44] text-gray-200 rounded-md text-sm transition-colors flex items-center">
        <Icon name="heroicons:map" class="w-4 h-4 mr-2" />
        Directions
      </button>
      
      <button v-if="entity.contact && entity.contact.phone" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors flex items-center">
        <Icon name="heroicons:phone" class="w-4 h-4 mr-2" />
        Call
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// File: components/ExtendedPlaceCard.vue
import type { Entity } from '~/types/Entity';
import { useCategoryStyles } from '~/composables/useCategoryStyles';

// Define component props
interface ExtendedPlaceCardProps {
  entity: Entity; // Pass the entire entity object
}

// Define props
const props = defineProps<ExtendedPlaceCardProps>();

// Get category styling functions
const { getCategoryIcon, getCategoryBgColor, getCategoryTextColor } = useCategoryStyles();
</script> 