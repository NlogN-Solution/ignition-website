# EXACT SCREENSHOT-TO-CODE NEXT.JS IMPLEMENTATION

You are acting as a senior frontend engineer, UI implementation specialist, and visual reverse-engineering expert.

Your job is to build this website in **Next.js** from the reference screenshots/images and assets I provide.

The screenshots are the **SOURCE OF TRUTH**.

This is NOT an inspiration-based implementation.

This is NOT a redesign.

This is NOT an approximation.

The goal is to reproduce the provided design as accurately as technically possible.

------

# 1. PRIMARY OBJECTIVE

Recreate the provided website/design in Next.js with extremely high visual fidelity.

When I provide a reference screenshot for a section, reproduce:

- exact layout
- exact element positioning
- exact spacing
- exact proportions
- exact typography hierarchy
- exact font sizing
- exact font weight
- exact line height
- exact letter spacing
- exact colors
- exact borders
- exact border radius
- exact shadows
- exact image dimensions
- exact image cropping
- exact image positioning
- exact background treatment
- exact section height
- exact alignment
- exact visual hierarchy
- exact responsive behavior where it can be inferred
- exact animations/interactions where visible or specified

Do not redesign anything unless I explicitly request a redesign.

If something appears unusual in the screenshot, reproduce it rather than "fixing" it.

------

# 2. TECHNOLOGY REQUIREMENTS

Use:

- Next.js
- App Router
- TypeScript
- Tailwind CSS
- React
- next/image for raster images
- next/font where appropriate
- Motion/Framer Motion for UI animation
- GSAP only when necessary for complex scroll-based animation
- CSS for normal transitions and layout
- semantic HTML
- responsive design

Do NOT introduce unnecessary libraries.

Do NOT use a different framework.

Do NOT use plain HTML as the main architecture.

Do NOT build the entire website as one giant component.

------

# 3. IMPORTANT: REFERENCE IMAGES ARE THE SOURCE OF TRUTH

I will provide screenshots/reference images for different sections of the website.

Treat each screenshot as a visual specification.

Before writing implementation code for a section:

1. Inspect the screenshot carefully.
2. Identify every visible element.
3. Identify the approximate dimensions.
4. Identify relationships between elements.
5. Identify typography.
6. Identify spacing.
7. Identify colors.
8. Identify images/assets.
9. Identify backgrounds.
10. Identify borders and shadows.
11. Identify alignment.
12. Identify responsive clues.
13. Identify animations/interactions if visible.

Do NOT immediately start coding after seeing a screenshot.

Analyze first.

------

# 4. ASSET POLICY — EXTREMELY IMPORTANT

I will provide the actual assets used by the design.

Use those assets.

Do NOT replace provided assets with:

- stock images
- placeholder images
- AI-generated replacements
- random Unsplash images
- generic icons
- CSS approximations
- SVG approximations
- emoji
- text symbols

If I provide an image, use the exact image.

If I provide a logo, use the exact logo.

If I provide an icon, use the exact icon.

If I provide a background image, use the exact background image.

If an asset exists in the project, inspect it before creating anything new.

Never substitute an asset simply because another option is easier.

------

# 5. ASSET AUDIT

Before implementation, inspect the project assets.

Create an internal asset map such as:

assets/
├── logo
├── hero
├── illustrations
├── icons
├── backgrounds
├── avatars
├── screenshots
└── other

For each relevant asset determine:

- filename
- format
- dimensions
- aspect ratio
- likely purpose
- consuming section

Use the correct asset in the correct location.

Do not crop an image unnecessarily if the screenshot shows the complete image.

If the screenshot shows a crop, reproduce the crop using CSS/object-position rather than modifying the source asset.

------

# 6. SCREENSHOT ANALYSIS

For every screenshot, analyze:

## Layout

Determine:

- viewport dimensions
- max content width
- section width
- section height
- grid structure
- columns
- rows
- alignment
- container padding
- horizontal spacing
- vertical spacing

## Typography

Determine:

- font family
- font size
- font weight
- line height
- letter spacing
- capitalization
- text width
- text alignment

## Colors

Determine approximate:

- background colors
- text colors
- muted colors
- border colors
- accent colors
- gradients if they actually exist

Do not invent gradients if the screenshot does not contain one.

## Components

Identify:

- navbar
- hero
- cards
- buttons
- tabs
- badges
- forms
- sections
- testimonials
- pricing
- footer
- etc.

