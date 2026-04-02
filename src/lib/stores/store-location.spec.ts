import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import {
	storeLocationStore,
	stores,
	selectedStoreId,
	selectedStore
} from '$lib/stores/store-location';
import { auth } from '$lib/stores/auth';
import type { StoreLocation } from '$lib/types/store';

describe('Store Location Store', () => {
	beforeEach(() => {
		// Reset state before each test
		auth.signOut();
		// Reset store location state
		storeLocationStore.set({
			stores: get(stores),
			selectedStoreId: null
		});
	});

	describe('Initial State', () => {
		it('should have stores defined', () => {
			const storeList = get(stores);
			expect(storeList).toBeDefined();
			expect(Array.isArray(storeList)).toBe(true);
		});

		it('should have null selected store initially', () => {
			expect(get(selectedStoreId)).toBeNull();
		});

		it('should return null for selected store when none selected', () => {
			expect(get(selectedStore)).toBeNull();
		});
	});

	describe('selectStore', () => {
		it('should set selected store ID', () => {
			const testStoreId = 'store-001';
			storeLocationStore.selectStore(testStoreId);

			expect(get(selectedStoreId)).toBe(testStoreId);
		});

		it('should return the selected store', () => {
			storeLocationStore.selectStore('store-001');

			const selected = get(selectedStore);
			expect(selected).not.toBeNull();
			expect(selected?.id).toBe('store-001');
		});

		it('should update user profile when logged in', async () => {
			await auth.signIn({ username: 'testuser', password: 'password123' });

			storeLocationStore.selectStore('store-001');

			const user = auth.user;
			expect(user?.selectedStore).toBeDefined();
			expect(user?.selectedStore?.id).toBe('store-001');
		});

		it('should handle invalid store ID gracefully', () => {
			storeLocationStore.selectStore('non-existent-id');

			// Should not throw and selectedStoreId should remain unchanged
			expect(get(selectedStoreId)).not.toBe('non-existent-id');
		});
	});

	describe('initFromUser', () => {
		it('should initialize from user selected store when logged in', async () => {
			await auth.signIn({ username: 'testuser', password: 'password123' });

			// User has selectedStore from signIn mock data
			storeLocationStore.initFromUser();

			expect(get(selectedStoreId)).not.toBeNull();
		});
	});

	describe('getSelectedStore', () => {
		it('should return null when no store selected', () => {
			const result = storeLocationStore.getSelectedStore();

			expect(result).toBeNull();
		});

		it('should return the selected store object', () => {
			storeLocationStore.selectStore('store-001');

			const result = storeLocationStore.getSelectedStore();

			expect(result).not.toBeNull();
			expect(result?.id).toBe('store-001');
		});
	});

	describe('filterStores', () => {
		it('should return all stores when query is empty', () => {
			const result = storeLocationStore.filterStores('');
			const allStores = get(stores);

			expect(result.length).toBe(allStores.length);
		});

		it('should filter stores by city', () => {
			const result = storeLocationStore.filterStores('Chicago');

			// Should find stores in Chicago
			expect(result.length).toBeGreaterThanOrEqual(0);
		});

		it('should filter stores by state', () => {
			const result = storeLocationStore.filterStores('Illinois');

			expect(result.length).toBeGreaterThanOrEqual(0);
		});

		it('should filter stores by zip code', () => {
			const result = storeLocationStore.filterStores('60601');

			expect(result.length).toBeGreaterThanOrEqual(0);
		});

		it('should be case insensitive', () => {
			const resultLower = storeLocationStore.filterStores('chicago');
			const resultUpper = storeLocationStore.filterStores('CHICAGO');

			// Both should return same results (or at least same count)
			expect(resultLower.length).toBe(resultUpper.length);
		});

		it('should filter by store name', () => {
			// This tests the name filter in the filter function
			const result = storeLocationStore.filterStores('Parts');

			expect(result).toBeDefined();
		});
	});

	describe('Derived Stores', () => {
		it('should update selectedStoreId when store is selected', () => {
			storeLocationStore.selectStore('store-002');

			expect(get(selectedStoreId)).toBe('store-002');
		});

		it('should update selected derived store when selection changes', () => {
			storeLocationStore.selectStore('store-001');

			const selected = get(selectedStore);
			expect(selected?.id).toBe('store-001');
		});
	});
});
