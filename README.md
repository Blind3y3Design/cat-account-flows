# PCC Account Flows

A SvelteKit application for Caterpillar parts e-commerce with user authentication, store selection, and equipment management.

## Project Overview

This project is a parts ordering portal for Caterpillar equipment dealers. It provides functionality for:

- **Store Selection**: Users can select their preferred dealer location
- **User Authentication**: Sign in/sign up with account management
- **Equipment Management**: Users can add and manage their equipment
- **Parts Browsing**: Browse parts by category with filtering capabilities
- **Dashboard**: User dashboard with order history, addresses, quotes, and more

## Tech Stack

- **Framework**: SvelteKit with Svelte 5 (runes syntax)
- **Language**: TypeScript
- **Styling**: CSS with scoped styles in Svelte components
- **Testing**: Vitest for unit and component testing
- **Build**: Vite

## Project Structure

```
src/
├── lib/
│   ├── assets/              # Static assets (images, logos)
│   │   ├── categories/      # Category icons
│   │   └── *.png, *.svg     # Logo and banner images
│   │
│   ├── components/          # Reusable UI components
│   │   ├── AccountNav.svelte
│   │   ├── AllCategories.svelte
│   │   ├── Drawer.svelte           # Slide-out drawer component
│   │   ├── EquipmentRow.svelte
│   │   ├── FeaturedCategories.svelte
│   │   ├── Footer.svelte
│   │   ├── Hero.svelte             # Home page hero component
│   │   ├── HomeHero.svelte
│   │   ├── HomeInterstitial.svelte
│   │   ├── MyEquipmentDrawer.svelte # Equipment management drawer
│   │   ├── SelectStoreDrawer.svelte # Store selection drawer
│   │   ├── SignInDrawer.svelte      # Authentication drawer
│   │   ├── TipsRow.svelte
│   │   └── TopNav.svelte            # Main navigation
│   │
│   ├── data/                # Mock data for development
│   │   ├── mock-equipment.ts
│   │   └── mock-stores.ts
│   │
│   ├── stores/              # Svelte stores for state management
│   │   ├── auth.ts          # Authentication state
│   │   ├── equipment.ts     # Equipment data
│   │   ├── selected-equipment.ts
│   │   └── store-location.ts # Store selection state
│   │
│   └── types/               # TypeScript type definitions
│       ├── equipment.ts
│       ├── store.ts
│       └── user.ts
│
├── routes/
│   ├── +layout.svelte       # Root layout
│   ├── +page.svelte         # Home page
│   ├── dashboard/           # User dashboard routes
│   │   ├── +layout.svelte
│   │   ├── +page.svelte
│   │   ├── addresses/
│   │   ├── core-tracking/
│   │   ├── equipment/
│   │   ├── invoices/
│   │   ├── lists/
│   │   ├── orders/
│   │   ├── orders-to-approve/
│   │   ├── payment/
│   │   ├── personal/
│   │   ├── preferences/
│   │   ├── quotes/
│   │   ├── recently-viewed/
│   │   └── rewards/
│   └── drawer-demo/          # Demo page for drawer components
│
├── app.html                 # HTML template
└── app.d.ts                 # Type declarations
```

## Key Features

### Store Selection

- Users can select a dealer store from the dropdown in the navigation
- Store selection persists across sessions
- Selecting a store displays the dealer logo in the navigation
- Without store selection, the corporate Caterpillar logo is displayed

### User Authentication

- Sign in drawer with username/password authentication
- Mock authentication (validates any non-empty credentials)
- User profile includes: name, email, company, equipment list, selected store
- Sign out functionality clears session

### Equipment Management

- Users can add equipment to their account
- Equipment can be selected from the search bar dropdown
- Equipment data includes: model, serial number, nickname, thumbnail

### Dashboard

- Personal information management
- Address book
- Equipment list
- Order history and tracking
- Invoices and quotes
- Payment methods
- Rewards program

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev

# Start with open browser
pnpm dev --open
```

### Building

```bash
# Create production build
pnpm build

# Preview production build
pnpm preview
```

### Testing

```bash
# Run unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run component tests
pnpm test:component
```

## State Management

The application uses Svelte stores for state management:

- **auth.ts**: Manages user authentication state (signed in, user profile)
- **store-location.ts**: Manages store selection state
- **equipment.ts**: Manages equipment data
- **selected-equipment.ts**: Manages the currently selected equipment in the search bar

## Mock Data

The project includes mock data for development:

- **mock-stores.ts**: Sample dealer locations
- **mock-equipment.ts**: Sample Caterpillar equipment

The auth store creates a mock user on sign-in with sample equipment and a default store selection.

## Design System

- **Colors**: Caterpillar brand colors (yellow #ffcd11 primary)
- **Typography**: System fonts with specific weights
- **Components**: Drawer-based UI for modals and forms
- **Responsive**: Mobile-friendly navigation and layouts

## Notes

- This is a frontend demonstration project
- Authentication is mock-only (no real backend)
- Data persists only during the session (in-memory stores)
- For production, API integration would be needed
