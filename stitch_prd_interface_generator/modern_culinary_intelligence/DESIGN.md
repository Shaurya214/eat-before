---
name: Modern Culinary Intelligence
colors:
  surface: '#f8faf7'
  surface-dim: '#d8dbd8'
  surface-bright: '#f8faf7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f1'
  surface-container: '#eceeeb'
  surface-container-high: '#e7e9e6'
  surface-container-highest: '#e1e3e0'
  on-surface: '#191c1b'
  on-surface-variant: '#404943'
  inverse-surface: '#2e312f'
  inverse-on-surface: '#eff1ee'
  outline: '#717973'
  outline-variant: '#c0c9c1'
  surface-tint: '#366850'
  primary: '#003421'
  on-primary: '#ffffff'
  primary-container: '#174b35'
  on-primary-container: '#86ba9e'
  inverse-primary: '#9dd2b5'
  secondary: '#326947'
  on-secondary: '#ffffff'
  secondary-container: '#b2edc2'
  on-secondary-container: '#366d4b'
  tertiary: '#402700'
  on-tertiary: '#ffffff'
  tertiary-container: '#5d3b00'
  on-tertiary-container: '#ec9f1a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b8efd0'
  primary-fixed-dim: '#9dd2b5'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#1c5039'
  secondary-fixed: '#b4f0c5'
  secondary-fixed-dim: '#99d4aa'
  on-secondary-fixed: '#00210f'
  on-secondary-fixed-variant: '#175131'
  tertiary-fixed: '#ffddb4'
  tertiary-fixed-dim: '#ffb955'
  on-tertiary-fixed: '#291800'
  on-tertiary-fixed-variant: '#633f00'
  background: '#f8faf7'
  on-background: '#191c1b'
  surface-variant: '#e1e3e0'
  status-danger: '#E53935'
  status-warning: '#F5A623'
  status-upcoming: '#EBB305'
  status-fresh: '#2E7D32'
  surface-card: '#FFFFFF'
  text-primary: '#13231B'
  text-secondary: '#496355'
  border-subtle: '#E2EBE5'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system pairs sustainable food management with high-utility generative intelligence. The personality is grounded, conscious, and reliable, evoking the calm organization of an artisanal kitchen rather than the clinical sterility of inventory software.

It adopts a **Warm Minimalist SaaS** style: generous whitespace, organic earthy greens, subtle tinted shadows, and purposeful micro-interactions. The interface delivers low cognitive load during routine kitchen updates while commanding instant focus when perishable ingredients approach their expiration window. Visual cues must evoke proactive culinary inspiration over chore-like inventory tracking.

## Colors
The palette centers on `#174B35` (Forest Green), delivering authoritative contrast and sustainable elegance for key actions and top-level brand surfaces. `#70A982` (Sage Green) supports softer interactive states, progress accents, and subdued iconography. 

The 4-tier freshness continuum drives user triage:
- **Expired (`#E53935`)**: Critical alert. Demands immediate removal or composting.
- **Expiring Soon (`#F5A623`)**: Urgency state (0–3 days). Prominently feeds the AI recipe engine.
- **Upcoming (`#EBB305`)**: Cautionary status (4–7 days). Subtle golden attention flag.
- **Fresh (`#2E7D32`)**: Stable state (>7 days). Reassuring leaf tone.

All statuses pair explicit color chips with crisp textual labels and high-contrast typography to ensure WCAG AA compliance across all states.

## Typography
Plus Jakarta Sans serves across display, body, and label roles. Its geometric build paired with subtle rounded terminals complements modern culinary branding while retaining structural readability for high-density tables and recipe logs. 

Headlines employ snug letter-spacing (`-0.02em`) to deliver modern editorial weight. Body text maintains open line heights (1.5x to 1.6x) to facilitate scanning complex recipe instructions on kitchen devices. Labels, status pill badges, and table column headers utilize tighter uppercase or bold tracking (`0.02em` - `0.04em`) to establish visual anchor points without dominating layout hierarchy.

## Layout & Spacing
The layout follows a responsive 12-column grid system anchored to a strict 4px / 8px base rhythm:
- **Desktop (1024px+)**: Fixed collapsible 260px navigation sidebar paired with a fluid 12-column canvas. Gutters remain `1.5rem` (`24px`) with `2rem` (`32px`) margins. Pantry inventory shifts cleanly between a multi-column fluid card grid (3 to 4 across) and a structured single-row data table.
- **Tablet (768px - 1023px)**: 8-column grid with `1rem` (`16px`) gutters. Sidebar collapses into an off-canvas drawer. Cards reflow to 2 columns.
- **Mobile (< 768px)**: 4-column layout with `1rem` margins and `1rem` gutters. Primary interface relies on a fixed bottom navigation bar for single-thumb pantry triage and recipe generation triggers.

