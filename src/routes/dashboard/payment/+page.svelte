<script lang="ts">
	// Payment Methods - placeholder
	let hasPaymentMethod = $state(false);

	function handleAddCard() {
		// In a real app, this would open a modal or form
		alert('Add payment method functionality would open here');
	}
</script>

<div class="payment-page">
	{#if hasPaymentMethod}
		<div class="payment-card">
			<div class="card-info">
				<span class="card-type">Visa ending in 4242</span>
				<span class="card-expiry">Expires 12/2026</span>
			</div>
			<div class="card-actions">
				<button class="edit-btn">Edit</button>
				<button class="delete-btn">Remove</button>
			</div>
		</div>
	{:else}
		<div class="empty-state">
			<div class="empty-icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="48"
					height="48"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
					<line x1="1" y1="10" x2="23" y2="10"></line>
				</svg>
			</div>
			<p class="placeholder-text">You haven't added any payment methods yet.</p>
			<button class="add-button" onclick={handleAddCard}>Add Payment Method</button>
		</div>
	{/if}
</div>

<style>
	.payment-page {
		padding: 8px 0;
	}

	.empty-state {
		text-align: center;
		padding: 40px 20px;
	}

	.empty-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 80px;
		height: 80px;
		background-color: #f3f4f6;
		border-radius: 50%;
		margin-bottom: 20px;
		color: #9ca3af;
	}

	.placeholder-text {
		font-size: 1rem;
		color: #6b7280;
		margin-bottom: 24px;
	}

	.add-button {
		padding: 12px 24px;
		background-color: #ffcd11;
		color: #000000;
		font-size: 0.9375rem;
		font-weight: 500;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: background-color 150ms ease;
	}

	.add-button:hover {
		background-color: #ffe672;
	}

	.payment-card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px;
		background-color: #f9fafb;
		border-radius: 10px;
		border: 1px solid #e5e7eb;
	}

	.card-info {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.card-type {
		font-size: 1rem;
		font-weight: 500;
		color: #111827;
	}

	.card-expiry {
		font-size: 0.875rem;
		color: #6b7280;
	}

	.card-actions {
		display: flex;
		gap: 8px;
	}

	.edit-btn,
	.delete-btn {
		padding: 8px 16px;
		font-size: 0.8125rem;
		font-weight: 500;
		border-radius: 6px;
		cursor: pointer;
		transition: all 150ms ease;
	}

	.edit-btn {
		background-color: #ffffff;
		color: #374151;
		border: 1px solid #d1d5db;
	}

	.edit-btn:hover {
		background-color: #f3f4f6;
	}

	.delete-btn {
		background-color: #ffffff;
		color: #dc2626;
		border: 1px solid #fecaca;
	}

	.delete-btn:hover {
		background-color: #fef2f2;
	}
</style>
