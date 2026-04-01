<script lang="ts">
	import equipmentImage from '$lib/assets/equipment-banner.png';
</script>

<div class="equipment-row">
	<div class="equipment-banner">
		<img src={equipmentImage} alt="" class="equipment-banner__image" />
		<div class="equipment-banner__content">
			<h2 class="equipment-banner__title">Owning, operating and maintaining made easier</h2>
			<ul class="equipment-banner__benefits-list">
				<li>Manage unlimited equipment with ease.</li>
				<li>Track your complete order history.</li>
				<li>Create saved lists for reordering.</li>
			</ul>
			<button class="primary" type="button">Create Account</button>
		</div>
	</div>
</div>

<style>
	.equipment-row {
		align-items: center;
		display: flex;
		justify-content: center;
		padding-block: 32px;
		padding-inline: 32px;
	}

	.equipment-banner {
		align-items: center;
		border: 1px solid #cccccc;
		border-radius: 8px;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
		gap: 16px;
		max-width: 1200px;
		overflow: hidden;
		width: 100%;
	}

	.equipment-banner__image {
		display: block;
		height: 100%;
		object-fit: cover;
		width: 100%;
	}

	.equipment-banner__content {
		align-items: start;
		display: flex;
		flex-direction: column;
		gap: 24px;
		padding: 24px;
	}

	.equipment-banner__title {
		font-size: 2.5rem;
		font-weight: 700;
		font-variation-settings: 'wdth' 75;
		line-height: 1.2;
		margin: 0;
	}

	.equipment-banner__benefits-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.equipment-banner__benefits-list li {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		font-size: 1rem;
		color: #3f3f3f;
		line-height: 1.5;
	}

	.equipment-banner__benefits-list li::before {
		content: url("data:image/svg+xml,%3Csvg width='10' height='9' viewBox='0 0 10 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.20458 0.00260446C9.03848 0.0232188 8.8837 0.0999917 8.77253 0.216913C8.75603 0.234267 7.46188 1.79844 5.89666 3.69284C4.33143 5.58725 3.04775 7.14045 3.04403 7.14441C3.03761 7.15123 2.99252 7.09403 2.1499 6.01028C1.36316 4.99838 1.25704 4.86351 1.21409 4.82095C1.10813 4.71594 0.984918 4.65214 0.834713 4.6245C0.786615 4.61565 0.689048 4.61285 0.634978 4.61878C0.283821 4.65726 0.0138543 4.94805 0.000744781 5.30194C-0.00217155 5.38066 0.00320907 5.43298 0.0216392 5.50503C0.0423376 5.58596 0.0705808 5.6505 0.114414 5.71705C0.140741 5.75703 1.96138 8.0997 2.00314 8.14733C2.18476 8.35451 2.42938 8.50425 2.69783 8.57258C2.80615 8.60015 2.88674 8.61109 3.00386 8.61412C3.33482 8.62266 3.64952 8.51393 3.91151 8.30051C4.01746 8.2142 3.89336 8.36276 6.96686 4.64293C8.55994 2.71484 9.86868 1.12747 9.88252 1.10652C9.9667 0.979129 10.0052 0.840509 9.99944 0.685411C9.99057 0.445855 9.86587 0.232171 9.66035 0.10432C9.58887 0.059855 9.49331 0.0234988 9.4086 0.00854111C9.36372 0.000616201 9.24778 -0.00275616 9.20458 0.00260446Z' fill='black'/%3E%3C/svg%3E%0A");
	}

	.primary {
		background-color: #ffcd11;
		border: 1px solid #b18d00;
		border-radius: 4px;
		color: #000000;
		font-weight: 600;
		padding: 12px 24px;
		max-width: 220px;
		width: 100%;
	}

	.primary:hover,
	.primary:focus {
		background-color: #ffe672;
	}
</style>
