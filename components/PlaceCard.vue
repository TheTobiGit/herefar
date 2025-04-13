<template>
  <div 
    class="p-3 rounded-lg bg-[#25262B] border border-[#313236] hover:border-[#4D4F59] transition-all duration-150 cursor-pointer"
    :class="props.size === 'small' ? 'p-2.5' : 'p-3'" 
  >
    <div class="flex items-center">
      <!-- Entity Category Icon -->
      <div 
        class="rounded-full flex items-center justify-center mr-3 flex-shrink-0"
        :class="[getCategoryBgColor(entity.category), props.size === 'small' ? 'w-7 h-7 mr-2.5' : 'w-8 h-8 mr-3']"
      >
        <Icon 
          :name="getCategoryIcon(entity.category)" 
          :class="[getCategoryTextColor(entity.category), props.size === 'small' ? 'w-3.5 h-3.5' : 'w-4 h-4']"
        />
      </div>
      <!-- Entity Info -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium text-gray-200" :class="{ 'text-xs': props.size === 'small' }">{{ entity.name }}</p>
          <!-- Distance and Verified Icon -->
          <div class="flex items-center gap-1 flex-shrink-0 ml-2">
            <!-- Only show distance if it exists and size is not small -->
            <p v-if="entity.distance && props.size !== 'small'" class="text-xs text-gray-500">{{ entity.distance }}km</p>
            <Icon 
              v-if="entity.isVerified" 
              name="heroicons:check-badge" 
              class="text-blue-400 flex-shrink-0"
              :class="props.size === 'small' ? 'w-4 h-4' : 'w-5 h-5'" 
            />
          </div>
        </div>
        <p class="text-xs text-gray-500 truncate">{{ entity.category }}{{ entity.subCategory ? ` · ${entity.subCategory}` : '' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Entity } from '~/types/Entity';
import { useCategoryStyles } from '~/composables/useCategoryStyles';

// Define component props
// Use an interface for better structure
interface PlaceCardProps {
  entity: Entity; // Pass the entire entity object
  size?: 'normal' | 'small'; // Optional size prop for chat results
}

// Define props with defaults
const props = withDefaults(defineProps<PlaceCardProps>(), {
  size: 'normal', // Default size is normal
});

// Get category styling functions
const { getCategoryIcon, getCategoryBgColor, getCategoryTextColor } = useCategoryStyles();
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style> 