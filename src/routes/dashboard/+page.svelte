<script lang="ts">
	import { currentUser } from '$lib/stores/auth';

	let user = $derived($currentUser);
</script>

<header class="page-header">
	<h1>Welcome, {user?.firstName}</h1>
	<p class="subtitle">Manage your account and equipment</p>
</header>

<div class="overview-cards">
	<div class="overview-card">
		<div class="card-icon equipment">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<rect x="2" y="6" width="20" height="12" rx="2"></rect>
				<circle cx="8" cy="12" r="2"></circle>
				<circle cx="16" cy="12" r="2"></circle>
			</svg>
		</div>
		<div class="card-content">
			<span class="card-value">{user?.equipment?.length ?? 0}</span>
			<span class="card-label">Equipment Items</span>
		</div>
		<a href="/dashboard/equipment" class="card-link">View All</a>
	</div>

	<div class="overview-card">
		<div class="card-icon orders">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
				<line x1="3" y1="6" x2="21" y2="6"></line>
				<path d="M16 10a4 4 0 0 1-8 0"></path>
			</svg>
		</div>
		<div class="card-content">
			<span class="card-value">0</span>
			<span class="card-label">Recent Orders</span>
		</div>
		<a href="/dashboard/orders" class="card-link">View All</a>
	</div>

	<div class="overview-card">
		<div class="card-icon lists">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<line x1="8" y1="6" x2="21" y2="6"></line>
				<line x1="8" y1="12" x2="21" y2="12"></line>
				<line x1="8" y1="18" x2="21" y2="18"></line>
				<line x1="3" y1="6" x2="3.01" y2="6"></line>
				<line x1="3" y1="12" x2="3.01" y2="12"></line>
				<line x1="3" y1="18" x2="3.01" y2="18"></line>
			</svg>
		</div>
		<div class="card-content">
			<span class="card-value">0</span>
			<span class="card-label">Saved Lists</span>
		</div>
		<a href="/dashboard/lists" class="card-link">View All</a>
	</div>

	<div class="overview-card">
		<div class="card-icon rewards">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<circle cx="12" cy="8" r="7"></circle>
				<polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
			</svg>
		</div>
		<div class="card-content">
			<span class="card-value">0</span>
			<span class="card-label">Reward Points</span>
		</div>
		<a href="/dashboard/rewards" class="card-link">View All</a>
	</div>
</div>

<section class="info-section">
	<h2>Account Information</h2>
	<div class="info-grid">
		<div class="info-item">
			<span class="info-label">Email</span>
			<span class="info-value">{user?.email}</span>
		</div>
		<div class="info-item">
			<span class="info-label">Phone</span>
			<span class="info-value">{user?.phoneNumber || 'Not provided'}</span>
		</div>
		<div class="info-item">
			<span class="info-label">Company</span>
			<span class="info-value">{user?.companyName || 'Not provided'}</span>
		</div>
		<div class="info-item">
			<span class="info-label">Location</span>
			<span class="info-value">
				{#if user?.city && user?.state}
					{user.city}, {user.state}
				{:else}
					Not provided
				{/if}
			</span>
		</div>
	</div>
	<a href="/dashboard/personal" class="edit-link">Edit Personal Information</a>
</section>

<style>
	.page-header {
		margin-bottom: 32px;
	}

	.page-header h1 {
		font-size: 1.75rem;
		font-weight: 700;
		color: #111827;
		margin: 0 0 8px;
	}

	.subtitle {
		font-size: 1rem;
		color: #6b7280;
		margin: 0;
	}

	.overview-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 20px;
		margin-bottom: 40px;
	}

	.overview-card {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 20px;
		background-color: #ffffff;
		border-radius: 12px;
		border: 1px solid #e5e7eb;
	}

	.card-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border-radius: 10px;
		flex-shrink: 0;
	}

	.card-icon.equipment {
		background-color: #fef3c7;
		color: #d97706;
	}

	.card-icon.orders {
		background-color: #dbeafe;
		color: #2563eb;
	}

	.card-icon.lists {
		background-color: #d1fae5;
		color: #059669;
	}

	.card-icon.rewards {
		background-color: #fce7f3;
		color: #db2777;
	}

	.card-content {
		flex: 1;
		min-width: 0;
	}

	.card-value {
		display: block;
		font-size: 1.5rem;
		font-weight: 700;
		color: #111827;
	}

	.card-label {
		display: block;
		font-size: 0.8125rem;
		color: #6b7280;
	}

	.card-link {
		font-size: 0.8125rem;
		font-weight: 500;
		color: #2563eb;
		text-decoration: none;
		white-space: nowrap;
	}

	.card-link:hover {
		color: #1d4ed8;
		text-decoration: underline;
	}

	.info-section {
		background-color: #ffffff;
		border-radius: 12px;
		border: 1px solid #e5e7eb;
		padding: 24px;
	}

	.info-section h2 {
		font-size: 1.125rem;
		font-weight: 600;
		color: #111827;
		margin: 0 0 20px;
	}

	.info-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 20px;
		margin-bottom: 20px;
	}

	.info-item {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.info-label {
		font-size: 0.75rem;
		font-weight: 500;
		color: #6b7280;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.info-value {
		font-size: 0.9375rem;
		color: #111827;
	}

	.edit-link {
		font-size: 0.875rem;
		font-weight: 500;
		color: #2563eb;
		text-decoration: none;
	}

	.edit-link:hover {
		color: #1d4ed8;
		text-decoration: underline;
	}
</style>
