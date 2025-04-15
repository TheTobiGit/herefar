import { defineEventHandler, getQuery } from 'h3';

// Define an interface for the expected parts of the Nominatim response
interface NominatimAddress {
  city?: string;
  town?: string;
  village?: string;
  suburb?: string;
  state?: string; // Typically the region in Ghana
  country?: string;
}

interface NominatimResponse {
  address?: NominatimAddress;
  error?: string;
}

export default defineEventHandler(async (event) => {
  // Get latitude and longitude from query parameters
  const query = getQuery(event);
  const lat = query.lat;
  const lon = query.lon;

  // Basic validation
  if (!lat || !lon) {
    return { error: 'Missing latitude or longitude' };
  }

  // Construct Nominatim API URL
  const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

  // --- Fetch from Nominatim --- 
  try {
    const response = await $fetch<NominatimResponse>(nominatimUrl, {
      headers: {
        // IMPORTANT: Provide a descriptive User-Agent as required by Nominatim\'s Usage Policy
        // Replace \'MyApp/1.0 (your-contact-email@example.com)\' with your actual app info
        'User-Agent': 'HereFarApp/0.1 (https://github.com/TobiAdegbite/herefar; thetobia@gmail.com)', 
      },
    });

    // Check for Nominatim API error response
    if (response.error) {
      console.error('Nominatim API Error:', response.error);
      return { error: 'Geocoding service error' };
    }

    // --- Parse the response --- 
    const address = response.address;
    if (!address) {
      return { error: 'Could not parse address information' };
    }

    // Determine the best field for the city/town/locality
    const city = address.city || address.town || address.village || address.suburb || 'Unknown Area';
    // Use 'state' for the region in Ghana
    const region = address.state || 'Unknown Region'; 

    // Return the simplified location info
    return {
      city,
      region,
    };

  } catch (error) {
    console.error('Error fetching from Nominatim:', error);
    // Return a generic server error
    return { error: 'Failed to fetch location data' };
  }
}); 