<script lang="ts">
	// Preferences - placeholder with checkboxes
	let emailNotifications = $state(true);
	let smsNotifications = $state(false);
	let marketingEmails = $state(false);
	let language = $state('en');
	let currency = $state('USD');
	let measurementUnit = $state('imperial');

	function handleSave() {
		alert('Preferences saved successfully!');
	}
</script>

<div class="preferences-page">
	<form
		class="preferences-form"
		onsubmit={(e) => {
			e.preventDefault();
			handleSave();
		}}
	>
		<div class="form-section">
			<h3 class="section-title">Notifications</h3>
			<div class="checkbox-group">
				<label class="checkbox-label">
					<input type="checkbox" bind:checked={emailNotifications} />
					<span class="checkbox-text">Email notifications for order updates</span>
				</label>
				<label class="checkbox-label">
					<input type="checkbox" bind:checked={smsNotifications} />
					<span class="checkbox-text">SMS notifications for order updates</span>
				</label>
				<label class="checkbox-label">
					<input type="checkbox" bind:checked={marketingEmails} />
					<span class="checkbox-text">Marketing emails and promotions</span>
				</label>
			</div>
		</div>

		<div class="form-section">
			<h3 class="section-title">Regional Settings</h3>
			<div class="form-grid">
				<div class="form-group">
					<label for="language">Language</label>
					<select id="language" bind:value={language}>
						<option value="en">English</option>
						<option value="es">Español</option>
						<option value="fr">Français</option>
					</select>
				</div>
				<div class="form-group">
					<label for="currency">Currency</label>
					<select id="currency" bind:value={currency}>
						<option value="USD">USD ($)</option>
						<option value="CAD">CAD ($)</option>
						<option value="MXN">MXN ($)</option>
					</select>
				</div>
				<div class="form-group">
					<label for="units">Measurement Units</label>
					<select id="units" bind:value={measurementUnit}>
						<option value="imperial">Imperial (ft, lb)</option>
						<option value="metric">Metric (m, kg)</option>
					</select>
				</div>
			</div>
		</div>

		<div class="form-actions">
			<button type="submit" class="save-button">Save Preferences</button>
		</div>
	</form>
</div>

<style>
	.preferences-page {
		padding: 8px 0;
	}

	.preferences-form {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.form-section {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.section-title {
		font-size: 1rem;
		font-weight: 600;
		color: #111827;
		margin: 0;
		padding-bottom: 8px;
		border-bottom: 1px solid #e5e7eb;
	}

	.checkbox-group {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 12px;
		cursor: pointer;
	}

	.checkbox-label input[type='checkbox'] {
		width: 18px;
		height: 18px;
		accent-color: #ffcd11;
	}

	.checkbox-text {
		font-size: 0.9375rem;
		color: #374151;
	}

	.form-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
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

	.form-group select {
		padding: 10px 12px;
		font-size: 0.9375rem;
		border: 1px solid #d1d5db;
		border-radius: 8px;
		background-color: #ffffff;
		color: #111827;
		transition: border-color 150ms ease;
	}

	.form-group select:focus {
		outline: none;
		border-color: #ffcd11;
		box-shadow: 0 0 0 3px rgba(255, 205, 17, 0.2);
	}

	.form-actions {
		padding-top: 16px;
		border-top: 1px solid #e5e7eb;
	}

	.save-button {
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

	.save-button:hover {
		background-color: #ffe672;
	}

	@media (max-width: 640px) {
		.form-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
