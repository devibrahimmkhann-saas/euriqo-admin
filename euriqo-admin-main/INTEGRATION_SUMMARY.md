# TanStack Query API Integration Summary

## ✅ Completed Integration

This document summarizes the TanStack Query integration for the Euriqo Admin authentication system.

---

## 🎯 What Was Integrated

### 1. **Signup API** ✅
- **Endpoint:** `POST http://localhost:3000/api/auth/signup`
- **Hook:** `useSignup()` in `/hooks/api/use-auth.ts`
- **Form Hook:** `useSignupForm()` in `/hooks/use-signup-form.ts`
- **Component:** `ComponentsAuthRegisterForm` in `/components/auth/components-auth-register-form.tsx`
- **Page:** `/src/app/auth/signup/page.tsx`

**Features:**
- ✅ TanStack Query mutation
- ✅ Automatic token storage
- ✅ Auto redirect to dashboard
- ✅ Form validation (email & password required)
- ✅ Error handling with user-friendly messages
- ✅ Loading states
- ✅ Optional firstName and lastName fields

---

### 2. **Login API** ✅
- **Endpoint:** `POST http://localhost:3000/api/auth/login`
- **Hook:** `useLogin()` in `/hooks/api/use-auth.ts`
- **Form Hook:** `useLoginForm()` in `/hooks/use-login-form.ts`
- **Component:** `ComponentsAuthLoginForm` in `/components/auth/components-auth-login-form.tsx`
- **Page:** `/src/app/auth/login/page.tsx`

**Features:**
- ✅ TanStack Query mutation
- ✅ Automatic token storage
- ✅ Auto redirect to dashboard
- ✅ Form validation (email & password)
- ✅ Error handling with user-friendly messages
- ✅ Loading states

---

### 3. **Logout API** ✅
- **Hook:** `useLogout()` in `/hooks/api/use-auth.ts`
- **Status:** Created but not yet integrated into UI

**Features:**
- ✅ TanStack Query mutation
- ✅ Clears tokens from localStorage
- ✅ Clears auth context
- ✅ Auto redirect to login page

---

## 📁 File Structure

```
euriqo-admin-main/
├── hooks/
│   ├── api/
│   │   ├── use-auth.ts          # TanStack Query hooks (useSignup, useLogin, useLogout)
│   │   ├── index.ts              # Export all API hooks
│   │   └── README.md             # API hooks documentation
│   ├── use-signup-form.ts        # Signup form logic with validation
│   └── use-login-form.ts         # Login form logic with validation
├── lib/
│   ├── api-client.ts             # API client with fetch wrapper
│   └── query-client.ts           # TanStack Query client configuration
├── components/
│   ├── providers/
│   │   └── query-provider.tsx    # QueryClientProvider wrapper
│   ├── auth/
│   │   ├── components-auth-register-form.tsx  # Signup form component
│   │   └── components-auth-login-form.tsx     # Login form component
│   └── layouts/
│       └── provider-component.tsx # Root provider with QueryProvider
├── contexts/
│   └── auth-context.tsx          # Auth context with helper methods
├── types/
│   └── auth.types.ts             # TypeScript types for auth
└── utils/
    └── token-storage.ts          # Token storage utilities
```

---

## 🔄 Data Flow

### Signup Flow:
```
User fills form
    ↓
useSignupForm() validates data
    ↓
useSignup() mutation triggered
    ↓
POST /api/auth/signup
    ↓
Response: { user, tokens }
    ↓
Tokens stored in localStorage
    ↓
Auth context updated
    ↓
Redirect to /dashboard ✅
```

### Login Flow:
```
User fills form
    ↓
useLoginForm() validates data
    ↓
useLogin() mutation triggered
    ↓
POST /api/auth/login
    ↓
Response: { user, tokens }
    ↓
Tokens stored in localStorage
    ↓
Auth context updated
    ↓
Redirect to /dashboard ✅
```

---

## 🔑 API Endpoints

### Signup
```http
POST http://localhost:3000/api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",      // optional
  "lastName": "Doe"         // optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "plan": "free",
      "createdAt": "2025-12-17T22:40:42.441Z",
      "updatedAt": "2025-12-17T22:40:42.441Z"
    },
    "tokens": {
      "accessToken": "jwt-token",
      "refreshToken": "jwt-refresh-token",
      "expiresIn": "15m"
    }
  }
}
```