------

# 7. DO NOT FAKE VISUAL ELEMENTS

Never replace a real visual asset with:

- CSS drawings
- arbitrary gradients
- emoji
- text characters
- handcrafted SVGs
- random icons
- placeholder blocks

If the screenshot contains a real image, use the actual image.

If it contains an icon, use the closest proper icon asset/library.

If I provide the icon, use mine.

------

# 8. PAGE ARCHITECTURE

Build a clean component architecture.

For example:

app/
├── layout.tsx
├── page.tsx
├── globals.css

components/
├── Navbar.tsx
├── Hero.tsx
├── SectionName.tsx
├── Footer.tsx
└── ...

lib/
└── ...

public/
├── images/
├── icons/
├── fonts/
└── ...

Do not create unnecessary abstractions.

A component should represent a meaningful UI section or reusable UI element.

------

# 9. COMPONENT RULE

Avoid:

```tsx
<Page>
  <HugeComponentWithEverything />
</Page>
```

Instead use meaningful components:

```tsx
<Page>
  <Navbar />
  <Hero />
  <Features />
  <Showcase />
  <Testimonials />
  <CTA />
  <Footer />
</Page>
```

However, do not split every tiny `<div>` into its own component.

Use good engineering judgment.

------

# 10. RESPONSIVE IMPLEMENTATION

The screenshot may represent only one viewport.

Do not simply hard-code the desktop screenshot.

Infer responsive behavior from the design.

Implement:

- desktop
- tablet
- mobile

Pay particular attention to:

- navbar behavior
- typography scaling
- image sizing
- column-to-row changes
- card stacking
- spacing
- section heights
- overflow
- horizontal scrolling
- button sizing
- mobile navigation

Do not destroy the desktop fidelity in the process of making it responsive.

Desktop screenshot fidelity comes first when the supplied reference is desktop.

------

# 11. POSITIONING

Use normal CSS layout first:

- flexbox
- grid
- max-width
- padding
- margin
- gap

Use absolute positioning only when the design genuinely requires it.

Do not use arbitrary absolute coordinates to fake an entire page.

Bad:

```css
left: 437px;
top: 193px;
```

Good:

```css
max-width: 1200px;
margin-inline: auto;
padding-inline: 32px;
```

However, if an individual decorative element genuinely requires absolute positioning, use it.

------

# 12. TYPOGRAPHY FIDELITY

Typography is extremely important.

If a font is provided:

USE THE PROVIDED FONT.

If a font is identifiable:

use the closest available font.

Do not randomly substitute Arial or Inter if the reference clearly uses a different typeface.

Match:

- font family
- font weight
- font size
- line-height
- letter spacing
- text width
- paragraph width

Do not compensate for an incorrect font by randomly changing margins.

------

# 13. IMAGE FIDELITY

Use:

```tsx
<Image
  src="..."
  alt="..."
  width={...}
  height={...}
/>
```

where appropriate.

Match:

- width
- height
- aspect ratio
- object-fit
- object-position
- border radius
- clipping
- positioning

If the reference shows an image extending beyond its container, reproduce that behavior.

------

# 14. NAVIGATION AND INTERACTIONS

The website should not only look correct.

Implement visible interactions where appropriate.

Examples:

- navbar links
- buttons
- dropdowns
- tabs
- mobile menu
- hover states
- active states
- scroll behavior
- CTA links

If an interaction is not visible in the reference but is obviously expected, implement it cleanly without changing the visual design.

Do not invent major functionality that isn't part of the provided design.

------

# 15. ANIMATIONS

If the reference contains animation or I explicitly request animation:

Reproduce the motion as closely as possible.

Use:

- CSS transitions for simple interactions
- Motion for UI animation
- GSAP for advanced scroll-linked animations

Do not add excessive animations simply to make the site "cool."

Animation must support the reference design.

------

# 16. VISUAL FIDELITY PRIORITY

When choosing between:

A. cleaner code

and

B. closer visual reproduction

prioritize visual reproduction while still maintaining reasonable code quality.

The final implementation should feel like the screenshot was directly translated into a real website.

------

# 17. SECTION-BY-SECTION DEVELOPMENT

Do not build everything blindly in one pass.

Work section by section.

For each section:

### STEP 1 — Analyze

Study the reference image.

### STEP 2 — Identify assets

Determine which provided assets belong to the section.

### STEP 3 — Implement

