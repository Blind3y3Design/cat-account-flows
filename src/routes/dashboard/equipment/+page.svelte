<script lang="ts">
	import { currentUser } from '$lib/stores/auth';

	let user = $derived($currentUser);
	let equipment = $derived(user?.equipment ?? []);
</script>

<div class="equipment-page">
	{#if equipment.length > 0}
		<div class="equipment-grid">
			{#each equipment as item (item.id)}
				<div class="equipment-card">
					<div class="equipment-image">
						<img src={item.thumbnail} alt={item.modelName} />
					</div>
					<div class="equipment-info">
						<h3 class="model-name">{item.modelName}</h3>
						{#if item.nickname}
							<p class="nickname">{item.nickname}</p>
						{/if}
						{#if item.serialNumber}
							<p class="serial">S/N: {item.serialNumber}</p>
						{/if}
					</div>
					<div class="equipment-actions">
						<a href="/" class="action-btn">Shop Parts</a>
						<a href="/" class="action-btn secondary">Diagram</a>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p class="placeholder-text">You haven't added any equipment yet.</p>
		<a href="/" class="add-equipment">Add Your First Equipment</a>
	{/if}
</div>

<style>
	.equipment-page {
		padding: 8px 0;
	}

	.equipment-grid {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.equipment-card {
		display: flex;
		gap: 16px;
		padding: 16px;
		background-color: #f9fafb;
		border-radius: 10px;
		border: 1px solid #e5e7eb;
	}

	.equipment-image {
		width: 80px;
		height: 80px;
		border-radius: 8px;
		overflow: hidden;
		background-color: #ffffff;
		flex-shrink: 0;
	}

	.equipment-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.equipment-info {
		flex: 1;
		min-width: 0;
	}

	.model-name {
		font-size: 1rem;
		font-weight: 600;
		color: #111827;
		margin: 0 0 4px;
	}

	.nickname {
		font-size: 0.875rem;
		color: #6b7280;
		margin: 0 0 4px;
	}

	.serial {
		font-size: 0.8125rem;
		color: #9ca3af;
		margin: 0;
	}

	.equipment-actions {
		display: flex;
		flex-direction: column;
		gap: 8px;
		justify-content: center;
	}

	.action-btn {
		padding: 8px 16px;
		font-size: 0.8125rem;
		font-weight: 500;
		text-align: center;
		border-radius: 6px;
		text-decoration: none;
		transition: all 150ms ease;
	}

	.action-btn:not(.secondary) {
		background-color: #ffcd11;
		color: #000000;
	}

	.action-btn:not(.secondary):hover {
		background-color: #ffe672;
	}

	.action-btn.secondary {
		background-color: #ffffff;
		color: #374151;
		border: 1px solid #d1d5db;
	}

	.action-btn.secondary:hover {
		background-color: #f3f4f6;
	}

	.placeholder-text {
		font-size: 1rem;
		color: #6b7280;
		text-align: center;
		padding: 40px 20px;
	}

	.add-equipment {
		display: block;
		width: fit-content;
		margin: 0 auto;
		padding: 12px 24px;
		background-color: #ffcd11;
		color: #000000;
		font-weight: 500;
		border-radius: 8px;
		text-decoration: none;
		transition: background-color 150ms ease;
	}

	.add-equipment:hover {
		background-color: #ffe672;
	}
</style>
