/**
 * Equipment data interface
 */
export interface Equipment {
	id: string;
	thumbnail: string;
	modelName: string;
	serialNumber?: string;
	nickname?: string;
	createdAt: Date;
}

/**
 * Creates a new equipment item with generated ID and timestamp
 */
export function createEquipment(
	modelName: string,
	thumbnail: string = '',
	serialNumber?: string,
	nickname?: string
): Equipment {
	return {
		id: crypto.randomUUID(),
		thumbnail,
		modelName,
		serialNumber,
		nickname,
		createdAt: new Date()
	};
}

// Re-export mock data and defaults from data folder for backwards compatibility
export {
	DEFAULT_THUMBNAIL,
	MOCK_EQUIPMENT,
	MOCK_EQUIPMENT as DUMMY_EQUIPMENT
} from '$lib/data/mock-equipment';
