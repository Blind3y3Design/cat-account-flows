<script lang="ts">
	import Drawer from '$lib/components/Drawer.svelte';
	import SignInDrawer from '$lib/components/SignInDrawer.svelte';
	import MyEquipmentDrawer from '$lib/components/MyEquipmentDrawer.svelte';
	import SelectStoreDrawer from '$lib/components/SelectStoreDrawer.svelte';

	let drawerOpen = $state(false);
	let drawerTitle = $state('Drawer Title');
	let drawerSubtitle = $state('');

	let signInDrawerOpen = $state(false);
	let myEquipmentDrawerOpen = $state(false);
	let selectStoreDrawerOpen = $state(false);

	function openDrawer() {
		drawerOpen = true;
	}

	function closeDrawer() {
		drawerOpen = false;
	}

	function openWithSubtitle() {
		drawerTitle = 'Settings';
		drawerSubtitle = 'Manage your account preferences';
		drawerOpen = true;
	}

	function openWithoutSubtitle() {
		drawerTitle = 'Notifications';
		drawerSubtitle = '';
		drawerOpen = true;
	}
</script>

<main class="page">
	<h1>Drawer Component Demo</h1>
	<p>Click the buttons below to open different drawer examples.</p>

	<div class="button-group">
		<button onclick={openWithSubtitle}>Open with Subtitle</button>
		<button onclick={openWithoutSubtitle}>Open without Subtitle</button>
		<button onclick={openDrawer}>Open Default</button>
		<button class="signin" onclick={() => (signInDrawerOpen = true)}>Open Sign In Drawer</button>
		<button class="equipment" onclick={() => (myEquipmentDrawerOpen = true)}
			>Open My Equipment Drawer</button
		>
		<button class="store" onclick={() => (selectStoreDrawerOpen = true)}
			>Open Select Store Drawer</button
		>
	</div>

	<Drawer
		bind:open={drawerOpen}
		title={drawerTitle}
		subtitle={drawerSubtitle || undefined}
		onclose={closeDrawer}
	>
		<div class="drawer-content">
			<p>This is the body content of the drawer.</p>
			<p>You can add any content here including forms, lists, or other components.</p>

			<h3>Example Form Fields</h3>
			<form class="example-form">
				<label>
					<span>Name</span>
					<input type="text" placeholder="Enter your name" />
				</label>
				<label>
					<span>Email</span>
					<input type="email" placeholder="Enter your email" />
				</label>
				<label>
					<span>Message</span>
					<textarea placeholder="Enter your message"></textarea>
				</label>
			</form>

			<p>Scroll to see more content if needed...</p>
			<div class="spacer"></div>
			<p>End of content</p>
		</div>

		{#snippet footer()}
			<div class="footer-actions">
				<button class="secondary" onclick={closeDrawer}>Cancel</button>
				<button class="primary" onclick={closeDrawer}>Save Changes</button>
			</div>
		{/snippet}
	</Drawer>

	<SignInDrawer bind:open={signInDrawerOpen} />

	<MyEquipmentDrawer bind:open={myEquipmentDrawerOpen} />

	<SelectStoreDrawer bind:open={selectStoreDrawerOpen} />
</main>

<style>
	.page {
		padding: 48px;
		max-width: 800px;
		margin: 0 auto;
	}

	h1 {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 16px;
	}

	p {
		color: #6b7280;
		margin-bottom: 24px;
	}

	.button-group {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}

	button {
		padding: 10px 20px;
		font-size: 0.875rem;
		font-weight: 500;
		border-radius: 6px;
		cursor: pointer;
		transition: all 150ms ease;
	}

	button:not(.secondary):not(.primary) {
		background-color: #3b82f6;
		color: white;
		border: none;
	}

	button:not(.secondary):not(.primary):hover {
		background-color: #2563eb;
	}

	button.signin {
		background-color: #f59e0b;
		color: white;
		border: none;
	}

	button.signin:hover {
		background-color: #d97706;
	}

	button.equipment {
		background-color: #10b981;
		color: white;
		border: none;
	}

	button.equipment:hover {
		background-color: #059669;
	}

	button.store {
		background-color: #8b5cf6;
		color: white;
		border: none;
	}

	button.store:hover {
		background-color: #7c3aed;
	}

	.drawer-content {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.drawer-content h3 {
		font-size: 1rem;
		font-weight: 600;
		margin-top: 8px;
	}

	.example-form {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.example-form label {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.example-form span {
		font-size: 0.875rem;
		font-weight: 500;
		color: #374151;
	}

	.example-form input,
	.example-form textarea {
		padding: 10px 12px;
		border: 1px solid #d1d5db;
		border-radius: 6px;
		font-size: 0.875rem;
		transition:
			border-color 150ms ease,
			box-shadow 150ms ease;
	}

	.example-form input:focus,
	.example-form textarea:focus {
		outline: none;
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
	}

	.example-form textarea {
		min-height: 100px;
		resize: vertical;
	}

	.spacer {
		height: 400px;
		background: linear-gradient(to bottom, #f3f4f6, #e5e7eb);
		border-radius: 8px;
	}

	.footer-actions {
		display: flex;
		justify-content: flex-end;
		gap: 12px;
	}

	.footer-actions .primary {
		background-color: #3b82f6;
		color: white;
		border: none;
	}

	.footer-actions .primary:hover {
		background-color: #2563eb;
	}

	.footer-actions .secondary {
		background-color: white;
		color: #374151;
		border: 1px solid #d1d5db;
	}

	.footer-actions .secondary:hover {
		background-color: #f9fafb;
	}
</style>
