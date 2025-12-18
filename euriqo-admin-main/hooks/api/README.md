# API Hooks - TanStack Query Integration

This directory contains enterprise-level API hooks built with TanStack Query (React Query) for data fetching and mutations.

## Overview

All API hooks follow TanStack Query best practices and provide:
- Automatic loading states
- Error handling
- Optimistic updates
- Cache management
- Request deduplication
- Automatic retries

## Authentication Hooks

### `useSignup()`

Hook for user registration/signup.

**Features:**
- Automatically stores tokens in localStorage
- Updates auth context on success
- Redirects to dashboard after successful signup
- Handles API errors gracefully

**Usage:**

```tsx
import { useSignup } from '@/hooks/api';

function SignupForm() {
  const signupMutation = useSignup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    signupMutation.mutate({
      email: 'user@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      
      {signupMutation.isPending && <p>Creating account...</p>}
      {signupMutation.error && <p>Error: {signupMutation.error.message}</p>}
      
      <button type="submit" disabled={signupMutation.isPending}>
        Sign Up
      </button>
    </form>
  );
}
```

**API Endpoint:** `POST /api/auth/signup`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
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

---

### `useLogin()`

Hook for user login/authentication.

**Features:**
- Automatically stores tokens in localStorage
- Updates auth context on success
- Redirects to dashboard after successful login
- Handles API errors gracefully

**Usage:**

```tsx
import { useLogin } from '@/hooks/api';

function LoginForm() {
  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    loginMutation.mutate({
      email: 'user@example.com',
      password: 'password123',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      
      {loginMutation.isPending && <p>Logging in...</p>}
      {loginMutation.error && <p>Error: {loginMutation.error.message}</p>}
      
      <button type="submit" disabled={loginMutation.isPending}>
        Login
      </button>
    </form>
  );
}
```

**API Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
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

### `useLogout()`

Hook for user logout.

**Features:**
- Clears tokens from localStorage
- Clears auth context
- Redirects to login page
- Calls logout API endpoint

**Usage:**

```tsx
import { useLogout } from '@/hooks/api';

function LogoutButton() {
  const logoutMutation = useLogout();

  return (
    <button 
      onClick={() => logoutMutation.mutate()}
      disabled={logoutMutation.isPending}
    >
      {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
    </button>
  );
}
```

---

## Creating New API Hooks

When creating new API hooks, follow this pattern:

### For Queries (GET requests):

```tsx
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

export function useGetUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.get('/api/users');
      return response.data;
    },
  });
}
```

### For Mutations (POST, PUT, DELETE):

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['users', 'create'],
    mutationFn: async (userData: CreateUserRequest) => {
      const response = await api.post('/api/users', userData);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
```

---

## Best Practices

1. **Always use mutation keys** for better debugging and devtools integration
2. **Invalidate related queries** after mutations to keep data fresh
3. **Handle errors gracefully** - use `onError` callbacks or display error messages
4. **Use optimistic updates** for better UX when appropriate
5. **Leverage TypeScript** - always type your requests and responses
6. **Keep hooks focused** - one hook per API endpoint/operation
7. **Use query keys consistently** - follow a hierarchical structure

---

## Query Keys Convention

Follow this convention for query keys:

```tsx
// Entity list
['users']

// Single entity
['users', userId]

// Filtered list
['users', { status: 'active' }]

// Nested resources
['users', userId, 'posts']

// Mutations
['users', 'create']
['users', 'update', userId]
['users', 'delete', userId]
```

---

## Error Handling

All hooks automatically handle errors. Access error information via:

```tsx
const mutation = useSignup();

if (mutation.error) {
  console.error(mutation.error.message);
}
```

---

## Loading States

All hooks provide loading states:

```tsx
const mutation = useSignup();

if (mutation.isPending) {
  // Show loading spinner
}

if (mutation.isSuccess) {
  // Show success message
}
```

---

## TanStack Query DevTools

The React Query DevTools are automatically enabled in development mode. Access them via the floating icon in the bottom corner of your app.

---

## Further Reading

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [React Query Best Practices](https://tkdodo.eu/blog/practical-react-query)

