/**
 * User profile interface containing all user information
 */
export interface UserProfile {
	// Account Information
	username: string;
	email: string;
	password: string;
	mfaSettings: MfaSettings;

	// Contact Information
	firstName: string;
	lastName: string;
	country: string;
	streetAddress: string;
	city: string;
	state: string;
	zipCode: string;
	phoneNumber: string;

	// Additional Information
	companyName: string;
	industry: string;
	taxType: string;
	individualTaxId: string;

	// Equipment
	equipment?: import('./equipment').Equipment[];

	// Selected Store
	selectedStore?: import('./store').StoreLocation;
}

/**
 * MFA Settings for the user account
 */
export interface MfaSettings {
	enabled: boolean;
	method: 'none' | 'sms' | 'email' | 'authenticator';
	verified: boolean;
}

/**
 * Creates an empty user profile with default values
 */
export function createEmptyUserProfile(): UserProfile {
	return {
		// Account Information
		username: '',
		email: '',
		password: '',
		mfaSettings: {
			enabled: false,
			method: 'none',
			verified: false
		},

		// Contact Information
		firstName: '',
		lastName: '',
		country: '',
		streetAddress: '',
		city: '',
		state: '',
		zipCode: '',
		phoneNumber: '',

		// Additional Information
		companyName: '',
		industry: '',
		taxType: '',
		individualTaxId: ''
	};
}

/**
 * Credentials for sign-in
 */
export interface SignInCredentials {
	username: string;
	password: string;
}
