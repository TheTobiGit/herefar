import type { GhanaRegion } from './Geography'; // Import GhanaRegion type

/**
 * Represents the broad categories an entity can belong to.
 * Using a string union for flexibility and encompassing various entity types.
 */
export type EntityCategory = 
  | 'Medical'       // Hospitals, Clinics, Pharmacies
  | 'Security'      // Police Stations, Fire Service, Private Security
  | 'Utility'       // Water, Electricity, Telecom providers
  | 'Transport'     // Bus Stations, Train Stations, Airports, Ride-sharing hubs
  | 'Food'          // Restaurants, Cafes, Grocery Stores
  | 'Entertainment' // Cinemas, Parks, Event Venues
  | 'Financial'     // Banks, ATMs, Forex Bureaus
  | 'Government'    // Ministries, Agencies, Local Assemblies
  | 'Education'     // Schools, Universities, Libraries
  | 'Accommodation' // Hotels, Guesthouses
  | 'Retail'        // Shops, Malls
  | 'Religious'     // Churches, Mosques, Temples
  | 'Other';        // Fallback for uncategorized entities

/**
 * Defines specific sub-categories within the 'Medical' category.
 */
export type MedicalSubCategory =
  | 'Hospital'
  | 'Clinic'
  | 'Pharmacy'
  | 'Laboratory'
  | 'Dental';

/**
 * Defines specific sub-categories within the 'Security' category.
 */
export type SecuritySubCategory =
  | 'Police Station'
  | 'Fire Service'
  | 'Private Security'
  | 'Military Post';

/**
 * Defines specific sub-categories within the 'Utility' category.
 */
export type UtilitySubCategory =
  | 'Water Provider'
  | 'Electricity Provider'
  | 'Telecom Provider'
  | 'Internet Service';

/**
 * Defines specific sub-categories within the 'Transport' category.
 */
export type TransportSubCategory =
  | 'Bus Station'
  | 'Train Station'
  | 'Airport'
  | 'Ride-Sharing Hub'
  | 'Port/Harbor';

/**
 * Defines specific sub-categories within the 'Food' category.
 */
export type FoodSubCategory =
  | 'Restaurant'
  | 'Cafe'
  | 'Grocery Store'
  | 'Food Vendor';

/**
 * Defines specific sub-categories within the 'Entertainment' category.
 */
export type EntertainmentSubCategory =
  | 'Cinema'
  | 'Park'
  | 'Event Venue'
  | 'Sports Facility';

/**
 * Defines specific sub-categories within the 'Financial' category.
 */
export type FinancialSubCategory =
  | 'Bank'
  | 'ATM'
  | 'Forex Bureau'
  | 'Mobile Money Agent';

/**
 * Defines specific sub-categories within the 'Government' category.
 */
export type GovernmentSubCategory =
  | 'Ministry'
  | 'Agency'
  | 'Local Assembly'
  | 'Court';

/**
 * Defines specific sub-categories within the 'Education' category.
 */
export type EducationSubCategory =
  | 'School'
  | 'University'
  | 'Library'
  | 'Vocational Center';

/**
 * Defines specific sub-categories within the 'Accommodation' category.
 */
export type AccommodationSubCategory =
  | 'Hotel'
  | 'Guesthouse'
  | 'Hostel'
  | 'Resort';

/**
 * Defines specific sub-categories within the 'Retail' category.
 */
export type RetailSubCategory =
  | 'Shop'
  | 'Mall'
  | 'Market'
  | 'Supermarket';

/**
 * Defines specific sub-categories within the 'Religious' category.
 */
export type ReligiousSubCategory =
  | 'Church'
  | 'Mosque'
  | 'Shrine'
  | 'Temple';

/**
 * Defines specific sub-categories within the 'Other' category.
 */
export type OtherSubCategory =
  | 'Community Center'
  | 'Post Office'
  | 'Cemetery'
  | 'Unclassified';

