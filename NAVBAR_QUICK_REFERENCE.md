# Unified Navbar - Quick Reference

## Current Navbar Structure

All 6 pages now display an identical navbar with this layout:

```
┌─────────────────────────────────────────────────────────────────────┐
│ ✨ Vibe Journal    [Info] [Dashboard] [Mood Quest] [Vibe Lab] [+ New Entry] [Logout] │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Navigation Links

| Link | URL | Current Page Behavior |
|------|-----|----------------------|
| Info | `/src/info.html` | Still clickable; page remains in navbar |
| Dashboard | `/src/dashboard.html` | Still clickable; page remains in navbar |
| Mood Quest | `/src/mood-quest.html` | Still clickable; page remains in navbar |
| Vibe Lab | `/src/vibe-lab.html` | Still clickable; page remains in navbar |

---

## Buttons

| Button | Type | Action | Behavior |
|--------|------|--------|----------|
| + New Entry | Light button | Links to `/src/add-entry.html` | Right-aligned, always visible |
| Logout | Outline button | JavaScript controlled (ID: `logoutBtn`) | Far right, always visible |

---

## Pages Using This Navbar

1. ✅ [index.html](index.html) - Home/Landing page
2. ✅ [dashboard.html](dashboard.html) - Mood dashboard
3. ✅ [mood-quest.html](mood-quest.html) - Mood quest page
4. ✅ [vibe-lab.html](vibe-lab.html) - Vibe lab page
5. ✅ [info.html](info.html) - Info/onboarding page
6. ✅ [add-entry.html](add-entry.html) - New entry form

---

## Visual Layout

### Desktop View
```
Logo                Links                                Buttons
✨ Vibe Journal     Info Dashboard Mood Quest Vibe Lab   + New Entry  Logout
```

### Mobile View (Collapsed)
```
✨ Vibe Journal ☰
  Info
  Dashboard
  Mood Quest
  Vibe Lab
  + New Entry
  Logout
```

---

## CSS Classes Used

### Navbar Container
- `navbar` - Bootstrap navbar
- `navbar-expand-lg` - Expand on large screens
- `navbar-dark` - Dark text/icons
- `sticky-top` - Sticky positioning

### Brand
- `navbar-brand` - Logo styling
- `fw-bold` - Bold font weight

### Links
- `nav-link` - Navigation link styling
- `ms-auto` - Margin-start auto (right align)

### Buttons
- `btn` - Button styling
- `btn-light` - Light background
- `btn-outline-light` - Light outline
- `btn-sm` - Small size
- `me-2` - Margin-end 2

---

## Styling Applied

**Background Gradient:**
```css
background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%);
```

**Colors:**
- Primary: `#6366f1` (indigo)
- Secondary: `#7c3aed` (violet)

**Positioning:**
- `sticky-top` - Stays at top while scrolling

---

## Accessibility Features

- ✅ Semantic HTML structure
- ✅ Bootstrap toggle button for mobile
- ✅ Proper link colors for contrast
- ✅ Button elements for interactive actions
- ✅ Button ID for JavaScript integration

---

## Important Notes

1. **"New Entry" Button**: Always appears as a button (not a link), positioned at the far right
2. **Current Page**: The page you're on remains clickable in the navbar - it's NOT hidden
3. **Logout Button**: Controlled by JavaScript (ID: `logoutBtn`) for backend integration
4. **Sticky Navigation**: Navbar stays visible while scrolling
5. **Mobile Responsive**: Toggle button appears on screens smaller than `lg` breakpoint

---

## Testing Checklist

- [ ] Click each navigation link on every page
- [ ] Verify "New Entry" button works on all pages
- [ ] Test mobile toggle button
- [ ] Confirm current page is still clickable
- [ ] Check gradient background renders correctly
- [ ] Verify sticky positioning works while scrolling
- [ ] Test logout button JavaScript integration

