<script lang="ts">
	import filtersImage from '$lib/assets/filters.png';
</script>

<div class="tip-row">
	<div class="tip-row__inner">
		<div class="tip-callout">
			<h2 class="tip-callout__title">
				Some Beautifully Written Text About How Much Our Customers Care
			</h2>

			<button class="tip-callout__button" type="button">Watch More</button>
		</div>
		<a href="" class="feature-card" style="--background-image: url({filtersImage})">
			<p class="feature-card__content">
				<span class="feature-card__label">How To Change The Air Filter On Your 990K </span>
			</p>
		</a>
		<a href="" class="feature-card" style="--background-image: url({filtersImage})">
			<p class="feature-card__content">
				<span class="feature-card__label">Lorem Ipsum Rosemary Lorem Ipsum Lorem Ipsum </span>
			</p>
		</a>
	</div>
</div>

<style>
	.tip-row {
		align-items: center;
		display: flex;
		justify-content: center;
		padding-block: 32px;
		padding-inline: 32px;
	}
	.tip-row__inner {
		align-items: stretch;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(350px, 100%), 1fr));
		gap: 16px;
		max-width: 1200px;
		width: 100%;

		@media (min-width: 1024px) {
			grid-template-columns: 2fr 1fr 1fr;
		}
	}

	.tip-callout {
		align-items: center;
		border: 1px solid #cccccc;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 32px;
		padding: 24px 40px;
	}

	.tip-callout__title {
		font-size: 2rem;
		font-weight: 700;
		font-variation-settings: 'wdth' 75;
		line-height: 1.2;
		margin: 0;
	}

	.tip-callout__button {
		background-color: #ffffff;
		border: 1px solid #000000;
		border-radius: 4px;
		color: #000000;
		font-weight: 600;
		padding: 12px 24px;
		width: 100%;
	}

	.tip-callout__button:hover,
	.tip-callout__button:focus {
		background-color: #f2f2f2;
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
		font-size: 1.25rem;
		font-weight: 600;
		font-variation-settings: 'wdth' 75;
		gap: 8px;
		justify-content: space-between;
		justify-self: end;
		margin: 0;
		width: 100%;
	}
</style>
