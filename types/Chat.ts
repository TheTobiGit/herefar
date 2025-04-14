import type { Entity } from './Entity';

/**
 * Represents a single message in the chat interface.
 * This will likely evolve as V2 features are added.
 */
export interface Message {
  /**
   * The text content of the message.
   */
  text: string;
  /**
   * Flag indicating if the message is from the user (true) or the AI (false).
   */
  isUser: boolean;
  /**
   * Timestamp of the message (e.g., "HH:MM AM/PM").
   */
  time: string;
  /**
   * Optional flag indicating if this message contains place results.
   */
  hasPlaceResults?: boolean;
  /**
   * Optional array of place entities to display.
   */
  placeResults?: Entity[];
  /**
   * Optional flag for messages displaying a single, expanded place card.
   */
  isExpandedPlace?: boolean;
  /**
   * Optional flag for messages displaying a company and its branches.
   */
  isCompanyWithBranches?: boolean;
  /**
   * Optional parent company entity, used when displaying branches.
   */
  companyEntity?: Entity;
} 