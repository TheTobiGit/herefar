/**
 * Represents the type or severity of an update.
 */
export type UpdateType = 'emergency' | 'news' | 'important_info';

/**
 * Represents a time-sensitive update, alert, or news item.
 * Intended for national or regional broadcast.
 */
export interface Update {
  /**
   * Unique identifier for the update.
   */
  id: string;
  /**
   * The title or headline of the update.
   */
  title: string;
  /**
   * The main content or body of the update.
   */
  content: string;
  /**
   * The type or category of the update.
   */
  type: UpdateType;
  /**
   * The date and time when the update was published.
   * Using ISO 8601 format string for standardization.
   */
  publishedAt: string; // ISO 8601 date string
  /**
   * Optional source of the update (e.g., "National Disaster Management Organisation").
   */
  source?: string;
  /**
   * Optional link for more details.
   */
  moreInfoUrl?: string;
} 