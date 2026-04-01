<script lang="ts">
	import TopNav from '$lib/components/TopNav.svelte';
	import AccountNav from '$lib/components/AccountNav.svelte';
	import { isAuthenticated } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	interface DashboardLayoutProps {
		activeItem?: string;
		title?: string;
		children?: import('svelte').Snippet;
	}

	let { activeItem = '', title = 'Dashboard', children }: DashboardLayoutProps = $props();

	// Redirect if not authenticated
	onMount(() => {
		if (!$isAuthenticated) {
			goto('/');
		}
	});
</script>

<svelte:head>
	<title>{title} | Caterpillar Parts</title>
</svelte:head>

<TopNav />

<main class="dashboard-page">
	<aside class="sidebar">
		<AccountNav {activeItem} />
	</aside>

	<div class="content">
		<header class="page-header">
			<h1>{title}</h1>
		</header>

		<div class="page-content">
			{@render children?.()}
		</div>
	</div>
</main>

<style>
	.dashboard-page {
		display: flex;
		gap: 32px;
		padding: 32px;
		max-width: 1400px;
		margin: 0 auto;
		min-height: calc(100vh - 80px);
		background-color: #f9fafb;
	}

	.sidebar {
		flex-shrink: 0;
	}

	.content {
		flex: 1;
		min-width: 0;
	}

	.page-header {
		margin-bottom: 24px;
	}

	.page-header h1 {
		font-size: 1.75rem;
		font-weight: 700;
		color: #111827;
		margin: 0;
	}

	.page-content {
		background-color: #ffffff;
		border-radius: 12px;
		border: 1px solid #e5e7eb;
		padding: 24px;
	}

	@media (max-width: 1024px) {
		.dashboard-page {
			flex-direction: column;
		}

		.sidebar {
			width: 100%;
		}

		.sidebar :global(.account-nav) {
			position: static;
		}
	}

	@media (max-width: 640px) {
		.dashboard-page {
			padding: 16px;
		}

		.page-content {
			padding: 16px;
		}
	}
</style>
