<script lang="ts">
	import heroImage from '$lib/assets/Hero_Desktop.png';
</script>

<div class="hero" style="--background-image: url({heroImage});">
	<div class="hero-content">
		<div class="hero-text">
			<h1>Decrease Downtime</h1>
			<p>Select your store to get the parts you need with speed.</p>
		</div>
		<button class="hero-button">
			<span class="button-label">Get Started</span>
			<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M8.35225 1.54977C8.15699 1.3545 7.84041 1.3545 7.64514 1.54977C7.44988 1.74503 7.44988 2.06161 7.64514 2.25687L12.8883 7.5H1.9043C1.62815 7.5 1.4043 7.72386 1.4043 8C1.4043 8.27614 1.62815 8.5 1.9043 8.5H12.8882L7.64514 13.7431C7.44988 13.9384 7.44988 14.2549 7.64514 14.4502C7.84041 14.6455 8.15699 14.6455 8.35225 14.4502L14.4489 8.35354C14.6442 8.15828 14.6442 7.8417 14.4489 7.64643L8.35225 1.54977Z"
				/>
			</svg>
		</button>
	</div>
</div>

<style>
	.hero {
		display: flex;
		height: 600px;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background:
			linear-gradient(213deg, rgba(0, 0, 0, 0.3) 19.82%, rgba(0, 0, 0, 0.6) 84.63%),
			var(--background-image) no-repeat;
		background-size: cover;
		background-position: center;
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		gap: 24px;
		max-width: 1200px;
		width: 100%;
	}

	.hero-text {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.hero h1 {
		color: #ffffff;
		font-size: 4rem;
		font-weight: 700;
		font-variation-settings: 'wdth' 75;
		line-height: 1.125;
		margin: 0;
	}

	.hero p {
		color: #ffffff;
		font-size: 1rem;
		line-height: 1.5;
		margin: 0;
	}

	.hero-button {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		padding: 16px 24px;
		background-color: #ffcd11;
		font-weight: 600;
		color: #3f3f3f;
		font-size: 0.875rem;
		border: 1px solid #ffcd11;
		border-radius: 9999px;
		cursor: pointer;
		text-decoration: none;
		transition: all 0.25s ease-in-out;
		max-width: 200px;
	}
	.hero-button:hover,
	.hero-button:focus {
		background-color: #ffe672;
		border-color: #ffe672;
	}
</style>
