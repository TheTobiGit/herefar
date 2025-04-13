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
            </div>
            
            <!-- Response message bubble (left aligned) -->
            <div v-else 
              class="max-w-[75%] bg-[#25262B] text-gray-200 px-4 py-2.5 rounded-lg border border-[#313236] shadow-sm"
            >
              <p>{{ message.text }}</p>
            </div>
          </div>
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
    
    <!-- Advanced Search Panel - shows when isAdvancedSearchOpen is true -->
    <Transition name="slide-up">
      <div v-if="isAdvancedSearchOpen" class="fixed inset-x-0 bottom-24 p-4 z-10">
        <div class="bg-[#25262B] border border-[#313236] rounded-lg p-4 shadow-lg max-h-[70vh] overflow-y-auto">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-sm font-medium text-gray-300">Advanced Search</h2>
            <button @click="isAdvancedSearchOpen = false" class="text-gray-500 hover:text-gray-300">
              <Icon name="heroicons:x-mark" class="w-5 h-5" />
            </button>
          </div>
          
          <!-- Categories Filter -->
          <div class="mb-4">
            <label class="block text-xs text-gray-500 mb-2">Categories</label>
            <div class="grid grid-cols-3 gap-2">
              <button 
                v-for="category in categories" 
                :key="category.id"
                @click="toggleCategory(category.id)"
                class="p-2 rounded-md text-xs flex items-center justify-center gap-1 transition-colors duration-150"
                :class="selectedCategories.includes(category.id) 
                  ? `${getCategoryBgColor(category.id)} ${getCategoryTextColor(category.id)} border-transparent` 
                  : 'bg-[#1E1F23] text-gray-400 border border-[#313236]'"
              >
                <Icon :name="getCategoryIcon(category.id)" class="w-3.5 h-3.5" />
                <span>{{ category.name.split(' ')[0] }}</span>
              </button>
            </div>
          </div>
          
          <!-- Distance Range -->
          <div class="mb-4">
            <label class="block text-xs text-gray-500 mb-2">Maximum Distance (km)</label>
            <div class="flex items-center gap-2">
              <input 
                type="range" 
                v-model="maxDistance" 
                min="1" 
                max="10" 
                step="1"
                class="w-full accent-blue-500"
              />
              <span class="text-xs text-gray-300 min-w-[30px]">{{ maxDistance }}km</span>
            </div>
          </div>
          
          <!-- Verified Only Toggle -->
          <div class="mb-4">
            <div class="flex items-center">
              <button 
                @click="verifiedOnly = !verifiedOnly"
                class="w-5 h-5 rounded border mr-2 flex items-center justify-center transition-colors duration-150"
                :class="verifiedOnly ? 'bg-blue-500 border-blue-600' : 'bg-[#1E1F23] border-[#313236]'"
              >
                <Icon v-if="verifiedOnly" name="heroicons:check" class="w-3.5 h-3.5 text-white" />
              </button>
              <label class="text-xs text-gray-400">Verified places only</label>
            </div>
          </div>
          
          <!-- Keywords -->
          <div class="mb-4">
            <label class="block text-xs text-gray-500 mb-2">Keywords</label>
            <input 
              type="text" 
              v-model="keywords"
              placeholder="Enter keywords..."
              class="w-full px-3 py-2 rounded-md bg-[#1E1F23] border border-[#313236] focus:border-[#4D4F59] focus:outline-none text-gray-300 text-sm placeholder-gray-500"
            />
          </div>
          
          <!-- Action Buttons -->
          <div class="flex justify-end gap-2 mt-4">
            <button 
              @click="resetAdvancedSearch"
              class="px-3 py-1.5 rounded-md bg-[#1E1F23] border border-[#313236] text-gray-400 text-xs hover:border-[#4D4F59] transition-colors duration-150"
            >
              Reset
            </button>
            <button 
              @click="applyAdvancedSearch"
              class="px-3 py-1.5 rounded-md bg-blue-600 text-white text-xs hover:bg-blue-500 transition-colors duration-150"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </Transition>
    
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
            
            <!-- Advanced Search Button - updated from Search -->
            <button 
              @click="toggleAdvancedSearch"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#25262B] border border-[#313236] hover:border-[#4D4F59] text-xs text-gray-300 transition-all duration-150"
              :class="{ 'border-blue-500': isAdvancedSearchOpen }"
            >
              <Icon name="heroicons:adjustments-horizontal" class="w-4 h-4 text-blue-400" /> 
              <span>Advanced Search</span>
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

