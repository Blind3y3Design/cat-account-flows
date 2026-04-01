import { writable, derived, get } from 'svelte/store';
import { DUMMY_STORES, type StoreLocation } from '$lib/types/store';
import { auth, currentUser } from './auth';

/**
 * Store location state
 */
interface StoreState {
	stores: StoreLocation[];
	selectedStoreId: string | null;
}

/**
 * Creates the store location data store
 */
function createStoreLocationStore() {
	const { subscribe, set, update } = writable<StoreState>({
		stores: DUMMY_STORES,
		selectedStoreId: null
	});

	return {
		subscribe,

		/**
		 * Initialize selected store from user profile
		 */
		initFromUser: () => {
			const user = get(currentUser);
			if (user?.selectedStore) {
				update((state) => ({
					...state,
					selectedStoreId: user.selectedStore?.id || null
				}));
			}
		},

		/**
		 * Select a store and update user profile
		 */
		selectStore: (storeId: string) => {
			const state = get({ subscribe });
			const store = state.stores.find((s) => s.id === storeId);

			if (store) {
				// Update local state
				update((state) => ({
					...state,
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
			const state = get({ subscribe });
			if (!state.selectedStoreId) return null;
			return state.stores.find((s) => s.id === state.selectedStoreId) || null;
		},

		/**
		 * Filter stores by search query
		 */
		filterStores: (query: string): StoreLocation[] => {
			const state = get({ subscribe });
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
		}
	};
}

// Export singleton instance
export const storeLocationStore = createStoreLocationStore();

// Derived stores for reactive access
export const stores = derived(storeLocationStore, ($store) => $store.stores);
export const selectedStoreId = derived(storeLocationStore, ($store) => $store.selectedStoreId);
export const selectedStore = derived(storeLocationStore, ($store) => {
	if (!$store.selectedStoreId) return null;
	return $store.stores.find((s) => s.id === $store.selectedStoreId) || null;
});
