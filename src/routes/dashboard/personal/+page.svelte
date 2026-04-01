<script lang="ts">
	import { currentUser } from '$lib/stores/auth';

	let user = $derived($currentUser);

	// Form state
	let firstName = $state(user?.firstName ?? '');
	let lastName = $state(user?.lastName ?? '');
	let email = $state(user?.email ?? '');
	let phoneNumber = $state(user?.phoneNumber ?? '');
	let companyName = $state(user?.companyName ?? '');
	let industry = $state(user?.industry ?? '');

	function handleSave() {
		// In a real app, this would save to the backend
		alert('Changes saved successfully!');
	}
</script>

<div class="personal-page">
	<form
		class="personal-form"
		onsubmit={(e) => {
			e.preventDefault();
			handleSave();
		}}
	>
		<div class="form-section">
			<h3 class="section-title">Contact Information</h3>
			<div class="form-grid">
				<div class="form-group">
					<label for="firstName">First Name</label>
					<input type="text" id="firstName" bind:value={firstName} />
				</div>
				<div class="form-group">
					<label for="lastName">Last Name</label>
					<input type="text" id="lastName" bind:value={lastName} />
				</div>
				<div class="form-group">
					<label for="email">Email</label>
					<input type="email" id="email" bind:value={email} />
				</div>
				<div class="form-group">
					<label for="phone">Phone Number</label>
					<input type="tel" id="phone" bind:value={phoneNumber} placeholder="+1 (555) 123-4567" />
				</div>
			</div>
		</div>

		<div class="form-section">
			<h3 class="section-title">Company Information</h3>
			<div class="form-grid">
				<div class="form-group">
					<label for="companyName">Company Name</label>
					<input type="text" id="companyName" bind:value={companyName} />
				</div>
				<div class="form-group">
					<label for="industry">Industry</label>
					<select id="industry" bind:value={industry}>
						<option value="">Select Industry</option>
						<option value="construction">Construction</option>
						<option value="mining">Mining</option>
						<option value="forestry">Forestry</option>
						<option value="energy">Energy</option>
						<option value="transportation">Transportation</option>
						<option value="agriculture">Agriculture</option>
						<option value="other">Other</option>
					</select>
				</div>
			</div>
		</div>

		<div class="form-section">
			<h3 class="section-title">MFA Settings</h3>
			<div class="mfa-info">
				<div class="mfa-status">
					<span class="status-label">Status:</span>
					<span class="status-value">{user?.mfaSettings?.enabled ? 'Enabled' : 'Disabled'}</span>
				</div>
				<div class="mfa-status">
					<span class="status-label">Method:</span>
					<span class="status-value">{user?.mfaSettings?.method ?? 'None'}</span>
				</div>
				<div class="mfa-status">
					<span class="status-label">Verified:</span>
					<span class="status-value">{user?.mfaSettings?.verified ? 'Yes' : 'No'}</span>
				</div>
			</div>
		</div>

		<div class="form-actions">
			<button type="submit" class="save-button">Save Changes</button>
		</div>
	</form>
</div>

<style>
	.personal-page {
		padding: 8px 0;
	}

	.personal-form {
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

	.form-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
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

	.mfa-info {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 16px;
		background-color: #f9fafb;
		border-radius: 8px;
	}

	.mfa-status {
		display: flex;
		gap: 8px;
	}

	.status-label {
		font-size: 0.875rem;
		color: #6b7280;
	}

	.status-value {
		font-size: 0.875rem;
		font-weight: 500;
		color: #111827;
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
