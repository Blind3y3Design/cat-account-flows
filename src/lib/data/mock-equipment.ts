import type { Equipment } from '$lib/types/equipment';

/**
 * Default equipment thumbnail placeholder
 */
export const DEFAULT_THUMBNAIL =
	'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"%3E%3Crect width="120" height="120" fill="%23f3f4f6"/%3E%3Cpath d="M60 30 L90 50 L90 90 L30 90 L30 50 Z" fill="%23d1d5db"/%3E%3Ccircle cx="60" cy="65" r="12" fill="%239ca3af"/%3E%3C/svg%3E';

/**
 * Mock equipment data for demo purposes
 */
export const MOCK_EQUIPMENT: Equipment[] = [
	{
		id: 'eq-001',
		thumbnail:
			'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"%3E%3Crect width="120" height="120" fill="%23f3f4f6"/%3E%3Crect x="20" y="30" width="80" height="60" rx="4" fill="%23d1d5db"/%3E%3Ccircle cx="40" cy="70" r="15" fill="%239ca3af"/%3E%3C/svg%3E',
		modelName: 'D6T Dozer',
		serialNumber: 'D6T-2024-001234',
		nickname: 'Big Yellow',
		createdAt: new Date('2024-01-15')
	},
	{
		id: 'eq-002',
		thumbnail:
			'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"%3E%3Crect width="120" height="120" fill="%23f3f4f6"/%3E%3Crect x="20" y="40" width="80" height="50" rx="4" fill="%23d1d5db"/%3E%3Crect x="30" y="20" width="20" height="20" fill="%239ca3af"/%3E%3C/svg%3E',
		modelName: '320 GC Excavator',
		serialNumber: '320-2024-005678',
		nickname: 'Site Digger',
		createdAt: new Date('2024-02-20')
	},
	{
		id: 'eq-003',
		thumbnail:
			'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"%3E%3Crect width="120" height="120" fill="%23f3f4f6"/%3E%3Crect x="15" y="45" width="90" height="35" rx="4" fill="%23d1d5db"/%3E%3Crect x="25" y="30" width="70" height="15" rx="2" fill="%239ca3af"/%3E%3C/svg%3E',
		modelName: '950M Wheel Loader',
		serialNumber: '950M-2023-009012',
		nickname: undefined,
		createdAt: new Date('2023-11-10')
	},
	{
		id: 'eq-004',
		thumbnail:
			'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"%3E%3Crect width="120" height="120" fill="%23f3f4f6"/%3E%3Crect x="25" y="35" width="70" height="50" rx="4" fill="%23d1d5db"/%3E%3Ccircle cx="45" cy="70" r="8" fill="%239ca3af"/%3E%3Ccircle cx="75" cy="70" r="8" fill="%239ca3af"/%3E%3C/svg%3E',
		modelName: '140M3 Motor Grader',
		serialNumber: '140M-2024-003456',
		nickname: 'Grader Pro',
		createdAt: new Date('2024-03-05')
	},
	{
		id: 'eq-005',
		thumbnail:
			'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"%3E%3Crect width="120" height="120" fill="%23f3f4f6"/%3E%3Crect x="20" y="50" width="80" height="30" rx="4" fill="%23d1d5db"/%3E%3Crect x="35" y="35" width="50" height="15" rx="2" fill="%239ca3af"/%3E%3Ccircle cx="50" cy="65" r="5" fill="%236b7280"/%3E%3Ccircle cx="70" cy="65" r="5" fill="%236b7280"/%3E%3C/svg%3E',
		modelName: 'TH255C Telehandler',
		serialNumber: undefined,
		nickname: 'Lift King',
		createdAt: new Date('2024-04-18')
	}
];
