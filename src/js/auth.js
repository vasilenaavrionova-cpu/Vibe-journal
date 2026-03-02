import { supabase } from './supabase.js'

// Register a new user
export async function register(email, password) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) throw error
    return { success: true, user: data.user }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Login user
export async function login(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return { success: true, user: data.user }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Logout user
export async function logout() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Get current user
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) {
      console.error('Error getting user:', error)
      return null
    }
    console.log('✓ Current user:', user?.email)
    return user
  } catch (error) {
    console.error('Auth error:', error)
    return null
  }
}

// Check if user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser()
  return !!user
}

// Redirect to dashboard if authenticated, or to login if not
export async function requireAuth(redirectPath = '/') {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    window.location.href = '/src/login.html'
    return false
  }
  return true
}

// Redirect to info page if already authenticated
export async function requireGuest() {
  const authenticated = await isAuthenticated()
  if (authenticated) {
    window.location.href = '/src/info.html'
    return false
  }
  return true
}
