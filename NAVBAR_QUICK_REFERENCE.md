# Navbar Quick Reference Guide

## Copy-Paste Navbar Template

Use this for any new pages. Replace links/page names as needed:

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

## Active Link - How To

### For the Current Page's Navigation
Add `active` class to the current page's nav link:

**Example: If this is info.html**
```html
<li class="nav-item">
  <a class="nav-link active" data-page="info" href="/src/info.html">Info</a>
</li>
```

**Example: If this is add-entry.html (New Mood)**
```html
<!-- Also add to New Mood button: -->
<a href="/src/add-entry.html" class="new-mood-btn active">
  <span>+</span> New Mood
</a>
```

## Pages with Active Link

| Page | Active Element | Active Class |
|------|---|---|
| dashboard.html | No active (unauthenticated) | None |
| mood-quest.html | Mood Quest link | `class="nav-link active"` |
| vibe-lab.html | Vibe Lab link | `class="nav-link active"` |
| add-entry.html | New Mood button | `class="new-mood-btn active"` |
| info.html | Info link | `class="nav-link active"` |

## CSS Classes Reference

| Class | Purpose | Location |
|-------|---------|----------|
| `.navbar` | Main navbar container | All pages |
| `.navbar-brand` | Logo/brand section | Left |
| `.navbar-container-wrapper` | Three-section flex wrapper | Top-level |
| `.navbar-center` | Center section (button) | Middle |
| `.navbar-right` | Right section (links) | Right |
| `.new-mood-btn` | Styled button | Center |
| `.nav-link` | Navigation links | Right |
| `.nav-link.active` | Current page highlight | Right |

## Design Specifications

### New Mood Button
- **Background**: `#f2f2f2` (light gray)
- **Text Color**: `#1f2937` (dark)
- **Size**: `0.75rem 1.5rem` padding
- **Border Radius**: `14px`
- **Font Weight**: `700` (bold)
- **Hover Effect**: `scale(1.08)` + enhanced shadow
- **Click Effect**: `scale(0.96)`

### Navigation Links
- **Text Color**: `rgba(255, 255, 255, 0.95)` (almost white)
- **Font Weight**: `500` (normal) / `600` (active)
- **Hover**: `rgba(255, 255, 255, 0.15)` background
- **Active**: `rgba(255, 255, 255, 0.25)` background

## Layout Sections

### Three-Part Layout
```
[Brand Logo]    [  + New Mood  ]    [Nav Links | Logout]
   (Left)           (Center)              (Right)
   Flex 0 0         Flex 1              Flex 0 0
```

- **Brand**: Stays on left, margin-right: auto
- **Button**: Centered with flex: 1 parent
- **Links**: Stacked on right, doesn't shift

## Responsive Breakpoints

| Breakpoint | Layout Changes |
|-----------|---|
| ≥ 992px (Desktop) | All sections visible, button centered |
| ≤ 991px (Tablet) | Smaller padding, responsive spacing |
| ≤ 768px (Mobile) | Hamburger menu, button stacks below |
| ≤ 576px (Extra Small) | Smaller fonts, full-width button |

## Testing Checklist

- [ ] Button is centered on desktop
- [ ] Button doesn't shift with content changes
- [ ] Hover scale effect works (1.08)
- [ ] Click scale effect works (0.96)
- [ ] Active link shows highlighted background
- [ ] Mobile hamburger menu opens/closes
- [ ] Button is full-width on mobile
- [ ] All links are clickable and responsive

## Files Modified

- ✅ `src/dashboard.html`
- ✅ `src/mood-quest.html`
- ✅ `src/vibe-lab.html`
- ✅ `src/add-entry.html`
- ✅ `src/info.html`
- ✅ `src/css/style.css` (added navbar CSS)

## CSS Media Queries

```css
/* Tablet: ≤ 991px */
@media (max-width: 991px) { ... }

/* Mobile: ≤ 768px */
@media (max-width: 768px) { ... }

/* Extra Small: ≤ 576px */
@media (max-width: 576px) { ... }
```

All included in `src/css/style.css` lines 119-179.

---

**Quick Ref v1.0** | Last updated: March 3, 2026
