<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
	:global(*) {
		font-family: 'Roboto Flex', sans-serif;
	}

	:global(body) {
		margin: 0;
		padding: 0;
	}

	:global(a) {
		text-decoration: none;
		color: inherit;
	}
</style>
