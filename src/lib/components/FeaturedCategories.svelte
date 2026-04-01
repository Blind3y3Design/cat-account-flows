<script lang="ts">
	import filtersImage from '$lib/assets/filters.png';
	import fluidsImage from '$lib/assets/fluids.png';
	import workshopImage from '$lib/assets/workshop.png';
	import hardwareImage from '$lib/assets/hardware.png';
</script>

<div class="featured-categories">
	<h2>We Have What You Need</h2>
	<div class="feature-cards">
		<a href="" class="feature-card" style="--background-image: url({filtersImage})">
			<p class="feature-card__content">
				<span class="feature-card__label">Filters</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<polyline points="9 18 15 12 9 6"></polyline>
				</svg>
			</p>
		</a>
		<a href="" class="feature-card" style="--background-image: url({fluidsImage})">
			<p class="feature-card__content">
				<span class="feature-card__label">Fluids</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<polyline points="9 18 15 12 9 6"></polyline>
				</svg>
			</p>
		</a>
		<a href="" class="feature-card" style="--background-image: url({workshopImage})">
			<p class="feature-card__content">
				<span class="feature-card__label">Workshop Supplies</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<polyline points="9 18 15 12 9 6"></polyline>
				</svg>
			</p>
		</a>
		<a href="" class="feature-card" style="--background-image: url({hardwareImage})">
			<p class="feature-card__content">
				<span class="feature-card__label">Hardware</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<polyline points="9 18 15 12 9 6"></polyline>
				</svg>
			</p>
		</a>
	</div>
</div>

<style>
	.featured-categories {
		align-items: center;
		display: flex;
		gap: 16px;
		flex-direction: column;
		justify-content: center;
		padding-block: 32px;
		padding-inline: 32px;
	}

	.featured-categories h2 {
		color: #000000;
		font-size: 2.5rem;
		font-variation-settings: 'wdth' 75;
		margin: 0;
		max-width: 1200px;
		width: 100%;
	}

	.feature-cards {
		display: grid;
		gap: 16px;
		grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
		max-width: 1200px;
		width: 100%;
	}

	.feature-card {
		align-items: end;
		display: flex;
		background:
			linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, #000 100%),
			var(--background-image) no-repeat;
		background-size: cover;
		background-position: center;
		border-radius: 8px;
		height: 400px;
		padding: 24px 20px;
		transition: background 0.25s ease-in-out;
	}

	.feature-card:hover,
	.feature-card:focus {
		background:
			linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%),
			linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, #000 100%),
			var(--background-image) no-repeat;
		background-size: cover;
		background-position: center;
	}

	.feature-card__content {
		align-items: center;
		color: #ffffff;
		display: flex;
		font-size: 1.5rem;
		font-weight: 600;
		font-variation-settings: 'wdth' 75;
		gap: 8px;
		justify-content: space-between;
		justify-self: end;
		margin: 0;
		width: 100%;
	}
</style>
