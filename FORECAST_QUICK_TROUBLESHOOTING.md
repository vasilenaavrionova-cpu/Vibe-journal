# Tomorrow's Emotional Forecast - Quick Troubleshooting Guide

## Problem: "Not enough data yet" appears even with entries in DB

### Quick Diagnosis (Open Browser DevTools → Console)

Navigate to **Mood Quest** page and check console output:

```
✅ Should see:
  Current user ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  Entries fetched: 3 rows
  Entries data: Array(3) [ {...}, {...}, {...} ]
  Mood frequency distribution: { happy: 2, sad: 1 }

❌ If you see:
  Entries fetched: 0 rows
  → Check RLS policies (see below)
  
❌ If you see:
  Fetch error: {...}
  → Database connection issue or table doesn't exist
```

---

## Fix Checklist

### 1. Verify Supabase Auth
```javascript
// In console:
const user = await supabase.auth.getUser()
console.log(user.data.user.id)
// Should output a UUID, not null/undefined
```

### 2. Check RLS Policies
In **Supabase Dashboard** → **Authentication** → **Policies**:

Find policy on `entries` table for SELECT:
```sql
USING (auth.uid() = user_id)
```

If missing, add it:
```sql
CREATE POLICY "Users can view their own entries"
ON entries
FOR SELECT
USING (auth.uid() = user_id);
```

### 3. Verify Table Name
The query uses `entries` table:
```javascript
.from('entries')  // Make sure this table exists!
```

Check in **Supabase Dashboard** → **Database** → **Tables** → see `entries` listed

### 4. Check Schema
Verify `entries` table has these columns:
- `id` (UUID, primary key)
- `user_id` (UUID, foreign key → auth.users.id)
- `mood` (text)
- `created_at` (timestamp)

### 5. Test Query Directly
Run in Supabase SQL Editor:
```sql
SELECT mood, created_at 
FROM entries 
WHERE user_id = 'YOUR_USER_ID_HERE'
ORDER BY created_at DESC;
```

Should return rows if data exists.

---

## Debug Output Locations

Open **Browser DevTools (F12)** → **Console tab**:

| What to Look For | What It Means |
|---|---|
| `Current user ID: [UUID]` | ✅ Authentication working |
| `Entries fetched: 0 rows` | ❌ RLS blocking query or no data |
| `Entries fetched: 3 rows` | ✅ Data retrieved successfully |
| `Fetch error: {...}` | ❌ Database error (check network tab) |
| `Mood frequency distribution: {...}` | ✅ Forecast calculation working |

---

## Common Issues & Solutions

### Issue: "Not enough data yet" persists even with 10 entries

**Cause:** RLS policy not allowing SELECT
**Fix:**
```sql
-- In Supabase SQL Editor:
CREATE POLICY "Users can view their own entries" ON entries
FOR SELECT
USING (auth.uid() = user_id);
```

### Issue: Forecast shows wrong mood

**Cause:** Mood values in DB don't match expected values
**Expected values:** `happy`, `sad`, `neutral`, `anxious`, `excited`, `calm`

**Fix:** Check data in entries table - moods should be lowercase

```sql
SELECT DISTINCT mood FROM entries;
-- Should return: happy, sad, neutral, anxious, excited, calm
```

### Issue: "Could not load entries" error

**Cause:** Supabase connection error or table doesn't exist
**Fix:** 
1. Check internet connection
2. Verify `entries` table exists in Supabase
3. Check browser Network tab for failed requests

---

## Code Flow (How It Works)

```
1. Page loads
   ↓
2. Calls: predictTomorrowsMood()
   ↓
3. Checks user authentication
   ↓
4. Queries: SELECT mood FROM entries WHERE user_id = ? ORDER BY created_at DESC
   ↓
5. If 0 rows → Show "Not enough data yet"
   ↓
6. If 1+ rows → Analyze mood frequency
   ↓
7. Display prediction: "Based on patterns, tomorrow may feel mostly: [mood]"
```

---

## File Modified
- **src/mood-quest.html** (Lines 148-224)

### Key Changes:
- ✅ Removed `.limit(5)` - now analyzes ALL entries
- ✅ Added debug console.logs for troubleshooting
- ✅ Improved forecast message
- ✅ Works with 1+ entries (not requiring 5+)

---

## Need Help?

Check these in order:
1. Browser console for error messages
2. Supabase Dashboard → RLS Policies
3. Supabase SQL Editor to query data directly
4. Check user_id matches between auth and database

**All fixed?** Forecast should now appear with any mood data! 🎯
