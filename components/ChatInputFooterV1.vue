<template>
  <footer class="fixed bottom-0 left-0 right-0 p-4 bg-[#1A1B1E] shadow-lg">
    <div class="bg-[#25262B] border border-[#313236] rounded-lg p-2.5 flex flex-col">
      <!-- Top row: Input field -->
      <div class="flex items-center mb-2">
        <input
          :value="props.messageInput" 
          @input="emit('update:messageInput', ($event.target as HTMLInputElement).value)"
          type="text"
          placeholder="Here far chale, where do you want to go"
          class="flex-1 bg-transparent focus:outline-none text-gray-200 placeholder-gray-500 px-2 py-1 text-base"
          @keyup.enter="emit('sendMessage')" 
        />
      </div>
      
      <!-- Bottom row: Action buttons -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <!-- Mic Button (Placeholder) -->
          <button class="p-1.5 text-gray-500 hover:text-gray-300 transition-colors duration-150">
            <Icon name="heroicons:microphone" class="w-5 h-5" />
          </button>
          
          <!-- Advanced Search Button REMOVED -->
          
          <!-- Location Button REMOVED -->

        </div>
        
        <div>
          <!-- Send Button -->
          <button 
            @click="emit('sendMessage')"
            :disabled="!props.messageInput.trim()"
            class="p-2 rounded-md flex items-center justify-center transition-all duration-150"
            :class="props.messageInput.trim() ? 'bg-[#25262B] border border-[#4D4F59] text-blue-400 hover:bg-[#2C2D33]' : 'bg-[#25262B] border border-[#313236] text-gray-500 cursor-not-allowed'"
          >
            <Icon name="heroicons:paper-airplane" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Define component props (Removed isAdvancedSearchOpen)
interface ChatInputFooterProps {
  messageInput: string;
  // isAdvancedSearchOpen: boolean; // Removed
}

const props = defineProps<ChatInputFooterProps>();

// Define component emits (Removed toggleAdvancedSearch)
const emit = defineEmits<{ 
  (e: 'update:messageInput', value: string): void; 
  (e: 'sendMessage'): void;
  // (e: 'toggleAdvancedSearch'): void; // Removed
}>();

// Placeholder functions for future Mic/Location functionality if needed
// const handleMicClick = () => { console.log('Mic button clicked'); };
// const handleLocationClick = () => { console.log('Location button clicked'); };
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style> 