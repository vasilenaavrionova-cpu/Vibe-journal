import { createMoodEntry, getMoodEntry, updateMoodEntry } from './dashboard.js'

const moodEmojis = {
  happy: '😊',
  sad: '😢',
  neutral: '😐',
  excited: '🤩',
  anxious: '😰',
  calm: '😌',
}

// Get mood emoji
export function getMoodEmoji(mood) {
  return moodEmojis[mood] || '😐'
}

// Format date
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Initialize add entry form
export async function initAddEntryForm() {
  const form = document.getElementById('moodForm')
  const submitBtn = document.getElementById('submitBtn')
  const entryId = new URLSearchParams(window.location.search).get('id')

  if (entryId) {
    // Edit mode
    submitBtn.textContent = 'Update Mood'
    await loadEntryToForm(entryId)
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    await handleFormSubmit(entryId)
  })
}

// Load entry data into form for editing
async function loadEntryToForm(id) {
  const result = await getMoodEntry(id)
  if (!result.success) {
    alert(`Error loading entry: ${result.error}`)
    return
  }

  const entry = result.entry
  document.getElementById('moodSelect').value = entry.mood
  document.getElementById('description').value = entry.description
}

// Handle form submission
async function handleFormSubmit(entryId) {
  const mood = document.getElementById('moodSelect').value
  const description = document.getElementById('description').value
  const imageFile = document.getElementById('imageInput').files[0]

  if (!mood || !description.trim()) {
    alert('Please fill in all fields')
    return
  }

  try {
    let result
    if (entryId) {
      result = await updateMoodEntry(entryId, mood, description, imageFile)
    } else {
      result = await createMoodEntry(mood, description, imageFile)
    }

    if (result.success) {
      alert(entryId ? 'Mood entry updated!' : 'Mood entry created!')
      window.location.href = '/dashboard.html'
    } else {
      alert(`Error: ${result.error}`)
    }
  } catch (error) {
    alert(`Error: ${error.message}`)
  }
}

// Render mood entry card
export function renderMoodCard(entry) {
  const card = document.createElement('div')
  card.className = 'col-md-6 col-lg-4 mb-3'
  card.innerHTML = `
    <div class="card h-100 mood-card">
      ${
        entry.image_url
          ? `<img src="${entry.image_url}" class="card-img-top" alt="Mood image" style="height: 200px; object-fit: cover;">`
          : ''
      }
      <div class="card-body d-flex flex-column">
        <div class="mb-2">
          <span class="mood-emoji" style="font-size: 2.5rem;">${getMoodEmoji(entry.mood)}</span>
          <span class="badge bg-primary ms-2">${entry.mood}</span>
        </div>
        <p class="card-text">${entry.description}</p>
        <div class="mt-auto">
          <small class="text-muted d-block mb-2">${formatDate(entry.created_at)}</small>
          <div class="btn-group btn-group-sm w-100" role="group">
            <a href="/add-entry.html?id=${entry.id}" class="btn btn-outline-primary">Edit</a>
            <button class="btn btn-outline-danger" onclick="window.deleteEntry('${entry.id}')">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `
  return card
}

// Make deleteEntry globally available
window.deleteEntry = async function (id) {
  if (confirm('Are you sure you want to delete this entry?')) {
    const { deleteMoodEntry } = await import('./dashboard.js')
    const result = await deleteMoodEntry(id)
    if (result.success) {
      alert('Entry deleted!')
      window.location.reload()
    } else {
      alert(`Error: ${result.error}`)
    }
  }
}
