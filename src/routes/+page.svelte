<script lang="ts">
	import TopNav from '$lib/components/TopNav.svelte';
	import HomeHero from '$lib/components/HomeHero.svelte';
	import FeaturedCategories from '$lib/components/FeaturedCategories.svelte';
	import HomeInterstitial from '$lib/components/HomeInterstitial.svelte';
	import AllCategories from '$lib/components/AllCategories.svelte';
	import EquipmentRow from '$lib/components/EquipmentRow.svelte';
	import TipsRow from '$lib/components/TipsRow.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<TopNav />

<main class="home-page">
	<HomeHero />
	<FeaturedCategories />
	<HomeInterstitial />
	<AllCategories />
	<EquipmentRow />
	<TipsRow />
	<Footer />
</main>

<style>
</style>
