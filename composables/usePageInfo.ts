import { ref, computed, onMounted, onUnmounted } from 'vue'; // Import necessary Vue functions
import { dummyEntities } from '~/data/entities'; // Import dummy data

/**
 * Composable for managing page information like time, date, weather,
 * location, and initial display elements (Nearby, Recent).
 */
export const usePageInfo = () => {
  // --- State --- 

  const isMounted = ref(false);
  const currentTime = ref('');
  const timeOfDay = ref('');

  // Weather Data
  const weatherConditions = [
    { condition: 'Sunny', icon: 'heroicons:sun', temp: 32 }, 
    { condition: 'Cloudy', icon: 'heroicons:cloud', temp: 29 },
    { condition: 'Rainy', icon: 'heroicons:cloud-rain', temp: 26 },
    { condition: 'Partly Cloudy', icon: 'heroicons:cloud-sun', temp: 30 }
  ];
  const weatherIndex = Math.floor(Math.random() * weatherConditions.length);
  const weather = ref(weatherConditions[weatherIndex]);
  const weatherIcon = computed(() => weather.value.icon);
  const weatherTemp = computed(() => weather.value.temp);

  // Location Data
  const locations = [
    'Accra, Ghana',
    'Kumasi, Ghana',
    'Tamale, Ghana',
    'Takoradi, Ghana',
    'Cape Coast, Ghana'
  ];
  const locationIndex = Math.floor(Math.random() * locations.length);
  const userLocation = ref(locations[locationIndex]);

  // --- Helper Functions --- 

  // Update time and determine time of day
  const updateDateTime = () => {
    const now = new Date();
    currentTime.value = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    const hour = now.getHours();
    if (hour < 12) timeOfDay.value = 'morning';
    else if (hour < 18) timeOfDay.value = 'afternoon';
    else timeOfDay.value = 'evening';
  };

  // Random distance helper (Used for Nearby)
  const getRandomDistance = () => (Math.random() * 2 + 0.1).toFixed(1);

  // --- Computed Properties for Initial Display --- 

  const nearbyPlaces = computed(() => {
    // Ensure distance is added here as Entity type expects it potentially
    return [...dummyEntities]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4)
      .map(entity => ({ ...entity, distance: getRandomDistance() }));
  });

  const recentItems = computed(() => {
    return [...dummyEntities]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
      // Note: Recent items in the original didn't show distance
  });

  // --- Lifecycle Hooks --- 

  // Use onMounted within the composable to initialize
  onMounted(() => {
    updateDateTime(); // Initial call
    const timer = setInterval(updateDateTime, 60000); // Update every minute
    
    // Set mounted state after a delay for transitions
    setTimeout(() => {
      isMounted.value = true;
    }, 50);
    
    // Clean up timer on component unmount
    onUnmounted(() => {
      clearInterval(timer);
    });
  });

  // --- Return Values --- 

  return {
    isMounted,
    currentTime,
    timeOfDay,
    weatherIcon,
    weatherTemp,
    userLocation,
    nearbyPlaces,
    recentItems,
    // Don't need to return updateDateTime, getRandomDistance, etc.
  };
}; 