## Elevation & Depth
Visual hierarchy relies on warm, tinted ambient depth rather than stark grey drop-shadows. The base canvas uses a tinted natural neutral (`#F7F9F6`), allowing pure white (`#FFFFFF`) card surfaces to elevate organically with fine hairline borders (`#E2EBE5`).

- **Base Layer (Flat)**: Background canvas (`#F7F9F6`), structural table rows on rest.
- **Surface Elevation 1 (Card & Pantry Items)**: `box-shadow: 0 1px 3px 0 rgba(23, 75, 53, 0.04), 0 1px 2px -1px rgba(23, 75, 53, 0.04)`. Outlined with a 1px solid hairline border (`#E2EBE5`).
- **Surface Elevation 2 (Active Flyouts & Hover States)**: `box-shadow: 0 8px 16px -4px rgba(23, 75, 53, 0.08), 0 4px 6px -2px rgba(23, 75, 53, 0.03)`.
- **Surface Elevation 3 (Modals & Recipe Generation Overlays)**: `box-shadow: 0 20px 25px -5px rgba(23, 75, 53, 0.12), 0 8px 10px -6px rgba(23, 75, 53, 0.04)`. Supported by a frosted, tinted backdrop overlay (`rgba(19, 35, 27, 0.4)` with `backdrop-filter: blur(6px)`).

## Shapes
A roundedness factor of `2` provides an approachable, contemporary culinary feel. Standard interactive components (buttons, input fields, dropdown triggers) feature `0.5rem` (`8px`) radii. Metric tiles, pantry item cards, and recipe summary containers utilize `rounded-lg` (`1rem` / `16px`) to soften screen boundaries. Pill badges, status chips, and primary floating action buttons take full circular radii (`rounded-full` / `9999px`) to create distinction against rectilinear layouts.

## Components

### Buttons
- **Primary**: Solid Forest Green (`#174B35`) fill with pure white text, `0.5rem` corner radius, `space-md` horizontal padding, and subtle hover deepening to `#113828`.
- **Secondary / Action Accent**: Sage Green tint surface (`rgba(112, 169, 130, 0.15)`) with Forest Green text (`#174B35`), elevating to solid Sage Green on active hover.
- **AI Trigger ("Generate Recipe")**: Solid Forest Green with a soft ambient pulse shadow tinted with gold (`#F5A623`), signaling generative capability.

### Expiry Pill Badges
Pill-shaped status chips (`rounded-full`, padding `0.25rem 0.75rem`) featuring a prominent 6px leading indicator dot:
- **Expired**: Light red wash (`rgba(229, 57, 53, 0.1)`) with `#E53935` text and solid red dot.
- **Expiring Soon**: Light orange wash (`rgba(245, 166, 35, 0.12)`) with `#D48207` text and solid orange dot.
- **Upcoming**: Light yellow wash (`rgba(235, 179, 5, 0.14)`) with `#9E7700` text and solid amber dot.
- **Fresh**: Soft herbal green wash (`rgba(46, 125, 50, 0.1)`) with `#2E7D32` text and solid leaf-green dot.

### Pantry Cards & Data Rows
- **Grid Card**: White container with `rounded-lg` (16px), subtle border (`#E2EBE5`), and status pill pinned to the top-right. Left vertical highlight bar (3px) matching the freshness status color for instant visual triage.
- **List View Row**: Clean horizontal row with alternating hairline border separators, contextual item quantity badges, and quick-action menu (Edit, Consume, Throw Away).

### Input Fields & Controls
- Form controls feature a 1px border (`#E2EBE5`) over pure white surfaces with `0.5rem` roundedness. Focus rings use Forest Green (`#174B35`) at 2px offset with soft focus spread (`rgba(23, 75, 53, 0.2)`).

### AI Generation & Empty States
- **AI Loading Container**: Structured skeleton blocks animated with an organic left-to-right shimmer tinted in pale Sage Green.
- **Empty State**: Centered minimalist line illustration of an open pantry/refrigerator paired with friendly, motivating instructional copy and a primary "Add Your First Item" CTA.