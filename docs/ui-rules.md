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

Use for:

* Hired
* Accepted
* Successful applications
* Positive metrics
* Active status

### Warning

```css
--warning: #F59E0B;
--warning-light: #FEF3C7;
```

Use for:

* Interview scheduled
* Pending
* Attention required
* Warning states

### Error

```css
--error: #EF4444;
--error-light: #FEE2E2;
```

Use for:

* Rejected
* Failed
* Destructive actions
* Validation errors

### Info

```css
--info: #3B82F6;
--info-light: #DBEAFE;
```

Use sparingly for informational states.

---

# 5. Typography

Use **Inter** throughout the application.

Do not introduce:

* Poppins
* Roboto
* Arial
* Montserrat
* Geist
* DM Sans
* another decorative font

unless the entire design system is explicitly changed.

## Font

```css
font-family: "Inter", sans-serif;
```

---

# 6. Typography Scale

### Display

```css
font-size: 48px;
font-weight: 700;
line-height: 1.1;
letter-spacing: -0.02em;
```

Only for major marketing hero sections.

---

### H1

```css
font-size: 36px;
font-weight: 700;
line-height: 1.15;
letter-spacing: -0.02em;
```

---

### H2

```css
font-size: 28px;
font-weight: 700;
line-height: 1.2;
letter-spacing: -0.015em;
```

---

### H3

```css
font-size: 20px;
font-weight: 600;
line-height: 1.3;
```

---

### H4

```css
font-size: 16px;
font-weight: 600;
line-height: 1.4;
```

---

### Body

```css
font-size: 16px;
font-weight: 400;
line-height: 1.5;
```

---

### Small

```css
font-size: 14px;
font-weight: 400;
line-height: 1.4;
```

---

### Caption

```css
font-size: 12px;
font-weight: 500;
line-height: 1.4;
```

---

# 7. Typography Rules

### DO

* Use strong hierarchy.
* Use bold typography for important values.
* Keep body text readable.
* Use muted text for secondary information.
* Keep headings concise.
* Use sentence case.

### DON'T

* Use ALL CAPS for normal headings.
* Use bold everywhere.
* Use multiple font families.
* Use extremely thin text.
* Use huge headings inside dashboards.
* Use decorative typography.
* Use gradients inside text except for explicitly approved marketing hero treatments.

---

# 8. Spacing System

Use an **8px spacing system**.

Primary spacing values:

```text
4px
8px
12px
16px
24px
32px
40px
48px
64px
80px
96px
128px
```

Prefer these values rather than arbitrary values.

---

# 9. Layout Principles

Every page should have a clear visual hierarchy:

```text
Navigation
↓
Page Header
↓
Primary Action / Controls
↓
Primary Content
↓
Secondary Content
```

Do not make every section equally prominent.

There should always be:

1. A clear primary area
2. Supporting information
3. Secondary actions

---

# 10. Maximum Content Width

Marketing pages:

```css
max-width: 1280px;
```

Dashboard content:

```css
max-width: none;
```

Dashboard layouts should use the available viewport width efficiently.

---

# 11. Corner Radius System

Use a restrained radius system.

### XS

```css
4px
```

Use for:

* Tiny controls
* Compact elements

### SM

```css
8px
```

Use for:

* Inputs
* Small buttons
* Badges
* Compact controls

### MD

```css
12px
```

Use for:

* Cards
* Standard buttons
* Dropdowns
* Tables
* Panels

### LG

```css
16px
```

Use for:

* Large cards
* Dashboard sections
* Modals
* Large containers

### XL

```css
20px
```

Use sparingly for:

* Major feature cards
* Large marketing sections

### Full

```css
9999px
```

Use only for:

* Avatars
* Pills
* Status badges
* Compact tags

---

# 12. Important Radius Rule

Do NOT make every element:

```css
border-radius: 9999px;
```

Pills are reserved for:

* Status
* Tags
* Filters
* Compact metadata
* Small categorical indicators

Buttons should generally use:

```css
8px - 12px
```

not full pill shapes.

---

# 13. Shadows

Use shadows extremely sparingly.

Default cards should primarily rely on:

* Border
* Background
* Spacing

Recommended shadow:

```css
box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
```

Elevated elements:

```css
box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
```

Use stronger shadows only for:

* Dropdowns
* Modals
* Floating menus

