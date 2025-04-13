// data/updates.ts
import type { Update } from '~/types/Update';

/**
 * Dummy dataset for Updates.
 * This data represents sample emergency alerts, news, or important information.
 */
export const dummyUpdates: Update[] = [
  {
    id: 'upd-001',
    title: 'Heavy Rainfall Expected - Flood Warning',
    content: 'The Ghana Meteorological Agency warns of heavy rainfall across southern Ghana over the next 48 hours. Residents in low-lying areas are advised to take precautions against potential flooding.',
    type: 'emergency',
    publishedAt: '2024-07-27T08:00:00Z', // Example ISO 8601 timestamp
    source: 'Ghana Meteorological Agency',
    moreInfoUrl: 'https://www.meteo.gov.gh/gmet/' // Placeholder
  },
  {
    id: 'upd-002',
    title: 'Nationwide Power Maintenance Schedule Announced',
    content: 'Electricity Company of Ghana (ECG) has released a schedule for planned maintenance works affecting various regions. Check the ECG website or app for specific outage times in your area.',
    type: 'important_info',
    publishedAt: '2024-07-26T15:30:00Z',
    source: 'Electricity Company of Ghana (ECG)',
    moreInfoUrl: 'https://www.ecggh.com/' // Placeholder
  },
  {
    id: 'upd-003',
    title: 'New Highway Section Opening Soon',
    content: 'The Ministry of Roads and Highways announces the upcoming opening of the Pokuase-Nsawam highway section next month, expected to ease traffic congestion significantly.',
    type: 'news',
    publishedAt: '2024-07-25T10:00:00Z',
    source: 'Ministry of Roads and Highways'
  }
]; 