/**
 * Union type representing all possible sub-categories.
 * Useful for type hinting the subCategory field in the Entity interface.
 */
export type AnySubCategory =
  | MedicalSubCategory
  | SecuritySubCategory
  | UtilitySubCategory
  | TransportSubCategory
  | FoodSubCategory
  | EntertainmentSubCategory
  | FinancialSubCategory
  | GovernmentSubCategory
  | EducationSubCategory
  | AccommodationSubCategory
  | RetailSubCategory
  | ReligiousSubCategory
  | OtherSubCategory;

/**
 * Details specific to Medical entities.
 */
export interface MedicalEntityDetails {
  bedCount?: number | null;
  specializations?: string | string[];
  offersEmergencyServices?: boolean;
}

/**
 * Details specific to Security entities.
 */
export interface SecurityEntityDetails {
  serviceType?: string; // Consider linking to SecuritySubCategory if appropriate
  responseTime?: string | null; // e.g., "10 minutes"
}

/**
 * Details specific to Utility entities.
 */
export interface UtilityEntityDetails {
  providerName?: string; // e.g., "MTN Ghana"
  serviceArea?: string; // e.g., "Kumasi Metro"
}

/**
 * Details specific to Transport entities.
 */
export interface TransportEntityDetails {
  routes?: string | string[]; // e.g., "Accra-Kumasi"
  capacity?: number | null; // e.g., 500 (daily passengers)
}

/**
 * Details specific to Food entities.
 */
export interface FoodEntityDetails {
  cuisineType?: string; // e.g., "Ghanaian", "Continental"
  deliveryAvailable?: boolean;
}

/**
 * Details specific to Entertainment entities.
 */
export interface EntertainmentEntityDetails {
  eventTypes?: string | string[]; // e.g., "Movies", "Live Music"
  ticketPrice?: string | null; // e.g., "GHS 30", "Free Entry"
}

/**
 * Details specific to Financial entities.
 */
export interface FinancialEntityDetails {
  servicesOffered?: string | string[]; // e.g., ["Loans", "Savings Account", "Investment"]
  atmNetwork?: string | null; // e.g., "Visa", "Mastercard", "gh-link"
}

/**
 * Details specific to Government entities.
 */
export interface GovernmentEntityDetails {
  parentDepartment?: string; // e.g., "Ministry of Finance"
  servicesProvided?: string | string[]; // e.g., "Tax Filing", "Passport Application"
}

/**
 * Details specific to Education entities.
 */
export interface EducationEntityDetails {
  gradeLevels?: string | string[]; // e.g., "Primary", "JHS", "SHS", "Tertiary"
  enrollment?: number | null;
}

/**
 * Details specific to Accommodation entities.
 */
export interface AccommodationEntityDetails {
  roomCount?: number | null;
  amenities?: string | string[]; // e.g., ["Wi-Fi", "Pool", "Gym"]
}

/**
 * Details specific to Retail entities.
 */
export interface RetailEntityDetails {
  storeType?: string; // e.g., "Electronics", "Clothing", "Supermarket"
  brandsCarried?: string | string[]; // e.g., ["Samsung", "Apple", "LG"]
}

/**
 * Details specific to Religious entities.
 */
export interface ReligiousEntityDetails {
  denomination?: string | null; // e.g., "Catholic", "Methodist", "Sunni"
  serviceTimes?: string; // e.g., "Sundays 9AM & 11AM", "Fridays 1PM"
}

/**
 * Union type for all possible category-specific details.
 */
export type AnyCategoryDetails =
  | MedicalEntityDetails
  | SecurityEntityDetails
  | UtilityEntityDetails
  | TransportEntityDetails
  | FoodEntityDetails
  | EntertainmentEntityDetails
  | FinancialEntityDetails
  | GovernmentEntityDetails
  | EducationEntityDetails
  | AccommodationEntityDetails
  | RetailEntityDetails
  | ReligiousEntityDetails;

