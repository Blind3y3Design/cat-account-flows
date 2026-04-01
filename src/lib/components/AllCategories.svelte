<script lang="ts">
	import attachmentsImage from '$lib/assets/categories/attachments.png';
	import cabsImage from '$lib/assets/categories/cabs.png';
	import drivetrainsImage from '$lib/assets/categories/drivetrains.png';
	import electricalElectronicsImage from '$lib/assets/categories/electrical.png';
	import engineImage from '$lib/assets/categories/engine.png';
	import filtersFluidsImage from '$lib/assets/categories/filters-fluids.png';
	import groundEngagingToolsImage from '$lib/assets/categories/ground-tools.png';
	import hardwareSealsConsumablesImage from '$lib/assets/categories/hardware-seals.png';
	import hosesTubesImage from '$lib/assets/categories/hoses-tubes.png';
	import hydraulicsImage from '$lib/assets/categories/hydraulics.png';
	import structuresOtherSystemsComponentsImage from '$lib/assets/categories/structures.png';
	import undercarriageImage from '$lib/assets/categories/undercarriage.png';
	import upgradeRepairKitsImage from '$lib/assets/categories/upgrade-repair.png';
	import workshopSuppliesImage from '$lib/assets/categories/workshop-supplies.png';
</script>

<div class="all-categories">
	<h2>Looking for More?</h2>
	<div class="category-cards">
		<button class="category-card">
			<img src={attachmentsImage} alt="" class="category-card__image" />
			<p class="category-card__label">Attachments</p>
		</button>
		<button class="category-card">
			<img src={cabsImage} alt="" class="category-card__image" />
			<p class="category-card__label">Cabs</p>
		</button>
		<button class="category-card">
			<img src={drivetrainsImage} alt="" class="category-card__image" />
			<p class="category-card__label">Drivetrains</p>
		</button>
		<button class="category-card">
			<img src={electricalElectronicsImage} alt="" class="category-card__image" />
			<p class="category-card__label">Electrical & Electronics</p>
		</button>
		<button class="category-card">
			<img src={engineImage} alt="" class="category-card__image" />
			<p class="category-card__label">Engine</p>
		</button>
		<button class="category-card">
			<img src={filtersFluidsImage} alt="" class="category-card__image" />
			<p class="category-card__label">Filters and Fluids</p>
		</button>
		<button class="category-card">
			<img src={groundEngagingToolsImage} alt="" class="category-card__image" />
			<p class="category-card__label">Ground Engaging Tools</p>
		</button>
		<button class="category-card">
			<img src={hardwareSealsConsumablesImage} alt="" class="category-card__image" />
			<p class="category-card__label">Hardware, Seals, & Consumables</p>
		</button>
		<button class="category-card">
			<img src={hosesTubesImage} alt="" class="category-card__image" />
			<p class="category-card__label">Hoses & Tubes</p>
		</button>
		<button class="category-card">
			<img src={hydraulicsImage} alt="" class="category-card__image" />
			<p class="category-card__label">Hydraulics</p>
		</button>
		<button class="category-card">
			<img src={structuresOtherSystemsComponentsImage} alt="" class="category-card__image" />
			<p class="category-card__label">Structures & Other Systems Components</p>
		</button>
		<button class="category-card">
			<img src={undercarriageImage} alt="" class="category-card__image" />
			<p class="category-card__label">Undercarriage</p>
		</button>
		<button class="category-card">
			<img src={upgradeRepairKitsImage} alt="" class="category-card__image" />
			<p class="category-card__label">Upgrade & Repair Kits</p>
		</button>
		<button class="category-card">
			<img src={workshopSuppliesImage} alt="" class="category-card__image" />
			<p class="category-card__label">Workshop Supplies</p>
		</button>
	</div>
</div>

<style>
	.all-categories {
		align-items: center;
		background: #f2f2f2;
		display: flex;
		gap: 16px;
		flex-direction: column;
		justify-content: center;
		padding-block: 32px;
		padding-inline: 32px;
	}

	.all-categories h2 {
		color: #000000;
		font-size: 2.5rem;
		font-variation-settings: 'wdth' 75;
		margin: 0;
		max-width: 1200px;
		width: 100%;
	}

	.category-cards {
		display: grid;
		gap: 16px;
		grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
		max-width: 1200px;
		width: 100%;
	}

	.category-card {
		align-items: center;
		background-color: #ffffff;
		border: 1px solid #000000;
		cursor: pointer;
		display: flex;
		flex-direction: row;
		gap: 12px;
		justify-content: start;
		border-radius: 9999px;
		padding: 8px 12px 8px 8px;
		transition: all 0.25s ease-in-out;
	}

	.category-card:hover,
	.category-card:focus {
		background-color: #f2f2f2;
	}

	.category-card__image {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		object-fit: cover;
		flex-shrink: 0;
	}

	.category-card__label {
		color: #000000;
		font-size: 1rem;
		font-weight: 600;
		margin: 0;
		text-align: start;
	}
</style>
