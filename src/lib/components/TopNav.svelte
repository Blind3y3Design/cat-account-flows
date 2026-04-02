<script lang="ts">
	import SelectStoreDrawer from '$lib/components/SelectStoreDrawer.svelte';
	import MyEquipmentDrawer from '$lib/components/MyEquipmentDrawer.svelte';
	import SignInDrawer from '$lib/components/SignInDrawer.svelte';
	import { storeLocationStore, selectedStore, selectedStoreId } from '$lib/stores/store-location';
	import { isAuthenticated, currentUser } from '$lib/stores/auth';
	import { selectedEquipment, selectedEquipmentStore } from '$lib/stores/selected-equipment';

	import corpLogo from '$lib/assets/corp-logo.png';
	import dealerLogo from '$lib/assets/dealer-logo.png';

	// Drawer states
	let selectStoreDrawerOpen = $state(false);
	let myEquipmentDrawerOpen = $state(false);
	let signInDrawerOpen = $state(false);

	// Search state
	let searchQuery = $state('');

	// Get selected store for display
	let storeName = $derived($selectedStore?.name ?? 'Select Store');
	let userFirstName = $derived($currentUser?.firstName);
	let userLastName = $derived($currentUser?.lastName);
	let userLoggedIn = $derived($isAuthenticated);
	let userHasEquipment = $derived(($currentUser?.equipment?.length ?? 0) > 0);
	let showDealerLogo = $derived(
		($selectedStoreId !== null && $selectedStoreId !== undefined) || userLoggedIn
	);

	// Get selected equipment for display
	let equipment = $derived($selectedEquipment);
	let equipmentDisplay = $derived(equipment?.nickname ?? equipment?.modelName ?? null);
	let equipmentThumbnail = $derived(equipment?.thumbnail ?? null);

	// Initialize selected store and equipment from user on mount
	$effect(() => {
		if (userLoggedIn && userHasEquipment) {
			selectedEquipmentStore.initFromUser();
		}
	});

	// Initialize store selection when user logs in
	$effect(() => {
		if (userLoggedIn && $currentUser?.selectedStore) {
			storeLocationStore.initFromUser();
		}
	});

	function handleSelectStore() {
		selectStoreDrawerOpen = true;
	}

	function handleEquipmentButton() {
		myEquipmentDrawerOpen = true;
	}

	function handleSignIn() {
		signInDrawerOpen = true;
	}

	function handleCart() {
		// Cart functionality would go here
		alert('Cart functionality would open here');
	}

	function handleSearch() {
		// Search functionality would go here
		alert('Search for: ' + searchQuery);
	}
</script>

