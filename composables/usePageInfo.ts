import { ref, computed, onMounted, onUnmounted, watch } from 'vue'; // Added watch
import { useNow, useDateFormat, useGeolocation } from '@vueuse/core';
import { dummyEntities } from '~/data/entities'; // Import dummy data
import type { Entity } from '~/types/Entity'; // Import Entity type

// Define type for the expected response from our API route
interface ReverseGeocodeResponse {
  city?: string;
  region?: string;
  error?: string;
}

/**
 * Composable for managing page information like time, date,
 * location, and initial display elements (Nearby, Recent).
 */
export const usePageInfo = () => {
  // --- State --- 

  const isMounted = ref(false);

  // --- Time & Date (Using VueUse) ---
  const now = useNow(); // Reactive ref updated every second
  const currentTime = useDateFormat(now, 'HH:mm'); // Reactive formatted time
  const currentDate = useDateFormat(now, 'dddd, MMMM D'); // Reactive formatted date
  const timeOfDay = computed(() => { // Reactive time of day
    const hour = now.value.getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  });

  // --- Location (Using VueUse useGeolocation & Server Route) ---
  const { 
    coords, 
    locatedAt, 
    error: geoError, // Rename error to geoError for clarity
    resume: resumeGeolocation, // Rename resume
    pause: pauseGeolocation // Rename pause 
  } = useGeolocation(); 

  const userLocation = ref('Accra, Ghana'); // Default/loading location display string
  const userRegion = ref('Greater Accra'); // Default region
  const isGeocoding = ref(false);

  // Fetch location details from our server route when coordinates update
  watch(coords, async (newCoords) => {
    // Check if coords are valid numbers and not the initial Infinity
    if (
      typeof newCoords.latitude === 'number' && isFinite(newCoords.latitude) &&
      typeof newCoords.longitude === 'number' && isFinite(newCoords.longitude)
    ) {
      isGeocoding.value = true;
      userLocation.value = 'Getting location...'; // Indicate loading
      try {
        // Explicitly type the fetch response
        const locationData = await $fetch<ReverseGeocodeResponse>('/api/reverse-geocode', {
          params: {
            lat: newCoords.latitude,
            lon: newCoords.longitude,
          }
        });

        // Check if the response contains an error property
        if (locationData && locationData.error) {
          console.error('Reverse geocoding API error:', locationData.error);
          userLocation.value = 'Location unavailable';
        } else if (locationData) {
          // If no error, assume city and region exist (or handle potential undefined)
          userLocation.value = locationData.city || 'Unknown Area';
          userRegion.value = locationData.region || 'Unknown Region';
        } else {
          // Handle case where locationData is null/undefined (unexpected)
          userLocation.value = 'Location data missing';
        }
      } catch (error) {
        console.error('Failed to fetch reverse geocoding:', error);
        userLocation.value = 'Location error'; // Fallback on fetch failure
      }
      finally {
        isGeocoding.value = false;
      }
    }
  }, { immediate: false }); // Don't run immediately, wait for actual location update

  // --- Helper Functions --- 

  // Random distance helper (Used for Nearby - Keep for now)
  const getRandomDistance = () => (Math.random() * 2 + 0.1).toFixed(1);

  // --- Computed Properties for Initial Display --- 

  // Add type definition for the mapped entity with distance
  interface EntityWithDistance extends Entity {
    distance?: string;
  }

  const nearbyPlaces = computed((): EntityWithDistance[] => {
    return [...dummyEntities]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4)
      .map(entity => ({ ...entity, distance: getRandomDistance() }));
  });

  const recentItems = computed((): Entity[] => { // Return type is Entity
    // Sort by recent update first
    return [...dummyEntities]
      .sort((a, b) => (b.lastUpdated || '').localeCompare(a.lastUpdated || '')) 
      .slice(0, 3);
  });

  // --- Lifecycle Hooks --- 

  onMounted(() => {
    // Geolocation watching starts paused, resume it on mount
    resumeGeolocation(); 
    
    // Set mounted state after a delay for transitions
    setTimeout(() => {
      isMounted.value = true;
    }, 50);
  });

  onUnmounted(() => {
    // Pause geolocation watching when component unmounts to save resources
    pauseGeolocation(); 
  });

  // --- Return Values --- 

  return {
    isMounted,
    currentTime,
    currentDate,
    timeOfDay,
    userLocation, // Now updated via reverse geocoding
    userRegion,   // Now updated via reverse geocoding
    isGeocoding,  // Flag indicating if geocoding is in progress
    geoError,     // Geolocation API error object
    coords,       // Raw coordinates from useGeolocation
    nearbyPlaces,
    recentItems,
  };
}; 