<!-- layouts/default.vue -->
<!-- Basic layout container -->
<template>
  <!-- The main content area where page components will be rendered -->
  <!-- Forcing a specific dark theme using a hex code via style block -->
  <main class="main-container min-h-screen text-gray-100">
    <slot />
  </main>
</template>

<script setup lang="ts">
// No script logic needed for this basic layout yet.
// Removed useHead for body class as we are forcing the background color here.
</script>

<style>
/* Global scrollbar styles - note: not scoped, to apply to entire page */
::-webkit-scrollbar {
  width: 6px;
  height: 6px; /* For horizontal scrollbars */
}

::-webkit-scrollbar-track {
  background: #2C2D33;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background-color: #4D4F59;
  border-radius: 3px;
  transition: background-color 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #626470;
}

/* Firefox scrollbar */
html {
  scrollbar-width: thin;
  scrollbar-color: #4D4F59 #2C2D33;
}
</style>

<style scoped>
/* Apply the custom background color */
.main-container {
  background-color: #1E1F24;
}
/* Add any other layout-specific styles here if needed */
</style>