Do not put large shadows on every card.

---

# 14. Buttons

There are four primary button types.

## Primary

Purple background.

```css
background: var(--primary);
color: white;
border-radius: 8px;
```

Used for:

* Post a Job
* Apply
* Save
* Create
* Continue
* Confirm

---

## Secondary

White background with border.

Used for:

* Cancel
* Filters
* Secondary actions
* Upload Resume

---

## Ghost

Transparent.

Used for:

* Low-priority actions
* Navigation actions
* Table actions

---

## Destructive

Red.

Used only for destructive actions.

Examples:

* Delete
* Remove
* Reject

---

# 15. Button Dimensions

Standard:

```text
Height: 40px
Horizontal padding: 16px
Radius: 8px
```

Small:

```text
Height: 32px
Horizontal padding: 12px
```

Large:

```text
Height: 48px
Horizontal padding: 20px
```

Avoid oversized buttons.

---

# 16. Icons

Use one consistent icon library.

Recommended:

**Lucide Icons**

Icons should generally be:

```text
16px
20px
24px
```

depending on context.

### Icon rules

Icons should:

* Communicate an action
* Communicate a state
* Improve scanning
* Match the surrounding text

Do not:

* Add icons to every piece of text.
* Add decorative icons just to fill space.
* Mix several icon styles.
* Use colorful icons unnecessarily.

### ABSOLUTE PROHIBITION

Never use:

* Sparkles
* Sparkle
* Stars as decoration
* Magic wand
* AI sparkle icons
* "✨" or similar decorative symbols

Even for AI-powered features.

Use functional symbols such as:

* Bot
* Brain
* Wand alternatives are prohibited
* Search
* Sliders
* Chart
* Check
* Shield
* Message
* Lightbulb

Only when functionally appropriate.

---

# 17. Cards

Cards should be:

* White
* Subtle border
* 12px radius
* Comfortable internal padding
* Clear hierarchy

Typical:

```css
background: #FFFFFF;
border: 1px solid #E2E8F0;
border-radius: 12px;
padding: 20px;
```

Cards should not contain:

* Unnecessary decorative illustrations
* Multiple competing CTAs
* Excessive badges
* Excessive icons

---

# 18. Forms

Inputs:

```text
Height: 40–44px
Radius: 8px
Border: #E2E8F0
Background: #FFFFFF
```

Focus:

```text
border: primary
box-shadow: subtle primary ring
```

Labels should be above the input.

Never rely solely on placeholder text as a label.

---

# 19. Search Bars

Search is a major interaction on Jobora.

Search fields should be visually prominent but not oversized.

Use:

* Search icon
* Clear placeholder
* Adequate horizontal padding
* Clear focus state

Candidate search:

> Search candidates, jobs, applications...

Job search:

> Search jobs, companies, roles...

Do not create enormous search bars that dominate dashboard pages.

---

# 20. Navigation

## Candidate Navigation

Recommended structure:

```text
Overview
My Jobs
Applications
Saved Jobs
Job Alerts
Recommended
Profile
Resume & Documents
Career Insights
Skill Assessment
Settings
```

---

## Employer Navigation

Recommended structure:

```text
Dashboard
Jobs
Candidates
Applications
Talent Pool
Analytics
Messages
Saved Searches
Company Profile
Team Members
Billing
Settings
```

---

# 21. Sidebar

The sidebar is a major part of the application identity.

### Desktop

Width:

```text
240px – 260px
```

Background:

```text
#FFFFFF
```

Right border:

```text
1px solid #E2E8F0
```

Navigation items:

```text
Height: 40–44px
Radius: 8px
Horizontal padding: 12px
```

---

## Active Navigation

Active item:

```text
background: #EEF2FF
color: #4F46E5
```

The active state should be obvious but subtle.

Do not use:

* Huge colored blocks
* Gradients
* Strong shadows
* Excessive animation

---

# 22. Dashboard Header

Dashboard headers should contain:

```text
Page title
Short contextual description
Primary action
Search / account controls where appropriate
```

Example:

```text
Good morning, Acme Corp.

Here's what's happening with your hiring today.
```

Avoid marketing-style hero sections inside dashboards.

---

# 23. Employer Dashboard

The employer dashboard should prioritize **hiring performance**.

Recommended hierarchy:

