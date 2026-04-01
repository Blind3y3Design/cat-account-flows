<script lang="ts">
	import { auth } from '$lib/stores/auth';

	interface AccountNavProps {
		activeItem?: string;
	}

	let { activeItem = '' }: AccountNavProps = $props();

	function handleSignOut() {
		auth.signOut();
	}
</script>

<nav class="account-nav">
	<div class="nav-section">
		<h3 class="section-title">Quick Actions</h3>
		<div class="nav-links">
			<a href="/dashboard/orders" class="nav-link" class:active={activeItem === 'orders'}>
				Order History
			</a>
			<a href="/dashboard/lists" class="nav-link" class:active={activeItem === 'lists'}>
				Saved Lists
			</a>
			<a href="/dashboard/equipment" class="nav-link" class:active={activeItem === 'equipment'}>
				My Equipment
			</a>
			<a
				href="/dashboard/recently-viewed"
				class="nav-link"
				class:active={activeItem === 'recently-viewed'}
			>
				Recently Viewed
			</a>
		</div>
	</div>

	<div class="nav-section">
		<h3 class="section-title">Parts Ordering</h3>
		<div class="nav-links">
			<a href="/dashboard/invoices" class="nav-link" class:active={activeItem === 'invoices'}>
				Invoices
			</a>
			<a
				href="/dashboard/orders-to-approve"
				class="nav-link"
				class:active={activeItem === 'orders-to-approve'}
			>
				Orders to Approve
			</a>
			<a href="/dashboard/quotes" class="nav-link" class:active={activeItem === 'quotes'}>
				Quotes
			</a>
			<a
				href="/dashboard/core-tracking"
				class="nav-link"
				class:active={activeItem === 'core-tracking'}
			>
				Core Tracking
			</a>
		</div>
	</div>

	<div class="nav-section">
		<h3 class="section-title">Profile</h3>
		<div class="nav-links">
			<a href="/dashboard/personal" class="nav-link" class:active={activeItem === 'personal'}>
				Personal Information
			</a>
			<a href="/dashboard/preferences" class="nav-link" class:active={activeItem === 'preferences'}>
				Preferences
			</a>
			<a href="/dashboard/addresses" class="nav-link" class:active={activeItem === 'addresses'}>
				Address Book
			</a>
			<a href="/dashboard/payment" class="nav-link" class:active={activeItem === 'payment'}>
				Payment Methods
			</a>
			<a href="/dashboard/rewards" class="nav-link" class:active={activeItem === 'rewards'}>
				Cat® Rewards
			</a>
		</div>
	</div>

	<div class="nav-section">
		<h3 class="section-title">My Organizations</h3>
		<div class="nav-links">
			<a href="/dashboard/rewards" class="nav-link" class:active={activeItem === 'rewards'}>
				Organizations & Users
			</a>
		</div>
	</div>

	<div class="nav-section">
		<button class="signout-button" onclick={handleSignOut} type="button">Sign Out</button>
	</div>
</nav>

<style>
	.account-nav {
		display: flex;
		flex-direction: column;
		gap: 32px;
		padding: 24px;
		background-color: #ffffff;
		border-radius: 12px;
		border: 1px solid #e5e7eb;
		min-width: 280px;
		position: sticky;
		top: 24px;
	}

	.nav-section {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.section-title {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #6b7280;
		margin: 0;
	}

	.nav-links {
		display: flex;
		flex-direction: column;
		gap: 0;
		border-top: 1px solid #e5e7eb;
		padding-top: 8px;
	}

	.nav-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 0;
		font-size: 0.9375rem;
		color: #374151;
		text-decoration: none;
		border-bottom: 1px solid #e5e7eb;
		transition: color 150ms ease;
	}

	.nav-link:last-child {
		border-bottom: none;
	}

	.nav-link:hover {
		color: #111827;
	}

	.nav-link.active {
		color: #111827;
		font-weight: 500;
	}

	.nav-link::after {
		content: '';
		width: 0;
		height: 0;
		border-top: 5px solid transparent;
		border-bottom: 5px solid transparent;
		border-left: 6px solid #6b7280;
	}

	.signout-button {
		width: 100%;
		padding: 12px 20px;
		font-size: 0.9375rem;
		font-weight: 500;
		color: #dc2626;
		background-color: transparent;
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		cursor: pointer;
		transition: all 150ms ease;
	}

	.signout-button:hover {
		background-color: #fef2f2;
		border-color: #fecaca;
		color: #b91c1c;
	}
</style>
