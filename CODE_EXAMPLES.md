# Code Examples & API Reference

This document provides code examples for common tasks in Vibe Journal.

## Authentication

### Register a User

```javascript
import { register } from './js/auth.js'

const result = await register('user@example.com', 'password123')

if (result.success) {
  console.log('User registered:', result.user)
} else {
  console.error('Registration failed:', result.error)
}
```

### Login

```javascript
import { login } from './js/auth.js'

const result = await login('user@example.com', 'password123')

if (result.success) {
  console.log('Logged in:', result.user.email)
  // User will be redirected to dashboard
} else {
  console.error('Login failed:', result.error)
}
```

### Check if Logged In

```javascript
import { getCurrentUser, isAuthenticated } from './js/auth.js'

const user = await getCurrentUser()
if (user) {
  console.log('Logged in as:', user.email)
} else {
  console.log('Not logged in')
}

// Or simpler:
const authenticated = await isAuthenticated()
if (authenticated) {
  console.log('User is authenticated')
}
```

### Logout

```javascript
import { logout } from './js/auth.js'

const result = await logout()
if (result.success) {
  console.log('Logged out')
  window.location.href = '/login.html'
}
```

## Mood Operations

### Create a New Mood Entry

```javascript
import { createMoodEntry } from './js/dashboard.js'

const mood = 'happy'
const description = 'Had a great day at work!'
const imageFile = document.getElementById('imageInput').files[0]

const result = await createMoodEntry(mood, description, imageFile)

if (result.success) {
  console.log('Mood created:', result.entry)
} else {
  console.error('Error:', result.error)
}
```

### Get All Mood Entries

```javascript
import { getMoodEntries } from './js/dashboard.js'

const result = await getMoodEntries()

if (result.success) {
  console.log('Your moods:', result.entries)
  result.entries.forEach(entry => {
    console.log(`${entry.mood}: ${entry.description}`)
  })
} else {
  console.error('Error:', result.error)
}
```

### Get Single Mood Entry

```javascript
import { getMoodEntry } from './js/dashboard.js'

const result = await getMoodEntry('entry-uuid-here')

if (result.success) {
  const entry = result.entry
  console.log(`Mood: ${entry.mood}`)
  console.log(`Description: ${entry.description}`)
  console.log(`Image: ${entry.image_url}`)
} else {
  console.error('Error:', result.error)
}
```

### Update a Mood Entry

```javascript
import { updateMoodEntry } from './js/dashboard.js'

const entryId = 'entry-uuid-here'
const mood = 'excited'
const description = 'Updated my feelings'
const newImage = document.getElementById('imageInput').files[0]

const result = await updateMoodEntry(entryId, mood, description, newImage)

if (result.success) {
  console.log('Mood updated:', result.entry)
} else {
  console.error('Error:', result.error)
}
```

### Delete a Mood Entry

```javascript
import { deleteMoodEntry } from './js/dashboard.js'

const entryId = 'entry-uuid-here'

if (confirm('Delete this mood?')) {
  const result = await deleteMoodEntry(entryId)
  
  if (result.success) {
    console.log('Mood deleted')
    window.location.reload()
  } else {
    console.error('Error:', result.error)
  }
}
```

## UI Helpers

### Format Date

```javascript
import { formatDate } from './js/ui-helpers.js'

const date = '2026-03-01T10:30:00Z'
console.log(formatDate(date))
// Output: "Sun, Mar 01, 2026, 10:30 AM"
```

### Get Mood Emoji

```javascript
import { getMoodEmoji } from './js/ui-helpers.js'

console.log(getMoodEmoji('happy'))   // 😊
console.log(getMoodEmoji('sad'))     // 😢
console.log(getMoodEmoji('excited')) // 🤩
```

### Render Mood Card

```javascript
import { renderMoodCard } from './js/ui-helpers.js'

const entry = {
  id: '123',
  mood: 'happy',
  description: 'Great day!',
  image_url: 'https://...',
  created_at: '2026-03-01T10:30:00Z'
}

const card = renderMoodCard(entry)
document.getElementById('container').appendChild(card)
```

## Direct HTML Examples

### Add Mood Entry Form

```html
<form id="moodForm">
  <div class="mb-3">
    <label for="mood" class="form-label">How are you feeling?</label>
    <select id="mood" class="form-select" required>
      <option value="happy">😊 Happy</option>
      <option value="sad">😢 Sad</option>
      <option value="neutral">😐 Neutral</option>
      <option value="excited">🤩 Excited</option>
      <option value="anxious">😰 Anxious</option>
      <option value="calm">😌 Calm</option>
    </select>
  </div>

  <div class="mb-3">
    <label for="description" class="form-label">Description</label>
    <textarea id="description" class="form-control" rows="4" required></textarea>
  </div>

  <div class="mb-3">
    <label for="image" class="form-label">Photo (optional)</label>
    <input type="file" id="image" class="form-control" accept="image/*">
  </div>

  <button type="submit" class="btn btn-primary">Save Mood</button>
</form>
```

### Display Mood Entries

```html
<div id="entries" class="row">
  <!-- Mood cards render here -->
</div>

<script type="module">
  import { getMoodEntries } from './js/dashboard.js'
  import { renderMoodCard } from './js/ui-helpers.js'

  const result = await getMoodEntries()
  if (result.success) {
    const container = document.getElementById('entries')
    result.entries.forEach(entry => {
      const card = renderMoodCard(entry)
      container.appendChild(card)
    })
  }
</script>
```

