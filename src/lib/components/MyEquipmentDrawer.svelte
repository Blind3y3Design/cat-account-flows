<script lang="ts">
	import Drawer from '$lib/components/Drawer.svelte';
	import { currentUser } from '$lib/stores/auth';
	import { selectedEquipment, selectedEquipmentStore } from '$lib/stores/selected-equipment';
	import type { Equipment } from '$lib/types/equipment';

	interface MyEquipmentDrawerProps {
		open: boolean;
		onclose?: () => void;
	}

	let { open = $bindable(), onclose }: MyEquipmentDrawerProps = $props();

	// Form state (for empty state)
	let serialNumber = $state('');
	let modelName = $state('');

	// Filter text state
	let filterText = $state('');

	// Get user's equipment from auth store
	let userEquipment = $derived($currentUser?.equipment ?? []);
	let hasEquipment = $derived(userEquipment.length > 0);

	// Use store as source of truth for selected equipment
	let selectedEquipmentFromStore = $derived($selectedEquipment);

	// Filter equipment list
	let filteredEquipment = $derived(
		userEquipment.filter(
			(e) =>
				e.modelName.toLowerCase().includes(filterText.toLowerCase()) ||
				e.nickname?.toLowerCase().includes(filterText.toLowerCase()) ||
				e.serialNumber?.toLowerCase().includes(filterText.toLowerCase())
		)
	);

	// Auto-select first equipment when drawer opens and no equipment is selected
	let wasOpen = $state(false);
	$effect(() => {
		// Only trigger when drawer transitions from closed to open
		if (open && !wasOpen && hasEquipment && !selectedEquipmentFromStore) {
			const firstEquipment = userEquipment[0];
			if (firstEquipment) {
				selectedEquipmentStore.selectEquipment(firstEquipment);
			}
		}
		wasOpen = open;
	});

	function selectEquipment(equipment: Equipment) {
		// Use store to manage selection - this updates both store and UI
		selectedEquipmentStore.selectEquipment(equipment);
		// Close the drawer after selecting equipment
		open = false;
	}

	function handleAddEquipment() {
		// In a real app, this would add the equipment
		// For now, just clear the form
		serialNumber = '';
		modelName = '';
	}
</script>

