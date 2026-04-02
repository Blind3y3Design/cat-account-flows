// Test setup file for Vitest
// This file initializes Svelte 5 runes for testing

import { vi } from 'vitest';

// Mock the browser environment
vi.mock('$app/environment', () => ({
	browser: true,
	dev: false,
	building: false
}));

// Mock localStorage
const localStorageMock = (() => {
	let store: Record<string, string> = {};
	return {
		getItem: (key: string) => store[key] || null,
		setItem: (key: string, value: string) => {
			store[key] = value;
		},
		removeItem: (key: string) => {
			delete store[key];
		},
		clear: () => {
			store = {};
		}
	};
})();

Object.defineProperty(global, 'localStorage', {
	value: localStorageMock
});

// Mock crypto.randomUUID
const mockRandomUUID = (): string => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

if (!global.crypto) {
	(global as unknown as { crypto: Crypto }).crypto = {} as Crypto;
}
(global.crypto as { randomUUID?: () => string }).randomUUID = mockRandomUUID;
