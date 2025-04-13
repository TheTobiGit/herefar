<template>
  <div class="flex flex-col h-screen bg-[#1A1B1E]">
    <!-- Removed header, content starts directly -->
    
    <!-- Main content area (scrollable) -->
    <main class="flex-1 overflow-y-auto p-4 pb-32 space-y-6">
      <!-- Time, location and weather info - always visible -->
      <Transition name="fade-slide">
        <div v-if="isMounted" class="flex items-center justify-between text-xs text-gray-500 mb-6">
          <div class="flex items-center space-x-1.5">
            <span>{{ currentTime }}</span>
            <span>•</span>
            <span class="flex items-center">
              <Icon name="heroicons:map-pin" class="w-3 h-3 mr-0.5" />
              {{ userLocation }}
            </span>
          </div>
          <div class="flex items-center gap-1">
            <Icon :name="weatherIcon" class="w-4 h-4" />
            <span>{{ weather.temp }}°C</span>
          </div>
        </div>
      </Transition>
      
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
            <div 
              v-for="(place, index) in (isMounted ? nearbyPlaces : [])" 
              :key="place.id"
              :style="{ transitionDelay: `${150 + index * 50}ms` }" 
              class="p-3 rounded-lg bg-[#25262B] border border-[#313236] hover:border-[#4D4F59] transition-all duration-150 cursor-pointer"
            >
              <div class="flex items-center">
                <!-- Entity Category Icon -->
                <div class="w-8 h-8 rounded-full flex items-center justify-center mr-3" :class="getCategoryBgColor(place.category)">
                  <Icon :name="getCategoryIcon(place.category)" class="w-4 h-4" :class="getCategoryTextColor(place.category)" />
                </div>
                <!-- Entity Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-medium text-gray-200">{{ place.name }}</p>
                    <div class="flex items-center gap-1">
                      <p class="text-xs text-gray-500">{{ place.distance }}km</p>
                      <Icon v-if="place.isVerified" name="heroicons:check-badge" class="w-5 h-5 text-blue-400 flex-shrink-0" />
                    </div>
                  </div>
                  <p class="text-xs text-gray-500 truncate">{{ place.category }}{{ place.subCategory ? ` · ${place.subCategory}` : '' }}</p>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </section>
        
        <!-- Recent Section -->
        <section>
          <Transition name="fade-slide">
            <h2 v-if="isMounted" class="text-sm font-medium text-gray-400 mb-3" :style="{ transitionDelay: `${150 + nearbyPlaces.length * 50}ms` }">Recent</h2>
          </Transition>
          <TransitionGroup 
            tag="div" 
            name="fade-slide-list"
            class="space-y-3"
          >
            <div 
              v-for="(item, index) in (isMounted ? recentItems : [])" 
              :key="item.id"
              :style="{ transitionDelay: `${200 + nearbyPlaces.length * 50 + index * 50}ms` }"
              class="p-3 rounded-lg bg-[#25262B] border border-[#313236] hover:border-[#4D4F59] transition-all duration-150 cursor-pointer"
            >
              <div class="flex items-center">
                <!-- Entity Category Icon -->
                <div class="w-8 h-8 rounded-full flex items-center justify-center mr-3" :class="getCategoryBgColor(item.category)">
                  <Icon :name="getCategoryIcon(item.category)" class="w-4 h-4" :class="getCategoryTextColor(item.category)" />
                </div>
                <!-- Entity Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-medium text-gray-200">{{ item.name }}</p>
                    <Icon v-if="item.isVerified" name="heroicons:check-badge" class="w-5 h-5 text-blue-400 flex-shrink-0" />
                  </div>
                  <p class="text-xs text-gray-500 truncate">{{ item.category }}{{ item.subCategory ? ` · ${item.subCategory}` : '' }}</p>
                </div>
              </div>
            </div>
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
          <div 
            v-for="(message, index) in messages" 
            :key="index"
            class="flex"
            :class="{ 'justify-end': message.isUser }"
          >
            <!-- User message bubble (right aligned) - updated to match UI design -->
            <div v-if="message.isUser" 
              class="max-w-[75%] bg-[#25262B] text-gray-200 px-4 py-2.5 rounded-lg border border-[#313236] shadow-sm"
            >
              <p>{{ message.text }}</p>
              <!-- Timestamp removed -->
            </div>
            
            <!-- Response message bubble will go here later -->
          </div>
        </TransitionGroup>
      </div>
    </main>
    
    <!-- Input area -->
    <footer class="fixed bottom-0 left-0 right-0 p-4 bg-[#1A1B1E] shadow-lg">
      <div class="bg-[#25262B] border border-[#313236] rounded-lg p-2.5 flex flex-col">
        <!-- Top row: Input field -->
        <div class="flex items-center mb-2">
          <input
            v-model="messageInput"
            type="text"
            placeholder="Here far chale, where do you want to go"
            class="flex-1 bg-transparent focus:outline-none text-gray-200 placeholder-gray-500 px-2 py-1 text-base"
            @keyup.enter="sendMessage"
          />
        </div>
        
        <!-- Bottom row: Action buttons -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <!-- Mic Button -->
            <button class="p-1.5 text-gray-500 hover:text-gray-300 transition-colors duration-150">
              <Icon name="heroicons:microphone" class="w-5 h-5" />
            </button>
            
            <!-- Search Button -->
            <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#25262B] border border-[#313236] hover:border-[#4D4F59] text-xs text-gray-300 transition-all duration-150">
              <Icon name="heroicons:magnifying-glass" class="w-4 h-4 text-gray-400" /> 
              <span>Search</span>
            </button>
            
            <!-- Location Button -->
            <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#25262B] border border-[#313236] hover:border-[#4D4F59] text-xs text-gray-300 transition-all duration-150">
              <Icon name="heroicons:map-pin" class="w-4 h-4 text-blue-400" /> 
              <span>Location</span>
            </button>
          </div>
          
          <div>
            <!-- Send Button -->
            <button 
              @click="sendMessage"
              :disabled="!messageInput.trim()"
              class="p-2 rounded-md flex items-center justify-center transition-all duration-150"
              :class="messageInput.trim() ? 'bg-[#25262B] border border-[#4D4F59] text-blue-400 hover:bg-[#2C2D33]' : 'bg-[#25262B] border border-[#313236] text-gray-500 cursor-not-allowed'"
            >
              <Icon name="heroicons:paper-airplane" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Import dummy data and types
