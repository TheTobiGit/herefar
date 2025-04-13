// data/entities.ts
import type { Entity } from '~/types/Entity';

/**
 * Dummy dataset for Entities.
 * This data is used for development and testing purposes before connecting to a real data source.
 * It includes examples covering various categories defined in EntityCategory.
 */
export const dummyEntities: Entity[] = [
  {
    id: 'hosp-001',
    name: 'Accra Regional Hospital',
    category: 'Medical',
    subCategory: 'Hospital',
    description: 'Major public hospital offering comprehensive medical services.',
    contact: {
      phone: '+233 30 266 4661',
      website: 'https://examplehospital.gh' // Placeholder URL
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
    imageUrl: '/images/hospital-placeholder.jpg', // Example path, requires image file
    isVerified: true,
    openingHours: '24/7'
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
    isVerified: true
  },
  {
    id: 'food-001',
    name: 'KFC - Osu Oxford Street',
    category: 'Food',
    subCategory: 'Fast Food Restaurant',
    description: 'Popular fast-food chain specializing in fried chicken.',
    contact: {
      phone: '+233 24 433 0000', // Example verified number
      website: 'https://africa.kfc.com/ghana/'
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
    imageUrl: '/images/kfc-placeholder.jpg', // Example path
    isVerified: true,
    openingHours: '10:00 AM - 11:00 PM'
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
    isVerified: true
  },
  {
    id: 'fin-001',
    name: 'GCB Bank - Legon Branch',
    category: 'Financial',
    subCategory: 'Bank',
    description: 'Branch of Ghana Commercial Bank near the University of Ghana.',
    contact: {
      phone: '+233 30 250 0052' // Example number
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
    openingHours: '8:30 AM - 4:00 PM (Mon-Fri)'
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
    imageUrl: '/images/ug-placeholder.jpg', // Example path
    isVerified: true
  }
]; 