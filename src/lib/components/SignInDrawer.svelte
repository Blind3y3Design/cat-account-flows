<script lang="ts">
	import Drawer from '$lib/components/Drawer.svelte';
	import { auth, currentUser } from '$lib/stores/auth';
	import { goto } from '$app/navigation';

	interface SignInDrawerProps {
		open: boolean;
		onsignin?: () => void;
		oncreateaccount?: () => void;
		onclose?: () => void;
	}

	let { open = $bindable(), onsignin, oncreateaccount, onclose }: SignInDrawerProps = $props();

	let mode: 'select' | 'signin' | 'create' = $state('select');
	let username = $state('');
	let password = $state('');
	let isLoading = $state(false);
	let errorMessage = $state('');

	// Reactive check for authenticated state
	let isAuthenticated = $derived($currentUser !== null);
	let userFirstName = $derived($currentUser?.firstName ?? '');

	function handleBack() {
		mode = 'select';
		clearForm();
	}

	function closeDrawer() {
		open = false;
	}

	async function handleLinkClick(event: MouseEvent, href: string) {
		event.preventDefault();
		closeDrawer();
		await goto(href);
	}

	function clearForm() {
		username = '';
		password = '';
		errorMessage = '';
	}

	async function handleSignInSubmit(e: Event) {
		e.preventDefault();
		errorMessage = '';

		if (!username.trim() || !password.trim()) {
			errorMessage = 'Please enter both username and password';
			return;
		}

		isLoading = true;
		const success = await auth.signIn({ username, password });
		isLoading = false;

		if (success) {
			clearForm();
			mode = 'select';
			open = false;
			if (onsignin) {
				onsignin();
			}
		} else {
			errorMessage = 'Invalid username or password';
		}
	}

	function handleCreateAccount() {
		mode = 'create';
		if (oncreateaccount) {
			oncreateaccount();
		} else {
			open = false;
		}
	}

	function handleSignOut() {
		auth.signOut();
		mode = 'select';
	}

	function getDrawerTitle(): string {
		if (isAuthenticated && userFirstName) {
			return `Hello ${userFirstName}`;
		}
		if (mode === 'signin') return 'Sign In';
		if (mode === 'create') return 'Create Account';
		return 'My Account';
	}

	function getDrawerSubtitle() {
		if (!isAuthenticated) {
			return undefined;
		}
	}
</script>