// Typing indicator state
const isTyping = ref(false);

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

// Simulate a response from the AI (To be implemented later)
const simulateResponse = () => {
  // Show typing indicator
  isTyping.value = true;
  
  // Simulate response delay
  setTimeout(() => {
    // Hide typing indicator
    isTyping.value = false;
    
    // Add a response message
    // This will be replaced with actual response logic later
    messages.value.push({
      text: "I understand you're looking for information. How can I help you?",
      isUser: false,
      time: getCurrentTimeFormatted()
    });
    
    // Scroll to bottom after response
    setTimeout(scrollToBottom, 100);
  }, 2000); // 2 second delay to show typing indicator
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
  
  // Clear input after sending
  messageInput.value = '';
  
  // Scroll to bottom to show user message
  setTimeout(scrollToBottom, 100);
  
  // Simulate AI response
  simulateResponse();
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

// Advanced search state
const isAdvancedSearchOpen = ref(false);
const selectedCategories = ref<EntityCategory[]>([]);
const maxDistance = ref(5);
const verifiedOnly = ref(false);
const keywords = ref('');

// Categories list for advanced search - using same data from explore.vue
const categories: { id: EntityCategory; name: string }[] = [
  { id: 'Medical', name: 'Medical' },
  { id: 'Security', name: 'Security' },
  { id: 'Transport', name: 'Transport' },
  { id: 'Food', name: 'Food & Dining' },
  { id: 'Government', name: 'Government' },
  { id: 'Financial', name: 'Financial' },
  { id: 'Education', name: 'Education' },
  { id: 'Utility', name: 'Utilities' },
  { id: 'Accommodation', name: 'Accommodation' },
  { id: 'Retail', name: 'Shopping' },
  { id: 'Entertainment', name: 'Entertainment' },
  { id: 'Other', name: 'More' },
];

// Toggle advanced search panel
const toggleAdvancedSearch = () => {
  isAdvancedSearchOpen.value = !isAdvancedSearchOpen.value;
};

// Toggle category selection
const toggleCategory = (category: EntityCategory) => {
  if (selectedCategories.value.includes(category)) {
    selectedCategories.value = selectedCategories.value.filter(c => c !== category);
  } else {
    selectedCategories.value.push(category);
  }
};

// Reset advanced search filters
const resetAdvancedSearch = () => {
  selectedCategories.value = [];
  maxDistance.value = 5;
  verifiedOnly.value = false;
  keywords.value = '';
};

// Apply advanced search
const applyAdvancedSearch = () => {
  // When we click search, we'll close the panel and send a formatted message
  isAdvancedSearchOpen.value = false;
  
  // Build search message based on selected filters
  let searchMessage = 'Search for';
  
  if (selectedCategories.value.length > 0) {
    if (selectedCategories.value.length === 1) {
      searchMessage += ` ${selectedCategories.value[0]}`;
    } else {
      const lastCategory = selectedCategories.value.pop();
      searchMessage += ` ${selectedCategories.value.join(', ')} and ${lastCategory}`;
      selectedCategories.value.push(lastCategory as EntityCategory); // Add back for state
    }
  }
  
  if (keywords.value.trim()) {
    searchMessage += ` with "${keywords.value.trim()}"`;
  }
  
  searchMessage += ` within ${maxDistance.value}km`;
  
  if (verifiedOnly.value) {
    searchMessage += ' (verified only)';
  }
  
  // Set message input and trigger send
  messageInput.value = searchMessage;
  sendMessage();
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