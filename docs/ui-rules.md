# Talentry UI Design System

> This document defines the design language for Talentry. Every page, component, and interaction must strictly follow these rules. Consistency is more important than creativity.

---

# Design Philosophy

Talentry is a modern professional hiring platform.

The UI should feel similar to:

- LinkedIn Jobs
- Ashby
- Greenhouse
- Linear
- Vercel Dashboard
- Stripe Dashboard

Avoid startup clichés and overly playful interfaces.

The visual style should communicate:

- Professional
- Minimal
- Clean
- Trustworthy
- Fast
- Enterprise-ready

---

# Design Principles

## Prioritize clarity

Every screen should answer:

- What am I looking at?
- What can I do next?
- What deserves my attention?

Never sacrifice clarity for aesthetics.

---

## Reduce visual noise

Avoid:

- unnecessary gradients
- excessive shadows
- oversized icons
- giant headings
- colourful cards everywhere
- decorative borders

Every element must have a purpose.

---

## Information hierarchy

Users should immediately notice:

1. Page title
2. Primary action
3. Main content
4. Secondary information

Never compete for attention.

---

# Layout

Maximum content width:

```
max-w-7xl
```

Main page padding:

```
px-6
py-8
```

Desktop spacing:

```
gap-6
gap-8
```

Never stretch content edge-to-edge.

---

# Border Radius

Use only these values.

Cards

```
rounded-xl
```

Buttons

```
rounded-lg
```

Inputs

```
rounded-lg
```

Large dialogs

```
rounded-2xl
```

Never use:

```
rounded-full
rounded-3xl
rounded-[40px]
```

unless absolutely necessary.

---

# Shadows

Keep shadows subtle.

Cards

```
shadow-sm
```

Dropdowns

```
shadow-md
```

Modals

```
shadow-xl
```

Never stack multiple shadows.

---

# Borders

Prefer borders over shadows.

Default border:

```
border
border-neutral-200
```

Dark mode:

```
border-neutral-800
```

---

# Colours

Primary

Black

White

Neutral greys

Accent colour:

Blue

Only use accent colours for:

- buttons
- links
- selected states
- focus states

Do not create colourful cards.

---

# Typography

Font:

Inter

Weights:

400

500

600

700

Avoid 800 or 900.

---

# Headings

Page title

```
text-3xl
font-bold
```

Section title

```
text-xl
font-semibold
```

Card title

```
text-lg
font-semibold
```

Body

```
text-sm
```

Muted text

```
text-sm text-muted-foreground
```

---

# Buttons

Primary

Filled

Secondary

Outline

Danger

Destructive

Ghost

For icon actions only.

Never invent new button styles.

---

# Icons

Lucide only.

Size

18-20px

Never larger than 24px.

Icons should always accompany text unless universally understood.

---

# Cards

Every card should have:

- padding
- border
- rounded corners

Structure:

Title

Description

Metadata

Actions

Never place buttons randomly.

---

# Forms

Always include:

Label

Input

Helper text (optional)

Validation message

Spacing:

```
space-y-5
```

Inputs should have consistent height.

---

# Tables

Use tables for:

Applications

Candidates

Employers

Analytics

Do NOT use cards for large datasets.

---

# Empty States

Every empty page needs:

Icon

Title

Description

Primary CTA

Example:

"No jobs posted yet."

"Create your first job posting."

Button

"Create Job"

---

# Loading States

Always use skeletons.

Never show blank pages.

---

# Search

Search bar should always stay visible.

Use placeholder:

"Search jobs..."

Never hide search behind a modal.

---

# Filters

Filters should appear beside search.

Desktop:

Horizontal

Mobile:

Drawer

Avoid dropdowns inside dropdowns.

---

# Navigation

Top navigation:

Minimal

Dashboard:

Sidebar

Sidebar width:

```
w-64
```

Icons left

Label right

Active page:

Blue indicator

Subtle background

---

# Dashboard

Dashboard layout:

Sidebar

↓

Header

↓

Analytics cards

↓

Main content

Never place everything inside one giant card.

---

# Job Card

Every job card contains:

Company logo

Job title

Company

Location

Salary

Experience

Job type

Posted date

Save button

Apply button

Consistent spacing.

---

# Employer Dashboard

Prioritize:

Job statistics

Applicants

Recent activity

Quick actions

---

# Candidate Dashboard

Prioritize:

Applications

Saved jobs

Recommended jobs

Profile completion

---

# Modals

Maximum width:

```
max-w-lg
```

Large forms:

```
max-w-2xl
```

Never fullscreen.

---

# Animations

Animations should be subtle.

Use only:

Fade

Scale

Slide

Duration:

150-250ms

Avoid:

Bounce

Spin

Elastic

Flash

---

# Responsive Design

Desktop first.

Then mobile.

Never hide important functionality.

---

# Accessibility

Buttons always have:

hover

focus

disabled

Loading states

Forms always have labels.

Never rely only on colour.

---

# Error States

Always explain:

What happened

How to fix it

Provide retry button where possible.

---

# Toasts

Use toast notifications for:

Saved

Applied

Deleted

Updated

Failed actions

Keep messages under one sentence.

---

# Consistency Rules

If a component already exists:

Reuse it.

Never duplicate UI.

Never recreate buttons.

Never recreate cards.

Never recreate badges.

Extract reusable components.

---

# Code Rules

Prefer Server Components.

Use Client Components only when necessary.

Keep UI components dumb.

Business logic belongs in:

- server actions
- lib
- database layer

Never inside presentational components.

---

# Things To Avoid

Do NOT generate:

Huge rounded corners

Glassmorphism

Neumorphism

Overly colourful dashboards

Gradient backgrounds everywhere

Massive hero sections

Fancy hover effects

Complex animations

Nested cards

Oversized icons

Inconsistent spacing

Different button styles

Different border radius values

Duplicate components

---

# Overall Feeling

Talentry should feel like software used daily by recruiters and professionals.

Keywords:

Professional

Minimal

Structured

Modern

Fast

Confident

Enterprise

Calm

Scalable

If unsure, choose the simpler solution.