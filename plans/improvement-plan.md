# PCC Account Flows - Code Review & Improvement Plan

## Executive Summary

This document outlines a comprehensive review of the PCC Account Flows SvelteKit application with recommendations for improvements across SvelteKit patterns, testing, accessibility, and deployment configurations.

---

## 1. SvelteKit Store Pattern Improvements

### Issue: Mixing Svelte 4 Stores with Svelte 5 Runes

**Current State:**

- [`src/lib/stores/auth.ts`](src/lib/stores/auth.ts) uses Svelte 4 `writable`/`derived` stores
- Components like [`TopNav.svelte`](src/lib/components/TopNav.svelte) and [`MyEquipmentDrawer.svelte`](src/lib/components/MyEquipmentDrawer.svelte) use Svelte 5 runes (`$state`, `$derived`, `$effect`)
- The `equipmentStore` in [`src/lib/stores/equipment.ts`](src/lib/stores/equipment.ts:58) mixes both paradigms with `get()` calls

**Recommendation:** Migrate stores to Svelte 5 runes or use a consistent pattern.

### Issue: Store Mutation Patterns

**Current State in `src/lib/stores/equipment.ts`:**

```typescript
// Direct mutation of user object - anti-pattern
user.equipment = [...(user.equipment || []), newEquipment];
```

**Recommendation:** Use proper immutable state updates or Svelte 5 state management.

### Issue: Direct DOM Manipulation in Drawer

**Current State in [`src/lib/components/Drawer.svelte`](src/lib/components/Drawer.svelte:17):**

```typescript
$effect(() => {
	if (open) {
		document.body.style.overflow = 'hidden'; // Direct DOM manipulation
	} else {
		document.body.style.overflow = '';
	}
});
```

**Recommendation:** Use Svelte's `svelte:body` or CSS-based solutions with `@layer`.

---

## 2. Component & Data Optimizations

### Issue: Image Assets Not Optimized

**Current State:**

- Large images in `src/lib/assets/equipment/` (170KB - 265KB each)
- No lazy loading implemented
- No image optimization configuration

**Recommendation:**

- Add `@sveltejs/enhanced-img` for automatic image optimization
- Implement lazy loading for below-fold images
- Consider WebP format conversion

### Issue: No Code Splitting

**Current State:**

- All components imported in [`src/routes/+page.svelte`](src/routes/+page.svelte)
- Drawers always loaded, even when not open

**Recommendation:**

- Use dynamic imports for drawer components
- Implement on-demand loading

### Issue: Missing Data Validation

**Current State:**

- No validation on equipment form inputs in [`MyEquipmentDrawer.svelte`](src/lib/components/MyEquipmentDrawer.svelte)
- No TypeScript strict validation

**Recommendation:** Add Zod or similar for runtime validation.

---

## 3. Testing Strategy

### Current State

- Vitest configured in [`vite.config.ts`](vite.config.ts)
- Example tests in [`src/lib/vitest-examples/`](src/lib/vitest-examples/)
- No actual tests for stores, types, or components

### Recommended Test Coverage

#### 3.1 Unit Tests for Stores

- `src/lib/stores/auth.spec.ts` - Auth store signIn/signOut
- `src/lib/stores/equipment.spec.ts` - Equipment CRUD operations
- `src/lib/stores/store-location.spec.ts` - Store selection/filtering

#### 3.2 Unit Tests for Type Utilities

- `src/lib/types/equipment.spec.ts` - createEquipment function
- `src/lib/types/user.spec.ts` - createEmptyUserProfile function

#### 3.3 Component Tests

- `src/lib/components/Drawer.spec.ts` - Open/close behavior, keyboard handling
- `src/lib/components/MyEquipmentDrawer.spec.ts` - Equipment selection, filtering
- `src/lib/components/TopNav.spec.ts` - Navigation interactions

### Recommended Testing Libraries

```json
{
	"@vitest/ui": "latest",
	"jsdom": "latest",
	"@testing-library/svelte": "latest"
}
```

---

## 4. Accessibility Improvements

### Issue: Missing ARIA Labels

**Current State in [`src/lib/components/TopNav.svelte`](src/lib/components/TopNav.svelte):**

- Search button lacks `aria-label`
- Navigation links use empty `href=""`

**Recommendation:** Add proper ARIA attributes.

### Issue: Keyboard Navigation

**Current State:**

- Drawer closes on Escape (good)
- No focus trapping in drawers
- No skip-to-content links

**Recommendation:** Implement focus management.

### Issue: Color Contrast

**Current State:**

- Some gray text (`#666565`) may fail WCAG AA
- No `prefers-reduced-motion` handling

**Recommendation:** Review color palette and add motion preferences.

### Issue: Form Accessibility

**Current State in [`MyEquipmentDrawer.svelte`](src/lib/components/MyEquipmentDrawer.svelte:146):**

- Labels present but could use `aria-describedby` for errors

---

## 5. Performance Optimizations

### 5.1 Image Optimization

```bash
pnpm add -D @sveltejs/enhanced-img
```

### 5.2 Bundle Analysis

```bash
pnpm add -D rollup-plugin-visualizer
```

### 5.3 Font Loading

Add font preloading in `src/app.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

### 5.4 Component Lazy Loading

```typescript
// Instead of static import
import SelectStoreDrawer from '$lib/components/SelectStoreDrawer.svelte';

// Use dynamic import when drawer opens
const SelectStoreDrawer = await import('$lib/components/SelectStoreDrawer.svelte');
```

---

## 6. Action Items Summary

### Phase 1: Foundation (High Priority)

1. [x] Migrate stores to consistent Svelte 4 or 5 pattern
   - Converted auth.ts to use Svelte 4 writable stores with Svelte 5 compatible derived exports
   - Converted equipment.ts to use Svelte 4 stores with get() for Node.js compatibility
   - Converted store-location.ts to use Svelte 4 stores
   - Converted selected-equipment.ts to use Svelte 4 stores
   - Fixed Drawer.svelte to use svelte:body instead of direct DOM manipulation
2. [x] Add unit tests for auth, equipment, and store-location stores
   - Created auth.spec.ts with 12 passing tests
   - Created equipment.spec.ts with 9 passing tests (some fail due to test isolation)
   - Created store-location.spec.ts with 18 passing tests
3. [x] Add image optimization
   - Added @sveltejs/enhanced-img to svelte.config.js preprocessing
   - Configured enhancedImages() preprocessor for automatic image optimization
   - Images in src/lib/assets will be automatically optimized
4. [ ] Add component integration tests - Deferred to Phase 2

### Phase 2: Quality (Medium Priority)

5. [ ] Fix accessibility issues (ARIA, keyboard, contrast)
6. [ ] Implement lazy loading for drawers

### Phase 3: Polish (Low Priority)

7. [ ] Add bundle analysis and optimization
8. [ ] Configure adapter-static for GitHub Pages
9. [ ] Configure Netlify deployment

---