<nav class="top-nav">
	<!-- Top Section -->
	<div class="nav-top">
		<div class="nav-inner">
			<div class="top-left">
				<!-- Logo -->
				<a href="/" class="logo">
					{#if showDealerLogo}
						<img src={dealerLogo} alt="Dealer Logo" />
					{:else}
						<img src={corpLogo} alt="Caterpillar Logo" />
					{/if}
				</a>

				<!-- Select Store Button -->
				<button class="store-button" type="button" onclick={handleSelectStore}>
					<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M8.00001 1.73665C6.89079 1.73665 5.82701 2.17729 5.04267 2.96162C4.25834 3.74596 3.8177 4.80975 3.8177 5.91896C3.8177 6.44956 4.06749 7.24063 4.50325 8.1843C4.93018 9.10884 5.50376 10.1141 6.08376 11.0492C6.66271 11.9826 7.24248 12.8371 7.67794 13.4589C7.79725 13.6292 7.90561 13.7819 8.00001 13.9138C8.09441 13.7819 8.20277 13.6292 8.32208 13.4589C8.75754 12.8371 9.33731 11.9826 9.91626 11.0492C10.4963 10.1141 11.0698 9.10884 11.4968 8.1843C11.9325 7.24063 12.1823 6.44956 12.1823 5.91896C12.1823 4.80975 11.7417 3.74596 10.9573 2.96162C10.173 2.17729 9.10923 1.73665 8.00001 1.73665ZM8.00001 14.7633C7.59977 15.063 7.59972 15.0629 7.59966 15.0629L7.59591 15.0578L7.58538 15.0437L7.54523 14.9895C7.51025 14.9421 7.45922 14.8727 7.39444 14.7836C7.2649 14.6055 7.08025 14.3487 6.85886 14.0326C6.41639 13.4008 5.82558 12.5301 5.23396 11.5763C4.64338 10.6241 4.04638 9.58021 3.59538 8.60354C3.15321 7.646 2.8177 6.6838 2.8177 5.91896C2.8177 4.54453 3.36369 3.22639 4.33557 2.25452C5.30744 1.28265 6.62558 0.736654 8.00001 0.736654C9.37444 0.736654 10.6926 1.28265 11.6645 2.25452C12.6363 3.22639 13.1823 4.54453 13.1823 5.91896C13.1823 6.6838 12.8468 7.646 12.4046 8.60354C11.9536 9.58021 11.3566 10.6241 10.7661 11.5763C10.1744 12.5301 9.58363 13.4008 9.14116 14.0326C8.91977 14.3487 8.73512 14.6055 8.60558 14.7836C8.5408 14.8727 8.48977 14.9421 8.45479 14.9895L8.41464 15.0437L8.40412 15.0578L8.40058 15.0626C8.40052 15.0626 8.40025 15.063 8.00001 14.7633ZM8.00001 14.7633L8.40058 15.0626C8.30617 15.1887 8.15753 15.2633 8.00001 15.2633C7.84249 15.2633 7.69407 15.1889 7.59966 15.0629L8.00001 14.7633Z"
							fill="currentColor"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M8.00002 4.8582C7.41417 4.8582 6.93925 5.33312 6.93925 5.91897C6.93925 6.50481 7.41417 6.97974 8.00002 6.97974C8.58586 6.97974 9.06079 6.50481 9.06079 5.91897C9.06079 5.33312 8.58586 4.8582 8.00002 4.8582ZM5.93925 5.91897C5.93925 4.78084 6.86189 3.8582 8.00002 3.8582C9.13815 3.8582 10.0608 4.78084 10.0608 5.91897C10.0608 7.0571 9.13815 7.97974 8.00002 7.97974C6.86189 7.97974 5.93925 7.0571 5.93925 5.91897Z"
							fill="currentColor"
						/>
					</svg>

					<span class="store-name">{storeName}</span>
					<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M4.69115 1.54974C4.88642 1.35448 5.203 1.35448 5.39826 1.54974L11.1621 7.31356C11.2536 7.40115 11.3267 7.50617 11.377 7.62246C11.4286 7.74163 11.4552 7.87011 11.4552 7.99996C11.4552 8.12982 11.4286 8.2583 11.377 8.37747C11.3267 8.49376 11.2536 8.59878 11.1621 8.68637L5.39826 14.4502C5.203 14.6454 4.88642 14.6454 4.69115 14.4502C4.49589 14.2549 4.49589 13.9383 4.69115 13.7431L10.4343 7.99996L4.69115 2.25685C4.49589 2.06159 4.49589 1.74501 4.69115 1.54974Z"
							fill="currentColor"
						/>
					</svg>
				</button>
			</div>

			<div class="top-center">
				<!-- Split Search Input -->
				<div class="search-container">
					<button class="equipment-button" type="button" onclick={handleEquipmentButton}>
						{#if equipmentThumbnail}
							<img src={equipmentThumbnail} alt="" class="equipment-thumbnail" />
						{:else}
							<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M2.1683 7.4196L1.57358 10.8298L1.56772 10.8503L1.44174 11.1071L0.924164 12.1628L2.0433 11.8034L3.41635 11.363L3.76401 11.2516V10.9059L4.06088 8.62858L4.0892 8.40885L3.94565 8.23991L3.04135 7.18131L2.3519 6.3737L2.1683 7.4196ZM14.9027 6.61686L14.6078 6.48405L13.681 6.06706C13.6778 6.06524 13.6719 6.06123 13.6664 6.05241C13.66 6.04224 13.6557 6.02889 13.6556 6.01432V3.81608H9.12241L9.07162 4.25944L8.83334 6.33952V6.34635C8.83152 6.36457 8.82382 6.37374 8.81967 6.3776C8.81753 6.37953 8.81561 6.3802 8.81479 6.38053C8.81421 6.38075 8.81332 6.38151 8.81186 6.38151H5.67709L5.52866 6.53678L5.52182 6.54362L5.38412 6.68815V10.5046L6.12143 10.1071L11.1351 7.40202L11.1361 7.40299C11.8001 7.04645 12.5947 7.20079 13.1341 7.85417H13.1351L14.0179 8.9196L14.9027 9.98796V6.61686ZM6.67123 4.95182L6.52963 4.80631L6.1312 4.39518C6.12507 4.38754 6.11951 4.37481 6.11948 4.35612C6.11948 4.3358 6.12654 4.31767 6.13803 4.30436H6.13901L6.13998 4.30338C6.1406 4.30338 6.14241 4.30431 6.14487 4.30534L6.15854 4.3151L6.70346 4.87272C6.72266 4.89558 6.72885 4.91747 6.72885 4.93424V6.27116H8.79623L8.84604 5.82878L9.08432 3.7487L9.0853 3.74186C9.08709 3.72398 9.09382 3.71459 9.09799 3.71061C9.1003 3.70847 9.10299 3.70705 9.10385 3.70671H13.681C13.6758 3.7067 13.6801 3.7043 13.6898 3.71452C13.6995 3.72488 13.7063 3.74009 13.7064 3.75749V5.97721L14.0013 6.11003L14.9271 6.52604C14.9299 6.52738 14.9364 6.53164 14.9427 6.54167C14.9491 6.55184 14.9534 6.56518 14.9535 6.57975V10.2331C14.9118 10.15 14.861 10.068 14.7972 9.98991L14.7943 9.986L14.4574 9.58171L13.1068 7.94499L13.1058 7.94303L12.9808 7.80729C12.6768 7.50546 12.2855 7.32198 11.8597 7.32194C11.6094 7.32194 11.362 7.39016 11.1439 7.50456L11.139 7.50651L7.51694 9.46159L5.6185 10.4831L5.60385 10.4909L5.5892 10.5007C5.52414 10.5417 5.47819 10.5859 5.44955 10.6159C5.43634 10.6298 5.42364 10.6431 5.4183 10.6491C5.415 10.6528 5.41312 10.6551 5.41147 10.6569C5.4103 10.6582 5.40966 10.6587 5.40952 10.6589L5.38608 10.6862C5.16678 10.9519 5.1474 11.3056 5.20932 11.5524L5.2103 11.5563C5.22502 11.613 5.26365 11.7455 5.34897 11.8737C5.43737 12.0064 5.62723 12.2028 5.93979 12.2028H14.0247C14.3461 12.2027 14.5812 12.0486 14.7289 11.8971C14.8706 11.7516 14.9521 11.59 14.9906 11.4977L14.9945 11.488L14.9984 11.4772C15.0506 11.3346 15.0783 11.1921 15.0951 11.0602L14.9535 11.0417L15.097 11.0485C15.1127 10.8722 15.1022 10.6708 15.0443 10.4684H15.1117C15.2028 10.8184 15.1811 11.2046 15.0306 11.5524C14.8101 12.0475 14.4259 12.2895 14.0247 12.2897H5.93979C5.63817 12.2897 5.33793 12.0892 5.20053 11.693L5.08334 11.3571H3.73764L3.66245 11.3815L0.871429 12.2887C0.870666 12.2889 0.869644 12.2896 0.8685 12.2897H0.86557L0.863617 12.2887C0.861334 12.2876 0.858489 12.2862 0.856781 12.2848L0.854828 12.2829L0.846039 12.2721C0.832205 12.2551 0.828796 12.2319 0.839203 12.2106L0.840179 12.2087L1.49936 10.8639L1.53061 10.8005L1.54233 10.7301L2.31967 6.29167L2.32065 6.28581C2.32401 6.26577 2.33097 6.25813 2.33237 6.25651C2.33336 6.25536 2.33427 6.25425 2.3353 6.25358C2.3363 6.25296 2.33804 6.25168 2.34116 6.25065C2.34165 6.25089 2.34307 6.25096 2.34409 6.25163L2.35287 6.25944L4.10287 8.30143L4.12729 8.32975L4.13998 8.34049L4.00815 9.37565L3.8392 10.6911L3.76791 11.2546H5.0892L5.18881 10.8854C5.2065 10.8205 5.23132 10.7658 5.25522 10.7282L5.33334 10.6061V9.71842C5.33334 9.53039 5.23327 9.39439 5.13998 9.32096C5.12773 9.31132 5.11489 9.30341 5.10287 9.29557L4.85873 9.08659L4.18784 8.38346L4.51303 8.66374L5.34018 9.3776V6.3151C5.34026 6.29765 5.34699 6.28251 5.35678 6.27213C5.36641 6.26203 5.3705 6.26426 5.36557 6.26432H6.67123V4.95182Z"
									fill="#696969"
									stroke="currentColor"
								/>
							</svg>
						{/if}
						{#if equipmentDisplay}
							<span class="equipment-label">{equipmentDisplay}</span>
						{:else}
							<span>Add Equipment</span>
						{/if}
					</button>
					<input
						type="text"
						class="search-input"
						bind:value={searchQuery}
						placeholder="Search for part number or name"
					/>
					<button type="button" class="search-icon-button" onclick={handleSearch}>
						<svg
							width="15"
							height="15"
							viewBox="0 0 15 15"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M10.1317 11.0741C9.06354 11.9357 7.70489 12.4515 6.22576 12.4515C2.78737 12.4515 0 9.66415 0 6.22576C0 2.78737 2.78737 0 6.22576 0C9.66415 0 12.4515 2.78737 12.4515 6.22576C12.4515 7.70472 11.9358 9.06324 11.0744 10.1313L14.4719 13.5288C14.7323 13.7892 14.7323 14.2113 14.4719 14.4716C14.2116 14.732 13.7895 14.732 13.5291 14.4716L10.1317 11.0741ZM1.33333 6.22576C1.33333 3.52375 3.52375 1.33333 6.22576 1.33333C8.92777 1.33333 11.1182 3.52375 11.1182 6.22576C11.1182 7.55341 10.5894 8.75754 9.73084 9.639C9.71434 9.65261 9.69833 9.66713 9.68289 9.68257C9.66744 9.69802 9.65291 9.71404 9.63929 9.73056C8.7578 10.5892 7.55355 11.1182 6.22576 11.1182C3.52375 11.1182 1.33333 8.92777 1.33333 6.22576Z"
								fill="black"
							/>
						</svg>
					</button>
				</div>
			</div>

			<div class="top-right">
				<!-- Sign In / Account -->
				<button class="profile-button" type="button" onclick={handleSignIn}>
					<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M8.00017 1.73665C6.40867 1.73665 5.1185 3.02682 5.1185 4.61832C5.1185 6.20982 6.40867 7.49999 8.00017 7.49999C9.59167 7.49999 10.8818 6.20982 10.8818 4.61832C10.8818 3.02682 9.59167 1.73665 8.00017 1.73665ZM4.1185 4.61832C4.1185 2.47454 5.85638 0.736654 8.00017 0.736654C10.144 0.736654 11.8818 2.47454 11.8818 4.61832C11.8818 6.76211 10.144 8.49999 8.00017 8.49999C5.85638 8.49999 4.1185 6.76211 4.1185 4.61832Z"
							fill="currentColor"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M3.72567 10.966C4.96693 10.0606 6.46366 9.57265 8.00007 9.57265C9.53649 9.57265 11.0332 10.0606 12.2745 10.966C13.5157 11.8715 14.4374 13.1477 14.9066 14.6108C14.9553 14.7629 14.9285 14.9291 14.8344 15.0581C14.7403 15.1871 14.5902 15.2634 14.4304 15.2634H1.56971C1.40999 15.2634 1.25989 15.1871 1.16576 15.0581C1.07164 14.9291 1.04482 14.7629 1.09359 14.6108C1.56276 13.1477 2.48442 11.8715 3.72567 10.966ZM8.00007 10.5727C6.67549 10.5727 5.38512 10.9933 4.31501 11.7739C3.43398 12.4166 2.73973 13.2759 2.29616 14.2634H13.704C13.2604 13.2759 12.5662 12.4166 11.6851 11.7739C10.615 10.9933 9.32466 10.5727 8.00007 10.5727Z"
							fill="currentColor"
						/>
					</svg>

					{#if userLoggedIn && userFirstName && userLastName}
						<span class="button-label">{userFirstName} {userLastName}</span>
					{:else}
						<span class="button-label">Sign In</span>
					{/if}
				</button>

				<!-- Cart Button -->
				<button
					class="icon-button cart"
					type="button"
					onclick={handleCart}
					aria-label="Shopping cart"
				>
					Cart
					<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M1.16663 1.18604C0.890484 1.18604 0.666626 1.40989 0.666626 1.68604C0.666626 1.96218 0.890484 2.18604 1.16663 2.18604H3.29044C3.36947 2.18604 3.43764 2.24154 3.45365 2.31893L5.23368 10.9224C5.34576 11.4642 5.82292 11.8527 6.37615 11.8527H12.8333C13.1094 11.8527 13.3333 11.6288 13.3333 11.3527C13.3333 11.0766 13.1094 10.8527 12.8333 10.8527H6.37615C6.29712 10.8527 6.22895 10.7972 6.21294 10.7198L5.96457 9.51937H13.6133C14.1748 9.51937 14.6566 9.11951 14.76 8.5677L15.51 4.5677C15.6446 3.84972 15.0938 3.18604 14.3633 3.18604H4.65423L4.43291 2.11633C4.32082 1.57458 3.84366 1.18604 3.29044 1.18604H1.16663ZM4.86112 4.18603L5.75882 8.52488C5.78311 8.52125 5.80798 8.51937 5.83329 8.51937H13.6133C13.6935 8.51937 13.7624 8.46224 13.7772 8.38342L14.5272 4.38342C14.5464 4.28085 14.4677 4.18603 14.3633 4.18603H4.86112Z"
							fill="currentColor"
						/>
						<path
							d="M7.66663 14.2367C7.66663 14.7889 7.21891 15.2367 6.66663 15.2367C6.11434 15.2367 5.66663 14.7889 5.66663 14.2367C5.66663 13.6844 6.11434 13.2367 6.66663 13.2367C7.21891 13.2367 7.66663 13.6844 7.66663 14.2367Z"
							fill="currentColor"
						/>
						<path
							d="M12.3333 15.2367C12.8856 15.2367 13.3333 14.7889 13.3333 14.2367C13.3333 13.6844 12.8856 13.2367 12.3333 13.2367C11.781 13.2367 11.3333 13.6844 11.3333 14.2367C11.3333 14.7889 11.781 15.2367 12.3333 15.2367Z"
							fill="currentColor"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Bottom Section -->
	<div class="nav-bottom">
		<div class="nav-inner">
			<div class="nav-links">
				<a href="" class="nav-link">
					Shop parts
					<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M1.54974 4.69122C1.745 4.49596 2.06158 4.49596 2.25684 4.69122L7.99996 10.4343L13.7431 4.69122C13.9383 4.49596 14.2549 4.49596 14.4502 4.69122C14.6454 4.88649 14.6454 5.20307 14.4502 5.39833L8.68636 11.1621C8.59877 11.2536 8.49375 11.3267 8.37746 11.3771C8.25829 11.4287 8.12982 11.4553 7.99996 11.4553C7.8701 11.4553 7.74162 11.4287 7.62245 11.3771C7.50616 11.3267 7.40114 11.2536 7.31355 11.1621L1.54974 5.39833C1.35447 5.20307 1.35447 4.88649 1.54974 4.69122Z"
							fill="currentColor"
						/>
					</svg>
				</a>
				<a href="" class="nav-link">SIS</a>
				<a href="" class="nav-link">Parts Diagram</a>
				<a href="" class="nav-link">Quick Order</a>
				<a href="" class="nav-link">Specials</a>
			</div>
			<div class="nav-right">
				<p class="contact-text">Need Help?</p>
				<button class="contact-button" type="button"> Contact Us </button>
			</div>
		</div>
	</div>
</nav>

<!-- Drawers -->
<SelectStoreDrawer bind:open={selectStoreDrawerOpen} />
<MyEquipmentDrawer bind:open={myEquipmentDrawerOpen} />
<SignInDrawer bind:open={signInDrawerOpen} />

<style>
	.top-nav {
		display: flex;
		flex-direction: column;
		width: 100%;
		background-color: #ffffff;
		border-bottom: 1px solid #e5e7eb;
	}

	.nav-inner {
		align-items: center;
		display: flex;
		gap: 24px;
		justify-content: space-between;
		margin: 0 auto;
		max-width: 1200px;
		width: 100%;
	}

	/* Top Section */
	.nav-top {
		display: flex;
		padding: 12px 24px;
	}

	.top-left {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 8px;
		text-decoration: none;
	}

	.store-button {
		align-items: center;
		background-color: transparent;
		border: 1px solid transparent;
		border-radius: 6px;
		color: #111827;
		cursor: pointer;
		display: flex;
		font-size: 0.875rem;
		font-weight: 500;
		gap: 6px;
		padding: 8px 12px;
		transition: all 0.25s ease-in-out;
	}

	.store-button:hover,
	.store-button:focus {
		background-color: #f3f4f6;
		border-color: #e5e7eb;
	}

	.store-name {
		max-width: 150px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.top-center {
		flex: 1;
		max-width: 500px;
	}

	.search-container {
		align-items: center;
		border: 1px solid #cccccc;
		border-radius: 9999px;
		display: flex;
		overflow: hidden;
		padding-inline-end: 8px;
	}

	.equipment-button {
		align-items: center;
		background-color: #ffffff;
		border: none;
		border-right: 1px solid #cccccc;
		color: #111827;
		cursor: pointer;
		display: flex;
		font-size: 0.8125rem;
		font-weight: 500;
		gap: 8px;
		padding: 8px 8px 8px 16px;
		transition: background-color 0.25s ease-in-out;
		white-space: nowrap;
	}

	.equipment-button:hover {
		background-color: #f3f4f6;
	}

	.equipment-thumbnail {
		width: 32px;
		height: 32px;
		border: 1px solid #cccccc;
		border-radius: 50%;
		object-fit: cover;
		flex-shrink: 0;
	}

	.equipment-label {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 120px;
	}

	.search-input {
		flex: 1;
		padding: 10px 14px;
		font-size: 0.9375rem;
		border: none;
		outline: none;
	}

	.search-input::placeholder {
		color: #9ca3af;
	}

	.search-icon-button {
		background-color: #ffcd11;
		border: none;
		border-radius: 50%;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		flex-shrink: 0;
		transition: background-color 0.2s ease;
	}

	.search-icon-button:hover {
		background-color: #ffe672;
	}

	.top-right {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.profile-button {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 8px 12px;
		font-size: 0.875rem;
		font-weight: 500;
		color: #374151;
		background-color: #ffffff;
		border: 1px solid #cccccc;
		border-radius: 999px;
		cursor: pointer;
		transition: all 0.25s ease-in-out;
	}

	.profile-button:hover,
	.profile-button:focus {
		border-color: #000000;
	}

	.icon-button {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 8px 12px;
		font-size: 0.875rem;
		font-weight: 500;
		color: #374151;
		background-color: transparent;
		border: 1px solid transparent;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.25s ease-in-out;
	}

	.icon-button:hover,
	.icon-button:focus {
		background-color: #f3f4f6;
		border-color: #e5e7eb;
	}

	.icon-button.cart {
		padding: 8px;
	}

	.button-label {
		white-space: nowrap;
	}

	/* Bottom Section */
	.nav-bottom {
		display: flex;
		padding: 0 24px;
		border-top: 1px solid #cccccc;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.nav-link {
		align-items: center;
		border-bottom: 2px solid transparent;
		color: #374151;
		display: flex;
		font-size: 0.875rem;
		font-weight: 500;
		gap: 10px;
		padding: 12px 16px;
		text-decoration: none;
		transition: all 0.25s ease-in-out;
	}

	.nav-link:hover {
		color: #111827;
		border-bottom-color: #ffcd11;
	}

	.nav-right {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.contact-text {
		font-size: 0.875rem;
		color: #666565;
		margin: 0;
	}

	.contact-button {
		display: flex;
		align-items: center;
		font-size: 0.875rem;
		color: #000000;
		background-color: transparent;
		border: none;
		cursor: pointer;
	}

	.contact-button:hover,
	.contact-button:focus {
		text-decoration: underline;
	}
</style>
