import type { Entity } from '~/types/Entity';

/**
 * Dummy data representing various entities in Ghana.
 * Uses the refined Entity interface (V2) including categoryDetails.
 */
export const dummyEntities: Entity[] = [
  // --- Medical Examples ---
  {
    id: 'med-001',
    name: 'Korle-Bu Teaching Hospital',
    category: 'Medical',
    subCategory: 'Hospital',
    tags: ['public', 'teaching hospital', 'emergency', 'referral center'],
    address: 'Guggisberg Ave, Accra, Greater Accra Region, Ghana',
    latitude: 5.5383,
    longitude: -0.2406,
    region: 'Greater Accra',
    phoneNumber: '+233 30 266 5401',
    website: 'https://kbth.gov.gh/',
    operatingHours: '24/7 (Emergency)',
    photos: ['https://placehold.co/600x400/25262B/9CA3AF/png?text=Korle-Bu+1'],
    verifiedStatus: true,
    socialMediaLinks: { facebook: 'https://www.facebook.com/korlebuth/' },
    lastUpdated: '2024-05-01T10:00:00Z',
    categoryDetails: {
      bedCount: 2000,
      specializations: ['Cardiology', 'Oncology', 'Pediatrics', 'Surgery'],
      offersEmergencyServices: true,
    } as import('~/types/Entity').MedicalEntityDetails, // Type assertion
  },
  {
    id: 'med-002',
    name: 'Ernest Chemists Limited - Osu Branch',
    category: 'Medical',
    subCategory: 'Pharmacy',
    tags: ['retail pharmacy', 'prescription', 'over-the-counter'],
    address: 'Oxford Street, Osu, Accra, Greater Accra Region, Ghana',
    latitude: 5.5600, // Approx
    longitude: -0.1870, // Approx
    region: 'Greater Accra',
    phoneNumber: '+233 30 277 2 Ernest', // Example format
    website: 'https://www.ernestchemists.com/',
    operatingHours: 'Mon-Sat 8:00 AM - 9:00 PM, Sun 12:00 PM - 6:00 PM',
    verifiedStatus: true,
    lastUpdated: '2024-04-15T14:30:00Z',
    categoryDetails: {} as import('~/types/Entity').MedicalEntityDetails, // Empty details for Pharmacy
  },

  // --- Security Examples ---
  {
    id: 'sec-001',
    name: 'Ghana Police Service - Cantonments Station',
    category: 'Security',
    subCategory: 'Police Station',
    tags: ['police', 'law enforcement', 'public safety'],
    address: 'Near Cantonments Post Office, Accra, Greater Accra Region, Ghana',
    latitude: 5.5795,
    longitude: -0.1801,
    region: 'Greater Accra',
    phoneNumber: '191', // General Emergency
    operatingHours: '24/7',
    verifiedStatus: true,
    lastUpdated: '2023-11-01T00:00:00Z',
    categoryDetails: {
      serviceType: 'General Duties, Patrol',
      responseTime: 'Varies',
    } as import('~/types/Entity').SecurityEntityDetails,
  },

  // --- Transport Examples (Parent & Branch) ---
  {
    id: 'tp-parent-001',
    parentId: null, // This is the parent
    name: 'Bolt Ghana',
    category: 'Transport',
    subCategory: 'Ride-Sharing Hub', // Category for the brand itself
    tags: ['ride hailing', 'mobile app', 'transportation'],
    address: 'N/A (Service Provider)',
    region: 'Greater Accra', // HQ region or primary operating region
    website: 'https://bolt.eu/en-gh/',
    operatingHours: '24/7 (App Service)',
    verifiedStatus: true,
    isParentEntity: true, // Explicitly mark as parent
    categoryDetails: {},
    lastUpdated: '2024-01-10T09:00:00Z',
  },
  {
    id: 'tp-branch-001a',
    parentId: 'tp-parent-001', // Linked to Bolt Ghana
    name: 'Bolt Service Area - Accra',
    category: 'Transport',
    subCategory: 'Ride-Sharing Hub',
    tags: ['ride hailing', 'accra'],
    address: 'Accra Metropolitan Area, Greater Accra Region, Ghana',
    // Lat/Lon might represent a central point or main office if applicable
    latitude: 5.6037,
    longitude: -0.1870,
    region: 'Greater Accra',
    operatingHours: '24/7',
    verifiedStatus: true,
    branchName: 'Accra', // Branch specific identifier
    categoryDetails: {
      // Routes might not apply directly to ride-sharing hubs this way
    } as import('~/types/Entity').TransportEntityDetails,
    lastUpdated: '2024-01-10T09:00:00Z',
  },
  {
    id: 'tp-branch-001b',
    parentId: 'tp-parent-001', // Linked to Bolt Ghana
    name: 'Bolt Service Area - Kumasi',
    category: 'Transport',
    subCategory: 'Ride-Sharing Hub',
    tags: ['ride hailing', 'kumasi'],
    address: 'Kumasi Metropolitan Area, Ashanti Region, Ghana',
    latitude: 6.6885, // Approx Kumasi center
    longitude: -1.6244,
    region: 'Ashanti',
    operatingHours: '24/7',
    verifiedStatus: true,
    branchName: 'Kumasi',
    categoryDetails: {} as import('~/types/Entity').TransportEntityDetails,
    lastUpdated: '2024-01-10T09:00:00Z',
  },

  // --- Food Example ---
  {
    id: 'food-001',
    parentId: null, // Papaye Parent (Implicit, could be explicit if needed)
    name: 'Papaye Fast Foods - Osu',
    category: 'Food',
    subCategory: 'Restaurant',
    tags: ['fast food', 'chicken', 'ghanaian', 'local favorite'],
    address: 'Oxford Street, Osu, Accra, Greater Accra Region, Ghana',
    latitude: 5.5590, // Approx
    longitude: -0.1875, // Approx
    region: 'Greater Accra',
    phoneNumber: '+233 30 277 6995',
    operatingHours: '10:00 AM - 11:00 PM Daily',
    verifiedStatus: true,
    // isParentEntity: true, // Could add a separate parent entity if needed
    branchName: 'Osu',
    categoryDetails: {
      cuisineType: 'Ghanaian Fast Food',
      deliveryAvailable: true, // Assuming they partner with delivery services
    } as import('~/types/Entity').FoodEntityDetails,
    lastUpdated: '2024-03-20T12:00:00Z',
  },
  {
    id: 'food-002',
    parentId: 'food-parent-papaye', // Link to a conceptual parent or the main branch
    name: 'Papaye Fast Foods - Spintex',
    category: 'Food',
    subCategory: 'Restaurant',
    tags: ['fast food', 'chicken', 'ghanaian', 'spintex road'],
    address: 'Spintex Road, Accra, Greater Accra Region, Ghana',
    latitude: 5.6180, // Approx
    longitude: -0.1300, // Approx
    region: 'Greater Accra',
    phoneNumber: '+233 30 281 5740',
    operatingHours: '10:00 AM - 11:00 PM Daily',
    verifiedStatus: true,
    branchName: 'Spintex',
    categoryDetails: {
      cuisineType: 'Ghanaian Fast Food',
      deliveryAvailable: true,
    } as import('~/types/Entity').FoodEntityDetails,
    lastUpdated: '2024-03-20T12:05:00Z',
  },
  {
    id: 'food-003',
    parentId: 'food-parent-papaye', // Link to a conceptual parent or the main branch
    name: 'Papaye Fast Foods - Lapaz',
    category: 'Food',
    subCategory: 'Restaurant',
    tags: ['fast food', 'chicken', 'ghanaian', 'lapaz n1'],
    address: 'N1 Highway, Lapaz, Accra, Greater Accra Region, Ghana',
    latitude: 5.5915, // Approx
    longitude: -0.2440, // Approx
    region: 'Greater Accra',
    phoneNumber: '+233 30 240 0371',
    operatingHours: '10:00 AM - 11:00 PM Daily',
    verifiedStatus: true,
    branchName: 'Lapaz',
    categoryDetails: {
      cuisineType: 'Ghanaian Fast Food',
      deliveryAvailable: true,
    } as import('~/types/Entity').FoodEntityDetails,
    lastUpdated: '2024-03-20T12:10:00Z',
  },

  // --- Financial Example ---
  {
    id: 'fin-001',
    parentId: null, // Assuming this is the main branch/parent
    name: 'GCB Bank - Accra Main Branch',
    category: 'Financial',
    subCategory: 'Bank',
    tags: ['commercial bank', 'atm', 'loans', 'savings', 'head office area'],
    address: 'High Street, Accra, Greater Accra Region, Ghana',
    latitude: 5.5468,
    longitude: -0.2093,
    region: 'Greater Accra',
    phoneNumber: '+233 30 266 3923',
    website: 'https://www.gcbbank.com.gh/',
    operatingHours: 'Mon-Fri 8:30 AM - 4:00 PM',
    verifiedStatus: true,
    // isParentEntity: true, // Can be marked if acting as the primary parent
    branchName: 'Accra Main',
    categoryDetails: {
      servicesOffered: ['Current Account', 'Savings Account', 'Loans', 'Foreign Exchange', 'ATM Services'],
      atmNetwork: 'gh-link',
    } as import('~/types/Entity').FinancialEntityDetails,
    lastUpdated: '2024-05-10T11:00:00Z',
  },
  {
    id: 'fin-002',
    parentId: 'fin-001', // Linked to Accra Main
    name: 'GCB Bank - Osu Branch',
    category: 'Financial',
    subCategory: 'Bank',
    tags: ['commercial bank', 'atm', 'osu oxford street'],
    address: 'Oxford Street, Osu, Accra, Greater Accra Region, Ghana',
    latitude: 5.5585, // Approx
    longitude: -0.1880, // Approx
    region: 'Greater Accra',
    phoneNumber: '+233 30 277 2174',
    operatingHours: 'Mon-Fri 8:30 AM - 4:00 PM',
    verifiedStatus: true,
    branchName: 'Osu',
    categoryDetails: {
      servicesOffered: ['Current Account', 'Savings Account', 'ATM Services'],
      atmNetwork: 'gh-link',
    } as import('~/types/Entity').FinancialEntityDetails,
    lastUpdated: '2024-05-10T11:05:00Z',
  },
  {
    id: 'fin-003',
    parentId: 'fin-001', // Linked to Accra Main
    name: 'GCB Bank - KNUST Branch',
    category: 'Financial',
    subCategory: 'Bank',
    tags: ['commercial bank', 'atm', 'kumasi', 'university campus'],
    address: 'KNUST Campus, Kumasi, Ashanti Region, Ghana',
    latitude: 6.6731, // Approx KNUST
    longitude: -1.5653,
    region: 'Ashanti',
    phoneNumber: '+233 32 206 0400', // Example
    operatingHours: 'Mon-Fri 8:30 AM - 4:00 PM',
    verifiedStatus: true,
    branchName: 'KNUST',
    categoryDetails: {
      servicesOffered: ['Current Account', 'Savings Account', 'ATM Services', 'Student Accounts'],
      atmNetwork: 'gh-link',
    } as import('~/types/Entity').FinancialEntityDetails,
    lastUpdated: '2024-05-10T11:10:00Z',
  },
  
  // --- Accommodation Example ---
   {
    id: 'accom-001',
    name: 'Kempinski Hotel Gold Coast City',
    category: 'Accommodation',
    subCategory: 'Hotel',
    tags: ['luxury', '5-star', 'pool', 'spa', 'conference facilities'],
    address: 'PMB 66, Ministries, Gamel Abdul Nasser Avenue, Accra, Greater Accra Region, Ghana',
    latitude: 5.5570, 
    longitude: -0.1998,
    region: 'Greater Accra',
    phoneNumber: '+233 24 243 6000',
    website: 'https://www.kempinski.com/en/accra/hotel-gold-coast-city',
    operatingHours: '24/7 (Reception)',
    photos: ['https://placehold.co/600x400/25262B/9CA3AF/png?text=Kempinski+Accra'],
    verifiedStatus: true,
    socialMediaLinks: { instagram: 'https://www.instagram.com/kempinskiaccra/' },
    lastUpdated: '2024-04-25T08:30:00Z',
    categoryDetails: {
      roomCount: 269,
      amenities: ['Swimming Pool', 'Spa', 'Fitness Center', 'Restaurants', 'Bars', 'Wi-Fi', 'Meeting Rooms'],
    } as import('~/types/Entity').AccommodationEntityDetails,
  },

  // --- Retail Example ---
  {
    id: 'retail-001',
    name: 'Accra Mall',
    category: 'Retail',
    subCategory: 'Mall',
    tags: ['shopping mall', 'food court', 'cinema', 'parking'],
    address: 'Tetteh Quarshie Interchange, Spintex Road, Accra, Greater Accra Region, Ghana',
    latitude: 5.6208,
    longitude: -0.1678,
    region: 'Greater Accra',
    website: 'https://accramall.com/',
    operatingHours: 'Mon-Sat 10:00 AM - 9:00 PM, Sun 12:00 PM - 8:00 PM',
    photos: ['https://placehold.co/600x400/25262B/9CA3AF/png?text=Accra+Mall'],
    verifiedStatus: true,
    lastUpdated: '2024-02-15T18:00:00Z',
    categoryDetails: {
      storeType: 'Mixed Retail, Entertainment',
      brandsCarried: ['Shoprite', 'Game', 'Silverbird Cinemas', 'Mr Price', 'Many Others'],
    } as import('~/types/Entity').RetailEntityDetails,
  },
];
