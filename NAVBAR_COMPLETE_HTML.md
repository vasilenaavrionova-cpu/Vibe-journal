# Unified Navbar - Complete HTML Code

## Standard Navbar HTML (Used on All Pages)

Copy this navbar code to ensure consistency:

```html
<nav class="navbar navbar-expand-lg navbar-dark sticky-top" style="background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%);">
  <div class="container-fluid">
    <a class="navbar-brand fw-bold" href="/src/index.html">
      <span style="font-size: 1.8rem; margin-right: 0.5rem;">✨</span>Vibe Journal
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a href="/src/info.html" class="nav-link">Info</a>
        </li>
        <li class="nav-item">
          <a href="/src/dashboard.html" class="nav-link">Dashboard</a>
        </li>
        <li class="nav-item">
          <a href="/src/mood-quest.html" class="nav-link">Mood Quest</a>
        </li>
        <li class="nav-item">
          <a href="/src/vibe-lab.html" class="nav-link">Vibe Lab</a>
        </li>
        <li class="nav-item">
          <a href="/src/add-entry.html" class="btn btn-light btn-sm me-2">+ New Entry</a>
        </li>
        <li class="nav-item">
          <button id="logoutBtn" class="btn btn-outline-light btn-sm">Logout</button>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

---

## Component Breakdown

### 1. Navbar Container
```html
<nav class="navbar navbar-expand-lg navbar-dark sticky-top" style="background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%);">
```
- **navbar**: Bootstrap navbar component
- **navbar-expand-lg**: Expand navigation on large screens (collapse on mobile)
- **navbar-dark**: Dark navbar styling
- **sticky-top**: Keep navbar visible when scrolling
- **style**: Gradient background (indigo to violet)

### 2. Container Fluid
```html
<div class="container-fluid">
```
- Full-width container for navbar content

### 3. Brand/Logo
```html
<a class="navbar-brand fw-bold" href="/src/index.html">
  <span style="font-size: 1.8rem; margin-right: 0.5rem;">✨</span>Vibe Journal
</a>
```
- **navbar-brand**: Branding section
- **fw-bold**: Bold font weight
- **href="/src/index.html"**: Always links to home
- Emoji: ✨ (1.8rem size, right-padded)

### 4. Mobile Toggle Button
```html
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
  <span class="navbar-toggler-icon"></span>
</button>
```
- Appears on mobile screens (< lg breakpoint)
- Controls collapse/expand of navbar items

### 5. Navigation Items Container
```html
<div class="collapse navbar-collapse" id="navbarNav">
  <ul class="navbar-nav ms-auto">
    <!-- Navigation items here -->
  </ul>
</div>
```
- **collapse**: Collapsible on mobile
- **navbar-collapse**: Bootstrap class
- **navbar-nav**: Navigation list
- **ms-auto**: Margin-start auto (right-align all items)

### 6. Navigation Links

#### Info Link
```html
<li class="nav-item">
  <a href="/src/info.html" class="nav-link">Info</a>
</li>
```

#### Dashboard Link
```html
<li class="nav-item">
  <a href="/src/dashboard.html" class="nav-link">Dashboard</a>
</li>
```

#### Mood Quest Link
```html
<li class="nav-item">
  <a href="/src/mood-quest.html" class="nav-link">Mood Quest</a>
</li>
```

#### Vibe Lab Link
```html
<li class="nav-item">
  <a href="/src/vibe-lab.html" class="nav-link">Vibe Lab</a>
</li>
```

### 7. New Entry Button (Light Button)
```html
<li class="nav-item">
  <a href="/src/add-entry.html" class="btn btn-light btn-sm me-2">+ New Entry</a>
</li>
```
- **btn**: Button styling
- **btn-light**: Light background color
- **btn-sm**: Small button size
- **me-2**: Margin-end 2 (space before logout button)
- Styled as `<a>` tag (semantic link button)

### 8. Logout Button (Outline Button)
```html
<li class="nav-item">
  <button id="logoutBtn" class="btn btn-outline-light btn-sm">Logout</button>
</li>
```
- **id="logoutBtn"**: JavaScript hook for logout functionality
- **btn**: Button styling
- **btn-outline-light**: Outline style with light color
- **btn-sm**: Small button size
- Actual `<button>` element for form submission

---

## Key Design Decisions

### Why ms-auto?
```html
<ul class="navbar-nav ms-auto">
```
- `ms-auto` (margin-start: auto) pushes all navigation items to the right
- This aligns with Bootstrap's flexbox layout
- Creates proper spacing between logo and navigation

### Why Two Different Button Styles?
1. **New Entry**: `btn-light` - Stands out, indicates primary action
2. **Logout**: `btn-outline-light` - Subtle, secondary action

### Why Sticky-Top?
```html
class="navbar navbar-expand-lg navbar-dark sticky-top"
```
- Keeps navigation visible while scrolling
- Essential for user experience
- Works on all pages consistently

### Why /src/ Paths?
```html
href="/src/info.html"
href="/src/dashboard.html"
```
- Consistent absolute paths
- Works from any page
- Avoids relative path issues

---

## Implementation Checklist

When adding this navbar to a page:

1. ✅ Place `<nav>` right after opening `<body>` tag
2. ✅ Use absolute paths with `/src/` prefix
3. ✅ Keep `id="logoutBtn"` for JavaScript integration
4. ✅ Keep `container-fluid` for full-width navbar
5. ✅ Don't modify the link order
6. ✅ Don't hide the current page link
7. ✅ Keep the gradient background inline style
8. ✅ Ensure `sticky-top` class is present

---

## No Additional CSS Required

This navbar uses only:
- Bootstrap 5.3.0 classes (already included)
- Inline gradient styling
- Standard flexbox utilities

**No custom CSS file modifications needed!**

---

## Files Using This Navbar

All 6 pages use identical navbar code:

| File | Status |
|------|--------|
| `src/index.html` | ✅ Updated |
| `src/dashboard.html` | ✅ Updated |
| `src/mood-quest.html` | ✅ Updated |
| `src/vibe-lab.html` | ✅ Updated |
| `src/info.html` | ✅ Updated |
| `src/add-entry.html` | ✅ Updated |

---

## Navbar Flow on Mobile

**Expanded (Desktop - 1024px+):**
```
Logo | Info Dashboard Mood Quest Vibe Lab + New Entry Logout
```

**Collapsed (Mobile - < 1024px):**
```
Logo ☰
  Info
  Dashboard
  Mood Quest
  Vibe Lab
  + New Entry
  Logout
```

---

## Color Reference

| Element | Color | Hex |
|---------|-------|-----|
| Gradient Start | Indigo | #6366f1 |
| Gradient End | Violet | #7c3aed |
| Text | White | #FFFFFF |
| Button Background | Light Gray | Bootstrap default |

---

## Responsive Breakpoints

- **Expanded**: 1024px and up (`lg` breakpoint)
- **Collapsed**: Below 1024px (mobile toggle button visible)

