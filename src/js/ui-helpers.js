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
  const { createMoodEntry, getMoodEntry, updateMoodEntry } = await import('./dashboard.js')
  const form = document.getElementById('moodForm')
  const submitBtn = document.getElementById('submitBtn')
  const entryId = new URLSearchParams(window.location.search).get('id')

  if (entryId) {
    // Edit mode
    submitBtn.textContent = 'Update Mood'
    await loadEntryToForm(entryId, getMoodEntry)
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    await handleFormSubmit(entryId, createMoodEntry, updateMoodEntry)
  })
}

// Load entry data into form for editing
async function loadEntryToForm(id, getMoodEntry) {
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
async function handleFormSubmit(entryId, createMoodEntry, updateMoodEntry) {
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

// Render mood entry card with Bootstrap 5
export function renderMoodCard(entry) {
  const card = document.createElement('div')
  card.className = 'col-12 col-sm-6 col-lg-4'
  
  const emoji = getMoodEmoji(entry.mood)
  const dateStr = formatDate(entry.created_at)
  const moodBadgeColor = getMoodBadgeColor(entry.mood)
  
  card.innerHTML = `
    <div class="card h-100 mood-card shadow-sm border-0 overflow-hidden transition">
      ${
        entry.image_url
          ? `<img src="${entry.image_url}" class="card-img-top" alt="Mood moment" style="height: 180px; object-fit: cover; transition: transform 0.3s ease;" />`
          : `<div class="bg-gradient" style="height: 180px; background: linear-gradient(135deg, ${getMoodGradient(entry.mood)}); display: flex; align-items: center; justify-content: center; font-size: 4rem;">${emoji}</div>`
      }
      
      <div class="card-body d-flex flex-column">
        <div class="d-flex align-items-center gap-2 mb-3">
          <span class="fs-2">${emoji}</span>
          <span class="badge ${moodBadgeColor} text-uppercase fw-semibold">${entry.mood}</span>
        </div>
        
        <p class="card-text text-dark mb-3 flex-grow-1">${escapeHtml(entry.description)}</p>
        
        <div class="border-top pt-3">
          <small class="text-muted d-block mb-3">
            <i class="bi bi-calendar-event"></i> ${dateStr}
          </small>
          
          <div class="d-flex gap-2">
            <a href="./add-entry.html?id=${entry.id}" class="btn btn-sm btn-outline-primary flex-grow-1">
              <i class="bi bi-pencil"></i> Edit
            </a>
            <button class="btn btn-sm btn-outline-danger" onclick="window.deleteEntry('${entry.id}')">
              <i class="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  `
  return card
}

// Get mood badge color
function getMoodBadgeColor(mood) {
  const colors = {
    happy: 'bg-success',
    sad: 'bg-info',
    neutral: 'bg-secondary',
    excited: 'bg-warning text-dark',
    anxious: 'bg-danger',
    calm: 'bg-primary',
  }
  return colors[mood] || 'bg-secondary'
}

// Get mood gradient for placeholder
function getMoodGradient(mood) {
  const gradients = {
    happy: '#FFD93D, #FFA500',
    sad: '#4A90E2, #357ABD',
    neutral: '#9B9B9B, #6B6B6B',
    excited: '#FF6B6B, #FF8E53',
    anxious: '#E74C3C, #C0392B',
    calm: '#50C878, #3A9B5C',
  }
  return gradients[mood] || '#9B9B9B, #6B6B6B'
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

// Make deleteEntry globally available
window.deleteEntry = async function (id) {
  // Show confirmation dialog before deleting
  const confirmed = confirm('Delete this journal entry? This action cannot be undone.')
  if (!confirmed) return

  const { deleteMoodEntry } = await import('./dashboard.js')
  const result = await deleteMoodEntry(id)
  
  if (result.success) {
    alert('Entry deleted!')
    window.location.reload()
  } else {
    alert(`Error: ${result.error}`)
  }
}
