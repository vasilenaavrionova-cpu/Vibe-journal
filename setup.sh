#!/bin/bash

# Vibe Journal - Complete Setup Script
# This script helps you get started with the Vibe Journal app

echo "🌈 Welcome to Vibe Journal Setup!"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

echo "✅ npm found: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "📝 Next steps:"
echo ""
echo "1. Create a Supabase project at https://supabase.com"
echo "2. Copy your credentials"
echo "3. Create .env.local with:"
echo "   VITE_SUPABASE_URL=your_url"
echo "   VITE_SUPABASE_ANON_KEY=your_key"
echo ""
echo "4. Set up database by following SUPABASE_SETUP.md"
echo "5. Run: npm run dev"
echo ""
echo "📖 For detailed setup, see QUICK_START.md"
echo ""
echo "Happy mood tracking! ✨"
