<script lang="ts">
</script>

<div class="interstitial">
	<div class="interstitial__inner">
		<div class="interstitial-text">
			<h2>Need Help Finding Parts?</h2>
			<p>Let's take a closer look.</p>
		</div>
		<button class="interstitial-button">View Parts Diagram</button>
	</div>
</div>

<style>
	.interstitial {
		align-items: center;
		background: #000000;
		display: flex;
		justify-content: center;
		padding-block: 40px;
		padding-inline: 32px;
	}

	.interstitial__inner {
		align-items: center;
		display: flex;
		gap: 32px;
		flex-direction: row;
		justify-content: space-between;
		max-width: 1200px;
		width: 100%;
	}

	.interstitial-text {
		align-items: center;
		color: #ffffff;
		display: flex;
		flex-direction: row;
		gap: 16px;
	}

	.interstitial-text h2 {
		font-size: 2.5rem;
		font-weight: 700;
		font-variation-settings: 'wdth' 75;
		line-height: 1.2;
		margin: 0;
	}

	.interstitial-text p {
		font-size: 1.25rem;
		line-height: 1.4;
		margin: 0;
	}

	.interstitial-button {
		align-items: center;
		background-color: #ffffff;
		border: 1px solid #ffffff;
		border-radius: 4px;
		color: #000000;
		display: flex;
		font-size: 1rem;
		font-weight: 600;
		padding: 16px 24px;
	}

	.interstitial-button:hover,
	.interstitial-button:focus {
		background-color: #f2f2f2;
	}
</style>