```text
Header
↓
KPI cards
↓
Application analytics
↓
Hiring funnel
↓
Jobs overview
↓
Recent candidates
↓
Hiring insights
```

---

## Employer KPI Cards

Examples:

```text
Active Jobs
12
+2 this week
```

```text
Total Applications
248
+18% from last week
```

```text
Profile Views
1.2K
+24% from last week
```

```text
Hires Made
8
+2 from last month
```

Each KPI card should have:

* Label
* Large number
* Small trend
* Optional simple icon

Do not make KPI cards visually loud.

---

# 24. Employer Analytics

Use charts only when they answer a useful question.

Preferred charts:

* Line charts
* Area charts
* Donut charts
* Horizontal bar charts

Avoid:

* 3D charts
* Excessively colorful charts
* Decorative charts
* Pie charts with too many segments

Primary chart color:

```text
#6366F1
```

Secondary:

```text
#22C55E
```

Other colors should be semantic.

---

# 25. Jobs Overview Table

Employer job tables should prioritize:

```text
Job
Applications
Shortlisted
Interviewing
Hired
Views
Actions
```

Tables should be:

* Compact
* Scannable
* Clearly aligned
* Lightly bordered

Avoid heavy borders around every cell.

Use row separators.

---

# 26. Candidate Dashboard

Candidate dashboards should prioritize:

```text
Applications
Interview progress
Recommended jobs
Job alerts
Profile completion
Career progress
```

Recommended layout:

```text
Header
↓
Application statistics
↓
My Applications
↓
Recommended Jobs
↓
Job Alerts
↓
Profile Completion
```

---

# 27. Candidate Application Cards

Every application should communicate:

* Company
* Job title
* Location
* Application date
* Current stage
* Next step
* Timestamp

Example states:

```text
Applied
Screening
Shortlisted
Interviewing
Offer Received
Rejected
```

Use semantic colors consistently.

---

# 28. Job Cards

Job cards should contain:

```text
Company logo
Job title
Company
Location
Job type
Salary
Skills
Posted time
Save action
```

Optional:

```text
Match score
Remote badge
Experience
```

Do not overload job cards.

The job title should always be the strongest visual element.

---

# 29. Candidate Profiles

Candidate profile cards should prioritize:

```text
Avatar
Name
Current role
Location
Experience
Skills
Match score
Availability
Status
```

Match score should be visible but not treated as absolute truth.

Example:

```text
92%
Match Score
```

Use green primarily for strong matches.

---

# 30. Candidate List

Employer candidate lists should support:

* Search
* Filters
* Sorting
* Bulk actions
* Save
* Shortlist
* Message
* View profile

Each row/card should be highly scannable.

Avoid displaying every candidate attribute simultaneously.

Progressive disclosure is preferred.

---

# 31. Filters

Filters should be organized by meaningful hiring dimensions:

```text
Job
Location
Experience
Skills
Availability
Salary
Match Score
```

Use dropdowns, checkboxes, range sliders, and search fields where appropriate.

Do not create dozens of visible filters simultaneously.

---

# 32. Status Badges

Status badges should be compact.

Example:

```text
Applied
```

```text
Interviewing
```

```text
Shortlisted
```

```text
Rejected
```

Badges:

* Use light semantic backgrounds.
* Use darker semantic text.
* Use full radius.
* Keep text small.

Do not use saturated backgrounds.

---

# 33. Match Scores

Match scores should use:

* Percentage
* Small progress indicator
* Clear label

Example:

```text
92%
Match Score
██████████
```

Do not make match score the only hiring signal.

---

# 34. Tables

Tables should use:

```text
Header: muted background or clean white
Rows: white
Border: subtle
```

Typography:

```text
Header: 12–14px / 600
Body: 14px / 400
```

Actions should appear at the far right.

Use a three-dot menu for secondary actions.

---

# 35. Modals

Modals should be:

```text
max-width: 480–640px
background: white
border-radius: 16px
padding: 24px
```

Structure:

```text
Title
Description
Content
Actions
```

Do not create enormous modal dialogs.

---

# 36. Dropdowns

Dropdowns should:

* Match input width where possible
* Have 8px radius
* Use subtle shadow
* Have clear hover states
* Avoid unnecessary icons

---

# 37. Empty States

Empty states should be minimal.

Structure:

```text
Small functional icon
Title
One sentence
Primary action
```