{#snippet dashboardLink()}
	<a href="/dashboard" class="subtitle-link">
		View Account Dashboard
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
	</a>
{/snippet}

<Drawer
	bind:open
	title={getDrawerTitle()}
	subtitle={isAuthenticated ? dashboardLink : undefined}
	onclose={mode !== 'select' ? handleBack : onclose}
>
	{#if isAuthenticated}
		<!-- Authenticated User Dashboard -->
		<div class="dashboard-content">
			<div class="dashboard-buttons">
				<a
					href="/dashboard/orders"
					class="dashboard-btn"
					onclick={(e) => handleLinkClick(e, '/dashboard/orders')}
				>
					<span>Order History</span>
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
				</a>
				<a
					href="/dashboard/lists"
					class="dashboard-btn"
					onclick={(e) => handleLinkClick(e, '/dashboard/lists')}
				>
					<span>Saved Lists</span>
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
				</a>
				<a
					href="/dashboard/rewards"
					class="dashboard-btn"
					onclick={(e) => handleLinkClick(e, '/dashboard/rewards')}
				>
					<span>My Rewards</span>
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
				</a>
				<a
					href="/dashboard/equipment"
					class="dashboard-btn"
					onclick={(e) => handleLinkClick(e, '/dashboard/equipment')}
				>
					<span>My Equipment</span>
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
				</a>
			</div>

			<div class="dashboard-links">
				<a
					href="/dashboard/personal"
					class="dashboard-link"
					onclick={(e) => handleLinkClick(e, '/dashboard/personal')}
				>
					<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M7.9998 1.73633C6.4083 1.73633 5.11813 3.02649 5.11813 4.618C5.11813 6.2095 6.4083 7.49966 7.9998 7.49966C9.5913 7.49966 10.8815 6.2095 10.8815 4.618C10.8815 3.02649 9.5913 1.73633 7.9998 1.73633ZM4.11813 4.618C4.11813 2.47421 5.85602 0.736328 7.9998 0.736328C10.1436 0.736328 11.8815 2.47421 11.8815 4.618C11.8815 6.76178 10.1436 8.49966 7.9998 8.49966C5.85602 8.49966 4.11813 6.76178 4.11813 4.618Z"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M3.7253 10.9657C4.96656 10.0602 6.46329 9.57233 7.99971 9.57233C9.53613 9.57233 11.0329 10.0602 12.2741 10.9657C13.5154 11.8712 14.437 13.1474 14.9062 14.6104C14.955 14.7625 14.9281 14.9288 14.834 15.0578C14.7399 15.1868 14.5898 15.2631 14.4301 15.2631H1.56934C1.40963 15.2631 1.25952 15.1868 1.1654 15.0578C1.07127 14.9288 1.04445 14.7625 1.09322 14.6104C1.5624 13.1474 2.48405 11.8712 3.7253 10.9657ZM7.99971 10.5723C6.67512 10.5723 5.38476 10.993 4.31464 11.7736C3.43362 12.4163 2.73936 13.2756 2.29579 14.2631H13.7036C13.2601 13.2756 12.5658 12.4163 11.6848 11.7736C10.6147 10.993 9.32429 10.5723 7.99971 10.5723Z"
						/>
					</svg>

					<span>Personal Information</span>
				</a>
				<a
					href="/dashboard/addresses"
					class="dashboard-link"
					onclick={(e) => handleLinkClick(e, '/dashboard/addresses')}
				>
					<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M7.99969 1.73633C6.89047 1.73633 5.82669 2.17696 5.04235 2.9613C4.25802 3.74563 3.81738 4.80942 3.81738 5.91864C3.81738 6.44924 4.06717 7.2403 4.50293 8.18398C4.92986 9.10851 5.50343 10.1138 6.08344 11.0488C6.66239 11.9822 7.24216 12.8368 7.67762 13.4586C7.79693 13.6289 7.90529 13.7816 7.99969 13.9135C8.09409 13.7816 8.20245 13.6289 8.32176 13.4586C8.75722 12.8368 9.33699 11.9822 9.91594 11.0488C10.4959 10.1138 11.0695 9.10851 11.4964 8.18398C11.9322 7.2403 12.182 6.44924 12.182 5.91864C12.182 4.80942 11.7414 3.74563 10.957 2.9613C10.1727 2.17696 9.10891 1.73633 7.99969 1.73633ZM7.99969 14.763C7.59945 15.0627 7.5994 15.0626 7.59934 15.0625L7.59559 15.0575L7.58506 15.0434L7.54491 14.9892C7.50993 14.9418 7.4589 14.8724 7.39412 14.7833C7.26458 14.6052 7.07993 14.3483 6.85854 14.0322C6.41607 13.4005 5.82526 12.5298 5.23364 11.5759C4.64306 10.6238 4.04606 9.57989 3.59505 8.60321C3.15289 7.64568 2.81738 6.68348 2.81738 5.91864C2.81738 4.5442 3.36337 3.22606 4.33525 2.25419C5.30712 1.28232 6.62526 0.736328 7.99969 0.736328C9.37412 0.736328 10.6923 1.28232 11.6641 2.25419C12.636 3.22606 13.182 4.5442 13.182 5.91864C13.182 6.68348 12.8465 7.64568 12.4043 8.60321C11.9533 9.57989 11.3563 10.6238 10.7657 11.5759C10.1741 12.5298 9.58331 13.4005 9.14084 14.0322C8.91945 14.3483 8.7348 14.6052 8.60526 14.7833C8.54048 14.8724 8.48945 14.9418 8.45447 14.9892L8.41432 15.0434L8.40379 15.0575L8.40026 15.0622C8.4002 15.0623 8.39993 15.0627 7.99969 14.763ZM7.99969 14.763L8.40026 15.0622C8.30585 15.1883 8.15721 15.263 7.99969 15.263C7.84217 15.263 7.69375 15.1886 7.59934 15.0625L7.99969 14.763Z"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M7.9997 4.85787C7.41385 4.85787 6.93893 5.33279 6.93893 5.91864C6.93893 6.50449 7.41385 6.97941 7.9997 6.97941C8.58554 6.97941 9.06047 6.50449 9.06047 5.91864C9.06047 5.33279 8.58554 4.85787 7.9997 4.85787ZM5.93893 5.91864C5.93893 4.78051 6.86156 3.85787 7.9997 3.85787C9.13783 3.85787 10.0605 4.78051 10.0605 5.91864C10.0605 7.05677 9.13783 7.97941 7.9997 7.97941C6.86156 7.97941 5.93893 7.05677 5.93893 5.91864Z"
						/>
					</svg>

					<span>My Addresses</span>
				</a>
				<a
					href="/dashboard/preferences"
					class="dashboard-link"
					onclick={(e) => handleLinkClick(e, '/dashboard/preferences')}
				>
					<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M7.57167 0.736332L7.57314 0.736328L8.42784 0.73633C8.73816 0.737249 9.04097 0.831866 9.29661 1.00779C9.55211 1.18361 9.74858 1.43246 9.86033 1.72176C9.86039 1.72193 9.86026 1.7216 9.86033 1.72176L10.2439 2.71192L11.4582 3.41058L12.5212 3.24844C12.8238 3.20736 13.1319 3.25725 13.4062 3.39166C13.6805 3.52607 13.9087 3.73899 14.0617 4.00336L14.0631 4.00574L14.4779 4.73171C14.6346 4.99962 14.7067 5.30865 14.6848 5.6183C14.6629 5.92845 14.5476 6.22468 14.3541 6.46806C14.3537 6.46856 14.3533 6.46906 14.3529 6.46956L13.7023 7.29843V8.6972L14.3737 9.52977C14.5679 9.77343 14.6836 10.0702 14.7056 10.381C14.7275 10.6907 14.6554 10.9997 14.4987 11.2677L14.0839 11.9936L14.0825 11.996C13.9295 12.2603 13.7013 12.4733 13.427 12.6077C13.1527 12.7421 12.8447 12.7919 12.542 12.7508L12.5338 12.7497L11.4791 12.5887L10.2647 13.2874L9.88133 14.2771C9.88137 14.2769 9.88128 14.2772 9.88133 14.2771C9.76959 14.5664 9.57296 14.8157 9.31742 14.9915C9.06178 15.1675 8.75897 15.2621 8.44865 15.263L8.44717 15.263H7.57314L7.57167 15.263C7.26135 15.2621 6.95853 15.1675 6.70289 14.9915C6.44729 14.8156 6.25076 14.5667 6.13903 14.2772C6.13905 14.2772 6.13902 14.2771 6.13903 14.2772L5.75561 13.2874L4.54126 12.5887L3.47835 12.7509C3.17567 12.792 2.86759 12.7421 2.59329 12.6077C2.31899 12.4733 2.09084 12.2603 1.93783 11.996L1.93645 11.9936L1.52163 11.2676C1.36492 10.9997 1.29277 10.6907 1.3147 10.381C1.33665 10.0709 1.45192 9.77471 1.64533 9.53135L2.29719 8.7009V7.30212L1.62577 6.46956C1.4316 6.2259 1.31589 5.92908 1.29389 5.6183C1.27196 5.30864 1.34411 4.9996 1.50083 4.73168L1.91701 4.00336C2.07002 3.73898 2.29818 3.52607 2.57248 3.39166C2.84678 3.25725 3.15485 3.20742 3.45753 3.24851L3.46569 3.24962L4.52208 3.41083L5.7562 2.71038L6.13899 1.72226C6.13902 1.72219 6.13896 1.72233 6.13899 1.72226C6.25072 1.43283 6.44731 1.18367 6.70289 1.00779C6.95853 0.831866 7.26134 0.737249 7.57167 0.736332ZM8.42551 1.73633H7.574C7.46534 1.73678 7.35932 1.76996 7.2698 1.83157C7.1801 1.8933 7.11114 1.98067 7.07194 2.08226L6.62429 3.23784C6.58264 3.34535 6.50512 3.43516 6.40485 3.49207L4.86489 4.3661C4.76721 4.42154 4.65372 4.44248 4.54269 4.42554L3.31961 4.23897C3.21451 4.22539 3.10771 4.243 3.0125 4.28965C2.9166 4.33664 2.83678 4.41098 2.7831 4.50328L2.36463 5.2356C2.30923 5.32983 2.28367 5.43864 2.29139 5.54768C2.29908 5.65632 2.33941 5.76009 2.40708 5.8454C2.40733 5.84572 2.40758 5.84604 2.40784 5.84636L3.1864 6.81176C3.25809 6.90066 3.29719 7.01142 3.29719 7.12563V8.87369C3.29719 8.98564 3.25962 9.09436 3.1905 9.18242L2.42866 10.153C2.36053 10.2385 2.31992 10.3426 2.3122 10.4516C2.30448 10.5607 2.33 10.6695 2.38541 10.7638L2.38853 10.7691L2.80333 11.4951C2.80352 11.4954 2.80371 11.4957 2.80391 11.496C2.85759 11.5883 2.93741 11.6627 3.03331 11.7097C3.12852 11.7563 3.23532 11.7739 3.34042 11.7604L4.5635 11.5738C4.67552 11.5567 4.79002 11.5782 4.88825 11.6347L6.40739 12.5087C6.50646 12.5657 6.583 12.6549 6.62429 12.7615L7.07171 13.9165C7.1109 14.018 7.1801 14.106 7.2698 14.1678C7.3593 14.2293 7.46528 14.2625 7.57392 14.263H8.4464C8.55504 14.2625 8.66102 14.2293 8.75052 14.1678C8.84021 14.106 8.90918 14.0187 8.94837 13.9171L9.39603 12.7615C9.43732 12.6549 9.51386 12.5657 9.61292 12.5087L11.1321 11.6347C11.2303 11.5782 11.3448 11.5567 11.4568 11.5738L12.6799 11.7604C12.785 11.7739 12.8918 11.7563 12.987 11.7097C13.0829 11.6627 13.1627 11.5883 13.2164 11.496C13.2166 11.4957 13.2168 11.4954 13.217 11.4951L13.6349 10.7637C13.6903 10.6695 13.7158 10.5607 13.7081 10.4516C13.7004 10.343 13.6601 10.2392 13.5924 10.1539C13.5922 10.1536 13.5919 10.1533 13.5917 10.153L12.8131 9.18757C12.7414 9.09867 12.7023 8.9879 12.7023 8.87369V7.12563C12.7023 7.01368 12.7399 6.90497 12.809 6.81691L13.5686 5.84923L13.5709 5.84636C13.639 5.76086 13.6796 5.65672 13.6873 5.54768C13.695 5.43863 13.6695 5.32981 13.6141 5.23558L13.611 5.23027L13.1962 4.50427C13.196 4.50391 13.1958 4.50355 13.1955 4.50319C13.1419 4.41093 13.0621 4.33662 12.9662 4.28965C12.871 4.243 12.7642 4.22539 12.6591 4.23897L11.436 4.42554C11.324 4.44263 11.2095 4.42116 11.1113 4.36465L9.59211 3.49062C9.49305 3.43362 9.41651 3.34441 9.37522 3.23784L8.9278 2.08287C8.88861 1.98129 8.8194 1.8933 8.72971 1.83157C8.64019 1.76996 8.53417 1.73678 8.42551 1.73633ZM6.17469 6.1746C6.65873 5.69057 7.31522 5.41864 7.99975 5.41864C8.51023 5.41864 9.00925 5.57001 9.43369 5.85362C9.85814 6.13723 10.189 6.54033 10.3843 7.01195C10.5797 7.48357 10.6308 8.00253 10.5312 8.5032C10.4316 9.00387 10.1858 9.46376 9.82481 9.82472C9.46385 10.1857 9.00396 10.4315 8.50329 10.5311C8.00262 10.6307 7.48366 10.5796 7.01204 10.3842C6.54042 10.1889 6.13732 9.85805 5.85371 9.4336C5.5701 9.00916 5.41873 8.51014 5.41873 7.99966C5.41873 7.31513 5.69066 6.65864 6.17469 6.1746ZM7.99975 6.41864C7.58044 6.41864 7.1783 6.58521 6.8818 6.88171C6.5853 7.17821 6.41873 7.58035 6.41873 7.99966C6.41873 8.31236 6.51145 8.61804 6.68518 8.87803C6.85891 9.13803 7.10583 9.34068 7.39472 9.46034C7.68362 9.58001 8.00151 9.61131 8.3082 9.55031C8.61488 9.48931 8.8966 9.33873 9.11771 9.11762C9.33882 8.89651 9.4894 8.61479 9.5504 8.30811C9.6114 8.00142 9.5801 7.68353 9.46043 7.39463C9.34077 7.10574 9.13812 6.85881 8.87812 6.68509C8.61813 6.51136 8.31245 6.41864 7.99975 6.41864Z"
						/>
					</svg>

					<span>Preferences</span>
				</a>
				<a
					href="/dashboard/payment"
					class="dashboard-link"
					onclick={(e) => handleLinkClick(e, '/dashboard/payment')}
				>
					<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M10.6431 9.86282C10.3877 9.86282 10.1807 10.0642 10.1807 10.3126C10.1807 10.561 10.3877 10.7624 10.6431 10.7624H12.2287C12.4841 10.7624 12.6912 10.561 12.6912 10.3126C12.6912 10.0642 12.4841 9.86282 12.2287 9.86282H10.6431Z"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M1.11205 3.09889C1.39701 2.82172 1.78351 2.66602 2.18651 2.66602H13.8141C14.2171 2.66602 14.6036 2.82172 14.8886 3.09889C15.1736 3.37605 15.3337 3.75196 15.3337 4.14393V11.8548C15.3337 12.2467 15.1736 12.6227 14.8886 12.8998C14.6036 13.177 14.2171 13.3327 13.8141 13.3327H2.18651C1.78351 13.3327 1.39701 13.177 1.11205 12.8998C0.827084 12.6227 0.666992 12.2467 0.666992 11.8548V4.14393C0.666992 3.75196 0.827084 3.37605 1.11205 3.09889ZM14.4087 4.14393V6.26426H1.59192V4.14393C1.59192 3.99055 1.65456 3.84345 1.76607 3.735C1.87758 3.62654 2.02882 3.56561 2.18651 3.56561H13.8141C13.9718 3.56561 14.1231 3.62654 14.2346 3.735C14.3461 3.84345 14.4087 3.99055 14.4087 4.14393ZM14.4087 7.16386H1.59192V11.8548C1.59192 12.0081 1.65456 12.1552 1.76607 12.2637C1.87758 12.3722 2.02882 12.4331 2.18651 12.4331H13.8141C13.9718 12.4331 14.1231 12.3722 14.2346 12.2637C14.3461 12.1552 14.4087 12.0081 14.4087 11.8548V7.16386Z"
						/>
					</svg>

					<span>Payment Methods</span>
				</a>
			</div>

			<div class="signout-section">
				<button class="signout-link" onclick={handleSignOut} type="button">Sign Out</button>
			</div>
		</div>
	{:else if mode === 'select'}
		<div class="content">
			<div class="button-group">
				<button class="primary" onclick={() => (mode = 'signin')} type="button">Sign In</button>
				<button class="secondary" onclick={handleCreateAccount} type="button">Create Account</button
				>
			</div>

			<div class="benefits">
				<p class="benefits-title">Get Exclusive Benefits:</p>
				<ul class="benefits-list">
					<li>Manage unlimited equipment with ease.</li>
					<li>Track your complete order history.</li>
					<li>Create saved lists for reordering.</li>
				</ul>
			</div>
		</div>
	{:else if mode === 'signin'}
		<form class="signin-form" onsubmit={handleSignInSubmit}>
			<div class="form-group">
				<label for="username">Username</label>
				<input
					type="text"
					id="username"
					bind:value={username}
					placeholder="Enter your username"
					autocomplete="username"
					disabled={isLoading}
				/>
			</div>

			<div class="form-group">
				<label for="password">Password</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					placeholder="Enter your password"
					autocomplete="current-password"
					disabled={isLoading}
				/>
			</div>

			{#if errorMessage}
				<div class="error-message">{errorMessage}</div>
			{/if}

			<div class="form-actions">
				<button type="submit" class="primary" disabled={isLoading}>
					{isLoading ? 'Signing in...' : 'Sign In'}
				</button>
			</div>

			<div class="form-footer">
				<p>
					Don't have an account? <button
						type="button"
						class="link-button"
						onclick={handleCreateAccount}>Create one</button
					>
				</p>
			</div>
		</form>
	{/if}
</Drawer>

<style>
	/* Dashboard Styles */
	.dashboard-content {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.dashboard-buttons {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.dashboard-btn {
		display: flex;
		align-items: center;
		justify-content: space-between;
		text-decoration: none;
		padding: 24px 24px;
		font-size: 1rem;
		font-weight: 500;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.25s ease;
		background-color: #ffffff;
		color: #000000;
		border: 1px solid #cccccc;
		text-align: left;
	}

	.dashboard-btn:hover,
	.dashboard-btn:focus {
		background-color: #f2f2f2;
	}

	.dashboard-links {
		display: flex;
		flex-direction: column;
		gap: 0;
		border-top: 1px solid #e5e7eb;
		padding-top: 16px;
	}

	.dashboard-link {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 8px;
		padding: 12px 0;
		font-size: 0.9375rem;
		color: #374151;
		text-decoration: none;
		transition: color 150ms ease;

		svg {
			fill: currentColor;
			transition: fill 150ms ease;
			width: 16px;
			height: 16px;
		}
	}

	.dashboard-link:hover {
		color: #111827;
	}

	.signout-section {
		border-top: 1px solid #e5e7eb;
		padding-top: 16px;
	}

	.signout-link {
		background: none;
		border: none;
		color: #374151;
		font-size: 0.9375rem;
		cursor: pointer;
		padding: 8px 0;
		transition: color 150ms ease;
	}

	.signout-link:hover {
		color: #111827;
	}

	/* Guest Styles */
	.content {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.button-group {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.button-group button {
		width: 100%;
		padding: 14px 20px;
		font-size: 1rem;
		font-weight: 500;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.25s ease;
	}

	.button-group .primary {
		background-color: #ffcd11;
		color: #000000;
		border: none;
	}

	.button-group .primary:hover,
	.button-group .primary:focus {
		background-color: #ffe672;
	}

	.button-group .secondary {
		background-color: #ffffff;
		color: #000000;
		border: 1px solid #000000;
	}

	.button-group .secondary:hover,
	.button-group .secondary:focus {
		background-color: #f2f2f2;
	}

	.benefits {
		margin-top: 8px;
	}

	.benefits-title {
		font-size: 0.875rem;
		font-weight: 600;
		color: #111827;
		margin: 0 0 12px;
	}

	.benefits-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.benefits-list li {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		font-size: 0.875rem;
		color: #4b5563;
		line-height: 1.5;
	}

	.benefits-list li::before {
		content: url("data:image/svg+xml,%3Csvg width='10' height='9' viewBox='0 0 10 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.20458 0.00260446C9.03848 0.0232188 8.8837 0.0999917 8.77253 0.216913C8.75603 0.234267 7.46188 1.79844 5.89666 3.69284C4.33143 5.58725 3.04775 7.14045 3.04403 7.14441C3.03761 7.15123 2.99252 7.09403 2.1499 6.01028C1.36316 4.99838 1.25704 4.86351 1.21409 4.82095C1.10813 4.71594 0.984918 4.65214 0.834713 4.6245C0.786615 4.61565 0.689048 4.61285 0.634978 4.61878C0.283821 4.65726 0.0138543 4.94805 0.000744781 5.30194C-0.00217155 5.38066 0.00320907 5.43298 0.0216392 5.50503C0.0423376 5.58596 0.0705808 5.6505 0.114414 5.71705C0.140741 5.75703 1.96138 8.0997 2.00314 8.14733C2.18476 8.35451 2.42938 8.50425 2.69783 8.57258C2.80615 8.60015 2.88674 8.61109 3.00386 8.61412C3.33482 8.62266 3.64952 8.51393 3.91151 8.30051C4.01746 8.2142 3.89336 8.36276 6.96686 4.64293C8.55994 2.71484 9.86868 1.12747 9.88252 1.10652C9.9667 0.979129 10.0052 0.840509 9.99944 0.685411C9.99057 0.445855 9.86587 0.232171 9.66035 0.10432C9.58887 0.059855 9.49331 0.0234988 9.4086 0.00854111C9.36372 0.000616201 9.24778 -0.00275616 9.20458 0.00260446Z' fill='black'/%3E%3C/svg%3E%0A");
	}

	/* Sign In Form Styles */
	.signin-form {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.form-group label {
		font-size: 0.875rem;
		font-weight: 500;
		color: #374151;
	}

	.form-group input {
		padding: 12px 14px;
		font-size: 1rem;
		border: 1px solid #d1d5db;
		border-radius: 8px;
		background-color: #ffffff;
		color: #111827;
		transition:
			border-color 150ms ease,
			box-shadow 150ms ease;
	}

	.form-group input:focus {
		outline: none;
		border-color: #ffcd11;
		box-shadow: 0 0 0 3px rgba(255, 205, 17, 0.2);
	}

	.form-group input::placeholder {
		color: #9ca3af;
	}

	.form-group input:disabled {
		background-color: #f3f4f6;
		cursor: not-allowed;
	}

	.error-message {
		padding: 12px;
		background-color: #fef2f2;
		border: 1px solid #fecaca;
		border-radius: 8px;
		color: #dc2626;
		font-size: 0.875rem;
	}

	.form-actions {
		margin-top: 8px;
	}

	.form-actions button {
		width: 100%;
		padding: 14px 20px;
		font-size: 1rem;
		font-weight: 500;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.25s ease;
		background-color: #ffcd11;
		color: #000000;
		border: none;
	}

	.form-actions button:hover:not(:disabled),
	.form-actions button:focus:not(:disabled) {
		background-color: #ffe672;
	}

	.form-actions button:disabled {
		background-color: #f3f4f6;
		color: #9ca3af;
		cursor: not-allowed;
	}

	.form-footer {
		text-align: center;
		padding-top: 8px;
	}

	.form-footer p {
		font-size: 0.875rem;
		color: #6b7280;
		margin: 0;
	}

	.link-button {
		background: none;
		border: none;
		color: #2563eb;
		font-size: 0.875rem;
		cursor: pointer;
		text-decoration: underline;
		padding: 0;
	}

	.link-button:hover {
		color: #1d4ed8;
	}

	/* Subtitle Link Styles */
	.subtitle-link {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		color: #6b7280;
		text-decoration: none;
		font-size: 0.875rem;
		margin-top: 4px;
		transition: color 150ms ease;
	}

	.subtitle-link:hover {
		color: #111827;
	}
</style>
