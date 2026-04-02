import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import {
	equipmentStore,
	equipmentList,
	equipmentCount,
	DUMMY_EQUIPMENT
} from '$lib/stores/equipment';
import { auth } from '$lib/stores/auth';

describe('Equipment Store', () => {
	beforeEach(() => {
		// Reset state before each test
		auth.signOut();
		localStorage.removeItem('guest_equipment');
	});

	describe('Guest Equipment (not logged in)', () => {
		it('should return empty array initially for guest', () => {
			const equipment = equipmentStore.getAll();
			expect(equipment).toEqual([]);
		});

		it('should add equipment to guest store', () => {
			const newEquipment = equipmentStore.addEquipment(
				'320 GC Excavator',
				'SN12345',
				'My Excavator'
			);

			expect(newEquipment).toBeDefined();
			expect(newEquipment.modelName).toBe('320 GC Excavator');
			expect(newEquipment.serialNumber).toBe('SN12345');
			expect(newEquipment.nickname).toBe('My Excavator');

			const equipment = equipmentStore.getAll();
			expect(equipment.length).toBe(1);
		});

		it('should persist guest equipment to localStorage', () => {
			// Clear first to ensure clean state
			localStorage.removeItem('guest_equipment');

			equipmentStore.addEquipment('950M Wheel Loader');

			const saved = localStorage.getItem('guest_equipment');
			expect(saved).toBeDefined();

			const parsed = JSON.parse(saved ?? '');
			expect(parsed.length).toBe(1);
		});

		it('should remove equipment from guest store', () => {
			const newEquipment = equipmentStore.addEquipment('D6T Dozer');
			const equipmentId = newEquipment.id;

			equipmentStore.removeEquipment(equipmentId);

			const equipment = equipmentStore.getAll();
			expect(equipment.length).toBe(0);
		});

		it('should update equipment in guest store', () => {
			const newEquipment = equipmentStore.addEquipment('D6T Dozer', 'SN999');

			equipmentStore.updateEquipment(newEquipment.id, { nickname: 'Big Dozer' });

			const equipment = equipmentStore.getAll();
			expect(equipment[0].nickname).toBe('Big Dozer');
		});

		it('should clear all guest equipment', () => {
			equipmentStore.addEquipment('Equipment 1');
			equipmentStore.addEquipment('Equipment 2');

			equipmentStore.clearAll();

			const equipment = equipmentStore.getAll();
			expect(equipment.length).toBe(0);
		});

		it('should get guest equipment directly', () => {
			equipmentStore.addEquipment('TH255C Telehandler');

			const guestEquipment = equipmentStore.getGuestEquipment();
			expect(guestEquipment.length).toBe(1);
		});
	});

	describe('User Equipment (logged in)', () => {
		beforeEach(async () => {
			// Sign in to test user equipment
			await auth.signIn({ username: 'testuser', password: 'password123' });
		});

		it('should return user equipment when logged in', () => {
			const equipment = equipmentStore.getAll();

			// User should have mock equipment from sign in
			expect(equipment.length).toBe(DUMMY_EQUIPMENT.length);
		});

		it('should add equipment to user profile', () => {
			const initialCount = equipmentStore.getAll().length;

			equipmentStore.addEquipment('New Model', 'SN001', 'New Equipment');

			const newCount = equipmentStore.getAll().length;
			expect(newCount).toBe(initialCount + 1);
		});

		it('should remove equipment from user profile', () => {
			const user = auth.user;
			if (!user || !user.equipment || user.equipment.length === 0) {
				// Add some equipment first
				equipmentStore.addEquipment('Test Equipment');
			}

			const equipment = equipmentStore.getAll();
			const firstId = equipment[0].id;

			equipmentStore.removeEquipment(firstId);

			const newEquipment = equipmentStore.getAll();
			expect(newEquipment.length).toBe(equipment.length - 1);
		});

		it('should update equipment in user profile', () => {
			const equipment = equipmentStore.getAll();
			if (equipment.length > 0) {
				const firstId = equipment[0].id;

				equipmentStore.updateEquipment(firstId, { nickname: 'Updated Nickname' });

				const updatedEquipment = equipmentStore.getAll();
				const updated = updatedEquipment.find((e) => e.id === firstId);
				expect(updated?.nickname).toBe('Updated Nickname');
			}
		});

		it('should clear user equipment', () => {
			equipmentStore.clearAll();

			const equipment = equipmentStore.getAll();
			expect(equipment.length).toBe(0);
		});
	});

	describe('Sync to User', () => {
		it('should sync guest equipment to user on login', async () => {
			// Add equipment as guest
			equipmentStore.addEquipment('Guest Equipment 1');
			equipmentStore.addEquipment('Guest Equipment 2');

			expect(equipmentStore.getGuestEquipment().length).toBe(2);

			// Sign in - should trigger sync
			await auth.signIn({ username: 'testuser', password: 'password123' });

			// After login, guest equipment should be synced to user
			const userEquipment = equipmentStore.getAll();
			// User already has DUMMY_EQUIPMENT, so count should be original + guest equipment
			expect(userEquipment.length).toBeGreaterThan(DUMMY_EQUIPMENT.length);
		});
	});

	describe('Derived Stores', () => {
		it('should have correct equipment count for guest', () => {
			expect(get(equipmentCount)).toBe(0);

			equipmentStore.addEquipment('Item 1');
			equipmentStore.addEquipment('Item 2');

			expect(get(equipmentCount)).toBe(2);
		});

		it('should have correct equipment list for guest', () => {
			equipmentStore.addEquipment('Test Equipment');

			const list = get(equipmentList);
			expect(list.length).toBe(1);
			expect(list[0].modelName).toBe('Test Equipment');
		});
	});
});
