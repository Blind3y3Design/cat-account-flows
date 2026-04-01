# Drawer Component Specification

## Overview

A reusable drawer component that slides in from the right side of the screen. The drawer is positioned off-screen initially and animates into view when opened.

## Component Requirements

### Dimensions

- Width: 464px fixed
- Height: 100vh (full viewport height)
- Position: Fixed, anchored to the right edge of the viewport

### Props (Svelte 5 Runes)

```typescript
interface DrawerProps {
	/** Whether the drawer is open or closed */
	open: boolean;
	/** Title text displayed in the header */
	title: string;
	/** Optional subtitle text displayed below title */
	subtitle?: string;
	/** Callback when close button is clicked */
	onclose?: () => void;
}
```

### Slots

1. **default (body)** - Main content area, scrollable if needed
2. **footer** - Sticky footer section at the bottom of the drawer

### Visual Design

#### Header

- Height: auto (content-based)
- Contains: title, optional subtitle, close [x] button
- Close button positioned on the right side
- Border-bottom separator

#### Body

- Flexible height, fills available space
- Scrollable when content exceeds viewport
- Padding: 24px

#### Footer

- Sticky to bottom of drawer
- Border-top separator
- Padding: 16px 24px

### Animation

- Slides in from right (translateX animation)
- Initial position: translateX(100%) - fully off-screen to the right
- Open state: translateX(0) - visible
- Duration: 300ms
- Easing: ease-out

### Accessibility

- Close button should be keyboard accessible
- Should trap focus when open (optional enhancement)
- Appropriate ARIA attributes

## File Structure

```
src/
└── lib/
    └── components/
        └── Drawer.svelte    (main component)
```

## Usage Example

```svelte
<script lang="ts">
	import Drawer from '$lib/components/Drawer.svelte';

	let isOpen = $state(false);
</script>

<button onclick={() => (isOpen = true)}>Open Drawer</button>

<Drawer open={isOpen} title="Settings" subtitle="Manage your preferences">
	<p>Drawer content goes here</p>

	{#snippet footer()}
		<button onclick={() => (isOpen = false)}>Save</button>
	{/snippet}
</Drawer>
```

## Implementation Notes

- Use Svelte 5 runes syntax (`$props()`, `$state()`)
- Use CSS custom properties for theming if needed
- Use Svelte's `transition` directive or manual CSS for animations
- Consider using `svelte:window` for escape key handling
- Overlay/backdrop should be considered (optional)