import { dummyEntities } from '~/data/entities';
import type { Entity, EntityCategory } from '~/types/Entity';

// Define message interface
interface Message {
  text: string;
  isUser: boolean;
  time: string;
}

// Animation trigger state
const isMounted = ref(false);

// Chat messages array
const messages = ref<Message[]>([]);

// Current time and date
const currentTime = ref('');
const currentDate = ref('');
const timeOfDay = ref('');

// Update time every minute
const updateDateTime = () => {
  const now = new Date();
  
  // Update time (HH:MM format)
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
  
  // Update date (Day, Month Date format) - now only used internally
  currentDate.value = now.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric'
  });
  
  // Determine time of day
  const hour = now.getHours();
  if (hour < 12) timeOfDay.value = 'morning';
  else if (hour < 18) timeOfDay.value = 'afternoon';
  else timeOfDay.value = 'evening';
};

// Weather and location data
const weatherConditions = [
  { condition: 'Sunny', icon: 'heroicons:sun', temp: 32 }, 
  { condition: 'Cloudy', icon: 'heroicons:cloud', temp: 29 },
  { condition: 'Rainy', icon: 'heroicons:cloud-rain', temp: 26 },
  { condition: 'Partly Cloudy', icon: 'heroicons:cloud-sun', temp: 30 }
];
const weatherIndex = Math.floor(Math.random() * weatherConditions.length);
const weather = ref(weatherConditions[weatherIndex]);
const weatherIcon = computed(() => weather.value.icon);

// Random location (UPDATED to Ghanaian cities)
const locations = [
  'Accra, Ghana',
  'Kumasi, Ghana',
  'Tamale, Ghana',
  'Takoradi, Ghana',
  'Cape Coast, Ghana'
];
const locationIndex = Math.floor(Math.random() * locations.length);
const userLocation = ref(locations[locationIndex]);

