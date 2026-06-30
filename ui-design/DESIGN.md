---
name: Botanical Elegance
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#4d4447'
  inverse-surface: '#303030'
  inverse-on-surface: '#f2f0f0'
  outline: '#7f7478'
  outline-variant: '#d0c3c7'
  surface-tint: '#6b5a60'
  primary: '#6b5a60'
  on-primary: '#ffffff'
  primary-container: '#fce4ec'
  on-primary-container: '#76646b'
  inverse-primary: '#d7c1c8'
  secondary: '#556158'
  on-secondary: '#ffffff'
  secondary-container: '#d9e6da'
  on-secondary-container: '#5b675e'
  tertiary: '#a82d68'
  on-tertiary: '#ffffff'
  tertiary-container: '#ffe3ea'
  on-tertiary-container: '#b63873'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f4dce4'
  primary-fixed-dim: '#d7c1c8'
  on-primary-fixed: '#25181e'
  on-primary-fixed-variant: '#524249'
  secondary-fixed: '#d9e6da'
  secondary-fixed-dim: '#bdcabe'
  on-secondary-fixed: '#131e17'
  on-secondary-fixed-variant: '#3e4a41'
  tertiary-fixed: '#ffd9e4'
  tertiary-fixed-dim: '#ffb0cc'
  on-tertiary-fixed: '#3e0020'
  on-tertiary-fixed-variant: '#890f50'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
The design system is centered on the concept of "The Digital Conservatory"—a space that feels as fresh and curated as a boutique floral studio. The target audience includes thoughtful gift-givers and event planners who value aesthetics and reliability. 

The visual style is a blend of **Soft Minimalism** and **Contemporary Editorial**. It prioritizes heavy white space to let high-quality floral photography breathe, utilizing delicate transitions and a rhythmic layout to evoke a sense of calm and luxury. The emotional response is one of "Blooming Trust"—the user should feel that the ordering process is as delicate and handled with as much care as the flowers themselves.

## Colors
The palette is grounded in a "Petal and Leaf" philosophy. 
- **Primary (Petal Pink):** Used for large surface areas, hero backgrounds, and celebratory accents. It provides a warm, inviting glow.
- **Secondary (Botanical Green):** Reserved for success states, subtle highlights, and "Freshness" indicators. 
- **Tertiary (Deep Rose):** A high-contrast anchor used strictly for primary calls to action and critical interactive text to ensure legibility against light pastels.
- **Neutral:** A warm slate grey is used for body text instead of pure black to maintain the soft, premium feel. 
- **Background:** Surfaces should primarily use pure white (#FFFFFF) to ensure the pastel accents feel intentional and clean.

## Typography
The typography strategy employs a high-contrast pairing to balance heritage with modern utility. 

**Playfair Display** is used for all editorial moments—headlines, product titles, and quote blocks. It should be typeset with slightly tighter letter-spacing in larger formats to appear more "fashion-forward."

**Plus Jakarta Sans** handles all functional UI tasks. Its wide apertures and soft curves complement the organic nature of the brand while ensuring maximum readability during the checkout and booking flow. Use the "Label-MD" style for navigation and buttons to provide a disciplined, professional counterpoint to the expressive headlines.

## Layout & Spacing
The layout follows a **Fluid-Fixed Hybrid** model. On desktop, content is constrained to a 1200px central container to prevent line lengths from becoming unreadable. 

- **Grid:** A 12-column grid is used for desktop, collapsing to 4 columns on mobile.
- **Rhythm:** Use an 8px baseline grid. Components should favor generous internal padding (e.g., 24px or 32px) to reinforce the "Premium" feel.
- **Negative Space:** Sections should be separated by large vertical blocks (stack-lg) to allow the user's eye to rest between different floral arrangements or categories.

## Elevation & Depth
This design system avoids heavy drop shadows in favor of **Tonal Elevation** and **Soft Ambient Glows**.

- **Surface Tiers:** Level 0 is the white background. Level 1 (Cards) uses the Primary Pink (#FCE4EC) at 30% opacity or a subtle 1px border in the same color.
- **Shadows:** Use a "Petal Shadow" for interactive elements—a very diffused, low-opacity shadow (Color: #880E4F, Opacity: 8%, Blur: 20px, Y-Offset: 10px). This makes buttons feel like they are floating gently above the surface rather than sitting heavily on it.
- **Transitions:** All hover states should use a soft 300ms ease-in-out transition to mimic the gentle movement of nature.

## Shapes
The shape language is organic and soft. Every interactive element—from input fields to large image containers—uses a high corner radius to echo the curves of flower petals. 

- **Full Radius:** Buttons and input fields should utilize the "Pill" shape (rounded-full) where possible.
- **Containment:** Product cards and modals should use a `rounded-xl` (1.5rem / 24px) setting to maintain a friendly, approachable silhouette. Avoid sharp 90-degree angles entirely.

## Components

### Buttons
Primary buttons use the Deep Rose (#880E4F) background with white text and a pill-shaped radius. Secondary buttons should be transparent with a 1.5px border of the primary color and a soft pink background on hover.

### Input Fields
Inputs are large (56px height) with a pill-shaped radius. The border should be a subtle Botanical Green (#E8F5E9) that transitions to a solid Deep Rose when focused. Labels should float above the input in the "Label-MD" typography style.

### Cards
Floral cards use a vertical orientation. Images should have a `rounded-xl` top radius. Text is centered below the image, using Playfair Display for the flower name and Plus Jakarta Sans for the price.

### Chips & Tags
Use for "In Season," "Best Seller," or flower types. These are small, pill-shaped elements with a Secondary Green background and a slightly darker green text for readability.

### Floral Iconography
Icons must be "Line-Art" style with thin, 1.5pt strokes. Use floral motifs (a single stem, a petal, a water drop) to replace standard UI icons where it adds delight without sacrificing clarity. All icons should have rounded caps and joins.

### Date Picker
As a booking system, the calendar is a hero component. Use the Primary Pink for the selected range and Botanical Green for today's date. Ensure the UI is spacious to prevent "fat-finger" errors on mobile.