import { writable, derived, get } from 'svelte/store';
import type { Equipment } from '$lib/types/equipment';
import { createEquipment, DEFAULT_THUMBNAIL, MOCK_EQUIPMENT } from '$lib/types/equipment';
import { currentUser } from './auth';
import { browser } from '$app/environment';

/**
 * Guest equipment store - persists to localStorage
 * Used when user is not logged in
 */
function createGuestEquipmentStore() {
	const store = writable<Equipment[]>([]);

	// Load from localStorage on init
	if (browser) {
		const saved = localStorage.getItem('guest_equipment');
		if (saved) {
			try {
				store.set(JSON.parse(saved));
			} catch {
				// Ignore parse errors
			}
		}
	}

	return {
		subscribe: store.subscribe,
		set: (value: Equipment[]) => {
			store.set(value);
			if (browser) {
				localStorage.setItem('guest_equipment', JSON.stringify(value));
			}
		},
		update: (fn: (items: Equipment[]) => Equipment[]) => {
			store.update((items) => {
				const updated = fn(items);
				if (browser) {
					localStorage.setItem('guest_equipment', JSON.stringify(updated));
				}
				return updated;
			});
		},
		clear: () => {
			store.set([]);
			if (browser) {
				localStorage.removeItem('guest_equipment');
			}
		}
	};
}

const guestEquipmentStore = createGuestEquipmentStore();

/**
 * Unified equipment operations
 * Handles both logged-in user equipment and guest equipment
 */
export const equipmentStore = {
	/**
	 * Get all equipment (user or guest)
	 */
	getAll: (): Equipment[] => {
		const user = get(currentUser);
		if (user?.equipment) {
			return user.equipment;
		}
		return get(guestEquipmentStore);
	},

	/**
	 * Add new equipment
	 */
	addEquipment: (
		modelName: string,
		serialNumber?: string,
		nickname?: string,
		thumbnail: string = DEFAULT_THUMBNAIL
	): Equipment => {
		const newEquipment = createEquipment(modelName, thumbnail, serialNumber, nickname);
		const user = get(currentUser);

		if (user) {
			// Logged in - add to user profile
			user.equipment = [...(user.equipment || []), newEquipment];
		} else {
			// Guest - add to guest store
			guestEquipmentStore.update((items) => [...items, newEquipment]);
		}

		return newEquipment;
	},

	/**
	 * Remove equipment by ID
	 */
	removeEquipment: (id: string) => {
		const user = get(currentUser);
		if (user?.equipment) {
			user.equipment = user.equipment.filter((e) => e.id !== id);
		} else {
			guestEquipmentStore.update((items) => items.filter((e) => e.id !== id));
		}
	},

	/**
	 * Update equipment details
	 */
	updateEquipment: (id: string, updates: Partial<Pick<Equipment, 'nickname' | 'serialNumber'>>) => {
		const user = get(currentUser);
		if (user?.equipment) {
			user.equipment = user.equipment.map((e) => (e.id === id ? { ...e, ...updates } : e));
		} else {
			guestEquipmentStore.update((items) =>
				items.map((e) => (e.id === id ? { ...e, ...updates } : e))
			);
		}
	},

	/**
	 * Clear all equipment (user or guest)
	 */
	clearAll: () => {
		const user = get(currentUser);
		if (user?.equipment) {
			user.equipment = [];
		} else {
			guestEquipmentStore.clear();
		}
	},

	/**
	 * Sync guest equipment to user on login
	 * Called by auth store when user logs in
	 */
	syncToUser: () => {
		const user = get(currentUser);
		if (!user) return;

		const guestEquipment = get(guestEquipmentStore);
		if (guestEquipment.length > 0) {
			user.equipment = [...(user.equipment || []), ...guestEquipment];
			guestEquipmentStore.clear();
		}
	},

	/**
	 * Get guest equipment (for display)
	 */
	getGuestEquipment: () => get(guestEquipmentStore)
};

// Re-export for convenience
export { MOCK_EQUIPMENT as DUMMY_EQUIPMENT } from '$lib/types/equipment';
export { DEFAULT_THUMBNAIL } from '$lib/types/equipment';

// Derived store for reactive access to all equipment
export const equipmentList = derived([currentUser, guestEquipmentStore], ([$user, $guest]) => {
	if ($user?.equipment) {
		return $user.equipment;
	}
	return $guest;
});

export const equipmentCount = derived(equipmentList, ($list) => $list.length);
