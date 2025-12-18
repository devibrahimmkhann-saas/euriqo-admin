# 🎯 Profile API Integration - Complete Guide

## ✅ What's Been Integrated

The **Profile API** has been fully integrated with TanStack Query, including:
- ✅ Profile API hook (`useProfile`)
- ✅ Profile dropdown in header
- ✅ Complete profile page
- ✅ User info display throughout the app



## 📋 API Details

### **Endpoint:** `GET /api/auth/profile`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "d4d0e800-cbb6-40bb-aca0-0b8e4aff05ae",
      "email": "useddddsdr@examdple.com",
      "name": "John Doe",
      "createdAt": "2025-12-17T22:40:42.441Z",
      "updatedAt": "2025-12-17T22:40:42.441Z",
      "plan": "free",
      "isVerified": false,
      "projects": []
    }
  }
}
```

---

## 🎨 Features Implemented

### **1. Profile API Hook** (`hooks/api/use-profile.ts`)

```typescript
import { useProfile } from '@/hooks/api';

function MyComponent() {
  const { data: user, isLoading, error, refetch } = useProfile();
  
  // user contains the profile data
  // isLoading - true while fetching
  // error - contains error if request fails
  // refetch - function to manually refetch profile
}
```

**Features:**
- ✅ Automatic fetching on mount
- ✅ Caching (5 minutes stale time)
- ✅ Error handling
- ✅ Loading states
- ✅ Manual refetch capability

---

### **2. Profile Dropdown in Header**

Located in the top-right corner of the header:

**Features:**
- ✅ User avatar (first letter of name)
- ✅ User name display
- ✅ User email display
- ✅ Plan badge (Free/Pro/Enterprise)
- ✅ Dropdown menu with:
  - My Profile (navigates to `/dashboard/profile`)
  - Settings (navigates to `/dashboard/settings`)
  - Logout (logs out and redirects to login)
- ✅ Click outside to close
- ✅ Responsive design (mobile-friendly)
- ✅ Dark mode support

**Fallback Behavior:**
- If `name` field doesn't exist → Uses `firstName + lastName`
- If no name at all → Shows "John Doe"
- If API fails → Uses data from auth context (localStorage)

---

### **3. Profile Page** (`/dashboard/profile`)

A beautiful, comprehensive profile page with:

#### **Left Column - Profile Card:**
- ✅ Large avatar with gradient background
- ✅ User name
- ✅ Email address
- ✅ Plan badge
- ✅ Verification status badge
- ✅ Stats (Projects count, API calls)

#### **Right Column - Details:**
- ✅ Account Information section:
  - User ID (with copy-friendly mono font)
  - Full Name
  - Email Address
  - Subscription Plan
  - Member Since date
- ✅ My Projects section:
  - Shows all user projects
  - "Create Project" button
  - Empty state if no projects

**Features:**
- ✅ Loading spinner while fetching
- ✅ Error handling with retry button
- ✅ Responsive grid layout
- ✅ Dark mode support
- ✅ Beautiful UI with proper spacing

---

## 📁 Files Created/Modified

### **New Files:**
1. ✅ `/hooks/api/use-profile.ts` - Profile API hook
2. ✅ `/src/app/dashboard/profile/page.tsx` - Profile page route
3. ✅ `/components/profile/profile-content.tsx` - Profile page component
4. ✅ `/PROFILE_INTEGRATION.md` - This documentation

### **Modified Files:**
1. ✅ `/components/layouts/header.tsx` - Added profile dropdown
2. ✅ `/hooks/api/index.ts` - Export useProfile hook
3. ✅ `/lib/api-client.ts` - Added profile endpoint
4. ✅ `/types/auth.types.ts` - Added `name` field to User type

---

## 🔄 Data Flow

### **Profile Fetching Flow:**

```
Component mounts
    ↓
useProfile() hook called
    ↓
TanStack Query checks cache
    ↓
    ├─ If cached (< 5 min):
    │  └─ Return cached data ✅
    │
    └─ If not cached:
       ↓
       GET /api/auth/profile
       ↓
       Authorization: Bearer <token>
       ↓
       Response: { user: {...} }
       ↓
       Cache for 5 minutes
       ↓
       Return data ✅
```

### **Fallback Strategy:**

```
useProfile() fetches data
    ↓
    ├─ SUCCESS:
    │  └─ Use profile API data ✅
    │
    └─ FAILURE:
       └─ Fallback to auth context data (from localStorage) ✅
```

---

## 🎯 Usage Examples

### **Example 1: Display User Name**

```tsx
import { useProfile } from '@/hooks/api';

function WelcomeMessage() {
  const { data: user, isLoading } = useProfile();
  
  if (isLoading) return <div>Loading...</div>;
  
  const userName = user?.name || 'John Doe';
  
  return <h1>Welcome, {userName}!</h1>;
}
```

### **Example 2: Show User Plan**

```tsx
import { useProfile } from '@/hooks/api';

