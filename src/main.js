import './style.css'
import { login, logout, getCurrentUser, requireAuth, requireGuest } from './js/auth.js'

console.log('✓ MAIN.JS LOADED')

// ===== DARK MODE =====
function initDarkMode() {
	// Check localStorage on page load
	const isDarkMode = localStorage.getItem('darkMode') === 'true'
	if (isDarkMode) {
		document.documentElement.classList.add('dark-mode')
	}

	// Get or create toggle button
	let toggleBtn = document.getElementById('darkModeToggle')
	if (!toggleBtn) {
		// Find navbar and add toggle button if it doesn't exist
		const navbar = document.querySelector('.navbar')
		if (navbar) {
			const navbarNav = navbar.querySelector('.navbar-nav')
			if (navbarNav) {
				const toggleItem = document.createElement('li')
				toggleItem.className = 'nav-item'
				toggleItem.innerHTML = `<button id="darkModeToggle" class="dark-mode-toggle">🌙 Dark</button>`
				navbarNav.appendChild(toggleItem)
				toggleBtn = document.getElementById('darkModeToggle')
			}
		}
	}

	// Add click handler
	if (toggleBtn) {
		toggleBtn.addEventListener('click', () => {
			const isDark = document.documentElement.classList.toggle('dark-mode')
			localStorage.setItem('darkMode', isDark)
			toggleBtn.textContent = isDark ? '☀️ Light' : '🌙 Dark'
		})

		// Set initial button text
		toggleBtn.textContent = isDarkMode ? '☀️ Light' : '🌙 Dark'
	}
}

function getPageName() {
	return document.body?.dataset?.page || ''
}

function showError(errorElement, message) {
	if (!errorElement) return
	errorElement.textContent = message
	errorElement.classList.remove('d-none')
}

async function initLoginPage() {
	const guest = await requireGuest()
	if (!guest) return

	const form = document.getElementById('loginForm')
	const errorAlert = document.getElementById('errorAlert')
	if (!form) return

	form.addEventListener('submit', async (e) => {
		e.preventDefault()

		const submitBtn = form.querySelector('button[type="submit"]')
		const originalText = submitBtn.textContent
		submitBtn.disabled = true
		submitBtn.textContent = 'Signing in...'
		errorAlert.classList.add('d-none')

		const email = document.getElementById('email').value
		const password = document.getElementById('password').value
		const result = await login(email, password)

		if (result.success) {
			await new Promise((resolve) => setTimeout(resolve, 600))
			window.location.href = '/src/info.html'
			return
		}

		showError(errorAlert, result.error || 'Login failed')
		submitBtn.disabled = false
		submitBtn.textContent = originalText
	})
}

async function initInfoPage() {
	const authenticated = await requireAuth()
	if (!authenticated) return

	const user = await getCurrentUser()
	const emailSlot = document.getElementById('userEmail')
	if (emailSlot && user?.email) {
		emailSlot.textContent = user.email
	}

	
}

async function bootstrap() {
	// Initialize dark mode first (on all pages)
	initDarkMode()

	const page = getPageName()

	if (page === 'login') {
		await initLoginPage()
	}

	if (page === 'info') {
		await initInfoPage()
	}
}
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn')

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
      e.preventDefault()

      const result = await logout()

      if (result.success) {
        window.location.href = '/src/login.html'
      }
    })
  }
})

bootstrap()