/**
 * Represents a physical place, organization, or service (V2 Definition).
 * This is the core data model for most searchable items in the app.
 */
export interface Entity {
  /**
   * Unique identifier for the entity (UUID or Integer).
   * @example "ent-12345", 98765
   */
  id: string | number; // Using string | number for flexibility

  /**
   * Links to the parent entity's ID for branches (nullable for standalone/parent entities).
   * @example "ent-parent-678", null
   */
  parentId?: string | number | null;

  /**
   * The primary display name of the entity.
   * @example "Bolt Accra", "Korle-Bu Teaching Hospital"
   */
  name: string;

  /**
   * The broad category the entity belongs to.
   * @example "Transport", "Medical"
   */
  category: EntityCategory;

  /**
   * Specific type within the category.
   * @example "Ride-Sharing", "Hospital"
   */
  subCategory?: AnySubCategory;

  /**
   * Array of descriptive keywords for enhanced search.
   * @example ["24-hour", "mobile-app"], ["emergency", "public"]
   */
  tags?: string[];

  /**
   * Full physical address.
   * @example "Spintex Road, Accra, Greater Accra Region, Ghana"
   */
  address: string;

  /**
   * Geographic latitude coordinate.
   * @example 5.6281
   */
  latitude?: number;

  /**
   * Geographic longitude coordinate.
   * @example -0.1752
   */
  longitude?: number;

  /**
   * The administrative region in Ghana the entity belongs to.
   * @example "Greater Accra"
   */
  region: GhanaRegion;

  /**
   * Primary contact phone number(s). Could be an array if multiple primary numbers exist.
   * Stored as string to accommodate various formats.
   * @example "+233 302 123 456", ["+233 302 123 456", "+233 302 987 654"]
   */
  phoneNumber?: string | string[];

  /**
   * Contact email address (nullable).
   * @example "support@bolt.eu", null
   */
  email?: string | null;

  /**
   * Official website URL (nullable).
   * @example "https://bolt.eu/en-gh/", null
   */
  website?: string | null;

  /**
   * Hours of operation (text description).
   * @example "Mon-Fri 9:00 AM - 5:00 PM", "24/7"
   */
  operatingHours?: string;

  /**
   * Array of URLs pointing to photos of the entity (stored externally).
   * @example ["https://herefar.s3.com/korlebu1.jpg", "https://herefar.s3.com/korlebu_entrance.jpg"]
   */
  photos?: string[];

  /**
   * Indicates if the entity's data is officially verified.
   * @example true, false
   */
  verifiedStatus?: boolean;

  /**
   * Map of social media platform names to profile URLs/handles.
   * @example { "twitter": "@KorleBuHospital", "facebook": "https://facebook.com/KorleBuTH" }
   */
  socialMediaLinks?: Record<string, string>;

  /**
   * Timestamp indicating when the entity data was last updated/verified.
   * @example "2025-04-01T10:00:00Z"
   */
  lastUpdated?: string; // Using string for ISO 8601 format compatibility
  
  /**
   * Optional field containing details specific to the entity's category.
   */
  categoryDetails?: AnyCategoryDetails;
  
  // --- Fields retained for Parent/Branch Structure (Consider if needed alongside parentId) ---
  
  /**
   * Optional: Contains IDs of child branch entities. Useful for parent entities.
   * Consider if `parentId` lookup is sufficient.
   * @deprecated Use `parentId` lookup on other entities instead if possible.
   */
  branches?: (string | number)[];
  
  /**
   * Optional: For branch entities, specifies the branch location name (e.g., "Osu", "Spintex").
   * Might be redundant if included in the main `name` field (e.g., "KFC - Osu Branch").
   */
  branchName?: string;
  
  /**
   * Optional: Flag indicating if this entity represents a brand/organization (parent) rather than a specific location.
   * @deprecated Could potentially be inferred if `parentId` is null and `branches` exist (or via category/subCategory).
   */
  isParentEntity?: boolean;
} 