<Drawer bind:open title="My Equipment" {onclose}>
	<div class="equipment-content">
		{#if hasEquipment}
			<!-- Equipment List State -->
			{#if selectedEquipmentFromStore}
				<!-- Selected Equipment Display -->
				<div class="selected-equipment">
					<div class="selected-image">
						<img
							src={selectedEquipmentFromStore.thumbnail}
							alt={selectedEquipmentFromStore.modelName}
						/>
					</div>
					<div class="selected-info">
						<h3 class="selected-model">{selectedEquipmentFromStore.modelName}</h3>
						{#if selectedEquipmentFromStore.nickname}
							<p class="selected-nickname">{selectedEquipmentFromStore.nickname}</p>
						{/if}
						{#if selectedEquipmentFromStore.serialNumber}
							<p class="selected-serial">S/N: {selectedEquipmentFromStore.serialNumber}</p>
						{/if}
					</div>
				</div>

				<!-- Action Buttons -->
				<div class="action-buttons">
					<button class="primary" type="button">Shop Parts</button>
					<button class="contrast" type="button">Parts Diagram</button>
				</div>
			{/if}

			<!-- Filter and Add Section -->
			<div class="filter-section">
				<div class="filter-input-wrapper">
					<input
						type="text"
						class="filter-input"
						bind:value={filterText}
						placeholder="Search Equipment in Your List"
					/>
				</div>
				<button class="add-button" type="button" onclick={handleAddEquipment}> Add </button>
			</div>

			<!-- Equipment List -->
			<div class="equipment-list">
				{#each filteredEquipment as equipment (equipment.id)}
					<button
						class="equipment-card"
						class:selected={selectedEquipmentFromStore?.id === equipment.id}
						type="button"
						onclick={() => selectEquipment(equipment)}
					>
						<div class="card-image">
							<img src={equipment.thumbnail} alt={equipment.modelName} />
						</div>
						<div class="card-info">
							<span class="card-model">{equipment.modelName}</span>
							{#if equipment.nickname}
								<span class="card-nickname">{equipment.nickname}</span>
							{/if}
							{#if equipment.serialNumber}
								<span class="card-serial">{equipment.serialNumber}</span>
							{/if}
						</div>
					</button>
				{/each}

				{#if filteredEquipment.length === 0}
					<p class="no-results">No equipment matches your filter.</p>
				{/if}
			</div>
		{:else}
			<!-- Empty State -->
			<p class="instruction-text">
				Enter your serial number or model name to find your equipment and shop parts that fit.
			</p>

			<div class="form-fields">
				<div class="form-group">
					<label for="serial-number">Serial Number</label>
					<input
						type="text"
						id="serial-number"
						bind:value={serialNumber}
						placeholder="Enter serial number"
					/>
				</div>

				<div class="form-group">
					<label for="model-name">Model Name</label>
					<input
						type="text"
						id="model-name"
						bind:value={modelName}
						placeholder="Enter model name"
					/>
				</div>
			</div>
		{/if}
	</div>
</Drawer>

<style>
	.equipment-content {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	/* Empty State Styles */
	.instruction-text {
		font-size: 0.9375rem;
		color: #4b5563;
		line-height: 1.5;
		margin: 0;
	}

	.form-fields {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.form-group label {
		font-size: 0.875rem;
		font-weight: 500;
		color: #374151;
	}

	.form-group input {
		padding: 12px 14px;
		font-size: 1rem;
		border: 1px solid #d1d5db;
		border-radius: 8px;
		background-color: #ffffff;
		color: #111827;
		transition:
			border-color 0.25s ease-in-out,
			box-shadow 0.25s ease-in-out;
	}

	.form-group input:focus {
		outline: none;
		border-color: #ffcd11;
		box-shadow: 0 0 0 3px rgba(255, 205, 17, 0.2);
	}

	.form-group input::placeholder {
		color: #9ca3af;
	}

	/* Selected Equipment Display */
	.selected-equipment {
		display: flex;
		gap: 16px;
		padding: 16px;
		background-color: #f9fafb;
		border-radius: 8px;
		border: 1px solid #e5e7eb;
	}

	.selected-image {
		flex-shrink: 0;
		height: 80px;
		overflow: hidden;
		width: 80px;
	}

	.selected-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.selected-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
		justify-content: center;
	}

	.selected-model {
		font-size: 1rem;
		font-weight: 600;
		color: #111827;
		margin: 0;
	}

	.selected-nickname {
		font-size: 0.875rem;
		color: #6b7280;
		margin: 0;
	}

	.selected-serial {
		font-size: 0.8125rem;
		color: #9ca3af;
		margin: 0;
	}

	/* Action Buttons */
	.action-buttons {
		display: flex;
		flex-direction: row;
		gap: 16px;
	}

	.action-buttons button {
		width: 100%;
		padding: 12px 20px;
		font-size: 0.9375rem;
		font-weight: 500;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.25s ease-in-out;
	}

	.action-buttons .primary {
		background-color: #ffcd11;
		color: #000000;
		border: none;
	}

	.action-buttons .primary:hover {
		background-color: #ffe672;
	}

	.action-buttons .contrast {
		background-color: #000000;
		color: #ffffff;
		border: 1px solid #000000;
	}

	.action-buttons .contrast:hover {
		background-color: #3f3f3f;
	}

	/* Filter Section */
	.filter-section {
		display: flex;
		flex-direction: row;
		gap: 8px;
		border-block: 1px solid #cccccc;
		padding-block: 16px;
	}

	.filter-input-wrapper {
		position: relative;
		flex-grow: 1;
	}

	.filter-input {
		width: 100%;
		padding: 10px 14px;
		font-size: 0.9375rem;
		border: 1px solid #d1d5db;
		border-radius: 8px;
		background-color: #ffffff;
		color: #111827;
		box-sizing: border-box;
	}

	.filter-input:focus {
		outline: none;
		border-color: #ffcd11;
		box-shadow: 0 0 0 3px rgba(255, 205, 17, 0.2);
	}

	.filter-input::placeholder {
		color: #9ca3af;
	}

	.add-button {
		padding: 8px 16px;
		font-size: 0.875rem;
		color: #000000;
		background-color: #ffffff;
		border: 1px solid #000000;
		border-radius: 4px;
		cursor: pointer;
		transition: all 0.25s ease-in-out;
		width: 100px;
	}

	.add-button:hover {
		background-color: #f2f2f2;
	}

	/* Equipment List */
	.equipment-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
		overflow-y: auto;
	}

	.equipment-card {
		display: flex;
		gap: 12px;
		padding: 16px;
		background-color: #ffffff;
		border: 1px solid #cccccc;
		border-radius: 4px;
		cursor: pointer;
		text-align: left;
		transition: all 0.25s ease-in-out;
	}

	.equipment-card:hover {
		background-color: #f2f2f2;
	}

	.equipment-card.selected {
		border: 2px solid #000000;
	}

	.card-image {
		flex-shrink: 0;
		height: 50px;
		overflow: hidden;
		width: 50px;
	}

	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.card-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
		justify-content: center;
		min-width: 0;
	}

	.card-model {
		font-size: 0.875rem;
		font-weight: 500;
		color: #111827;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.card-nickname {
		font-size: 0.8125rem;
		color: #6b7280;
	}

	.card-serial {
		font-size: 0.75rem;
		color: #9ca3af;
	}

	.no-results {
		text-align: center;
		color: #6b7280;
		font-size: 0.875rem;
		padding: 20px;
	}
</style>
