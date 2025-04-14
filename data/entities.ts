// File: data/entities.ts
// This file contains the structured dummy data for entities,
// including parent companies and their branches.
import type { Entity } from '~/types/Entity';

// Helper function to generate placeholder image URLs
// Provides consistent visual placeholders during development.
const generatePlaceholderUrl = (text: string, width = 600, height = 300, bgColor = '25262B', textColor = '9CA3AF') => {
  // Encode the text to ensure it's URL-safe
  const encodedText = encodeURIComponent(text);
  // Return the formatted placeholder URL from placehold.co
  return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}/png?text=${encodedText}`;
};

/**
 * Dummy dataset for Entities.
 * This data serves as a placeholder for development and testing
 * before connecting to a real database or API.
 * It includes examples covering various categories defined in EntityCategory,
 * and demonstrates the parent-child relationship for entities with multiple branches.
 */
export const dummyEntities: Entity[] = [
  // === STANDALONE ENTITIES (No branches) ===
  {
    id: 'hosp-001',
    name: 'Accra Regional Hospital',
    category: 'Medical',
    subCategory: 'Hospital',
    description: 'Major public hospital offering comprehensive medical services.',
    contact: {
      phone: '+233 30 266 4661',
      website: 'https://examplehospital.gh' // Placeholder website
    },
    location: {
      addressLine1: 'Castle Road',
      city: 'Accra',
      stateProvince: 'Greater Accra',
      postalCode: 'GA-051-1323',
      country: 'Ghana',
      latitude: 5.5560,
      longitude: -0.1969
    },
    imageUrl: generatePlaceholderUrl('Medical - Hospital'),
    isVerified: true,
    openingHours: '24/7',
    tags: ['public hospital', 'general hospital', 'emergency', '24 hour']
  },
  {
    id: 'sec-001',
    name: 'Cantonments Police Station',
    category: 'Security',
    subCategory: 'Police Station',
    description: 'Local police station serving the Cantonments area.',
    contact: {
      phone: '+233 30 277 7592' // Example number
    },
    location: {
      addressLine1: 'Fourth Circular Rd',
      city: 'Accra',
      stateProvince: 'Greater Accra',
      postalCode: 'GA-078-0123',
      country: 'Ghana',
      latitude: 5.5734,
      longitude: -0.1705
    },
    emergencyDetails: {
      serviceType: 'police',
      emergencyNumber: '191' // Ghana Police emergency short code
    },
    // No imageUrl specified intentionally for variety
    isVerified: true,
    tags: ['ghana police service', 'law enforcement', 'cantonments']
  },
  {
    id: 'gov-001',
    name: 'Ministry of Communications',
    category: 'Government',
    subCategory: 'Ministry',
    description: 'Government ministry responsible for communication infrastructure and policy.',
    contact: {
      phone: '+233 30 268 4684',
      website: 'https://www.moc.gov.gh/'
    },
    location: {
      addressLine1: 'Abdul Diof Rd',
      city: 'Accra',
      stateProvince: 'Greater Accra',
      postalCode: 'GA-079-1234',
      country: 'Ghana',
      latitude: 5.5775,
      longitude: -0.1718
    },
    // No imageUrl specified
    isVerified: true,
    tags: ['government office', 'ministry', 'digitalisation']
  },
  {
    id: 'edu-001',
    name: 'University of Ghana',
    category: 'Education',
    subCategory: 'University',
    description: 'The oldest and largest public university in Ghana.',
    contact: {
      phone: '+233 30 250 0381',
      website: 'https://www.ug.edu.gh/'
    },
    location: {
      addressLine1: 'Legon Campus',
      city: 'Accra',
      stateProvince: 'Greater Accra',
      postalCode: 'LG-001-1111',
      country: 'Ghana',
      latitude: 5.6508,
      longitude: -0.1870
    },
    imageUrl: generatePlaceholderUrl('University of Ghana'),
    isVerified: true,
    tags: ['university', 'public university', 'legon', 'higher education']
  },
  {
    id: 'tran-001',
    name: 'VIP Bus Terminal - Circle',
    category: 'Transport',
    subCategory: 'Bus Terminal',
    description: 'Major terminal for VIP Jeoun Transport services.',
    contact: {
      phone: '+233 24 439 9111' // Example
    },
    location: {
      addressLine1: 'Kwame Nkrumah Circle',
      city: 'Accra',
      stateProvince: 'Greater Accra',
      postalCode: 'GA-053-1122',
      country: 'Ghana',
      latitude: 5.5670,
      longitude: -0.2065
    },
    isVerified: false, // Example of an unverified entity
    tags: ['bus station', 'vip bus', 'intercity bus', 'circle']
  },
  {
    id: 'util-001',
    name: 'ECG Office - Tema Community 1',
    category: 'Utility',
    subCategory: 'Electricity Company',
    description: 'Electricity Company of Ghana customer service office.',
    contact: {
      phone: '030 320 2479' // Example
    },
    location: {
      addressLine1: 'Hospital Road',
      city: 'Tema',
      stateProvince: 'Greater Accra',
      postalCode: 'GT-018-5544',
      country: 'Ghana',
      latitude: 5.6612,
      longitude: -0.0113
    },
    isVerified: true,
    tags: ['ecg', 'electricity', 'power', 'customer service', 'tema']
  },
  {
    id: 'ent-001',
    name: 'Silverbird Cinemas - Accra Mall',
    category: 'Entertainment',
    subCategory: 'Cinema',
    description: 'Multiplex cinema showing latest movie releases.',
    contact: {
      phone: '054 431 0140', // Example
      website: 'https://silverbirdcinemas.com/accra/'
    },
    location: {
      addressLine1: 'Accra Mall, Tetteh Quarshie Interchange',
      city: 'Accra',
      stateProvince: 'Greater Accra',
      postalCode: 'GA-420-1234',
      country: 'Ghana',
      latitude: 5.6178,
      longitude: -0.1680
    },
    imageUrl: generatePlaceholderUrl('Cinema'),
    openingHours: '10:00 AM - 10:00 PM',
    tags: ['movies', 'cinema', 'accra mall', 'films']
  },
  {
    id: 'ret-001',
    name: 'Shoprite - West Hills Mall',
    category: 'Retail',
    subCategory: 'Supermarket',
    description: 'Large supermarket chain offering groceries and household items.',
    contact: {
      phone: '+233 55 511 2233' // Placeholder phone
    },
    location: {
      addressLine1: 'West Hills Mall, Weija',
      city: 'Accra',
      stateProvince: 'Greater Accra',
      postalCode: 'GA-550-6789',
      country: 'Ghana',
      latitude: 5.5486,
      longitude: -0.3439
    },
    imageUrl: generatePlaceholderUrl('Shoprite'),
    isVerified: true,
    openingHours: '9:00 AM - 9:00 PM',
    tags: ['supermarket', 'grocery', 'melcom', 'west hills mall', 'shopping']
  },
  {
    id: 'acco-001',
    name: 'Labadi Beach Hotel',
    category: 'Accommodation',
    subCategory: 'Hotel',
    description: 'Luxury beachfront hotel with resort facilities.',
    contact: {
      phone: '+233 30 277 2501',
      website: 'https://www.labadibeachhotel.com/'
    },
    location: {
      addressLine1: 'No 1 La Bypass',
      city: 'Accra',
      stateProvince: 'Greater Accra',
      postalCode: 'LA-010-1212',
      country: 'Ghana',
      latitude: 5.5515,
      longitude: -0.1475
    },
    imageUrl: generatePlaceholderUrl('Labadi Beach Hotel'),
    isVerified: true,
    tags: ['hotel', 'luxury', 'beachfront', 'resort', 'pool']
  },
  {
    id: 'hosp-002',
    name: 'Nyaho Medical Centre - Airport Residential',
    category: 'Medical',
    subCategory: 'Clinic',
    description: 'Private medical facility offering specialist services.',
    contact: { phone: '030 277 5341', website: 'https://nyahomedical.com/' },
    location: { addressLine1: '35 Kofi Annan St', city: 'Accra', stateProvince: 'Greater Accra', postalCode: 'GA-100-1111', country: 'Ghana', latitude: 5.6082, longitude: -0.1795 },
    imageUrl: generatePlaceholderUrl('Medical Clinic'),
    isVerified: true, openingHours: '24/7',
    tags: ['private clinic', 'specialist', 'airport residential', '24 hour']
  },
  {
    id: 'sec-002',
    name: 'Ghana National Fire Service HQ',
    category: 'Security',
    subCategory: 'Fire Station',
    description: 'Headquarters of the national fire service.',
    contact: { phone: '030 277 2446' },
    location: { addressLine1: 'Ring Road Central', city: 'Accra', stateProvince: 'Greater Accra', postalCode: 'GA-052-2222', country: 'Ghana', latitude: 5.5705, longitude: -0.1988 },
    emergencyDetails: { serviceType: 'fire', emergencyNumber: '192' }, isVerified: true,
    tags: ['fire brigade', 'emergency service', 'gnfs']
  },
  {
    id: 'tran-002',
    name: 'Kotoka International Airport (ACC)',
    category: 'Transport',
    subCategory: 'Airport',
    description: "Ghana's main international airport.",
    contact: { phone: '030 255 0612', website: 'https://www.gacl.com.gh/' },
    location: { addressLine1: 'Airport Rd', city: 'Accra', stateProvince: 'Greater Accra', postalCode: 'GA-150-3333', country: 'Ghana', latitude: 5.6052, longitude: -0.1667 },
    imageUrl: generatePlaceholderUrl('Airport (ACC)'),
    isVerified: true,
    tags: ['airport', 'flights', 'international travel', 'domestic travel']
  },
  {
    id: 'ret-002',
    name: 'Melcom - Tema Community 25 Mall',
    category: 'Retail',
    subCategory: 'Department Store',
    description: 'Department store selling a wide range of goods.',
    contact: { phone: '030 298 1818' }, // Example
    location: { addressLine1: 'Tema Community 25 Mall', city: 'Tema', stateProvince: 'Greater Accra', postalCode: 'GT-310-4444', country: 'Ghana', latitude: 5.7555, longitude: -0.0101 },
    imageUrl: generatePlaceholderUrl('Melcom'),
    openingHours: '9:00 AM - 8:00 PM',
    tags: ['department store', 'shopping', 'melcom', 'tema', 'mall']
  },
  {
    id: 'food-003',
    name: 'Buka Restaurant - Osu',
    category: 'Food',
    subCategory: 'Restaurant',
    description: 'Upscale restaurant offering West African cuisine.',
    contact: { phone: '024 484 2464', website: 'https://bukarestaurant.com/' }, // Example
    location: { addressLine1: '10th Ln', city: 'Accra', stateProvince: 'Greater Accra', postalCode: 'GA-027-5555', country: 'Ghana', latitude: 5.5601, longitude: -0.1888 },
    imageUrl: generatePlaceholderUrl('Buka Restaurant'),
    isVerified: true, openingHours: '12:00 PM - 11:00 PM',
    tags: ['west african food', 'nigerian food', 'ghanaian food', 'osu', 'fine dining']
  },
  {
    id: 'ent-002',
    name: 'National Theatre of Ghana',
    category: 'Entertainment',
    subCategory: 'Theatre',
    description: 'Venue for performing arts and cultural events.',
    contact: { phone: '030 268 3197', website: 'https://nationaltheatre.gov.gh/' },
    location: { addressLine1: 'South Liberia Road', city: 'Accra', stateProvince: 'Greater Accra', postalCode: 'GA-050-6666', country: 'Ghana', latitude: 5.5519, longitude: -0.1970 },
    imageUrl: generatePlaceholderUrl('National Theatre'),
    isVerified: true,
    tags: ['theatre', 'performing arts', 'concerts', 'culture', 'events']
  },
  {
    id: 'util-002',
    name: 'Ghana Water Company - Accra East',
    category: 'Utility',
    subCategory: 'Water Company',
    description: 'Regional office for Ghana Water Company.',
    contact: { phone: '030 222 1824' }, // Example
    location: { addressLine1: 'Near Gulf House', city: 'Accra', stateProvince: 'Greater Accra', postalCode: 'GA-180-7777', country: 'Ghana', latitude: 5.5645, longitude: -0.1788 },
    isVerified: true,
    tags: ['gwcl', 'water bill', 'customer service']
  },
  {
    id: 'acco-002',
    name: 'Kempinski Hotel Gold Coast City',
    category: 'Accommodation',
    subCategory: 'Hotel',
    description: 'Luxury 5-star hotel in central Accra.',
    contact: { phone: '024 243 6000', website: 'https://www.kempinski.com/en/accra/hotel-gold-coast-city/' },
    location: { addressLine1: 'PMB 66, Ministries', city: 'Accra', stateProvince: 'Greater Accra', postalCode: 'GA-050-8888', country: 'Ghana', latitude: 5.5565, longitude: -0.1995 },
    imageUrl: generatePlaceholderUrl('Kempinski Hotel'), isVerified: true,
    tags: ['hotel', '5 star', 'luxury', 'spa', 'pool', 'ministries area']
  },
  {
    id: 'othr-001',
    name: 'Accra Zoo',
    category: 'Other',
    subCategory: 'Zoo',
    description: 'Small zoo located near Achimota Forest.',
    contact: { phone: '020 811 8788' }, // Example
    location: { addressLine1: 'Achimota Forest Area', city: 'Accra', stateProvince: 'Greater Accra', postalCode: 'AC-001-9999', country: 'Ghana', latitude: 5.6394, longitude: -0.2204 },
    imageUrl: generatePlaceholderUrl('Accra Zoo'),
    openingHours: '9:00 AM - 5:00 PM',
    tags: ['zoo', 'animals', 'wildlife', 'achimota']
  },

  // === PARENT ENTITY: KFC ===
  // Represents the overall KFC brand in Ghana.
  {
    id: 'company-kfc',
    name: 'KFC',
    category: 'Food',
    subCategory: 'Fast Food Restaurant',
    description: 'Popular global fast-food chain specializing in fried chicken.',
    contact: {
      website: 'https://africa.kfc.com/ghana/',
      phone: '+233 24 433 0000', // Main customer service number
    },
    // Location can represent HQ or a prominent branch
    location: {
      addressLine1: 'Oxford Street, Osu',
      city: 'Accra',
      stateProvince: 'Greater Accra',
      postalCode: 'GA-026-5432',
      country: 'Ghana',
      latitude: 5.5592,
      longitude: -0.1899
    },
    imageUrl: generatePlaceholderUrl('KFC Ghana'),
    isVerified: true,
    tags: ['fast food', 'chicken', 'takeaway', 'delivery'],
    isParentEntity: true, // Mark as a parent entity
    branches: ['kfc-osu', 'kfc-spintex', 'kfc-accra-mall'] // List of branch IDs
  },

  // === KFC BRANCHES ===
  // Individual KFC locations linked to the parent entity.
  {
    id: 'kfc-osu',
    parentId: 'company-kfc', // Link to the parent company
    name: 'KFC - Osu', // Specific branch name
    branchName: 'Osu', // Short name for display/search
    category: 'Food',
    subCategory: 'Fast Food Restaurant',
    description: 'KFC branch on Oxford Street in Osu.',
    contact: {
      phone: '+233 24 433 0000' // Branch-specific number (can be same as parent if needed)
    },
    location: {
      addressLine1: 'Oxford Street',
      city: 'Accra',
      stateProvince: 'Greater Accra',
      postalCode: 'GA-026-5432',
      country: 'Ghana',
      latitude: 5.5592,
      longitude: -0.1899
    },
    imageUrl: generatePlaceholderUrl('KFC Osu Branch'),
    isVerified: true,
    openingHours: '10:00 AM - 11:00 PM',
    tags: ['fast food', 'chicken', 'osu', 'takeaway', 'delivery'] // Branch specific tags can differ
  },
  {
    id: 'kfc-spintex',
    parentId: 'company-kfc',
    name: 'KFC - Spintex',
    branchName: 'Spintex',
    category: 'Food',
    subCategory: 'Fast Food Restaurant',
    description: 'KFC branch located on Spintex Road.',
    contact: {
      phone: '+233 55 830 5886' // Example branch number
    },
    location: {
      addressLine1: 'Spintex Rd, Near Action Chapel',
      city: 'Accra',
      stateProvince: 'Greater Accra',
      postalCode: 'GA-351-1122',
      country: 'Ghana',
      latitude: 5.6145,
      longitude: -0.1185
    },
    imageUrl: generatePlaceholderUrl('KFC Spintex Branch'),
    isVerified: true,
    openingHours: '10:00 AM - 10:30 PM',
    tags: ['fast food', 'chicken', 'spintex', 'takeaway', 'delivery', 'drive-thru'] // Added 'drive-thru' tag
  },
  {
    id: 'kfc-accra-mall',
    parentId: 'company-kfc',
    name: 'KFC - Accra Mall',
    branchName: 'Accra Mall',
    category: 'Food',
    subCategory: 'Fast Food Restaurant',
    description: 'KFC branch inside Accra Mall food court.',
    contact: {
      phone: '+233 24 433 0001' // Example branch number
    },
    location: {
      addressLine1: 'Accra Mall Food Court, Tetteh Quarshie Interchange',
      city: 'Accra',
      stateProvince: 'Greater Accra',
      postalCode: 'GA-420-1235',
      country: 'Ghana',
      latitude: 5.6180,
      longitude: -0.1682
    },
    imageUrl: generatePlaceholderUrl('KFC Accra Mall Branch'),
    isVerified: true,
    openingHours: '10:00 AM - 10:00 PM (Mall Hours)',
    tags: ['fast food', 'chicken', 'accra mall', 'food court', 'takeaway']
  },

  // === PARENT ENTITY: GCB BANK ===
  // Represents the GCB Bank brand.
  {
    id: 'company-gcb',
    name: 'GCB Bank',
    category: 'Financial',
    subCategory: 'Bank',
    description: 'One of Ghana\'s largest commercial banks with branches nationwide.',
    contact: {
      phone: '+233 30 225 5100', // Main customer service number
      website: 'https://www.gcbbank.com.gh/'
    },
    location: { // HQ Location
      addressLine1: 'High Street, Accra Central',
      city: 'Accra',
      stateProvince: 'Greater Accra',
      postalCode: 'GA-030-1234',
      country: 'Ghana',
      latitude: 5.5505,
      longitude: -0.2057
    },
    imageUrl: generatePlaceholderUrl('GCB Bank Ghana'),
    isVerified: true,
    tags: ['bank', 'financial services', 'atm'], // General tags for the brand
    isParentEntity: true,
    branches: ['gcb-legon', 'gcb-osu'] // IDs of associated branches
  },

  // === GCB BANK BRANCHES ===
  {
    id: 'gcb-legon',
    parentId: 'company-gcb',
    name: 'GCB Bank - Legon',
    branchName: 'Legon',
    category: 'Financial',
    subCategory: 'Bank',
    description: 'GCB Bank branch near the University of Ghana.',
    contact: {
      phone: '+233 30 250 0052' // Legon branch number
    },
    location: {
      addressLine1: 'University of Ghana Campus',
      city: 'Accra',
      stateProvince: 'Greater Accra',
      postalCode: 'LG-001-9876',
      country: 'Ghana',
      latitude: 5.6508,
      longitude: -0.1870
    },
    imageUrl: generatePlaceholderUrl('GCB Bank Legon Branch'),
    isVerified: true,
    openingHours: '8:30 AM - 4:00 PM (Mon-Fri)',
    tags: ['bank', 'atm', 'gcb', 'legon', 'campus'] // Branch specific tags
  },
  {
    id: 'gcb-osu',
    parentId: 'company-gcb',
    name: 'GCB Bank - Osu',
    branchName: 'Osu',
    category: 'Financial',
    subCategory: 'Bank',
    description: 'GCB Bank branch in Osu.',
    contact: {
      phone: '+233 30 277 3068' // Osu branch number
    },
    location: {
      addressLine1: 'Oxford Street, Opposite Papaye',
      city: 'Accra',
      stateProvince: 'Greater Accra',
      postalCode: 'GA-026-5433',
      country: 'Ghana',
      latitude: 5.5590,
      longitude: -0.1895
    },
    imageUrl: generatePlaceholderUrl('GCB Bank Osu Branch'),
    isVerified: true,
    openingHours: '8:30 AM - 4:00 PM (Mon-Fri)',
    tags: ['bank', 'atm', 'gcb', 'osu', 'oxford street']
  },

  // === PARENT ENTITY: PAPAYE FAST FOODS ===
  // Represents the Papaye brand.
  {
    id: 'company-papaye',
    name: 'Papaye Fast Foods',
    category: 'Food',
    subCategory: 'Restaurant',
    description: 'Popular Ghanaian fast food chain known for grilled chicken.',
    contact: {
      phone: '+233 30 277 3714', // Main office number
      website: 'https://www.papayeghana.com/' // Example website
    },
    location: { // HQ/Flagship branch location
      addressLine1: 'Oxford Street, Osu',
      city: 'Accra',
      stateProvince: 'Greater Accra',
      postalCode: 'GA-026-5434',
      country: 'Ghana',
      latitude: 5.5595,
      longitude: -0.1900
    },
    imageUrl: generatePlaceholderUrl('Papaye Ghana'),
    isVerified: true,
    tags: ['fast food', 'ghanaian food', 'chicken', 'takeaway'], // General brand tags
    isParentEntity: true,
    branches: ['papaye-osu', 'papaye-spintex'] // IDs of branches
  },

  // === PAPAYE BRANCHES ===
  {
    id: 'papaye-spintex',
    parentId: 'company-papaye',
    name: 'Papaye Fast Foods - Spintex',
    branchName: 'Spintex',
    category: 'Food',
    subCategory: 'Restaurant',
    description: 'Papaye Fast Foods branch on Spintex Road.',
    contact: {
      phone: '+233 30 281 5111' // Spintex branch number
    },
    location: {
      addressLine1: 'Spintex Road',
      city: 'Accra',
      stateProvince: 'Greater Accra',
      postalCode: 'GA-350-9988',
      country: 'Ghana',
      latitude: 5.6150,
      longitude: -0.1190
    },
    imageUrl: generatePlaceholderUrl('Papaye Spintex Branch'),
    isVerified: true,
    openingHours: '10:00 AM - 10:00 PM',
    tags: ['fast food', 'ghanaian food', 'chicken', 'spintex', 'takeaway']
  },
  {
    id: 'papaye-osu',
    parentId: 'company-papaye',
    name: 'Papaye Fast Foods - Osu',
    branchName: 'Osu',
    category: 'Food',
    subCategory: 'Restaurant',
    description: 'Papaye Fast Foods flagship branch located on Oxford Street, Osu.',
    contact: {
      phone: '+233 30 277 3715' // Osu branch number
    },
    location: {
      addressLine1: 'Oxford Street, Osu',
      city: 'Accra',
      stateProvince: 'Greater Accra',
      postalCode: 'GA-026-5434',
      country: 'Ghana',
      latitude: 5.5595,
      longitude: -0.1900
    },
    imageUrl: generatePlaceholderUrl('Papaye Osu Branch'),
    isVerified: true,
    openingHours: '10:00 AM - 11:00 PM',
    tags: ['fast food', 'ghanaian food', 'chicken', 'osu', 'oxford street', 'takeaway']
  },

]; // End of dummyEntities array