function PlanBadge() {
  const { data: user } = useProfile();
  
  const plan = user?.plan || 'free';
  
  return (
    <span className={`badge ${plan === 'pro' ? 'badge-primary' : 'badge-secondary'}`}>
      {plan.toUpperCase()}
    </span>
  );
}
```

### **Example 3: Conditional Rendering Based on Verification**

```tsx
import { useProfile } from '@/hooks/api';

function VerificationBanner() {
  const { data: user } = useProfile();
  
  if (user?.isVerified) return null;
  
  return (
    <div className="alert alert-warning">
      Please verify your email address to unlock all features.
    </div>
  );
}
```

### **Example 4: Manual Refetch**

```tsx
import { useProfile } from '@/hooks/api';

function ProfileRefreshButton() {
  const { refetch, isLoading } = useProfile();
  
  return (
    <button 
      onClick={() => refetch()} 
      disabled={isLoading}
      className="btn btn-primary"
    >
      {isLoading ? 'Refreshing...' : 'Refresh Profile'}
    </button>
  );
}
```

---

## 🧪 Testing the Integration

### **Test 1: View Profile in Header**
1. Login to the application
2. Look at the top-right corner
3. You should see your avatar and name
4. Click on it to see the dropdown menu

### **Test 2: Navigate to Profile Page**
1. Click on profile dropdown
2. Click "My Profile"
3. You should be redirected to `/dashboard/profile`
4. Profile page should display your information

### **Test 3: Check API Call**
1. Open DevTools → Network tab
2. Refresh the page
3. You should see: `GET /api/auth/profile`
4. Check the response contains user data

### **Test 4: Test Fallback**
1. Disconnect your internet (or stop backend)
2. Refresh the page
3. Header should still show user info (from localStorage)
4. Profile page should show error with retry button

---

## 🎨 UI Components

### **Profile Dropdown (Header)**

**Desktop View:**
- Avatar circle with first letter
- Name and plan displayed
- Dropdown arrow
- Full menu on click

**Mobile View:**
- Avatar circle only
- Dropdown menu on click
- Full user info in dropdown

### **Profile Page Layout**

**Desktop (3-column grid):**
```
┌──────────────┬─────────────────────────┐
│              │                         │
│   Profile    │   Account Information   │
│    Card      │                         │
│              ├─────────────────────────┤
│              │                         │
│              │      My Projects        │
│              │                         │
└──────────────┴─────────────────────────┘
```

**Mobile (Stacked):**
```
┌─────────────────────────┐
│      Profile Card       │
├─────────────────────────┤
│  Account Information    │
├─────────────────────────┤
│      My Projects        │
└─────────────────────────┘
```

---

## 🔐 Security Features

1. ✅ **Token-based authentication** - Profile API requires valid access token
2. ✅ **Automatic token injection** - API client adds Authorization header
3. ✅ **Fallback to cached data** - If API fails, uses localStorage data
4. ✅ **Error handling** - Graceful error messages with retry option
5. ✅ **Protected route** - Profile page is behind authentication

---

## 📊 User Type Structure

```typescript
interface User {
  id: string;                    // User unique ID
  email: string;                 // User email
  name?: string;                 // Full name (optional)
  firstName?: string;            // First name (optional)
  lastName?: string;             // Last name (optional)
  plan?: 'free' | 'pro' | 'enterprise';  // Subscription plan
  isVerified?: boolean;          // Email verification status
  projects?: any[];              // User's projects
  createdAt: string;             // Account creation date
  updatedAt?: string;            // Last update date
}
```

---

## 🎯 Name Display Logic

The app uses this priority for displaying user names:

```
1. user.name (if exists)
   ↓
2. user.firstName + user.lastName (if exists)
   ↓
3. "John Doe" (fallback)
```

**Implementation:**
```typescript
const userName = user?.name || 
                 `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 
                 'John Doe';
```

---

## 🚀 Next Steps

### **Recommended Enhancements:**

1. **Edit Profile Feature**
   - Add form to edit name, email, etc.
   - Use TanStack Query mutation
   - Update cache after successful edit

2. **Avatar Upload**
   - Allow users to upload profile picture
   - Store in cloud storage (S3, Cloudinary)
   - Display uploaded avatar instead of initials

3. **Email Verification**
   - Add "Verify Email" button
   - Send verification email
   - Update verification status

4. **Plan Upgrade**
   - Add "Upgrade Plan" button
   - Navigate to pricing page
   - Integrate payment system

---

## ✨ Summary

**Profile API is fully integrated with:**
- ✅ TanStack Query hook (`useProfile`)
- ✅ Beautiful profile dropdown in header
- ✅ Comprehensive profile page
- ✅ Fallback to cached data
- ✅ Error handling
- ✅ Loading states
- ✅ Responsive design
- ✅ Dark mode support

**The profile system is production-ready! 🎉**

