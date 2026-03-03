import { supabase } from './supabase.js'
import { getCurrentUser } from './auth.js'

// === Emotion Timeline Replay ===
const moodToEmoji = {
  happy: "😃",
  sad: "😢",
  neutral: "😐",
  angry: "😠",
  excited: "🤩",
  anxious: "😰",
  tired: "😴",
  calm: "😌",
  // Add more as needed
};

const replayBtn = document.getElementById('replay-timeline-btn');
const overlay = document.getElementById('timeline-replay-overlay');
const content = document.getElementById('timeline-replay-content');
const closeBtn = document.getElementById('timeline-replay-close');
let isReplaying = false;

if (replayBtn && overlay && content && closeBtn) {
  replayBtn.addEventListener('click', async () => {
    if (isReplaying) return;
    isReplaying = true;
    replayBtn.disabled = true;
    await startTimelineReplay();
    replayBtn.disabled = false;
    isReplaying = false;
  });

  closeBtn.addEventListener('click', () => {
    overlay.classList.add('d-none');
    content.innerHTML = '';
  });
}

async function startTimelineReplay() {
  overlay.classList.remove('d-none');
  content.innerHTML = '<div class="timeline-replay-entry">Loading...</div>';
  const user = await getCurrentUser();
  if (!user) {
    content.innerHTML = '<div class="timeline-replay-entry">Not authenticated.</div>';
    return;
  }
  const { data, error } = await supabase
    .from('moods')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true })
    .limit(7);
  if (error || !data || data.length === 0) {
    content.innerHTML = '<div class="timeline-replay-entry">No entries found for this week.</div>';
    return;
  }
  const entries = data.map(entry => ({
    mood: entry.mood,
    emoji: moodToEmoji[entry.mood] || "📝",
    date: new Date(entry.created_at).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }),
    text: entry.text ? (entry.text.length > 60 ? entry.text.slice(0, 57) + "..." : entry.text) : (entry.description ? (entry.description.length > 60 ? entry.description.slice(0, 57) + "..." : entry.description) : "")
  }));
  for (let i = 0; i < entries.length; i++) {
    await showReplayEntry(entries[i]);
    if (i < entries.length - 1) await fadeOutReplayEntry();
  }
  showReplaySummary(entries);
}
function showReplayEntry(entry) {
  return new Promise(resolve => {
    content.innerHTML = `
      <div class="timeline-replay-entry fade-in">
        <div class="timeline-replay-emoji">${entry.emoji}</div>
        <div class="timeline-replay-date">${entry.date}</div>
        <div class="timeline-replay-text">${entry.text}</div>
      </div>
    `;
    setTimeout(resolve, 1500);
  });
}
function fadeOutReplayEntry() {
  return new Promise(resolve => {
    const entryDiv = content.querySelector('.timeline-replay-entry');
    entryDiv.classList.remove('fade-in');
    entryDiv.classList.add('fade-out');
    setTimeout(resolve, 600);
  });
}
function showReplaySummary(entries) {
  const moodCounts = {};
  entries.forEach(e => {
    moodCounts[e.mood] = (moodCounts[e.mood] || 0) + 1;
  });
  let maxMood = entries[0].mood, maxCount = 0;
  for (const mood in moodCounts) {
    if (moodCounts[mood] > maxCount) {
      maxMood = mood;
      maxCount = moodCounts[mood];
    }
  }
  const emoji = moodToEmoji[maxMood] || "📝";
  content.innerHTML = `
    <div class="timeline-replay-entry fade-in">
      <div class="timeline-replay-summary">
        This week you felt mostly <span style="color:#6366f1">${maxMood.toUpperCase()}</span> (${maxCount} times) ${emoji}
      </div>
    </div>
  `;
}

// Get all mood entries for current user (with optional mood filter)
export async function getMoodEntries(moodFilter = 'all') {
  try {
    const user = await getCurrentUser()
    if (!user) return { success: false, error: 'Not authenticated' }

    let query = supabase
      .from('moods')
      .select('*')
      .eq('user_id', user.id)

    // Apply mood filter if not 'all'
    if (moodFilter !== 'all') {
      query = query.eq('mood', moodFilter)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error
    return { success: true, entries: data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Get a single mood entry
export async function getMoodEntry(id) {
  try {
    const user = await getCurrentUser()
    if (!user) return { success: false, error: 'Not authenticated' }

    const { data, error } = await supabase
      .from('moods')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (error) throw error
    return { success: true, entry: data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Create new mood entry
export async function createMoodEntry(mood, description, imageFile = null) {
  try {
    const user = await getCurrentUser()
    if (!user) return { success: false, error: 'Not authenticated' }

    let imageUrl = null

    // Upload image if provided
    if (imageFile) {
      const fileName = `${user.id}/${Date.now()}_${imageFile.name}`
      const { data, error: uploadError } = await supabase.storage
        .from('mood_images')
        .upload(fileName, imageFile)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('mood_images')
        .getPublicUrl(fileName)

      imageUrl = urlData.publicUrl
    }

    const { data, error } = await supabase
      .from('moods')
      .insert({
        user_id: user.id,
        mood,
        description,
        image_url: imageUrl,
      })
      .select()

    if (error) throw error
    return { success: true, entry: data[0] }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Update mood entry
export async function updateMoodEntry(id, mood, description, imageFile = null) {
  try {
    const user = await getCurrentUser()
    if (!user) return { success: false, error: 'Not authenticated' }

    // Verify ownership
    const entry = await getMoodEntry(id)
    if (!entry.success) return entry

    let imageUrl = null

    if (imageFile) {
      const fileName = `${user.id}/${Date.now()}_${imageFile.name}`
      const { data, error: uploadError } = await supabase.storage
        .from('mood_images')
        .upload(fileName, imageFile)

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage
        .from('mood_images')
        .getPublicUrl(fileName)

      imageUrl = urlData.publicUrl
    }

    const updateData = { mood, description }
    if (imageUrl) updateData.image_url = imageUrl

    const { data, error } = await supabase
      .from('moods')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()

    if (error) throw error
    return { success: true, entry: data[0] }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Delete mood entry
export async function deleteMoodEntry(id) {
  try {
    const user = await getCurrentUser()
    if (!user) return { success: false, error: 'Not authenticated' }

    const { error } = await supabase
      .from('moods')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) throw error
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
