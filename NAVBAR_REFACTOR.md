# Vibe Journal Navbar Refactor - Complete Documentation

## Overview
The navbar has been refactored to provide a **unified, consistent look across all pages** with a centered "New Mood" button that's visually prominent and responsive.

## Navbar Structure

### HTML Layout
All pages now use the **identical navbar structure**:

```html
<nav class="navbar navbar-expand-lg navbar-dark">
  <div class="container">
    <div class="navbar-container-wrapper">
      <!-- Left: Brand -->
      <a class="navbar-brand" href="/src/dashboard.html">
        <span class="brand-emoji">✨</span> Vibe Journal
      </a>

      <!-- Mobile Toggler -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Center: New Mood Button -->
      <div class="navbar-center">
        <a href="/src/add-entry.html" class="new-mood-btn">
          <span>+</span> New Mood
        </a>
      </div>

      <!-- Right: Navigation Links -->
      <div class="collapse navbar-collapse navbar-right" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item"><a class="nav-link" data-page="info" href="/src/info.html">Info</a></li>
          <li class="nav-item"><a class="nav-link" data-page="dashboard" href="/src/dashboard.html">Dashboard</a></li>
          <li class="nav-item"><a class="nav-link" data-page="mood-quest" href="/src/mood-quest.html">Mood Quest</a></li>
          <li class="nav-item"><a class="nav-link" data-page="vibe-lab" href="/src/vibe-lab.html">Vibe Lab</a></li>
          <li class="nav-item">
            <button id="logoutBtn" class="btn btn-outline-light btn-sm">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
```

## Three-Section Layout

### 1. **Left: Brand Section**
- **Element**: `<a class="navbar-brand">`
- **Content**: `✨ Vibe Journal`
- **Styling**: White text, large font (1.5rem), bold
- **Behavior**: Always visible, links to home/dashboard
- **Flex Property**: `flex: 0 0 auto; margin-right: auto;`

