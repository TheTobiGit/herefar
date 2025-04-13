<!-- pages/explore.vue -->
<template>
  <!-- Page content will be added here -->
  <div class="p-4">
    <!-- Emergency Contacts Section -->
    <section class="mb-8">
      <!-- Section heading - subtle and minimal -->
      <h2 class="text-sm font-medium text-gray-400 mb-3">Emergency Contacts</h2>
      
      <!-- Horizontal scrollable container for emergency contacts -->
      <div class="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
        <!-- Emergency Contact Cards -->
        <a
          v-for="contact in emergencyContacts"
          :key="contact.id"
          :href="`tel:${contact.phone}`"
          class="flex items-center gap-2.5 px-3.5 py-2.5 rounded-md bg-[#25262B] border border-[#313236] hover:border-[#4D4F59] active:bg-[#2C2D33] transition-all duration-150 min-w-max flex-shrink-0"
        >
          <div class="w-7 h-7 flex items-center justify-center rounded-full" :class="contact.bgColorClass">
            <Icon :name="contact.icon" class="w-4 h-4" :class="contact.iconColorClass" />
          </div>
          
          <div>
            <p class="text-sm font-medium text-gray-200">{{ contact.name }}</p>
            <p class="text-xs text-gray-500">{{ contact.phone }}</p>
          </div>
        </a>
      </div>
    </section>

    <!-- Search Section -->
    <section class="mb-8">
      <!-- Search Input Wrapper -->
      <div class="relative">
        <!-- Search Icon at Left -->
        <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
          <Icon 
            name="heroicons:magnifying-glass" 
            class="w-5 h-5 text-gray-500"
          />
        </div>
        
        <!-- Search Input -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for places, services..."
          class="w-full h-12 pl-10 pr-4 rounded-lg bg-[#25262B] border border-[#313236] focus:border-[#4D4F59] focus:outline-none focus:ring-1 focus:ring-[#4D4F59] text-gray-200 placeholder-gray-500 transition-all duration-200"
          @focus="isSearchFocused = true"
          @blur="isSearchFocused = false"
        />
        
        <!-- Clear Button (Shown when text is entered) -->
        <button 
          v-if="searchQuery"
          @click="clearSearch"
          class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-500 hover:text-gray-300 transition-colors duration-150"
        >
          <Icon name="heroicons:x-mark" class="w-5 h-5" />
        </button>
      </div>
      
      <!-- Search Results -->
      <div 
        v-if="filteredEntities.length > 0 && searchQuery"
        class="mt-2 rounded-lg border border-[#313236] bg-[#25262B] shadow-lg overflow-hidden transform transition-all duration-200"
        :class="{'opacity-100 translate-y-0': filteredEntities.length > 0, 'opacity-0 -translate-y-4': filteredEntities.length === 0}"
      >
        <ul class="max-h-64 overflow-y-auto custom-scrollbar">
          <li 
            v-for="entity in filteredEntities" 
            :key="entity.id"
            class="p-3 border-b border-[#313236] last:border-b-0 hover:bg-[#2C2D33] cursor-pointer transition-colors duration-150"
          >
            <div class="flex items-center">
              <!-- Entity Category Indicator -->
              <div class="w-8 h-8 rounded-full flex items-center justify-center mr-3" :class="getCategoryBgColor(entity.category)">
                <Icon :name="getCategoryIcon(entity.category)" class="w-4 h-4" :class="getCategoryTextColor(entity.category)" />
              </div>
              
              <!-- Entity Details -->
              <div>
                <p class="text-sm font-medium text-gray-200">{{ entity.name }}</p>
                <p class="text-xs text-gray-500">{{ entity.category }}{{ entity.subCategory ? ` · ${entity.subCategory}` : '' }}</p>
              </div>
              
              <!-- Verified Badge (if applicable) -->
              <div v-if="entity.isVerified" class="ml-auto">
                <Icon name="heroicons:check-badge" class="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="mb-8">
      <h2 class="text-sm font-medium text-gray-400 mb-4">Categories</h2>
      
      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        <div
          v-for="category in categories"
          :key="category.id"
          @click="handleCategoryClick(category.id)"
          class="flex flex-col items-center justify-center p-3 rounded-lg bg-[#25262B] border border-[#313236] hover:border-[#4D4F59] active:bg-[#2C2D33] transition-all duration-150 cursor-pointer group"
          :class="{'border-blue-500': selectedCategory === category.id}"
        >
          <!-- Category Icon -->
          <div 
            class="w-10 h-10 flex items-center justify-center rounded-full mb-2 transition-transform duration-200 group-hover:scale-110 group-active:scale-95"
            :class="getCategoryBgColor(category.id)"
          >
            <Icon 
              :name="getCategoryIcon(category.id)" 
              class="w-5 h-5 transition-all duration-200"
              :class="getCategoryTextColor(category.id)"
            />
          </div>
          
          <!-- Category Name -->
          <span class="text-xs font-medium text-gray-300 text-center leading-tight">{{ category.name }}</span>
        </div>
      </div>
    </section>
    
    <!-- Entity List Section (Filtered by category) -->
    <section class="mb-8">
      <div class="flex justify-between items-center mb-4">
        <!-- Dynamic title based on selected category or showing "Popular Places" by default -->
        <h2 class="text-sm font-medium text-gray-400">
          {{ selectedCategory ? `${getCategoryDisplayName(selectedCategory)}` : 'Popular Places' }}
        </h2>
        
        <!-- Clear filter button - only shown when a category is selected -->
        <button 
          v-if="selectedCategory"
          @click="clearCategoryFilter"
          class="text-xs text-blue-400 hover:text-blue-300 transition-colors duration-150"
        >
          Clear Filter
        </button>
      </div>
      
      <!-- List of entities (filtered by category or showing popular by default) -->
      <div class="space-y-3">
        <div
          v-for="entity in filteredByCategory"
          :key="entity.id"
          class="p-3 rounded-lg bg-[#25262B] border border-[#313236] hover:border-[#4D4F59] transition-all duration-150 cursor-pointer"
        >
          <div class="flex items-center">
            <!-- Entity Category Indicator -->
            <div class="w-8 h-8 rounded-full flex items-center justify-center mr-3" :class="getCategoryBgColor(entity.category)">
              <Icon :name="getCategoryIcon(entity.category)" class="w-4 h-4" :class="getCategoryTextColor(entity.category)" />
            </div>
            
            <!-- Entity Details -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-200">{{ entity.name }}</p>
                <!-- Verified Badge (if applicable) -->
                <Icon v-if="entity.isVerified" name="heroicons:check-badge" class="w-5 h-5 text-blue-400 flex-shrink-0 ml-2" />
              </div>
              <p class="text-xs text-gray-500 truncate">{{ entity.category }}{{ entity.subCategory ? ` · ${entity.subCategory}` : '' }}</p>
            </div>
          </div>
          
          <!-- Additional details like phone, location (optional) -->
          <div class="mt-2 text-xs text-gray-500">
            <!-- Phone -->
            <div v-if="entity.contact?.phone" class="flex items-center gap-1.5">
              <Icon name="heroicons:phone-solid" class="w-3.5 h-3.5" />
              <span>{{ entity.contact.phone }}</span>
            </div>
          </div>
        </div>
        
        <!-- Empty state when no entities match the selected category -->
        <div v-if="filteredByCategory.length === 0" class="p-6 text-center text-gray-500">
          <Icon name="heroicons:face-frown" class="w-6 h-6 mx-auto mb-2" />
          <p>No places found in this category</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { dummyEntities } from '~/data/entities';
