import { writable, derived, get } from 'svelte/store';
import { DUMMY_STORES, type StoreLocation } from '$lib/types/store';
import { currentUser } from './auth';

/**
 * Internal writable store for store location state
 */
const storeLocationWritable = writable<StoreState>({
	stores: DUMMY_STORES,
	selectedStoreId: null
});

/**
 * Store location state using Svelte 4 stores for Node.js compatibility
 */
export const storeLocationStore = {
	subscribe: storeLocationWritable.subscribe,

	/**
	 * Initialize selected store from user profile
	 */
	initFromUser: () => {
		const user = get(currentUser);
		if (user?.selectedStore) {
			storeLocationWritable.update((state) => ({
				...state,
				selectedStoreId: user.selectedStore?.id || null
			}));
		}
	},

	/**
	 * Select a store and update user profile
	 */
	selectStore: (storeId: string) => {
		const state = get(storeLocationWritable);
		const store = state.stores.find((s) => s.id === storeId);

		if (store) {
			// Update local state
			storeLocationWritable.update((s) => ({
				...s,
				selectedStoreId: storeId
			}));

			// Update user profile
			const user = get(currentUser);
			if (user) {
				user.selectedStore = store;
			}
		}
	},

	/**
	 * Get the currently selected store
	 */
	getSelectedStore: (): StoreLocation | null => {
		const state = get(storeLocationWritable);
		if (!state.selectedStoreId) return null;
		return state.stores.find((s) => s.id === state.selectedStoreId) || null;
	},

	/**
	 * Filter stores by search query
	 */
	filterStores: (query: string): StoreLocation[] => {
		const state = get(storeLocationWritable);
		if (!query) return state.stores;

		const lowerQuery = query.toLowerCase();
		return state.stores.filter(
			(s) =>
				s.city.toLowerCase().includes(lowerQuery) ||
				s.state.toLowerCase().includes(lowerQuery) ||
				s.address.toLowerCase().includes(lowerQuery) ||
				s.zipCode.includes(query) ||
				s.name.toLowerCase().includes(lowerQuery)
		);
	},

	/**
	 * Set store state directly (for testing)
	 */
	set: (value: StoreState) => {
		storeLocationWritable.set(value);
	},

	/**
	 * Update store state (for testing)
	 */
	update: (fn: (value: StoreState) => StoreState) => {
		storeLocationWritable.update(fn);
	}
};

/**
 * Store state interface
 */
interface StoreState {
	stores: StoreLocation[];
	selectedStoreId: string | null;
}

// Derived stores for reactive access
export const stores = derived(storeLocationWritable, ($store) => $store.stores);
export const selectedStoreId = derived(storeLocationWritable, ($store) => $store.selectedStoreId);
export const selectedStore = derived(storeLocationWritable, ($store) => {
	if (!$store.selectedStoreId) return null;
	return $store.stores.find((s) => s.id === $store.selectedStoreId) || null;
});
