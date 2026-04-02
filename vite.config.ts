import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [enhancedImages(), sveltekit()],
	test: {
		expect: { requireAssertions: true },
		include: ['src/**/*.{test,spec}.{js,ts}'],
		exclude: ['src/lib/server/**', 'src/**/*.svelte.{test,spec}.{js,ts}'],
		environment: 'node',
		setupFiles: ['./src/test-setup.ts'],
		globals: true
	}
});
