# Vibe Journal - Mood & Moments App

A simple, modern web app where users track their daily mood and personal moments.

## Features

- 🔐 User authentication with Supabase
- 📝 Create mood entries with descriptions and images
- 📊 View your mood history
- 🎨 Clean, mobile-first design with Bootstrap 5
- 🛡️ Row Level Security - only see your own entries

## Tech Stack

- HTML, CSS, JavaScript
- Bootstrap 5
- Supabase (Database, Auth, Storage)
- Vite

## Setup

### Prerequisites

- Node.js and npm
- Supabase account

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Start the dev server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Database Schema

### moods table
```sql
- id: uuid (primary key)
- user_id: uuid (references auth.users)
- mood: text (happy, sad, neutral, etc.)
- description: text
- image_url: text (optional)
- created_at: timestamp
```

## File Structure

```
src/
├── index.html
├── login.html
├── register.html
├── dashboard.html
├── add-entry.html
├── css/
│   └── style.css
├── js/
│   ├── supabase.js
│   ├── auth.js
│   ├── dashboard.js
│   └── add-entry.js
```

## License

MIT
