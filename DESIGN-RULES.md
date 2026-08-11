## Talentry — Global Product Design System

This document is the **single source of truth for the visual design and UX implementation of Talentry**.

Every page, component, dashboard, form, modal, table, empty state, navigation element, employer flow, candidate flow, and responsive layout must follow these rules.

The AI agent **must not invent a new visual language** for individual pages.

If an existing component or pattern can be reused, **reuse it instead of creating another variation**.

---

# 1. Core Design Direction

Talentry is a modern professional job platform.

The visual language should communicate:

* Modern
* Clean
* Trustworthy
* Professional
* Approachable
* Efficient
* Premium without looking expensive
* Minimal without feeling empty

The interface should feel closer to a modern SaaS product than a traditional recruitment website.

### Design philosophy

> **Clarity first. Decoration second.**

Every visual element must have a functional reason to exist.

Do not add elements merely because the page looks empty.

Whitespace is intentional.

---

# 2. NON-NEGOTIABLE RULES

These rules override individual implementation decisions.

### Never do these:

* DO NOT use sparkle icons anywhere.
* DO NOT use `Sparkles`, `Sparkle`, stars, magic-wand icons, or AI sparkle decorations.
* DO NOT add decorative stars around headings.
* DO NOT add random gradients behind sections.
* DO NOT add unnecessary illustrations.
* DO NOT add random floating icons.
* DO NOT add decorative blobs.
* DO NOT add excessive shadows.
* DO NOT use glassmorphism.
* DO NOT use excessive blur.
* DO NOT use neumorphism.
* DO NOT use giant rounded containers.
* DO NOT make every element pill-shaped.
* DO NOT use multiple unrelated accent colors.
* DO NOT introduce a new font on a specific page.
* DO NOT introduce a new button style on a specific page.
* DO NOT introduce a new card style on a specific page.
* DO NOT introduce random icon backgrounds.
* DO NOT use emoji as UI elements.
* DO NOT use excessive tooltips.
* DO NOT add icons when text already communicates the action clearly.
* DO NOT use icons purely for decoration.
* DO NOT make dashboards look like marketing landing pages.
* DO NOT make marketing pages look like dashboards.
* DO NOT use different corner-radius systems between pages.
* DO NOT change the sidebar structure between dashboard pages without a functional reason.
* DO NOT create dense UI when whitespace can improve readability.
* DO NOT use excessively large typography.
* DO NOT use heavy font weights everywhere.
* DO NOT create visual noise to make a page appear "feature rich."

### Most important rule

**If unsure whether an element should exist, leave it out.**

---

# 3. Brand Visual Language

Talentry uses a **white/light interface with indigo-purple branding**.

The interface should predominantly be:

* White
* Very light gray
* Dark navy text
* Muted gray text
* Indigo/purple for primary actions
* Green for positive states
* Orange for warnings
* Red for destructive states

Purple is the **brand accent**, not a decoration.

---

# 4. Color System

Use semantic color tokens rather than hardcoded colors throughout components.

## Primary

```css
--primary: #6366F1;
--primary-hover: #5558E8;
--primary-light: #EEF2FF;
--primary-soft: #F5F3FF;
```

Primary is used for:

* Primary buttons
* Active navigation
* Selected tabs
* Links
* Focus states
* Progress indicators
* Important interactive elements

Do not use primary purple everywhere.

---

## Text

```css
--text-primary: #0F172A;
--text-secondary: #475569;
--text-muted: #64748B;
--text-disabled: #94A3B8;
```

### Text hierarchy

Primary:

* Headings
* Important values
* Job titles
* Candidate names
* Navigation labels

Secondary:

* Supporting information
* Company names
* Locations
* Descriptions

Muted:

* Timestamps
* Metadata
* Secondary labels
* Helper text

---

## Background

```css
--background: #F8FAFC;
--surface: #FFFFFF;
--surface-subtle: #F8FAFC;
--surface-hover: #F1F5F9;
```

The main application background should generally be:

```css
#F8FAFC
```

Cards should generally be:

```css
#FFFFFF
```

Do not use pure white for every page background.

---

## Borders

```css
--border: #E2E8F0;
--border-light: #EEF2F6;
```

Borders should be subtle.

Avoid thick borders.

Default:

```css
1px solid var(--border)
```

---

## Semantic Colors

### Success

```css
--success: #16A34A;
--success-light: #DCFCE7;
```

### Warning

```css
--warning: #F59E0B;
--warning-light: #FEF3C7;
```

### Error

```css
--error: #EF4444;
--error-light: #FEE2E2;
```

### Info

```css
--info: #3B82F6;
--info-light: #DBEAFE;
```

---

# 5. Typography

Use **Inter** throughout the application.

```css
font-family: "Inter", sans-serif;
```

---

# 11. Corner Radius System

- XS: 4px
- SM: 8px (Inputs, badges, small buttons)
- MD: 12px (Cards, dropdowns, panels)
- LG: 16px (Modals, large containers)
- Full: 9999px (Avatars, pills, status badges)

---

# 14. Buttons

- Primary: `#6366F1` background, white text, 8px radius
- Secondary: `#FFFFFF` background, `#E2E8F0` border, `#0F172A` text
- Ghost: Transparent background, `#475569` text
- Destructive: `#EF4444` background, white text

---

# 16. Icons

Use Lucide Icons.

### ABSOLUTE PROHIBITION
Never use Sparkles, Sparkle, decorative stars, magic wand, or AI sparkle symbols (`✨`).

---

# 77. Final Design Rule

**Talentry should look like one coherent product, not a collection of individually designed pages.**
