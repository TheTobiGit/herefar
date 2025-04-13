import type { EntityCategory } from '~/types/Entity';

/**
 * Composable providing helper functions for entity category styling.
 * Encapsulates the logic for determining icons and colors based on category.
 */
export const useCategoryStyles = () => {
  
  /**
   * Gets the appropriate Heroicon name for a given entity category.
   * 
   * @param category - The entity category.
   * @returns The string name of the Heroicon.
   */
  const getCategoryIcon = (category: EntityCategory): string => {
    const iconMap: Record<EntityCategory, string> = {
      Medical: 'heroicons:heart-solid',
      Security: 'heroicons:shield-check-solid',
      Utility: 'heroicons:bolt-solid',
      Transport: 'heroicons:truck-solid',
      Food: 'heroicons:cake-solid',
      Entertainment: 'heroicons:film-solid',
      Financial: 'heroicons:banknotes-solid',
      Government: 'heroicons:building-office-solid',
      Education: 'heroicons:academic-cap-solid',
      Accommodation: 'heroicons:home-solid',
      Retail: 'heroicons:shopping-bag-solid',
      Other: 'heroicons:question-mark-circle-solid'
    };
    
    return iconMap[category] || iconMap.Other;
  };
  
  /**
   * Gets the appropriate Tailwind background color class for a given entity category.
   * Uses semi-transparent dark shades.
   * 
   * @param category - The entity category.
   * @returns The Tailwind background color class string.
   */
  const getCategoryBgColor = (category: EntityCategory): string => {
    const colorMap: Record<EntityCategory, string> = {
      Medical: 'bg-red-950/30',
      Security: 'bg-blue-950/30',
      Utility: 'bg-yellow-950/30',
      Transport: 'bg-green-950/30',
      Food: 'bg-orange-950/30',
      Entertainment: 'bg-purple-950/30',
      Financial: 'bg-emerald-950/30',
      Government: 'bg-sky-950/30',
      Education: 'bg-indigo-950/30',
      Accommodation: 'bg-rose-950/30',
      Retail: 'bg-amber-950/30',
      Other: 'bg-gray-800/30'
    };
    
    return colorMap[category] || colorMap.Other;
  };
  
  /**
   * Gets the appropriate Tailwind text color class for a given entity category.
   * Uses brighter accent colors.
   * 
   * @param category - The entity category.
   * @returns The Tailwind text color class string.
   */
  const getCategoryTextColor = (category: EntityCategory): string => {
    const colorMap: Record<EntityCategory, string> = {
      Medical: 'text-red-400',
      Security: 'text-blue-400',
      Utility: 'text-yellow-400',
      Transport: 'text-green-400',
      Food: 'text-orange-400',
      Entertainment: 'text-purple-400',
      Financial: 'text-emerald-400',
      Government: 'text-sky-400',
      Education: 'text-indigo-400',
      Accommodation: 'text-rose-400',
      Retail: 'text-amber-400',
      Other: 'text-gray-400'
    };
    
    return colorMap[category] || colorMap.Other;
  };

  // Return the functions so they can be used
  return {
    getCategoryIcon,
    getCategoryBgColor,
    getCategoryTextColor
  };
}; 