import { writable, derived, get } from 'svelte/store';
import type { UserProfile, SignInCredentials } from '$lib/types/user';
import { DUMMY_EQUIPMENT } from '$lib/types/equipment';
import { DUMMY_STORES } from '$lib/types/store';

/**
 * Authentication state
 */
interface AuthState {
	isAuthenticated: boolean;
	user: UserProfile | null;
	isLoading: boolean;
	error: string | null;
}

/**
 * Creates the initial auth state
 */
function createInitialState(): AuthState {
	return {
		isAuthenticated: false,
		user: null,
		isLoading: false,
		error: null
	};
}

/**
 * Auth store with sign-in/sign-out functionality
 * Uses Svelte 4 stores for Node.js compatibility while remaining compatible with Svelte 5
 */
function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>(createInitialState());

	return {
		subscribe,

		/**
		 * Get the current user synchronously
		 */
		get user() {
			return get(auth).user;
		},

		/**
		 * Attempt to sign in with username and password
		 * This is a lightweight implementation - in production, this would make an API call
		 */
		signIn: async (credentials: SignInCredentials): Promise<boolean> => {
			update((state) => ({ ...state, isLoading: true, error: null }));

			try {
				// Simulate API call delay
				await new Promise((resolve) => setTimeout(resolve, 500));

				// For lightweight demo, we'll create a mock user on successful "authentication"
				// In production, this would validate against a backend
				if (credentials.username && credentials.password) {
					const mockUser: UserProfile = {
						// Account Information
						username: credentials.username,
						email: `${credentials.username}@example.com`,
						password: credentials.password,
						mfaSettings: {
							enabled: true,
							method: 'sms',
							verified: true
						},

						// Contact Information
						firstName: 'John',
						lastName: 'Smith',
						country: 'United States',
						streetAddress: '123 Main Street',
						city: 'Chicago',
						state: 'Illinois',
						zipCode: '60601',
						phoneNumber: '+1 (555) 123-4567',

						// Additional Information
						companyName: 'Acme Construction Co.',
						industry: 'Construction',
						taxType: 'Business',
						individualTaxId: '12-3456789',

						// Equipment - use mock data
						equipment: [...DUMMY_EQUIPMENT],

						// Selected Store - use first mock store
						selectedStore: DUMMY_STORES[0]
					};

					update((state) => ({
						...state,
						isAuthenticated: true,
						user: mockUser,
						isLoading: false,
						error: null
					}));

					return true;
				}

				update((state) => ({
					...state,
					isLoading: false,
					error: 'Invalid username or password'
				}));

				return false;
			} catch (err) {
				update((state) => ({
					...state,
					isLoading: false,
					error: 'An error occurred during sign in'
				}));

				return false;
			}
		},

		/**
		 * Sign out the current user
		 */
		signOut: () => {
			set(createInitialState());
		},

		/**
		 * Clear any error state
		 */
		clearError: () => {
			update((state) => ({ ...state, error: null }));
		}
	};
}

// Export a singleton instance of the auth store
export const auth = createAuthStore();

// Derived store for easy reactive access to auth state
export const isAuthenticated = derived(auth, ($auth) => $auth.isAuthenticated);
export const currentUser = derived(auth, ($auth) => $auth.user);
export const authLoading = derived(auth, ($auth) => $auth.isLoading);
export const authError = derived(auth, ($auth) => $auth.error);
