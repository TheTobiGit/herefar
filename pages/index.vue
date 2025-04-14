<template>
  <div class="flex flex-col h-screen bg-[#1A1B1E]">
    <!-- Removed header, content starts directly -->
    
    <!-- Main content area (scrollable) -->
    <main ref="mainContentRef" class="flex-1 overflow-y-auto p-4 pb-32 space-y-6">
      <!-- Top Info Bar - Use the component -->
      <TopInfoBar 
        :isMounted="isMounted" 
        :currentTime="currentTime"
        :userLocation="userLocation"
        :weatherIcon="weatherIcon"
        :weatherTemp="weatherTemp"
      />
      
      <!-- Initial content - shown when no messages exist -->
      <div v-if="messages.length === 0">
        <!-- Greeting -->
        <Transition name="fade-slide">
          <div v-if="isMounted" class="text-center pt-4 pb-2" style="transition-delay: 50ms;">
            <h1 class="text-2xl font-medium text-gray-300 mb-1">Good {{ timeOfDay }}</h1>
            <p class="text-sm text-gray-500">Here far ooo, hmmm.</p>
          </div>
        </Transition>
        
        <!-- Nearby Section -->
        <section>
          <Transition name="fade-slide">
            <h2 v-if="isMounted" class="text-sm font-medium text-gray-400 mb-3" style="transition-delay: 100ms;">Nearby</h2>
          </Transition>
          <TransitionGroup 
            tag="div" 
            name="fade-slide-list"
            class="space-y-3"
          >
            <PlaceCard 
              v-for="(place, index) in (isMounted ? nearbyPlaces : [])" 
              :key="place.id" 
              :entity="place" 
              :style="{ transitionDelay: `${150 + index * 50}ms` }" 
            />
          </TransitionGroup>
        </section>
        
        <!-- Recent Section - added margin-top class -->
        <section class="mt-8">
          <Transition name="fade-slide">
            <h2 v-if="isMounted" class="text-sm font-medium text-gray-400 mb-3" :style="{ transitionDelay: `${150 + nearbyPlaces.length * 50}ms` }">Recent</h2>
          </Transition>
          <TransitionGroup 
            tag="div" 
            name="fade-slide-list"
            class="space-y-3"
          >
            <PlaceCard 
              v-for="(item, index) in (isMounted ? recentItems : [])" 
              :key="item.id" 
              :entity="item" 
              :style="{ transitionDelay: `${200 + nearbyPlaces.length * 50 + index * 50}ms` }" 
            />
          </TransitionGroup>
        </section>
      </div>
      
      <!-- Chat messages - shown when messages exist -->
      <div v-else class="space-y-4">
        <TransitionGroup 
          tag="div" 
          name="fade-slide-list"
          class="space-y-4"
        >
          <ChatMessageBubbleV1 
            v-for="(message, index) in messages" 
            :key="index" 
            :message="message" 
            @placeClick="showExpandedPlace"
          />
        </TransitionGroup>
        
        <!-- Typing indicator (shows when isTyping is true) - updated to remove container -->
        <Transition name="fade">
          <div v-if="isTyping" class="flex mt-2 ml-2">
            <div class="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </Transition>
      </div>
    </main>
    
    <!-- Input area - Use the V1 component -->
    <ChatInputFooterV1 
      v-model:messageInput="messageInput" 
      @sendMessage="sendMessage"
    />
  </div>
</template>

<script setup lang="ts">
// Import Vue parts
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'; 

// Import Composables
import { useCategoryStyles } from '~/composables/useCategoryStyles';
import { useChatV1 } from '~/composables/useChatV1'; // Import the V1 chat composable
import { usePageInfo } from '~/composables/usePageInfo'; // Import usePageInfo

// Import Components
import PlaceCard from '~/components/PlaceCard.vue';
import ChatMessageBubbleV1 from '~/components/ChatMessageBubbleV1.vue'; // Import the V1 chat bubble component
import ChatInputFooterV1 from '~/components/ChatInputFooterV1.vue'; // Import the V1 chat input footer component
import TopInfoBar from '~/components/TopInfoBar.vue';

// Import types and data
import type { EntityCategory } from '~/types/Entity';

// Get category styling functions from the composable
const { getCategoryIcon, getCategoryBgColor, getCategoryTextColor } = useCategoryStyles();

// Use the V1 chat composable
const { messages, isTyping, messageInput, sendMessage, showExpandedPlace } = useChatV1();

// Use Page Info composable
const { 
  isMounted, currentTime, timeOfDay, weatherIcon, weatherTemp, 
  userLocation, nearbyPlaces, recentItems 
} = usePageInfo();

// Scroll to bottom of chat
const mainContentRef = ref<HTMLElement | null>(null);
const scrollToBottom = async () => {
  await nextTick(); // Ensure DOM updates are finished
  const mainEl = mainContentRef.value;
  if (mainEl) {
    mainEl.scrollTop = mainEl.scrollHeight;
  }
};

// Watch messages length to scroll down when new messages are added
watch(messages, () => {
  scrollToBottom();
}, { deep: true });

// SEO configuration
useHead({
  title: 'Herefar - Home',
});
</script>

<style scoped>
/* Custom scrollbar for main content */
main {
  scrollbar-width: thin;
  scrollbar-color: #4D4F59 #2C2D33;
}

main::-webkit-scrollbar {
  width: 6px;
}

main::-webkit-scrollbar-track {
  background: #2C2D33;
  border-radius: 3px;
}

main::-webkit-scrollbar-thumb {
  background-color: #4D4F59;
  border-radius: 3px;
  transition: background-color 0.3s ease;
}

main::-webkit-scrollbar-thumb:hover {
  background-color: #626470;
}

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

/* Fade-Slide List Transition (for TransitionGroup) */
.fade-slide-list-enter-active,
.fade-slide-list-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-slide-list-enter-from,
.fade-slide-list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
/* Ensure leaving items absolute positioned for smooth transition */
.fade-slide-list-leave-active {
  position: absolute;
  width: 100%; /* Adjust if needed based on container */
}
/* Move transition for smooth reordering */
.fade-slide-list-move {
  transition: transform 0.4s ease;
}

/* Simple fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Typing dots animation - updated for better visibility on page */
.typing-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 40px;
}

.typing-dots span {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #6E7380; /* Slightly brighter for visibility on dark background */
  margin: 0 2px;
  opacity: 0.8;
  animation: typingDot 1.4s infinite ease-in-out;
}

.typing-dots span:nth-child(1) {
  animation-delay: 0s;
}

.typing-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typingDot {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.6;
  }
  30% {
    transform: translateY(-4px);
    opacity: 1;
  }
}

/* Slide up animation for advanced search panel */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>