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
	let pendingStore = $state<StoreLocation | null>(null);
	let showTermsFooter = $state(false);

	// Get selected store from store-location store
	let currentSelectedId = $derived($selectedStoreId);
	let allStores = $derived($stores);

	// Get current selected store for dealer network comparison
	let currentSelectedStore = $derived(allStores.find((s) => s.id === currentSelectedId) ?? null);

	// Check if pending store has different dealer network
	let isDifferentDealerNetwork = $derived(
		pendingStore &&
			currentSelectedStore &&
			pendingStore.dealerNetwork !== currentSelectedStore.dealerNetwork
	);

	let filteredStores = $derived(
		searchQuery ? storeLocationStore.filterStores(searchQuery) : allStores
	);

	function handleSelectStore(store: StoreLocation) {
		// Show terms and conditions footer instead of directly selecting
		pendingStore = store;
		showTermsFooter = true;
	}

	function handleAcceptTerms() {
		if (pendingStore) {
			// Use the store-location store to handle selection
			storeLocationStore.selectStore(pendingStore.id);

			if (onselect) {
				onselect(pendingStore);
			}

			// Reset state and close
			pendingStore = null;
			showTermsFooter = false;
			open = false;
		}
	}

	function handleCloseTermsFooter() {
		showTermsFooter = false;
		pendingStore = null;
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
		} else {
			// Reset terms footer state when drawer closes
			showTermsFooter = false;
			pendingStore = null;
		}
	});
</script>

{#snippet termsFooterSnippet()}
	<div class="terms-footer">
		{#if isDifferentDealerNetwork}
			<div class="dealer-change-notice">
				<h4 class="notice-title">You have selected to shop at a different location.</h4>
				<p class="notice-text">
					If you select this new location, pricing and availability may change. Your cart will be
					cleared as part of the update.
				</p>
			</div>
		{/if}
		<div class="terms-header">
			<h3 class="terms-title">Terms and Conditions</h3>
			<button
				class="terms-close"
				type="button"
				aria-label="Close Terms and Conditions"
				onclick={handleCloseTermsFooter}
			>
				<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						fill="currentColor"
					/>
				</svg>
			</button>
		</div>
		<div class="terms-body">
			<p class="terms-text">
				I have read and accept the <a href="#" class="terms-link">Terms of Use</a> and
				<a href="#" class="terms-link">Privacy Notice</a> and the
				<a href="#" class="terms-link">{pendingStore?.dealerNetwork} Terms and Conditions</a> and
				<a href="#" class="terms-link">{pendingStore?.dealerNetwork} Privacy Policy</a>
			</p>
			<button class="accept-button" type="button" onclick={handleAcceptTerms}>
				Yes, I accept
			</button>
		</div>
	</div>
{/snippet}

<Drawer
	bind:open
	title="Select Store"
	{onclose}
	footer={showTermsFooter ? termsFooterSnippet : undefined}
>
	<div class="store-content">
		<div class="store-content__header">
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
		</div>

		<!-- Store List -->
		<div class="store-list" class:inert={showTermsFooter}>
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

		<!-- Overlay when terms footer is shown -->
		{#if showTermsFooter}
			<div class="content-overlay" role="presentation"></div>
		{/if}
	</div>
</Drawer>

<style>
	.store-content {
		display: flex;
		flex-direction: column;
		gap: 16px;
		height: 100%;
		position: relative;
	}

	.store-content__header {
		display: flex;
		flex-direction: column;
		gap: 16px;
		flex-shrink: 0;
	}

	.store-list {
		flex: 1;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 16px;
		border-block-start: 1px solid #cccccc;
		padding-block-start: 16px;
	}

	.store-list.inert {
		pointer-events: none;
		opacity: 0.5;
	}

	.content-overlay {
		position: absolute;
		inset: 0;
		background-color: rgba(255, 255, 255, 0.6);
		z-index: 5;
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
	}

	.map-button:hover,
	.map-button:focus,
	.filter-button:hover,
	.filter-button:focus {
		background-color: #f2f2f2;
		border-color: #000000;
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

	.store-list.inert {
		pointer-events: none;
		opacity: 0.5;
	}

	.content-overlay {
		position: absolute;
		inset: -16px;
		background-color: rgba(0, 0, 0, 0.2);
		z-index: 5;
	}

	.no-results {
		text-align: center;
		color: #6b7280;
		font-size: 0.875rem;
		padding: 24px;
	}

	/* Terms Footer */
	.terms-footer {
		background-color: #ffffff;
		box-shadow: 0 -4px var(--Box-Shadow-Med, 12px) 0 var(--Shadows-Bot-Drawer, rgba(0, 0, 0, 0.2));
	}

	.dealer-change-notice {
		background-color: #dff1ff;
		border: 1px solid #0067b8;
		border-inline-start-width: 4px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-bottom: 0;
		padding: 16px;
	}

	.notice-title {
		font-size: 0.875rem;
		font-weight: 600;
		color: #3f3f3f;
		margin: 0;
	}

	.notice-text {
		font-size: 0.875rem;
		color: #3f3f3f;
		margin: 0;
	}

	.terms-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px;
		border-bottom: 1px solid #e5e7eb;
	}

	.terms-title {
		font-size: 1rem;
		font-weight: 600;
		color: #111827;
		margin: 0;
	}

	.terms-close {
		background: none;
		border: none;
		cursor: pointer;
		padding: 4px;
		color: #6b7280;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		transition: all 0.2s ease;
	}

	.terms-close:hover {
		background-color: #f3f4f6;
		color: #111827;
	}

	.terms-body {
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.terms-text {
		font-size: 0.75rem;
		color: #3f3f3f;
		line-height: 1.5;
		margin: 0;
	}

	.terms-link {
		color: currentColor;
		text-decoration: underline;
		transition: all 0.25s ease-in-out;
	}

	.terms-link:hover {
		color: #0066cc;
	}

	.accept-button {
		background-color: #ffcd11;
		color: #3f3f3f;
		border: 1px solid #b18d00;
		border-radius: 8px;
		padding: 12px 24px;
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.25s ease-in-out;
		width: 100%;
	}

	.accept-button:hover {
		background-color: #ffe672;
	}
</style>
