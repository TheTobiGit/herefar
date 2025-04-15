<template>
  <Transition name="fade-slide">
    <div v-if="props.isMounted" class="flex items-center justify-between text-xs text-gray-500 mb-6">
      <!-- Left side: Date, Time and Location -->
      <div class="flex items-center space-x-1.5">
        <span>{{ props.currentDate }}</span>
        <span>•</span>
        <span>{{ props.currentTime }}</span>
        <span>•</span>
        <span class="flex items-center">
          <Icon name="heroicons:map-pin" class="w-3 h-3 mr-0.5" />
          {{ props.userLocation }}
        </span>
      </div>
      <!-- Right side: Weather Removed -->
    </div>
  </Transition>
</template>

<script setup lang="ts">
// Define component props
interface TopInfoBarProps {
  isMounted: boolean; // Control the transition
  currentTime: string; // HH:mm format
  currentDate: string; // Formatted date (e.g., Tuesday, May 21)
  userLocation: string;
}

// Define props using the interface
const props = defineProps<TopInfoBarProps>();

// No internal logic needed for the component itself, relies on props
</script>

<style scoped>
/* Fade-Slide Transition */
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