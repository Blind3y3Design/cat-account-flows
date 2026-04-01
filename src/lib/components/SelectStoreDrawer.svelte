<script lang="ts">
	import Drawer from '$lib/components/Drawer.svelte';
	import StoreCard from '$lib/components/StoreCard.svelte';
	import { storeLocationStore, selectedStoreId, stores } from '$lib/stores/store-location';
	import type { StoreLocation } from '$lib/types/store';

	interface SelectStoreDrawerProps {
		open: boolean;
		onclose?: () => void;
		onselect?: (store: StoreLocation) => void;
	}

	let { open = $bindable(), onclose, onselect }: SelectStoreDrawerProps = $props();

	let searchQuery = $state('');
	let filterOpen = $state(false);

	// Get selected store from store-location store
	let currentSelectedId = $derived($selectedStoreId);
	let allStores = $derived($stores);

	let filteredStores = $derived(
		searchQuery ? storeLocationStore.filterStores(searchQuery) : allStores
	);

	function handleSelectStore(store: StoreLocation) {
		// Use the store-location store to handle selection
		storeLocationStore.selectStore(store.id);

		if (onselect) {
			onselect(store);
		}

		open = false;
	}

	function handleMapView() {
		// In a real app, this would open a map view
		alert('Map view would open here');
	}

	function handleFilter() {
		filterOpen = !filterOpen;
	}

	// Initialize selected store from user when drawer opens
	$effect(() => {
		if (open) {
			storeLocationStore.initFromUser();
		}
	});
</script>

<Drawer bind:open title="Select Store" {onclose}>
	<div class="store-content">
		<!-- Search Input -->
		<div class="search-section">
			<input
				type="text"
				class="search-input"
				bind:value={searchQuery}
				placeholder="Enter city, state, address, or zip code"
			/>
		</div>

		<!-- Action Buttons -->
		<div class="action-buttons">
			<button class="map-button" type="button" onclick={handleMapView}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
					<line x1="8" y1="2" x2="8" y2="18"></line>
					<line x1="16" y1="6" x2="16" y2="22"></line>
				</svg>
				Map View
			</button>
			<button class="filter-button" type="button" onclick={handleFilter}>
				<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M3.49126 7.4996C3.49126 7.22345 3.71512 6.9996 3.99126 6.9996H12.009C12.2852 6.9996 12.509 7.22345 12.509 7.4996C12.509 7.77574 12.2852 7.9996 12.009 7.9996H3.99126C3.71512 7.9996 3.49126 7.77574 3.49126 7.4996Z"
						fill="currentColor"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M1.23682 3.74219C1.23682 3.46605 1.46067 3.24219 1.73682 3.24219L14.2635 3.24219C14.5396 3.24219 14.7635 3.46605 14.7635 3.74219C14.7635 4.01833 14.5396 4.24219 14.2635 4.24219L1.73682 4.24219C1.46067 4.24219 1.23682 4.01833 1.23682 3.74219Z"
						fill="currentColor"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M6.49719 11.257C6.49719 10.9809 6.72104 10.757 6.99719 10.757H9.00311C9.27925 10.757 9.50311 10.9809 9.50311 11.257C9.50311 11.5331 9.27925 11.757 9.00311 11.757H6.99719C6.72104 11.757 6.49719 11.5331 6.49719 11.257Z"
						fill="currentColor"
					/>
				</svg>
				Filter
			</button>
		</div>

		<!-- Store List -->
		<div class="store-list">
			{#each filteredStores as store (store.id)}
				<StoreCard
					{store}
					isSelected={currentSelectedId === store.id}
					onselect={handleSelectStore}
				/>
			{/each}

			{#if filteredStores.length === 0}
				<p class="no-results">No stores found matching your search.</p>
			{/if}
		</div>
	</div>
</Drawer>

<style>
	.store-content {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	/* Search Section */
	.search-section {
		position: relative;
	}

	.search-input {
		width: 100%;
		padding: 12px 14px;
		font-size: 0.9375rem;
		border: 1px solid #d1d5db;
		border-radius: 9999px;
		background-color: #ffffff;
		color: #3f3f3f;
		box-sizing: border-box;
		transition:
			border-color 0.25s ease-in-out,
			box-shadow 0.25s ease-in-out;
	}

	.search-input::placeholder {
		color: #696969;
	}

	/* Action Buttons */
	.action-buttons {
		align-items: center;
		display: flex;
		gap: 16px;
		justify-content: space-between;
	}

	.map-button,
	.filter-button {
		align-items: center;
		background-color: #ffffff;
		border: 1px solid #777777;
		border-radius: 8px;
		cursor: pointer;
		display: flex;
		font-size: 0.875rem;
		font-weight: 500;
		gap: 8px;
		justify-content: center;
		padding: 6px 16px;
		transition: all 0.25s ease-in-out;

		&:hover,
		&:focus {
			background-color: #f2f2f2;
			border-color: #000000;
		}
	}

	/* Store List */
	.store-list {
		border-block-start: 1px solid #cccccc;
		display: flex;
		flex-direction: column;
		gap: 16px;
		overflow-y: auto;
		padding-block-start: 16px;
	}

	.no-results {
		align-items: center;
		background-color: #ffffff;
		border: 1px solid #cccccc;
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 16px;
		transition: all 0.25s ease-in-out;
	}

	.store-card:hover {
		background-color: #f9fafb;
	}

	.store-card.selected {
		background-color: #ffffff;
		border: 2px solid #000000;
	}

	.store-info {
		align-items: start;
		display: flex;
		flex-direction: column;
		gap: 4px;
		width: 100%;
	}

	.store-name {
		font-size: 1rem;
		font-weight: 600;
		color: #3f3f3f;
		margin: 0;
	}

	.store-address {
		font-size: 0.875rem;
		color: #696969;
		margin: 0;
	}

	.store-details {
		align-items: start;
		display: flex;
		flex-direction: row;
		gap: 8px;
		justify-content: space-between;
		width: 100%;
	}

	.store-distance,
	.store-hours {
		color: #3f3f3f;
		font-size: 0.875rem;
		margin: 0;
	}

	.store-open-status {
		color: #006618;
		font-weight: bold;
	}

	.select-button {
		align-items: center;
		background-color: #ffffff;
		border: 1px solid #cccccc;
		border-radius: 9999px;
		color: #000000;
		cursor: pointer;
		display: flex;
		font-size: 0.875rem;
		font-weight: 600;
		gap: 8px;
		padding: 6px 16px;
		transition: all 0.25s ease-in-out;

		&.selected {
			border-color: #000000;
		}
	}

	.select-button:hover {
		background-color: #f2f2f2;
		border-color: #000000;
	}

	.no-results {
		text-align: center;
		color: #6b7280;
		font-size: 0.875rem;
		padding: 24px;
	}
</style>