import type { Entity, EntityCategory } from '~/types/Entity';

// Define the emergency contacts with updated heroicons
const emergencyContacts = [
  {
    id: 'police',
    name: 'Police',
    phone: '191',
    icon: 'heroicons:shield-check-solid',
    bgColorClass: 'bg-blue-950/30',
    iconColorClass: 'text-blue-400'
  },
  {
    id: 'ambulance',
    name: 'Ambulance',
    phone: '193',
    icon: 'heroicons:plus-circle-solid',
    bgColorClass: 'bg-red-950/30',
    iconColorClass: 'text-red-400'
  },
  {
    id: 'fire',
    name: 'Fire Service',
    phone: '192',
    icon: 'heroicons:fire-solid',
    bgColorClass: 'bg-orange-950/30',
    iconColorClass: 'text-orange-400'
  }
];

// Search state
const searchQuery = ref('');
const isSearchFocused = ref(false);

// Filter entities based on search query
const filteredEntities = computed(() => {
  if (!searchQuery.value.trim()) return [];
  
  const query = searchQuery.value.toLowerCase().trim();
  
  return dummyEntities.filter(entity => {
    return (
      entity.name.toLowerCase().includes(query) ||
      entity.category.toLowerCase().includes(query) ||
      (entity.subCategory && entity.subCategory.toLowerCase().includes(query)) ||
      (entity.description && entity.description.toLowerCase().includes(query))
    );
  }).slice(0, 5); // Limiting to 5 results for now
});

// Clear search input
const clearSearch = () => {
  searchQuery.value = '';
};

// Helper functions for entity display
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

// --- Categories ---
// Define the main categories to display in the grid
// Explicitly define as Record to ensure type safety
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

// Track selected category for filtering
const selectedCategory = ref<EntityCategory | null>(null);

// Handle category click
const handleCategoryClick = (category: EntityCategory) => {
  // Toggle category if it's already selected
  selectedCategory.value = selectedCategory.value === category ? null : category;
  
  // Category clicks no longer affect the search bar
  console.log('Category filter:', selectedCategory.value);
};

// Clear category filter
const clearCategoryFilter = () => {
  selectedCategory.value = null;
};

// Get category display name (using the name from our categories array)
const getCategoryDisplayName = (categoryId: EntityCategory): string => {
  const category = categories.find(c => c.id === categoryId);
  return category ? category.name : categoryId;
};

// Filter entities by selected category (or show popular if none selected)
const filteredByCategory = computed(() => {
  if (!selectedCategory.value) {
    // When no category is selected, show a curated list of "popular" entities
    // For now, we'll use verified entities as popular (or first 5 if none are verified)
    const verified = dummyEntities.filter(entity => entity.isVerified);
    return verified.length > 0 ? verified : dummyEntities.slice(0, 5);
  }
  
  // Filter by selected category
  return dummyEntities.filter(entity => entity.category === selectedCategory.value);
});

// SEO configuration
useHead({
  title: 'Herefar',
});
</script>

<style scoped>
/* Hide scrollbar but maintain functionality for emergency contacts */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Custom scrollbar for search results */
.custom-scrollbar {
  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #4D4F59 #2C2D33;
}

/* Chrome, Edge, Safari */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #2C2D33;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #4D4F59;
  border-radius: 3px;
  transition: background-color 0.3s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #626470;
}
</style> 