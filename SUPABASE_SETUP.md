# Supabase Setup Guide

This guide walks you through setting up Supabase for the Vibe Journal app.

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up or log in
2. Click "New project"
3. Fill in project details:
   - **Name**: vibe-journal
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Select closest to your users
4. Wait for project to initialize (usually 2-3 minutes)

## 2. Get Your Credentials

1. Navigate to **Project Settings** → **API**
2. Copy these values:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **Anon Public Key** → `VITE_SUPABASE_ANON_KEY`
3. Create `.env.local` file in project root with these values

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 3. Create Database Tables

Go to **SQL Editor** and run these queries:

### Create Moods Table

```sql
-- Create moods table
CREATE TABLE IF NOT EXISTS moods (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mood TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_moods_user_id ON moods(user_id);
CREATE INDEX idx_moods_created_at ON moods(created_at DESC);
```

## 4. Enable Row Level Security (RLS)

RLS ensures users can only see their own entries.

### Enable RLS on moods table

```sql
ALTER TABLE moods ENABLE ROW LEVEL SECURITY;
```

### Create RLS Policies

```sql
-- Policy: Users can view their own moods
CREATE POLICY "Users can view own moods" ON moods
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own moods
CREATE POLICY "Users can insert own moods" ON moods
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own moods
CREATE POLICY "Users can update own moods" ON moods
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own moods
CREATE POLICY "Users can delete own moods" ON moods
  FOR DELETE
  USING (auth.uid() = user_id);
```

## 5. Setup Storage Bucket for Images

1. Go to **Storage** section
2. Click **Create new bucket**
3. Name it `mood_images`
4. Keep it **Private** (not public)

### Create Storage Policies

Go to **Storage** → **mood_images** → **Policies** → **New Policy**

Create these policies:

**Policy 1: Users can upload their own images**
```
Allowed operations: INSERT
Using condition: auth.uid() = (storage.foldername()[1])::uuid
```

**Policy 2: Users can view their own images**
```
Allowed operations: SELECT
Using condition: auth.uid() = (storage.foldername()[1])::uuid
```

**Policy 3: Users can delete their own images**
```
Allowed operations: DELETE
Using condition: auth.uid() = (storage.foldername()[1])::uuid
```

## 6. Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Click **Email**
3. Make sure "Confirm email" is toggled ON (recommended)
4. Optionally configure email templates under **Email Templates**

## 7. Configure Redirect URLs (Optional but Recommended)

1. Go to **Authentication** → **URL Configuration**
2. Add your app URLs to **Redirect URLs**:
   - For development: `http://localhost:3000`
   - For production: `https://yourdomain.com`

## Verify Setup

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Try registering a new account
4. Verify data appears in Supabase dashboard under **moods** table

## Troubleshooting

### "Auth not initialized"
- Check that `.env.local` file exists with correct credentials
- Make sure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set

### Images not uploading
- Check storage bucket exists and is named `mood_images`
- Verify RLS policies are created on the storage bucket
- Check image file size is under 5MB

### Can't see other users' data (good!)
- This means RLS is working correctly
- Users can only see their own moods

### Emails not sending
- Check email provider settings in Authentication
- For development, emails are sent to test address configured in project
