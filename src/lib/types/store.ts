/**
 * Store location interface
 */
export interface StoreLocation {
	id: string;
	name: string;
	address: string;
	city: string;
	state: string;
	zipCode: string;
	distance: number;
	phone: string;
}

// Re-export mock data from data folder for backwards compatibility
export { MOCK_STORES as DUMMY_STORES } from '$lib/data/mock-stores';
