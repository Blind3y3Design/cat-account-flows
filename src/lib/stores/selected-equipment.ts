import { writable, derived, get } from 'svelte/store';
import type { Equipment } from '$lib/types/equipment';
import { currentUser } from './auth';

/**
 * Selected equipment state using Svelte 4 stores for Node.js compatibility
 */
function createSelectedEquipmentStore() {
	const { subscribe, set, update } = writable<SelectedEquipmentState>({
		selectedEquipmentId: null
	});

	return {
		subscribe,

		/**
		 * Initialize from user profile equipment
		 */
		initFromUser: () => {
			const user = get(currentUser);
			if (user?.equipment && user.equipment.length > 0) {
				set({
					selectedEquipmentId: user.equipment[0].id
				});
			}
		},

		/**
		 * Select an equipment item
		 */
		selectEquipment: (equipment: Equipment) => {
			update((state) => ({
				...state,
				selectedEquipmentId: equipment.id
			}));
		},

		/**
		 * Clear selection
		 */
		clearSelection: () => {
			set({
				selectedEquipmentId: null
			});
		},

		/**
		 * Get selected equipment from user profile
		 */
		getSelectedEquipment: (): Equipment | null => {
			const state = get(selectedEquipmentStore);
			if (!state.selectedEquipmentId) return null;

			const user = get(currentUser);
			if (!user?.equipment) return null;

			return user.equipment.find((e) => e.id === state.selectedEquipmentId) || null;
		}
	};
}

/**
 * Selected equipment state interface
 */
interface SelectedEquipmentState {
	selectedEquipmentId: string | null;
}

// Export singleton instance
export const selectedEquipmentStore = createSelectedEquipmentStore();

// Derived store for reactive access
export const selectedEquipmentId = derived(
	selectedEquipmentStore,
	($state) => $state.selectedEquipmentId
);

// Derived store to get the actual equipment object
export const selectedEquipment = derived(
	[selectedEquipmentStore, currentUser],
	([$state, $user]) => {
		if (!$state.selectedEquipmentId || !$user?.equipment) return null;
		return $user.equipment.find((e) => e.id === $state.selectedEquipmentId) || null;
	}
);