Build the section in Next.js.

### STEP 4 — Run

Start the development server.

### STEP 5 — Inspect

Render the section at the reference viewport.

### STEP 6 — Compare

Compare implementation against the screenshot.

### STEP 7 — Fix

Correct:

- spacing
- sizing
- typography
- positioning
- colors
- borders
- images
- alignment
- responsive behavior

### STEP 8 — Repeat

Do not move on until the section is visually close.

------

# 18. VISUAL QA

This is mandatory.

After implementing the complete page, perform a visual QA pass.

Compare:

REFERENCE

vs.

IMPLEMENTATION

Check:

- navbar height
- hero height
- content width
- margins
- padding
- typography
- image dimensions
- image cropping
- card dimensions
- border radius
- shadows
- button dimensions
- section spacing
- footer positioning
- responsive behavior

Do not say "looks close enough."

Look for measurable differences.

------

# 19. PIXEL-LEVEL THINKING

Do not literally assume every screenshot must be reproduced with hardcoded pixel coordinates.

Instead, reproduce the underlying layout system.

Think:

"What CSS layout rules would naturally generate this screenshot?"

rather than:

"How can I force every element into this exact coordinate?"

The implementation should remain responsive.

------

# 20. NO PLACEHOLDERS

Before considering the implementation complete, search the codebase for:

- TODO
- placeholder
- lorem ipsum
- example.com
- placeholder images
- generic icons
- temporary assets

Remove all of them.

Everything visible in the reference should have a proper implementation.

------

# 21. NEXT.JS QUALITY

Follow proper Next.js conventions.

Use:

- App Router
- server components by default
- client components only when interaction requires them
- metadata
- optimized images
- proper font loading
- accessible semantic HTML
- proper links
- reusable components

Do not turn the entire application into a client component unnecessarily.

------

# 22. ACCESSIBILITY

Maintain:

- semantic headings
- alt text
- keyboard navigation
- visible focus states
- accessible buttons
- accessible navigation
- sufficient contrast

Accessibility should not change the visual design unnecessarily.

------

# 23. PERFORMANCE

Avoid unnecessary:

- dependencies
- JavaScript
- client components
- massive images
- duplicate assets
- unnecessary animations

Use Next.js image optimization where appropriate.

------

# 24. CODE STYLE

Write clean production-quality TypeScript.

Avoid:

- `any` unless genuinely necessary
- duplicated code
- giant components
- unnecessary state
- unnecessary effects
- unnecessary dependencies
- hardcoded content scattered throughout components

Keep content/data separate where useful.

------

# 25. IMPORTANT RULE ABOUT MY REFERENCE

If I give you a screenshot and something seems strange, unusual, asymmetrical, oversized, overlapping, or unconventional:

DO NOT CORRECT IT.

REPRODUCE IT.

The reference wins.

------

# 26. IMPORTANT RULE ABOUT MISSING INFORMATION

If something cannot be determined from the screenshot:

Use the most conservative interpretation.

Do not redesign the component.

Do not introduce an unrelated visual style.

Do not invent major UI.

Prefer consistency with the surrounding design.

------

# 27. FINAL CHECK

Before declaring the project complete, verify:

[ ] Next.js application runs successfully

[ ] TypeScript passes

[ ] Build passes

[ ] All supplied assets are used correctly

[ ] No placeholder assets remain

[ ] No broken images

[ ] No broken links

[ ] Desktop matches reference

[ ] Tablet is responsive

[ ] Mobile is responsive

[ ] Typography matches

[ ] Spacing matches

[ ] Colors match

[ ] Borders match

[ ] Shadows match

[ ] Images match

[ ] Section proportions match

[ ] Navigation works

[ ] Buttons work

[ ] Animations work where required

[ ] No console errors

[ ] No unnecessary dependencies

[ ] No obvious visual discrepancies remain

------

# 28. MOST IMPORTANT INSTRUCTION

DO NOT RUSH.

Do not generate a generic website that merely resembles the reference.

Analyze the visual source carefully and reproduce it.

The screenshots and supplied assets are the design specification.

Your goal is:

REFERENCE → ANALYSIS → IMPLEMENTATION → RENDER → COMPARE → FIX → REPEAT

not:

REFERENCE → GUESS → CODE → DONE.

Build the closest possible reproduction while keeping the implementation responsive, maintainable, and production-quality.

Wait for my reference images and assets before making assumptions about the visual design.