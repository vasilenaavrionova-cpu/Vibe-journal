import { supabase } from './supabase.js'
import { getCurrentUser } from './auth.js'

// Get all mood entries for current user
export async function getMoodEntries() {
  try {
    const user = await getCurrentUser()
    if (!user) return { success: false, error: 'Not authenticated' }

    const { data, error } = await supabase
      .from('moods')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

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