Do not use giant illustrations.

Do not use sparkle decorations.

Do not use overly emotional copy.

---

# 38. Loading States

Use:

* Skeleton loaders
* Subtle spinners
* Progressive loading

Skeletons should match the actual content layout.

Avoid full-screen loaders unless absolutely necessary.

---

# 39. Error States

Errors should be clear and actionable.

Structure:

```text
What happened
Why it happened if useful
What the user can do
```

Example:

```text
Unable to load candidates

We couldn't retrieve the candidate list.

Try again
```

Do not use decorative error illustrations.

---

# 40. Toasts

Toasts should be:

* Small
* Clear
* Temporary
* Positioned consistently

Examples:

```text
Job posted successfully
```

```text
Candidate shortlisted
```

```text
Application saved
```

Do not use giant notification banners for trivial events.

---

# 41. Landing Page

The homepage should be more visually expressive than dashboards, but remain restrained.

Recommended structure:

```text
Navbar
↓
Hero
↓
Search
↓
Trusted Companies
↓
Featured Jobs
↓
How It Works
↓
Candidate / Employer value proposition
↓
CTA
↓
Footer
```

---

# 42. Homepage Hero

Hero should communicate one clear value proposition.

Recommended hierarchy:

```text
Small eyebrow
Large headline
Supporting paragraph
Primary CTA
Secondary CTA
Job search interface
```

The hero should not contain:

* Multiple competing headlines
* Excessive gradients
* Decorative sparkles
* Floating random icons
* Huge illustrations

---

# 43. Job Search Homepage

The search interface should be the primary interaction.

Suggested fields:

```text
Job title / keyword
Location
Job type
Search
```

Popular searches can appear underneath as compact chips.

---

# 44. Trusted Companies

Company logos should be:

* Consistent in visual weight
* Properly spaced
* Mostly monochrome or naturally restrained
* Not oversized

Do not turn company logos into decorative artwork.

---

# 45. How It Works

Keep it simple.

Three or four steps maximum.

Example:

```text
01
Create your profile

02
Discover opportunities

03
Apply or connect

04
Get hired
```

Use numbered steps or simple functional icons.

No decorative sparkle icons.

---

# 46. Employer Marketing Pages

Employer-facing pages should emphasize:

* Hiring speed
* Candidate discovery
* Candidate quality
* Talent management
* Analytics
* Team collaboration

Use screenshots of the actual product wherever possible.

Do not create fake visual styles unrelated to the application.

---

# 47. Candidate Marketing Pages

Candidate-facing pages should emphasize:

* Discovering relevant jobs
* Profile visibility
* Application tracking
* Recommendations
* Career development

Avoid generic "AI magic" language and visuals.

---

# 48. AI Features

Jobora may use AI internally, but AI functionality must still follow the same visual system.

Do not create a separate "AI design language."

AI features should use existing:

* Cards
* Buttons
* Badges
* Tooltips
* Panels
* Icons

Do not use:

* Sparkles
* Stars
* Magic wand graphics
* Glowing gradients
* Holographic effects

AI should feel like a useful product capability, not a visual gimmick.

---

# 49. AI Match / Recommendations

For recommendations, show:

```text
Why this matches
```

with concise reasons such as:

```text
Matches your React experience
Matches your location preference
Matches 4 of your preferred skills
```

The explanation is more important than decorative AI branding.

---

# 50. Responsive Design

The application must work from:

```text
320px+
```

through large desktop displays.

Breakpoints:

```text
Mobile: < 640px
Tablet: 640–1024px
Desktop: 1024px+
Large desktop: 1440px+
```

---

# 51. Mobile Navigation

Desktop sidebar becomes:

```text
Top navigation
+
Hamburger / drawer
```

Do not squeeze the desktop sidebar into mobile.

---

# 52. Mobile Cards

Cards should stack vertically.

Avoid horizontal overflow.

Job cards:

```text
Company
Job title
Location
Metadata
Actions
```

Candidate cards should similarly stack.

---

# 53. Mobile Tables

Do not force desktop tables onto mobile.

Convert them into:

* Cards
* List rows
* Horizontal scrolling only when genuinely necessary

Priority information should remain visible.

---

# 54. Mobile Dashboard

Desktop:

```text
4-column KPI grid
```

Tablet:

```text
2-column KPI grid
```

Mobile:

```text
1-column KPI stack
```

Charts should become full-width.

Side panels should move below primary content.

---

# 55. Responsive Typography

Desktop hero:

```text
48px
```

Tablet:

```text
40px
```

Mobile:

```text
32px
```

Dashboard headings should reduce proportionally.

Never allow headings to create horizontal overflow.

---

# 56. Responsive Spacing

Desktop:

```text
32–48px section spacing
```

Mobile:

```text
20–32px section spacing
```

Reduce padding rather than eliminating whitespace completely.

---

# 57. Accessibility

Every interactive element must have:

* Visible focus state
* Keyboard accessibility
* Appropriate aria labels where needed
* Sufficient contrast
* Clear hover/active/disabled states

Do not communicate state through color alone.

Example:

Rejected should not rely only on red.

Include:

```text
Rejected
```

---

# 58. Interaction States

Every interactive component should account for:

```text
Default
Hover
Focus
Active
Disabled
Loading
Error
Success
```

Do not implement only the default state.

---

# 59. Animation

Animations should be subtle.

Recommended:

```text
150–250ms
ease-out
```

Use animation for:

* Dropdowns
* Modals
* Hover transitions
* Sidebar transitions
* Tab changes
* Loading

Do not animate entire sections unnecessarily.

Avoid:

* Bouncing UI
* Excessive scaling
* Parallax
* Flashing
* Constant motion
* Decorative particle effects

---

# 60. Hover States

Hover should provide feedback.

Typical:

```css
background: #F8FAFC;
```

or:

```css
border-color: #CBD5E1;
```

Primary buttons can darken slightly.

Do not dramatically transform components on hover.

---

# 61. Navigation Rules

Navigation should remain predictable across the application.

Candidate pages should use the candidate navigation.

Employer pages should use employer navigation.

Do not randomly reorder navigation items on individual pages.

---

# 62. Dashboard Consistency

All dashboards must share:

* Same sidebar
* Same header
* Same typography
* Same spacing
* Same cards
* Same buttons
* Same status system
* Same iconography

Only the information architecture changes.

---

# 63. Employer vs Candidate Visual Difference

Do NOT create two completely different designs.

They are two sides of the same platform.

### Employer

Prioritize:

```text
Data
Analytics
Candidates
Hiring pipeline
Jobs
Team activity
```

### Candidate

Prioritize:

```text
Jobs
Applications
Recommendations
Profile
Career progress
Alerts
```

The underlying design system must remain identical.

---

# 64. Data Visualization Rules

Charts should have:

* Clear labels
* Useful legends
* Minimal grid lines
* Limited colors
* Consistent formatting

Avoid chart junk.

If a number communicates the insight better than a chart, use the number.

---

# 65. Content Density

Jobora should feel information-rich without feeling crowded.

Use:

```text
Whitespace
Hierarchy
Grouping
Progressive disclosure
```

rather than:

```text
More cards
More icons
More colors
More borders
```

---

# 66. Visual Hierarchy

Every screen should have:

### Level 1

Primary page purpose.

### Level 2

Important actions and information.

### Level 3

Supporting metadata.

### Level 4

Optional information.

If everything is visually emphasized, nothing is emphasized.

---

# 67. Icon Backgrounds

Icon containers should be used selectively.

Good:

```text
KPI card icon
```

Bad:

```text
Every navigation item gets a colored square
Every card gets an icon
Every section gets an icon
```

---

# 68. Gradients

Gradients are allowed only in limited marketing contexts.

Approved:

```text
Subtle purple → indigo
```

Not approved:

* Rainbow gradients
* Neon gradients
* Background gradients everywhere
* Gradient cards
* Gradient borders
* Gradient buttons throughout the dashboard

Dashboard UI should primarily remain flat.

---

# 69. Borders

Borders should establish structure, not decoration.

Use:

```text
#E2E8F0
```

Avoid:

* Double borders
* Thick borders
* Colored borders everywhere
* Gradient borders

---

# 70. Page Backgrounds

Marketing:

```text
#FFFFFF
```

or

```text
#F8FAFC
```

Dashboard:

```text
#F8FAFC
```

Cards:

```text
#FFFFFF
```

This creates separation without excessive shadows.

---

# 71. Design Tokens

Centralize these values.

