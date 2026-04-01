<script lang="ts">
	// My Rewards - placeholder content
</script>

<div class="rewards-page">
	<div class="points-display">
		<span class="points-value">0</span>
		<span class="points-label">Available Points</span>
	</div>
	<p class="placeholder-text">You haven't earned any rewards points yet.</p>
	<p class="helper-text">Earn points on every purchase to unlock exclusive benefits.</p>
</div>

<style>
	.rewards-page {
		text-align: center;
		padding: 40px 20px;
	}

	.points-display {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		padding: 32px;
		background-color: #fef3c7;
		border-radius: 12px;
		margin-bottom: 24px;
	}

	.points-value {
		font-size: 3rem;
		font-weight: 700;
		color: #d97706;
	}

	.points-label {
		font-size: 0.875rem;
		font-weight: 500;
		color: #b45309;
	}

	.placeholder-text {
		font-size: 1rem;
		color: #6b7280;
		margin-bottom: 8px;
	}

	.helper-text {
		font-size: 0.875rem;
		color: #9ca3af;
	}
</style>
