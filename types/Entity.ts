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
  | 'Other';        // Fallback for uncategorized entities

/**
 * Represents contact information for an entity.
 */
export interface ContactInfo {
  /**
   * Primary phone number, potentially verified to avoid scams.
   * Stored as a string to accommodate various formats (+country code, extensions).
   */
  phone?: string; 
  /**
   * Secondary or alternative phone numbers.
   */
  additionalPhones?: string[];
  /**
   * Official website URL.
   */
  website?: string;
  /**
   * Email address.
   */
  email?: string;
}

/**
 * Represents the geographical location of an entity.
 */
export interface Location {
  /**
   * Street address line 1.
   */
  addressLine1: string;
  /**
   * Street address line 2 (optional).
   */
  addressLine2?: string;
  /**
   * City or town.
   */
  city: string;
  /**
   * State, province, or region.
   */
  stateProvince: string;
  /**
   * Postal code.
   */
  postalCode: string;
  /**
   * Country.
   */
  country: string;
  /**
   * Latitude coordinate.
   */
  latitude?: number;
  /**
   * Longitude coordinate.
   */
  longitude?: number;
}

/**
 * Represents a physical place, organization, or service.
 * This is the core data model for most searchable items in the app.
 */
export interface Entity {
  /**
   * Unique identifier for the entity.
   */
  id: string; 
  /**
   * The official name of the entity (e.g., "KFC - Osu Branch", "Accra Regional Hospital").
   */
  name: string;
  /**
   * The broad category the entity belongs to.
   * Helps in filtering and searching.
   */
  category: EntityCategory;
  /**
   * Optional sub-category for more specific classification (e.g., 'Hospital' within 'Medical').
   */
  subCategory?: string;
  /**
   * A brief description of the entity.
   */
  description?: string;
  /**
   * Contact details for the entity.
   */
  contact: ContactInfo;
  /**
   * Physical location details.
   */
  location: Location;
  /**
   * Specific details for emergency services (relevant if category is 'Security' or 'Medical').
   */
  emergencyDetails?: {
    /**
     * Type of emergency service (e.g., 'police', 'fire', 'ambulance').
     */
    serviceType: string;
    /**
     * Direct emergency contact number.
     */
    emergencyNumber: string;
  };
  /**
   * URL to an image/logo for the entity.
   * To be used with <NuxtImage>.
   */
  imageUrl?: string;
  /**
   * Flag indicating if the contact information is verified.
   * Important for preventing scams (e.g., for food delivery calls).
   */
  isVerified?: boolean;
  /**
   * Optional opening hours information.
   * Could be a string representation or a more structured object later.
   */
  openingHours?: string; 
} 