```css
:root {
  --primary: #6366F1;
  --primary-hover: #5558E8;
  --primary-light: #EEF2FF;

  --background: #F8FAFC;
  --surface: #FFFFFF;
  --surface-hover: #F1F5F9;

  --text-primary: #0F172A;
  --text-secondary: #475569;
  --text-muted: #64748B;
  --text-disabled: #94A3B8;

  --border: #E2E8F0;
  --border-light: #EEF2F6;

  --success: #16A34A;
  --success-light: #DCFCE7;

  --warning: #F59E0B;
  --warning-light: #FEF3C7;

  --error: #EF4444;
  --error-light: #FEE2E2;

  --info: #3B82F6;
  --info-light: #DBEAFE;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-full: 9999px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 40px;
  --space-8: 48px;
  --space-9: 64px;
  --space-10: 80px;
};
```

---

# 72. Component Reuse Rule

Before creating a new component, check whether an existing component can be reused.

Examples:

Instead of creating:

```text
CandidateCard
CandidateProfileCard
CandidateResultCard
CandidateSearchCard
```

where the visual structure is essentially identical, create a reusable:

```text
CandidateCard
```

with configurable content.

The same applies to:

* Buttons
* Inputs
* Cards
* Modals
* Tables
* Tabs
* Badges
* Dropdowns
* Sidebars
* Headers
* Empty states

---

# 73. Avoid Component Drift

Component drift occurs when multiple versions of the same UI pattern gradually appear.

Examples:

```text
Button A → 8px radius
Button B → 12px radius
Button C → pill
Button D → 16px radius
```

This is prohibited.

One semantic component should have one visual language.

---

# 74. Page-Specific Creativity

Creativity is allowed in:

* Layout composition
* Content hierarchy
* Information architecture
* Data presentation

Creativity is NOT allowed in:

* Core colors
* Typography
* Radius
* Button language
* Icon language
* Spacing system
* Navigation language

---

# 75. When Designing a New Page

The AI agent must follow this process:

### Step 1

Identify whether the page belongs to:

```text
Marketing
Candidate
Employer
Authentication
Settings
Utility
```

### Step 2

Reuse the correct application shell.

### Step 3

Identify the page's primary task.

### Step 4

Create the hierarchy around that task.

### Step 5

Reuse existing components.

### Step 6

Apply the existing design tokens.

### Step 7

Check responsive behavior.

### Step 8

Check all interaction states.

### Step 9

Remove unnecessary decoration.

### Step 10

Perform a consistency audit against this file.

---

# 76. AI Agent Self-Review Checklist

Before considering any page complete, verify:

## Visual

* [ ] Inter is used
* [ ] Correct color tokens are used
* [ ] Correct spacing system is used
* [ ] Correct border radius is used
* [ ] Cards are consistent
* [ ] Buttons are consistent
* [ ] Icons are consistent
* [ ] Shadows are subtle
* [ ] No unnecessary gradients
* [ ] No decorative elements

## Critical

* [ ] NO sparkle icons
* [ ] NO sparkle symbols
* [ ] NO decorative stars
* [ ] NO magic wand icons
* [ ] NO emoji UI
* [ ] NO random illustrations
* [ ] NO invented design language

## UX

* [ ] Primary action is obvious
* [ ] Information hierarchy is clear
* [ ] Forms are labeled
* [ ] Loading states exist
* [ ] Empty states exist
* [ ] Error states exist
* [ ] Success states exist
* [ ] Hover states exist
* [ ] Focus states exist
* [ ] Disabled states exist

## Responsive

* [ ] 320px works
* [ ] 375px works
* [ ] 768px works
* [ ] 1024px works
* [ ] 1440px works
* [ ] No horizontal overflow
* [ ] Sidebar transforms correctly
* [ ] Tables adapt correctly
* [ ] Cards stack correctly
* [ ] Typography scales correctly

---

# 77. Final Design Rule

When a design decision is not explicitly covered by this document:

1. Prefer the existing component.
2. Prefer the existing token.
3. Prefer the simpler option.
4. Prefer whitespace over decoration.
5. Prefer functionality over visual novelty.
6. Prefer consistency over creativity.

**Talentry should look like one coherent product, not a collection of individually designed pages.**

The goal is not to make every page visually impressive.

The goal is to make every page feel like it belongs to the same product.
