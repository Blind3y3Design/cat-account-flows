import type { Equipment } from '$lib/types/equipment';

/**
 * Default equipment thumbnail placeholder
 */
export const DEFAULT_THUMBNAIL =
	'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"%3E%3Crect width="120" height="120" fill="%23f3f4f6"/%3E%3Cpath d="M60 30 L90 50 L90 90 L30 90 L30 50 Z" fill="%23d1d5db"/%3E%3Ccircle cx="60" cy="65" r="12" fill="%239ca3af"/%3E%3C/svg%3E';

/**
 * Equipment thumbnail image
 */
import dozerImage from '$lib/assets/equipment/d6t-dozer.jpg';
import excavatorImage from '$lib/assets/equipment/320-gc-excavator.jpg';
import wheelLoaderImage from '$lib/assets/equipment/950m-wheel-loader.jpg';
import motorGraderImage from '$lib/assets/equipment/140m3-motor-grader.jpg';
import telehandlerImage from '$lib/assets/equipment/th255c-telehandler.jpg';

/**
 * Mock equipment data for demo purposes
 */
export const MOCK_EQUIPMENT: Equipment[] = [
	{
		id: 'eq-001',
		thumbnail: dozerImage,
		modelName: 'D6T Dozer',
		serialNumber: 'D6T-2024-001234',
		nickname: 'Big Yellow',
		createdAt: new Date('2024-01-15')
	},
	{
		id: 'eq-002',
		thumbnail: excavatorImage,
		modelName: '320 GC Excavator',
		serialNumber: '320-2024-005678',
		nickname: 'Site Digger',
		createdAt: new Date('2024-02-20')
	},
	{
		id: 'eq-003',
		thumbnail: wheelLoaderImage,
		modelName: '950M Wheel Loader',
		serialNumber: '950M-2023-009012',
		nickname: undefined,
		createdAt: new Date('2023-11-10')
	},
	{
		id: 'eq-004',
		thumbnail: motorGraderImage,
		modelName: '140M3 Motor Grader',
		serialNumber: '140M-2024-003456',
		nickname: 'Grader Pro',
		createdAt: new Date('2024-03-05')
	},
	{
		id: 'eq-005',
		thumbnail: telehandlerImage,
		modelName: 'TH255C Telehandler',
		serialNumber: undefined,
		nickname: 'Lift King',
		createdAt: new Date('2024-04-18')
	},
	{
		id: 'eq-006',
		thumbnail: excavatorImage,
		modelName: '320 GC Excavator',
		createdAt: new Date('2024-02-20')
	},
	{
		id: 'eq-007',
		thumbnail: excavatorImage,
		modelName: '320 GC Excavator',
		createdAt: new Date('2024-02-20')
	}
];
