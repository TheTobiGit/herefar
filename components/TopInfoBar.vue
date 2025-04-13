<template>
  <Transition name="fade-slide">
    <div v-if="props.isMounted" class="flex items-center justify-between text-xs text-gray-500 mb-6">
      <!-- Left side: Time and Location -->
      <div class="flex items-center space-x-1.5">
        <span>{{ props.currentTime }}</span>
        <span>•</span>
        <span class="flex items-center">
          <Icon name="heroicons:map-pin" class="w-3 h-3 mr-0.5" />
          {{ props.userLocation }}
        </span>
      </div>
      <!-- Right side: Weather -->
      <div class="flex items-center gap-1">
        <Icon :name="props.weatherIcon" class="w-4 h-4" />
        <span>{{ props.weatherTemp }}°C</span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
// Define component props
interface TopInfoBarProps {
  isMounted: boolean; // Control the transition
  currentTime: string;
  userLocation: string;
  weatherIcon: string;
  weatherTemp: number;
}

// Define props using the interface
const props = defineProps<TopInfoBarProps>();

// No internal logic needed for the component itself, relies on props
</script>

<style scoped>
/* Fade-Slide Transition (Can be moved to global styles later if reused often) */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style> 