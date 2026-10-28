# Avark Agency Design System: Reverse Engineering & Extraction Report

> Extracted from `https://avark.agency` and `https://avark.agency/case-studies/metacade`  
> Measured on desktop (1440px) and mobile (390px) viewports.

---

## 1. Typography & Hierarchy

* **Primary Font Family**: `Manrope` (OFL Free Google Font) + system fallbacks.
* **Secondary / Display Accents**: `Manrope` ExtraBold / Bold (or `Instrument Sans` / `Syne` for elevated editorial tension).
* **Technical & Eyebrow Monospace**: `JetBrains Mono` / `Space Mono` / system monospace.
* **Type Hierarchy**:
  * **Hero $H1$**: `clamp(2.75rem, 6.5vw, 6.0rem)`, weight 700/800, line-height `1.05`, letter-spacing `-0.035em`.
  * **Section $H2$**: `clamp(2.0rem, 4.0vw, 3.75rem)`, weight 700, line-height `1.1`, letter-spacing `-0.03em`.
  * **Card / Row $H3$**: `clamp(1.25rem, 2.2vw, 1.85rem)`, weight 700, line-height `1.2`.
  * **Body / Paragraph**: `1.0625rem` (17px), line-height `1.6`, weight 400.
  * **Slash Eyebrows & Meta Labels**: `0.75rem` (12px), weight 600, uppercase, tracking `0.08em`, prefixed with slash (e.g. `/Selected builds`, `/Services`).

---

## 2. Color Palette & Surface Tokens

* **Background Base (Void)**: `#0A0A0B` (deep, warm obsidian void).
* **Surface Containers**: `#111114` (card panels, mega-menus, drawers).
* **Elevated Surface**: `#17171B` (interactive card hovers).
* **Hairline Borders**: `rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.12)`.
* **Primary Editorial Text**: `#F4F4F2` (soft off-white).
* **Muted Editorial Text**: `#9A9AA3` (tertiary text, dates, secondary scopes).
* **Rareware Signature Accent**: Electric Teal (`#00F5D4`), reserved for one focal accent per section.

---

## 3. Motion System & Easing Curves

Extracted from CSS and animation runtimes:
* **Primary Ease Out**: `cubic-bezier(0.22, 1, 0.36, 1)` and `cubic-bezier(0, 0, 0.2, 1)`.
* **Custom Snap Overshoot**: `cubic-bezier(0.5, 0.75, 0, 1)`.
* **Hover Interaction Timing**:
  * Row title shift: `translateX(16px)` with `duration: 0.35s`.
  * Card lift: `translateY(-6px)` with subtle elevation shadow.
  * Copy button feedback: `1.6s` label flip from "Copy" to "Copied".
  * Stacking cards: sticky pinning where subsequent cards overlap previous cards with subtle `scale(0.96)` and opacity dimming.

---

## 4. Layout Architecture & Structural Rhythms

* **12-Column Grid**: Max width `1440px`.
* **Gutters**: `clamp(20px, 4vw, 64px)`.
* **Section Vertical Padding**: `clamp(80px, 12vw, 180px)`.
* **Corner Radii**:
  * Cards: `20px` / `24px`.
  * Capability Pills: `9999px` (rounded-full).
  * Buttons: `12px` / `14px`.
* **Header Behavior**: Fixed, hides on scroll-down, returns smoothly on scroll-up. Mega-menu dropdown on `/Products` with hover visual crossfade.
