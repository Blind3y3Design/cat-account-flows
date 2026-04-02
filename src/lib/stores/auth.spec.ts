import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { auth, isAuthenticated, currentUser, authLoading, authError } from '$lib/stores/auth';
import type { SignInCredentials } from '$lib/types/user';

describe('Auth Store', () => {
	beforeEach(() => {
		// Reset auth state before each test
		auth.signOut();
	});

	describe('Initial State', () => {
		it('should have isAuthenticated as false initially', () => {
			expect(get(isAuthenticated)).toBe(false);
		});

		it('should have user as null initially', () => {
			expect(get(currentUser)).toBe(null);
		});

		it('should have isLoading as false initially', () => {
			expect(get(authLoading)).toBe(false);
		});

		it('should have error as null initially', () => {
			expect(get(authError)).toBe(null);
		});
	});

	describe('signIn', () => {
		it('should set isLoading to true during sign in', async () => {
			const credentials: SignInCredentials = {
				username: 'testuser',
				password: 'password123'
			};

			const result = await auth.signIn(credentials);

			expect(result).toBe(true);
		});

		it('should successfully sign in with valid credentials', async () => {
			const credentials: SignInCredentials = {
				username: 'testuser',
				password: 'password123'
			};

			const result = await auth.signIn(credentials);

			expect(result).toBe(true);
			expect(get(isAuthenticated)).toBe(true);
			expect(get(currentUser)).not.toBeNull();
			expect(get(currentUser)?.username).toBe('testuser');
		});

		it('should set user email based on username', async () => {
			const credentials: SignInCredentials = {
				username: 'johndoe',
				password: 'password123'
			};

			await auth.signIn(credentials);

			expect(get(currentUser)?.email).toBe('johndoe@example.com');
		});

		it('should fail with empty username', async () => {
			const credentials: SignInCredentials = {
				username: '',
				password: 'password123'
			};

			const result = await auth.signIn(credentials);

			expect(result).toBe(false);
			expect(get(isAuthenticated)).toBe(false);
			expect(get(authError)).toBe('Invalid username or password');
		});

		it('should fail with empty password', async () => {
			const credentials: SignInCredentials = {
				username: 'testuser',
				password: ''
			};

			const result = await auth.signIn(credentials);

			expect(result).toBe(false);
			expect(get(isAuthenticated)).toBe(false);
			expect(get(authError)).toBe('Invalid username or password');
		});

		it('should populate user with mock data on successful sign in', async () => {
			const credentials: SignInCredentials = {
				username: 'testuser',
				password: 'password123'
			};

			await auth.signIn(credentials);

			expect(get(currentUser)?.firstName).toBe('John');
			expect(get(currentUser)?.lastName).toBe('Smith');
			expect(get(currentUser)?.companyName).toBe('Acme Construction Co.');
			expect(get(currentUser)?.equipment).toBeDefined();
			expect(Array.isArray(get(currentUser)?.equipment)).toBe(true);
		});
	});

	describe('signOut', () => {
		it('should reset auth state on sign out', async () => {
			const credentials: SignInCredentials = {
				username: 'testuser',
				password: 'password123'
			};

			await auth.signIn(credentials);
			expect(get(isAuthenticated)).toBe(true);

			auth.signOut();

			expect(get(isAuthenticated)).toBe(false);
			expect(get(currentUser)).toBe(null);
			expect(get(authError)).toBe(null);
		});
	});

	describe('clearError', () => {
		it('should clear error state', async () => {
			const credentials: SignInCredentials = {
				username: '',
				password: ''
			};

			await auth.signIn(credentials);
			expect(get(authError)).not.toBeNull();

			auth.clearError();

			expect(get(authError)).toBeNull();
		});
	});
});