### Login
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "plan": "free",
      "isVerified": false,
      "projects": [],
      "createdAt": "2025-12-17T22:40:42.441Z",
      "updatedAt": "2025-12-17T22:40:42.441Z"
    },
    "tokens": {
      "accessToken": "jwt-token",
      "refreshToken": "jwt-refresh-token",
      "expiresIn": "15m"
    }
  }
}
```

---

## 🎨 Features

### Enterprise-Level Features Implemented:

1. **TanStack Query Integration**
   - Automatic caching
   - Request deduplication
   - Optimistic updates ready
   - DevTools integration (development only)

2. **Type Safety**
   - Full TypeScript support
   - Typed API responses
   - Type-safe hooks

3. **Error Handling**
   - User-friendly error messages
   - API error parsing
   - Form validation errors
   - Global error display

4. **Loading States**
   - Button disabled during submission
   - Loading spinner
   - "Creating account..." / "Signing in..." messages

5. **Form Validation**
   - Email format validation
   - Password length validation
   - Real-time error display
   - Touch tracking

6. **Token Management**
   - Automatic storage in localStorage
   - Token refresh support (infrastructure ready)
   - Secure token handling

7. **User Experience**
   - Auto redirect after successful auth
   - No login needed after signup
   - Error dismissal
   - Responsive design

---

## 🚀 Usage Examples

### Using Signup Hook in a Component:

```tsx
import { useSignup } from '@/hooks/api';

function MySignupComponent() {
  const signupMutation = useSignup();

  const handleSignup = () => {
    signupMutation.mutate({
      email: 'user@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
    });
  };

  return (
    <div>
      <button 
        onClick={handleSignup}
        disabled={signupMutation.isPending}
      >
        {signupMutation.isPending ? 'Creating...' : 'Sign Up'}
      </button>
      
      {signupMutation.error && (
        <p>Error: {signupMutation.error.message}</p>
      )}
    </div>
  );
}
```

### Using Login Hook in a Component:

```tsx
import { useLogin } from '@/hooks/api';

function MyLoginComponent() {
  const loginMutation = useLogin();

  const handleLogin = () => {
    loginMutation.mutate({
      email: 'user@example.com',
      password: 'password123',
    });
  };

  return (
    <div>
      <button 
        onClick={handleLogin}
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </button>
      
      {loginMutation.error && (
        <p>Error: {loginMutation.error.message}</p>
      )}
    </div>
  );
}
```

---

## 📝 Configuration

### Query Client Configuration (`lib/query-client.ts`):

```typescript
const defaultOptions: DefaultOptions = {
  queries: {
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,      // 5 minutes
    gcTime: 10 * 60 * 1000,         // 10 minutes
  },
  mutations: {
    retry: 0,
  },
};
```

### API Base URL:

Set in `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## 🧪 Testing the Integration

### Test Signup:
1. Navigate to `/auth/signup`
2. Fill in email and password
3. Click "Sign Up"
4. Should redirect to `/dashboard` with tokens stored

### Test Login:
1. Navigate to `/auth/login`
2. Fill in email and password
3. Click "Sign in"
4. Should redirect to `/dashboard` with tokens stored

### Verify Token Storage:
Open browser DevTools → Application → Local Storage:
- `euriqo_access_token`
- `euriqo_refresh_token`
- `euriqo_user`

---

## 🔮 Future Enhancements

### Ready to Implement:

1. **Logout Button Integration**
   - Add logout button to header/navbar
   - Use `useLogout()` hook

2. **Token Refresh**
   - Already implemented in auth context
   - Automatically refreshes expired tokens

3. **Protected Routes**
   - Already implemented via `ProtectedRoute` component
   - Uses auth context to check authentication

4. **Additional API Hooks**
   - Follow the pattern in `/hooks/api/use-auth.ts`
   - Create hooks for other endpoints (users, projects, etc.)

---

## 📚 Documentation

- **API Hooks Documentation:** `/hooks/api/README.md`
- **TanStack Query Docs:** https://tanstack.com/query/latest
- **React Query Best Practices:** https://tkdodo.eu/blog/practical-react-query

---

## ✨ Summary

The authentication system is now fully integrated with TanStack Query, providing:
- ✅ Enterprise-level API integration
- ✅ Type-safe hooks
- ✅ Automatic token management
- ✅ Seamless user experience
- ✅ Error handling
- ✅ Loading states
- ✅ Form validation
- ✅ Auto redirect after auth

Both signup and login are working with proper token storage and automatic redirection to the dashboard!