## Protection & Authorization

### Require Authentication

```javascript
import { requireAuth } from './js/auth.js'

// Add at start of page that needs login
if (!await requireAuth()) {
  // User will be redirected to login
  throw new Error('Not authenticated')
}

// Page content runs only if authenticated
```

### Require Not Authenticated (for login/register pages)

```javascript
import { requireGuest } from './js/auth.js'

// Add at start of login/register page
if (!await requireGuest()) {
  // User will be redirected to dashboard
  throw new Error('Already authenticated')
}
```

## Supabase Raw Queries (Advanced)

### Direct Supabase Client Usage

```javascript
import { supabase } from './js/supabase.js'

// Get current user
const { data: { user } } = await supabase.auth.getUser()

// Query data
const { data, error } = await supabase
  .from('moods')
  .select('*')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false })

// Insert data
const { data, error } = await supabase
  .from('moods')
  .insert({
    user_id: user.id,
    mood: 'happy',
    description: 'Great day!'
  })

// Update data
const { data, error } = await supabase
  .from('moods')
  .update({ mood: 'excited' })
  .eq('id', entryId)

// Delete data
const { error } = await supabase
  .from('moods')
  .delete()
  .eq('id', entryId)
```

## Error Handling Best Practices

```javascript
import { createMoodEntry } from './js/dashboard.js'

async function handleMoodCreation(mood, description, image) {
  try {
    // Validate input
    if (!mood || !description.trim()) {
      throw new Error('Mood and description are required')
    }

    // Check file size
    if (image && image.size > 5 * 1024 * 1024) {
      throw new Error('Image must be less than 5MB')
    }

    // Create entry
    const result = await createMoodEntry(mood, description, image)

    if (!result.success) {
      throw new Error(result.error)
    }

    // Success handling
    console.log('Mood created:', result.entry)
    return result.entry

  } catch (error) {
    // Error handling
    console.error('Failed to create mood:', error.message)
    alert(`Error: ${error.message}`)
    return null
  }
}
```

## Common Patterns

### Form Submission Handler

```javascript
const form = document.getElementById('moodForm')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const mood = document.getElementById('mood').value
  const description = document.getElementById('description').value
  const image = document.getElementById('image').files[0]

  try {
    const result = await createMoodEntry(mood, description, image)
    
    if (result.success) {
      alert('Mood saved!')
      form.reset()
      window.location.href = '/dashboard.html'
    } else {
      alert(`Error: ${result.error}`)
    }
  } catch (error) {
    console.error('Error:', error)
    alert('An error occurred. Please try again.')
  }
})
```

### Loading State Management

```javascript
const submitBtn = document.getElementById('submitBtn')
const originalText = submitBtn.textContent

async function submitForm() {
  // Show loading state
  submitBtn.disabled = true
  submitBtn.textContent = 'Saving...'

  try {
    const result = await createMoodEntry(mood, description)
    
    if (result.success) {
      submitBtn.textContent = '✓ Saved!'
      // Redirect after short delay
      setTimeout(() => {
        window.location.href = '/dashboard.html'
      }, 500)
    } else {
      throw new Error(result.error)
    }
  } catch (error) {
    submitBtn.textContent = 'Error - Try Again'
    alert(error.message)
  } finally {
    submitBtn.disabled = false
    submitBtn.textContent = originalText
  }
}
```

## Tips & Tricks

### Add Mood Statistics

```javascript
// Count moods by type
async function getMoodStats() {
  const result = await getMoodEntries()
  if (!result.success) return null

  const stats = {}
  result.entries.forEach(entry => {
    stats[entry.mood] = (stats[entry.mood] || 0) + 1
  })
  return stats
}

// Usage
const stats = await getMoodStats()
console.log('You felt happy 15 times this month!')
```

### Format Mood Statistics

```javascript
async function displayMoodStats() {
  const stats = await getMoodStats()
  if (!stats) return

  let html = '<h3>Your Mood Stats</h3><ul>'
  for (const [mood, count] of Object.entries(stats)) {
    html += `<li>${mood}: ${count} times</li>`
  }
  html += '</ul>'

  document.getElementById('stats').innerHTML = html
}
```

### Search Moods by Date

```javascript
import { supabase } from './js/supabase.js'
import { getCurrentUser } from './js/auth.js'

async function getMoodsByDate(startDate, endDate) {
  const user = await getCurrentUser()
  
  const { data, error } = await supabase
    .from('moods')
    .select('*')
    .eq('user_id', user.id)
    .gte('created_at', startDate)
    .lte('created_at', endDate)
    .order('created_at', { ascending: false })

  return { data, error }
}

// Usage
const today = new Date().toISOString().split('T')[0]
const result = await getMoodsByDate(today, today)
```

## Debugging Tips

```javascript
// Enable Supabase debugging
const { supabase } = await import('./js/supabase.js')

// Check connection
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)

// Debug auth state
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth event:', event)
  console.log('Session:', session)
})

// Log all queries
const originalSelect = supabase.from
supabase.from = function(...args) {
  console.log('Query:', args)
  return originalSelect.apply(this, args)
}
```

---

**Happy coding! If you have questions, check the main README or SUPABASE_SETUP.md** 🚀
