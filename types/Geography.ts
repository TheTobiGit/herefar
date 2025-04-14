/**
 * Defines the 16 administrative regions of Ghana.
 * Based on information from:
 * - https://www.ghanamissionun.org/map-regions-in-ghana/
 * - https://mfa.gov.gh/index.php/about-ghana/regions/
 */
export type GhanaRegion =
  | 'Ahafo'
  | 'Ashanti'
  | 'Bono East'
  | 'Brong Ahafo' // Note: Still listed on MFA site, kept for potential legacy data
  | 'Central'
  | 'Eastern'
  | 'Greater Accra'
  | 'North East'
  | 'Northern'
  | 'Oti'
  | 'Savannah'
  | 'Upper East'
  | 'Upper West'
  | 'Volta'
  | 'Western'
  | 'Western North';

/**
 * A map associating each Ghana region with its capital city.
 */
export const ghanaRegionCapitals: Record<GhanaRegion, string> = {
  'Ahafo': 'Goaso',
  'Ashanti': 'Kumasi',
  'Bono East': 'Techiman',
  'Brong Ahafo': 'Sunyani',
  'Central': 'Cape Coast',
  'Eastern': 'Koforidua',
  'Greater Accra': 'Accra',
  'North East': 'Nalerigu',
  'Northern': 'Tamale',
  'Oti': 'Dambai',
  'Savannah': 'Damongo',
  'Upper East': 'Bolgatanga',
  'Upper West': 'Wa',
  'Volta': 'Ho',
  'Western': 'Sekondi-Takoradi',
  'Western North': 'Sefwi Wiawso',
}; 