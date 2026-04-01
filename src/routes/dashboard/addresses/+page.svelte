<script lang="ts">
	import { currentUser } from '$lib/stores/auth';

	let user = $derived($currentUser);

	// Default address from user profile
	let streetAddress = $state(user?.streetAddress ?? '');
	let city = $state(user?.city ?? '');
	let stateRegion = $state(user?.state ?? '');
	let zipCode = $state(user?.zipCode ?? '');
	let country = $state(user?.country ?? 'United States');

	function handleSave() {
		alert('Address saved successfully!');
	}
</script>

<div class="addresses-page">
	<div class="address-card">
		<h3 class="card-title">Default Address</h3>
		<form
			class="address-form"
			onsubmit={(e) => {
				e.preventDefault();
				handleSave();
			}}
		>
			<div class="form-group">
				<label for="street">Street Address</label>
				<input type="text" id="street" bind:value={streetAddress} />
			</div>

			<div class="form-row">
				<div class="form-group">
					<label for="city">City</label>
					<input type="text" id="city" bind:value={city} />
				</div>
				<div class="form-group">
					<label for="state">State</label>
					<input type="text" id="state" bind:value={stateRegion} />
				</div>
			</div>

			<div class="form-row">
				<div class="form-group">
					<label for="zip">ZIP Code</label>
					<input type="text" id="zip" bind:value={zipCode} />
				</div>
				<div class="form-group">
					<label for="country">Country</label>
					<select id="country" bind:value={country}>
						<option value="United States">United States</option>
						<option value="Canada">Canada</option>
						<option value="Mexico">Mexico</option>
					</select>
				</div>
			</div>

			<div class="form-actions">
				<button type="submit" class="save-button">Save Address</button>
			</div>
		</form>
	</div>
</div>

<style>
	.addresses-page {
		padding: 8px 0;
	}

	.address-card {
		padding: 20px;
		background-color: #f9fafb;
		border-radius: 10px;
		border: 1px solid #e5e7eb;
	}

	.card-title {
		font-size: 1rem;
		font-weight: 600;
		color: #111827;
		margin: 0 0 20px;
	}

	.address-form {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 6px;
		flex: 1;
	}

	.form-group label {
		font-size: 0.875rem;
		font-weight: 500;
		color: #374151;
	}

	.form-group input,
	.form-group select {
		padding: 10px 12px;
		font-size: 0.9375rem;
		border: 1px solid #d1d5db;
		border-radius: 8px;
		background-color: #ffffff;
		color: #111827;
		transition: border-color 150ms ease;
	}

	.form-group input:focus,
	.form-group select:focus {
		outline: none;
		border-color: #ffcd11;
		box-shadow: 0 0 0 3px rgba(255, 205, 17, 0.2);
	}

	.form-row {
		display: flex;
		gap: 16px;
	}

	.form-actions {
		margin-top: 8px;
	}

	.save-button {
		padding: 10px 20px;
		background-color: #ffcd11;
		color: #000000;
		font-size: 0.9375rem;
		font-weight: 500;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: background-color 150ms ease;
	}

	.save-button:hover {
		background-color: #ffe672;
	}

	@media (max-width: 640px) {
		.form-row {
			flex-direction: column;
		}
	}
</style>
