# UNIFIED NAVBAR - COPY/PASTE REFERENCE

## Standard Navbar (All 6 Pages)

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

## Files Using This Navbar

```
✅ src/index.html
✅ src/dashboard.html
✅ src/mood-quest.html
✅ src/vibe-lab.html
✅ src/info.html
✅ src/add-entry.html
```

---

## Element Breakdown

### Navbar Container
```html
<nav class="navbar navbar-expand-lg navbar-dark sticky-top" 
     style="background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%);">
```

### Container Wrapper
```html
<div class="container-fluid">
```

### Logo/Brand
```html
<a class="navbar-brand fw-bold" href="/src/index.html">
  <span style="font-size: 1.8rem; margin-right: 0.5rem;">✨</span>Vibe Journal
</a>
```

### Mobile Toggle
```html
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
  <span class="navbar-toggler-icon"></span>
</button>
```

### Navigation Wrapper
```html
<div class="collapse navbar-collapse" id="navbarNav">
  <ul class="navbar-nav ms-auto">
    <!-- Items here -->
  </ul>
</div>
```

### Navigation Items
```html
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
```

### New Entry Button
```html
<li class="nav-item">
  <a href="/src/add-entry.html" class="btn btn-light btn-sm me-2">+ New Entry</a>
</li>
```

### Logout Button
```html
<li class="nav-item">
  <button id="logoutBtn" class="btn btn-outline-light btn-sm">Logout</button>
</li>
```

---

## Classes Explained

### Navbar Classes
- `navbar` - Bootstrap navbar component
- `navbar-expand-lg` - Expand on large screens
- `navbar-dark` - Dark styling
- `sticky-top` - Sticky positioning

### Brand Classes
- `navbar-brand` - Logo styling
- `fw-bold` - Font weight bold

### Navigation Classes
- `navbar-toggler` - Mobile toggle button
- `collapse` - Collapsible menu
- `navbar-collapse` - Collapse styling
- `navbar-nav` - Navigation list
- `ms-auto` - Margin-start auto (right align)

### Item Classes
- `nav-item` - List item
- `nav-link` - Link styling
- `btn` - Button styling
- `btn-light` - Light button color
- `btn-outline-light` - Outline button color
- `btn-sm` - Small size
- `me-2` - Margin-end 2

---

## Key Features

1. **Logo**: Always links to home page
2. **Navigation**: All 4 main pages included
3. **Buttons**: New Entry (light) + Logout (outline)
4. **Responsive**: Mobile toggle at < 1024px
5. **Sticky**: Stays visible while scrolling
6. **Gradient**: Indigo to violet background
7. **Flexible**: Right-aligned with `ms-auto`

---

## CSS Properties Breakdown

```css
/* Navbar */
display: flex;
align-items: center;
padding: (Bootstrap default);
background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%);
position: sticky;
top: 0;
z-index: (Bootstrap default);

/* Navigation List */
display: flex;
margin-left: auto; /* via ms-auto */
list-style: none;

/* Links */
color: white;
font-weight: 400;
padding: (Bootstrap default);

/* Buttons */
padding: 0.375rem 0.75rem;
font-weight: 600;
border-radius: 0.25rem;
```

---

## Customization Guide

### Change Colors
```html
<!-- Modify the style attribute -->
style="background: linear-gradient(135deg, YOUR_COLOR_1 0%, YOUR_COLOR_2 100%);"
```

### Change Logo Text
```html
<!-- Replace text, keep emoji -->
<span>Your App Name</span>
```

### Change Logo Link
```html
<!-- Modify href -->
href="/path/to/home.html"
```

### Add More Links
```html
<li class="nav-item">
  <a href="/path/to/page.html" class="nav-link">Page Name</a>
</li>
```

### Modify Button Text
```html
<!-- Change text inside button -->
<a href="/path/to/action.html" class="btn btn-light btn-sm me-2">Custom Text</a>
```

### Change Button Color
```html
<!-- Replace btn-light with: btn-primary, btn-success, etc. -->
<a href="/src/add-entry.html" class="btn btn-primary btn-sm me-2">+ New Entry</a>
```

---

## Verification Commands

### Check if navbar is identical
```bash
# This should show the same output for all files
grep -A 50 '<nav class="navbar' src/*.html
```

### Check for button consistency
```bash
# Should find exactly 6 logoutBtn instances
grep -c 'id="logoutBtn"' src/*.html
```

### Check for path consistency
```bash
# Should show all /src/ paths
grep 'href="/src/' src/*.html | head -20
```

---

## Mobile Rendering

### Desktop (1024px+)
One line with all items visible

### Tablet (768px - 1023px)
May wrap slightly but still mostly visible

### Mobile (< 768px)
Toggle button reveals menu below navbar

---

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

Bootstrap 5.3.0 supports all modern browsers.

---

## Performance Notes

- No external CSS files
- Uses Bootstrap utilities only
- Minimal inline styling (gradient only)
- No JavaScript bloat (except logout handler)
- Lightweight HTML

---

## Accessibility

- Semantic HTML (`<nav>`, `<a>`, `<button>`)
- Proper contrast ratios
- Mobile toggle functionality
- Keyboard navigation support
- ARIA attributes via Bootstrap

---

## Final Checklist Before Deployment

- [ ] Copy navbar code verified
- [ ] All links correct (/src/ paths)
- [ ] logoutBtn ID present for JS
- [ ] Gradient background correct
- [ ] Mobile toggle button present
- [ ] Spacing (me-2, ms-auto) correct
- [ ] Button colors correct (light vs outline)
- [ ] No typos in file paths
- [ ] Tested in multiple browsers
- [ ] Mobile responsiveness verified

---

## Quick Links for Reference

📄 Complete implementation details: [NAVBAR_COMPLETE_HTML.md](NAVBAR_COMPLETE_HTML.md)

📄 Visual diagrams: [NAVBAR_VISUAL_DIAGRAM.md](NAVBAR_VISUAL_DIAGRAM.md)

📄 Testing guide: [NAVBAR_QUICK_REFERENCE.md](NAVBAR_QUICK_REFERENCE.md)

📄 Status summary: [NAVBAR_COMPLETION_SUMMARY.md](NAVBAR_COMPLETION_SUMMARY.md)

---

**This navbar is now standardized across all 6 pages!** ✨

