# Vibe Journal - Quick Start Guide

## Prerequisites

- Node.js 16+ and npm
- Supabase account (free at supabase.com)

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

Follow the [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) guide to:
- Create a Supabase project
- Set up database tables and RLS policies
- Configure storage bucket for images
- Get your API credentials

### 3. Add Environment Variables

Create a `.env.local` file in the project root:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with your actual Supabase credentials from the API settings.

### 4. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Project Structure

```
vibe-journal/
├── src/
│   ├── index.html           # Landing page
│   ├── login.html           # Login page
│   ├── register.html        # Registration page
│   ├── dashboard.html       # Mood entries list
│   ├── add-entry.html       # Create/edit mood entry
│   ├── css/
│   │   └── style.css        # All styles
│   └── js/
│       ├── supabase.js      # Supabase client config
│       ├── auth.js          # Auth functions
│       ├── dashboard.js     # Mood CRUD operations
│       └── ui-helpers.js    # UI utilities
├── package.json
├── vite.config.js
├── README.md
├── SUPABASE_SETUP.md
└── QUICK_START.md (this file)
```

## Features

✅ **Authentication**
- User registration with email
- Login/logout
- Email verification

✅ **Mood Tracking**
- Create mood entries with description
- 6 mood options (happy, sad, neutral, excited, anxious, calm)
- Add photos to entries

✅ **Privacy**
- Only see your own entries
- Row Level Security protects data
- Secure image storage

✅ **UI/UX**
- Mobile-first responsive design
- Bootstrap 5 components
- Clean, modern aesthetic
- Dark mode support

## Common Tasks

### Create a New Entry

1. Click "+ New Mood" button
2. Select your mood
3. Write your thoughts
4. Optionally add a photo
5. Click "Create Mood"

### Edit an Entry

1. From dashboard, click "Edit" on any mood card
2. Update mood, description, or photo
3. Click "Update Mood"

### Delete an Entry

1. From dashboard, click "Delete" on any mood card
2. Confirm deletion

### Logout

1. Click "Logout" button in navbar

## Building for Production

```bash
npm run build
```

Output files go to the `dist/` folder. Deploy this folder to your hosting service.

## Deployment Options

### Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Vercel
1. Push code to GitHub
2. Import project on Vercel
3. Framework: Vite
4. Deploy!

### Other Hosts
Any static hosting (GitHub Pages, Cloudflare Pages, etc.) works. Just run `npm run build` and deploy the `dist` folder.

## Troubleshooting

### "Unable to connect to Supabase"
- Check `.env.local` file exists
- Verify VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are correct
- Restart dev server after changing .env.local

### "Can't see my entries"
- Make sure you're logged in
- Check that the `moods` table exists in Supabase
- Verify RLS policies are set up correctly

### "Image upload failing"
- Check image is under 5MB
- Verify `mood_images` bucket exists in Supabase Storage
- Check storage RLS policies are configured

### "Redirect loop"
- Clear browser cache
- Check that app is accessible at configured redirect URL
- Verify VITE_SUPABASE_URL is correct

## API Reference

### Authentication Functions

```javascript
import { login, register, logout, getCurrentUser } from './js/auth.js'

// Register
const result = await register(email, password)

// Login
const result = await login(email, password)

// Logout
const result = await logout()

// Get current user
const user = await getCurrentUser()
```

### Mood Functions

```javascript
import {
  getMoodEntries,
  getMoodEntry,
  createMoodEntry,
  updateMoodEntry,
  deleteMoodEntry
} from './js/dashboard.js'

// Get all entries
const result = await getMoodEntries()

// Get single entry
const result = await getMoodEntry(id)

// Create entry
const result = await createMoodEntry(mood, description, imageFile)

// Update entry
const result = await updateMoodEntry(id, mood, description, imageFile)

// Delete entry
const result = await deleteMoodEntry(id)
```

## Next Steps

1. Customize colors in `src/css/style.css`
2. Add more mood options in HTML forms
3. Add mood statistics/analytics
4. Implement mood search/filter
5. Add mood reminders/notifications
6. Deploy to production

## Support

For issues with:
- **Supabase**: Check [Supabase Docs](https://supabase.com/docs)
- **Vite**: Check [Vite Docs](https://vitejs.dev)
- **Bootstrap**: Check [Bootstrap Docs](https://getbootstrap.com)

## License

MIT