### 2. **Center: New Mood Button**
- **Element**: `<div class="navbar-center">` containing `.new-mood-btn`
- **Content**: `+ New Mood`
- **Styling**:
  - Light gray background (#f2f2f2)
  - Dark text (#1f2937)
  - Bold font (700)
  - Rounded rectangle (14px border-radius)
  - Soft shadow: `0 4px 12px rgba(0, 0, 0, 0.08)`
  - **Hover**: Scale 1.08, enhanced shadow
  - **Active**: Scale 0.96 on click
- **Always Centered**: Flex center alignment ensures it stays centered
- **Flex Property**: `flex: 1; display: flex; justify-content: center;`

### 3. **Right: Navigation Links**
- **Element**: `.navbar-right` containing nav items
- **Content**: Info, Dashboard, Mood Quest, Vibe Lab, Logout
- **Styling**:
  - White text (95% opacity)
  - 0.95rem font
  - Hover: Light background, elevation
  - Active: Highlighted background (#25 opacity white)
- **Flex Property**: `flex: 0 0 auto;`

## CSS Classes

### `.navbar-container-wrapper`
- **Purpose**: Main flex container organizing the three sections
- **Display**: `flex`
- **Justify Content**: `space-between`
- **Align Items**: `center`
- **Gap**: `1rem` (spacing between sections)

### `.navbar-center`
- **Purpose**: Container for the New Mood button
- **Display**: `flex`
- **Justify Content**: `center` (always centers the button)
- **Flex**: `1` (takes up remaining space)

### `.navbar-right`
- **Purpose**: Container for right navigation
- **Display**: `flex` (from navbar-collapse)
- **Flex**: `0 0 auto`

### `.new-mood-btn`
- **Background**: `#f2f2f2` (light gray)
- **Color**: `#1f2937` (dark text)
- **Padding**: `0.75rem 1.5rem`
- **Border Radius**: `14px`
- **Font Weight**: `700` (bold)
- **Box Shadow**: `0 4px 12px rgba(0, 0, 0, 0.08)`
- **Transition**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- **Cursor**: `pointer`
- **Display**: `inline-flex` with `gap: 0.5rem`

### `.new-mood-btn:hover`
- **Transform**: `scale(1.08)`
- **Box Shadow**: `0 6px 18px rgba(0, 0, 0, 0.12)`
- **Background**: `#e8e8e8` (slightly darker)

### `.new-mood-btn.active`
- **Background**: `#e0e0e0`
- **Box Shadow**: `0 6px 18px rgba(0, 0, 0, 0.12)`
- Applied on `/src/add-entry.html` only

## Active Link Highlighting

### How It Works
Each navigation link has a `data-page` attribute matching the page identifier:

```html
<a class="nav-link active" data-page="dashboard" href="/src/dashboard.html">Dashboard</a>
```

The `.active` class is added via CSS to show the current page:
```css
.nav-link.active {
  background: rgba(255, 255, 255, 0.25);
  font-weight: 600;
}
```

### Implementation
1. **Manual**: Simply add `active` class to the current page's nav link in HTML
2. **JavaScript** (optional): Auto-detect and highlight based on URL

Example for **dashboard.html**:
- Add `class="nav-link active"` to Dashboard link
- Remove from other links

## Responsive Behavior

### Desktop (≥ 992px)
- All three sections visible: Brand | Button | Links
- Button stays centered even if links expand
- Navbar flex layout maintains spacing

### Tablet (≤ 991px)
- Hamburger menu appears
- Smaller font sizes
- Tighter padding: `0.4rem 0.6rem`
- Button padding: `0.65rem 1.25rem`

### Mobile (≤ 768px)
- Hamburger menu expands vertically
- Three-section layout stacks:
  - Order 1: Brand (left)
  - Order 2: Navbar-right (top right)
  - Order 3: Center button (full width below)
- Button becomes full-width inside mobile menu
- Mobile menu has dark gradient background
- Rounded corners at bottom: `border-radius: 0 0 12px 12px`

### Extra Small (≤ 576px)
- Brand font: `1.25rem`
- Button padding: `0.65rem 1rem`
- Nav links: `0.85rem`
- Emoji size reduced: `1.5rem`

## Pages Updated

All pages now have **identical navbar structure**:

1. ✅ [src/dashboard.html](src/dashboard.html)
2. ✅ [src/mood-quest.html](src/mood-quest.html)
3. ✅ [src/vibe-lab.html](src/vibe-lab.html)
4. ✅ [src/add-entry.html](src/add-entry.html) - *has `active` on New Mood button*
5. ✅ [src/info.html](src/info.html)

## CSS Location
All navbar CSS is in: [src/css/style.css](src/css/style.css)

### Key CSS Sections:
- Lines 27-122: Complete navbar and button styling
- Lines 27-36: `.navbar` and `.navbar-brand`
- Lines 38-55: `.navbar-container-wrapper` and sections
- Lines 57-82: Navigation links
- Lines 85-117: `.new-mood-btn` styling
- Lines 119-179: Responsive media queries

## Color Palette

- **Navbar Gradient**: `linear-gradient(135deg, #5b5fff 0%, #7c3aed 100%)`
- **Button Background**: `#f2f2f2`
- **Button Text**: `#1f2937`
- **Button Hover**: `#e8e8e8`
- **Button Active**: `#e0e0e0`
- **Nav Link Hover**: `rgba(255, 255, 255, 0.15)` background
- **Nav Link Active**: `rgba(255, 255, 255, 0.25)` background

## Design Features

### Button Excellence
✅ **Large, rounded rectangle** - Easy to click, prominent  
✅ **Light background** - Stands out against purple gradient  
✅ **Dark text** - High contrast, readable  
✅ **Centered** - Flexbox ensures true centering  
✅ **Soft shadow** - Subtle depth, modern feel  
✅ **Hover scale** - Feedback and interactivity  
✅ **Never shifts** - Fixed position in center section  

### Navigation Excellence
✅ **Consistent across all pages** - Identical HTML structure  
✅ **Professional layout** - Three-section flex design  
✅ **Active link visible** - Highlighted but not hidden  
✅ **Responsive** - Adapts beautifully on mobile  
✅ **All links visible** - Desktop shows all navigation  
✅ **Purple gradient theme** - Maintained throughout  

## Implementation Checklist

- [x] Refactor navbar structure on all pages
- [x] Create unified CSS for three-section layout
- [x] Style centered "New Mood" button
- [x] Add responsive media queries
- [x] Implement active link highlighting
- [x] Test desktop layout
- [x] Test tablet layout
- [x] Test mobile hamburger menu
- [x] Ensure button doesn't shift
- [x] Document all changes

## Testing Recommendations

1. **Desktop (1920px+)**
   - All three sections visible
   - Button perfectly centered
   - No overlapping

2. **Tablet (768px - 991px)**
   - Hamburger menu works
   - Button centered above menu
   - Proper spacing maintained

3. **Mobile (375px - 767px)**
   - Hamburger menu expands vertically
   - Button full-width in menu
   - Touch-friendly sizes (≥44px height)

4. **Button Interactions**
   - Click: Scales to 0.96
   - Hover: Scales to 1.08, shadow increases
   - Stays centered at all breakpoints

5. **Active States**
   - Current page link highlighted
   - Background color distinct
   - Font weight slightly increased

## Future Enhancements

- Auto-highlight active link with JavaScript
- Smooth transitions between pages
- Mobile navigation drawer animation
- Keyboard navigation support

---

**Refactor completed**: March 3, 2026  
**Status**: All pages updated with unified navbar structure
