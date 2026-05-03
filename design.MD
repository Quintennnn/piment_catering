# Design System Document

## 1. Overview & Creative North Star: "The Curated Earth"

The objective of this design system is to move beyond the cold, sterile nature of digital interfaces and evoke the tactile, sensory experience of a garden-to-plate kitchen. We are building **"The Curated Earth"**—a digital environment that feels as intentional as a hand-thrown ceramic plate or a thoughtfully composed seasonal dish.

To achieve a "High-End Editorial" feel, we must abandon the rigid, boxy constraints of standard web frameworks. We embrace:
*   **Intentional Asymmetry:** Overlapping images and staggered text blocks to mimic the layout of a premium culinary magazine.
*   **Tonal Depth:** Replacing harsh lines with organic shifts in background color.
*   **High-Contrast Typography:** Utilizing dramatic scale differences to create a clear, sophisticated hierarchy.

This system is designed to feel human, warm, and artisanal. Every interaction should feel like an invitation into a private, sun-drenched garden.

---

## 2. Colors

Our palette is rooted in the landscape. We utilize the warmth of terracotta, the softness of sage, and the grounding nature of earth tones.

### The Palette (Material Logic)
*   **Primary (`#9E3D21` / `primary`):** The heart of the brand. Use for primary CTAs and brand moments.
*   **Secondary (`#4E653B` / `secondary`):** The garden. Used for secondary actions and supportive elements.
*   **Surface (`#FFF8F3` / `surface`):** Our "Warm Cream" canvas. All experiences begin here.
*   **Tertiary (`#795605` / `tertiary`):** The gold accent. Use sparingly for highlights, special offers, or "chef’s recommendations."
*   **On-Surface (`#221A0F` / `on_surface`):** Our "Earth Dark." Never use pure black; this deep brown maintains the organic warmth.

### The "No-Line" Rule
To maintain an artisanal aesthetic, **the use of 1px solid borders for sectioning is strictly prohibited.** Traditional "dividers" feel industrial. Instead, define boundaries through:
*   **Background Shifts:** Transition from `surface` to `surface_container_low` (`#FFF2E2`) to mark a new content area.
*   **White Space:** Utilize the **Spacing Scale (12 - 20)** to create physical distance between concepts.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine, textured paper. 
*   Place a `surface_container_lowest` (#FFFFFF) card atop a `surface_container` (#FBECD8) section to create a soft, natural lift. 

### The "Glass & Gradient" Rule
For floating elements (like a navigation bar or a mobile overlay), use semi-transparent surface colors with a `backdrop-blur`. This allows the vibrant colors of food photography to bleed through, softening the interface. Use a subtle gradient from `primary` (#9E3D21) to `primary_container` (#BE5437) on large buttons to give them a "soul" and visual depth.

---

## 3. Typography

The typography strategy relies on the tension between the artisanal elegance of the serif and the modern clarity of the sans.

*   **Display & Headline (DM Serif Display / `notoSerif`):** High-contrast, elegant, and timeless. Use `display-lg` (3.5rem) for hero statements. This is the "voice" of the chef.
*   **Title & Body (DM Sans / `plusJakartaSans`):** Clean and highly legible. Use `body-lg` (1rem) for descriptions of dishes. The generous line-height ensures a premium, easy-reading experience.
*   **Label (DM Sans / `label-md`):** Use for metadata like "Vegetarian" or "Sourced from Utrecht." These should always be in all-caps with slight letter spacing to feel "designed."

---

## 4. Elevation & Depth

We convey hierarchy through **Tonal Layering** rather than traditional drop shadows.

### The Layering Principle
Depth is achieved by "stacking" the surface-container tiers. 
*   **Level 0:** `surface` (The base page)
*   **Level 1:** `surface_container_low` (In-page sections)
*   **Level 2:** `surface_container_lowest` (Cards or interactive elements)

### Ambient Shadows
When a "floating" effect is required (e.g., a "Book Now" floating action button), shadows must be extra-diffused. 
*   **Blur:** 24px - 40px
*   **Opacity:** 4%-6%
*   **Color:** Use a tinted version of `on_surface` (#221A0F) to mimic natural, ambient light.

### The "Ghost Border" Fallback
If a border is required for accessibility in a high-density area, use the **Ghost Border**: the `outline_variant` token at **15% opacity**. Never use a 100% opaque border.

---

## 5. Components

### Buttons
*   **Primary:** Pill-shaped (`full` roundedness), `primary` background, `on_primary` text. Use a subtle inner-glow for a "pressed" feel.
*   **Secondary:** `surface` background with a `tertiary` (Gold) Ghost Border.
*   **Padding:** Vertical `1.5` (0.5rem), Horizontal `4` (1.4rem).

### Cards
*   **Rule:** Forbid the use of divider lines. 
*   **Styling:** Use `surface_container_lowest` (#FFFFFF) with a `DEFAULT` (0.5rem) or `lg` (1rem) corner radius. 
*   **Separation:** Use `spacing-6` (2rem) of white space between card elements.

### Input Fields
*   **Background:** `surface_container_low` (#FFF2E2).
*   **States:** On focus, transition the background to `surface_container_highest` (#F0E0CD) and apply a subtle `tertiary` (Gold) ghost border.

### Chips (Dietary/Categories)
*   Small, `md` (0.75rem) rounded corners. Use `secondary_container` (#CDE8B4) for a fresh, "garden" feel when highlighting ingredients.

### The "Artisanal Gallery" (Custom Component)
A layout component for food photography where images use varied rounded corners (e.g., top-left: `xl`, bottom-right: `md`) and overlap with text blocks to break the "web-template" look.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use generous white space (Spacing 16 or 20) between major sections.
*   **Do** use the Gold (`tertiary`) accent for small, high-impact details like price or "Sold Out."
*   **Do** allow images to break the container grid to create a sense of organic movement.
*   **Do** use `display-lg` typography for evocative, short phrases (e.g., "From the Soil").

### Don't:
*   **Don't** use 1px solid borders to separate list items; use vertical padding and subtle `surface` color shifts.
*   **Don't** use harsh "Tech Blue" or "AI Purple" gradients; stick to the earthy, sun-baked palette.
*   **Don't** use standard "Drop Shadows" (0, 4, 10, black). They feel cheap.
*   **Don't** crowd the interface. If it feels "efficient," it likely isn't "premium" enough. Add more space.