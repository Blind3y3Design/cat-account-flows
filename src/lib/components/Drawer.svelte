<script lang="ts">
	import type { Snippet } from 'svelte';

	interface DrawerProps {
		open: boolean;
		title: string;
		subtitle?: string | Snippet;
		onclose?: () => void;
		children: Snippet;
		footer?: Snippet;
	}

	let { open = $bindable(), title, subtitle, onclose, children, footer }: DrawerProps = $props();

	let drawerElement: HTMLElement | undefined = $state();
	let previousActiveElement: HTMLElement | null = $state(null);

	function handleClose() {
		if (onclose) {
			onclose();
		} else {
			open = false;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) {
			handleClose();
			return;
		}

		if (event.key === 'Tab' && open && drawerElement) {
			const focusableElements = drawerElement.querySelectorAll<HTMLElement>(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
			const firstElement = focusableElements[0];
			const lastElement = focusableElements[focusableElements.length - 1];

			if (event.shiftKey) {
				if (document.activeElement === firstElement) {
					event.preventDefault();
					lastElement?.focus();
				}
			} else {
				if (document.activeElement === lastElement) {
					event.preventDefault();
					firstElement?.focus();
				}
			}
		}
	}

	// Focus management when drawer opens
	$effect(() => {
		if (open) {
			// Store the currently focused element to restore later
			previousActiveElement = document.activeElement as HTMLElement;

			// Move focus to the first focusable element in the drawer after a brief delay
			// to allow the drawer to render
			setTimeout(() => {
				if (drawerElement) {
					const firstFocusable = drawerElement.querySelector<HTMLElement>(
						'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
					);
					if (firstFocusable) {
						firstFocusable.focus();
					} else {
						// If no focusable element, focus the drawer itself
						drawerElement.focus();
					}
				}
			}, 50);
		} else if (previousActiveElement) {
			// Restore focus to the previous element when drawer closes
			previousActiveElement.focus();
			previousActiveElement = null;
		}
	});

	// Prevent body/html scroll when drawer is open
	$effect(() => {
		if (open) {
			const style = document.createElement('style');
			style.id = 'drawer-scroll-lock';
			style.textContent = 'body, html { overflow: hidden !important; }';
			document.head.appendChild(style);

			return () => {
				document.head.removeChild(style);
			};
		}
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div class="drawer-overlay" onclick={handleClose} role="presentation"></div>
{/if}

<aside bind:this={drawerElement} class="drawer" class:open aria-hidden={!open} tabindex={-1}>
	<header class="drawer-header">
		<div class="header-content">
			<h2 class="title">{title}</h2>
			{#if subtitle}
				{#if typeof subtitle === 'string'}
					<p class="subtitle">{subtitle}</p>
				{:else}
					{@render subtitle()}
				{/if}
			{/if}
		</div>
		<button class="close-button" onclick={handleClose} aria-label="Close drawer" type="button">
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
				<line x1="18" y1="6" x2="6" y2="18"></line>
				<line x1="6" y1="6" x2="18" y2="18"></line>
			</svg>
		</button>
	</header>

	<div class="drawer-body">
		{@render children()}
	</div>

	{#if footer}
		<footer class="drawer-footer">
			{@render footer()}
		</footer>
	{/if}
</aside>

<style>
	.drawer-overlay {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999;
		animation: fadeIn 300ms ease-out forwards;
	}

	.drawer {
		position: fixed;
		top: 0;
		right: 0;
		width: 464px;
		height: 100vh;
		background-color: #ffffff;
		z-index: 1000;
		display: flex;
		flex-direction: column;
		box-shadow: -4px 0 16px rgba(0, 0, 0, 0.1);
		transform: translateX(100%);
		transition: transform 300ms ease-out;
	}

	.drawer.open {
		transform: translateX(0);
	}

	.drawer-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		padding: 16px;
		border-bottom: 1px solid #cccccc;
		gap: 16px;
		flex-shrink: 0;
	}

	.header-content {
		flex: 1;
		min-width: 0;
	}

	.title {
		font-size: 1.25rem;
		font-weight: 600;
		color: #111827;
		margin: 0;
		line-height: 1.4;
	}

	.subtitle {
		font-size: 0.875rem;
		color: #6b7280;
		margin: 4px 0 0;
		line-height: 1.5;
	}

	.close-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		padding: 0;
		border: none;
		background: transparent;
		color: #6b7280;
		cursor: pointer;
		border-radius: 6px;
		transition:
			background-color 150ms ease,
			color 150ms ease;
		flex-shrink: 0;
	}

	.close-button:hover {
		background-color: #f3f4f6;
		color: #111827;
	}

	.close-button:focus-visible {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}

	.drawer-body {
		flex: 1;
		overflow-y: auto;
		padding: 16px;
	}

	.drawer-footer {
		flex-shrink: 0;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