// Random distance helper
const getRandomDistance = () => (Math.random() * 2 + 0.1).toFixed(1);

// Select random entities for Nearby
const nearbyPlaces = computed(() => {
  const randomEntities = [...dummyEntities]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
  return randomEntities.map(entity => ({
    ...entity,
    distance: getRandomDistance()
  }));
});

// Select random entities for Recent items
const recentItems = computed(() => {
  return [...dummyEntities]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
});

// Message input for chat
const messageInput = ref('');

// Helper function to format current time for messages
const getCurrentTimeFormatted = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
};

// Handle sending a message
const sendMessage = () => {
  if (!messageInput.value.trim()) return;
  
  // Add user message to chat
  messages.value.push({
    text: messageInput.value,
    isUser: true,
    time: getCurrentTimeFormatted()
  });
  
  // Will add AI response later
  // For now, just log to console
  console.log('Message sent:', messageInput.value);
  
  // Clear input after sending
  messageInput.value = '';
  
  // Scroll to bottom of chat (will implement later)
  // Need to wait for DOM update
  setTimeout(() => {
    scrollToBottom();
  }, 100);
};

// Scroll to bottom of chat
const scrollToBottom = () => {
  const mainEl = document.querySelector('main');
  if (mainEl) {
    mainEl.scrollTop = mainEl.scrollHeight;
  }
};

// Helper functions for category styling
const getCategoryIcon = (category: EntityCategory): string => {
  const iconMap: Record<EntityCategory, string> = {
    Medical: 'heroicons:heart-solid',
    Security: 'heroicons:shield-check-solid',
    Utility: 'heroicons:bolt-solid',
    Transport: 'heroicons:truck-solid',
    Food: 'heroicons:cake-solid',
    Entertainment: 'heroicons:film-solid',
    Financial: 'heroicons:banknotes-solid',
    Government: 'heroicons:building-office-solid',
    Education: 'heroicons:academic-cap-solid',
    Accommodation: 'heroicons:home-solid',
    Retail: 'heroicons:shopping-bag-solid',
    Other: 'heroicons:question-mark-circle-solid'
  };
  
  return iconMap[category] || iconMap.Other;
};

const getCategoryBgColor = (category: EntityCategory): string => {
  const colorMap: Record<EntityCategory, string> = {
    Medical: 'bg-red-950/30',
    Security: 'bg-blue-950/30',
    Utility: 'bg-yellow-950/30',
    Transport: 'bg-green-950/30',
    Food: 'bg-orange-950/30',
    Entertainment: 'bg-purple-950/30',
    Financial: 'bg-emerald-950/30',
    Government: 'bg-sky-950/30',
    Education: 'bg-indigo-950/30',
    Accommodation: 'bg-rose-950/30',
    Retail: 'bg-amber-950/30',
    Other: 'bg-gray-800/30'
  };
  
  return colorMap[category] || colorMap.Other;
};

const getCategoryTextColor = (category: EntityCategory): string => {
  const colorMap: Record<EntityCategory, string> = {
    Medical: 'text-red-400',
    Security: 'text-blue-400',
    Utility: 'text-yellow-400',
    Transport: 'text-green-400',
    Food: 'text-orange-400',
    Entertainment: 'text-purple-400',
    Financial: 'text-emerald-400',
    Government: 'text-sky-400',
    Education: 'text-indigo-400',
    Accommodation: 'text-rose-400',
    Retail: 'text-amber-400',
    Other: 'text-gray-400'
  };
  
  return colorMap[category] || colorMap.Other;
};

// SEO configuration
useHead({
  title: 'Herefar - Home',
});

// Initialize component
onMounted(() => {
  updateDateTime();
  const timer = setInterval(updateDateTime, 60000);
  
  // Set isMounted to true after a short delay
  setTimeout(() => {
    isMounted.value = true;
  }, 50);
  
  // Clean up timer on unmount
  onUnmounted(() => {
    clearInterval(timer);
  });
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
</style>