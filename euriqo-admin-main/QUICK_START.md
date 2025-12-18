# 🚀 Quick Start - Authentication Integration

## ✅ What's Been Integrated

Both **Signup** and **Login** APIs are now fully integrated with TanStack Query!

---

## 📋 Quick Test Guide

### Test Signup:
```bash
# 1. Start your backend server
# 2. Navigate to: http://localhost:3000/auth/signup
# 3. Fill in:
   - Email: test@example.com
   - Password: password123
   - (Optional) First Name & Last Name
# 4. Click "Sign Up"
# 5. ✅ You'll be redirected to /dashboard with tokens stored!
```

### Test Login:
```bash
# 1. Navigate to: http://localhost:3000/auth/login
# 2. Fill in:
   - Email: test@example.com
   - Password: password123
# 3. Click "Sign in"
# 4. ✅ You'll be redirected to /dashboard with tokens stored!
```

---

## 🔍 Verify It's Working

### Check Tokens in Browser:
1. Open DevTools (F12)
2. Go to: Application → Local Storage → http://localhost:3000
3. You should see:
   - `euriqo_access_token`
   - `euriqo_refresh_token`
   - `euriqo_user`

### Check Network Requests:
1. Open DevTools → Network tab
2. Submit signup/login form
3. You should see:
   - `POST /api/auth/signup` or `/api/auth/login`
   - Status: 200 OK
   - Response with user and tokens

---

## 📁 Key Files Modified/Created

### New Files:
- ✅ `/hooks/api/use-auth.ts` - TanStack Query hooks
- ✅ `/hooks/api/index.ts` - Export file
- ✅ `/hooks/use-signup-form.ts` - Signup form logic
- ✅ `/hooks/use-login-form.ts` - Login form logic
- ✅ `/lib/query-client.ts` - Query client config
- ✅ `/components/providers/query-provider.tsx` - Provider wrapper
- ✅ `/hooks/api/README.md` - API documentation
- ✅ `/INTEGRATION_SUMMARY.md` - Full integration docs

### Modified Files:
- ✅ `/components/auth/components-auth-register-form.tsx` - Uses new signup hook
- ✅ `/components/auth/components-auth-login-form.tsx` - Uses new login hook
- ✅ `/components/layouts/provider-component.tsx` - Added QueryProvider
- ✅ `/contexts/auth-context.tsx` - Added helper methods
- ✅ `/types/auth.types.ts` - Updated User type
- ✅ `/lib/api-client.ts` - Added signup endpoint

---

## 🎯 API Endpoints

### Signup:
```http
POST http://localhost:3000/api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Login:
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

---

## 💡 How to Use in Your Code

### Signup Hook:
```tsx
import { useSignup } from '@/hooks/api';

function MyComponent() {
  const signup = useSignup();
  
  return (
    <button onClick={() => signup.mutate({ email, password })}>
      {signup.isPending ? 'Loading...' : 'Sign Up'}
    </button>
  );
}
```

### Login Hook:
```tsx
import { useLogin } from '@/hooks/api';

function MyComponent() {
  const login = useLogin();
  
  return (
    <button onClick={() => login.mutate({ email, password })}>
      {login.isPending ? 'Loading...' : 'Login'}
    </button>
  );
}
```

### Logout Hook:
```tsx
import { useLogout } from '@/hooks/api';

function MyComponent() {
  const logout = useLogout();
  
  return (
    <button onClick={() => logout.mutate()}>
      Logout
    </button>
  );
}
```

---

## 🎨 Features Included

- ✅ TanStack Query integration
- ✅ Automatic token storage
- ✅ Auto redirect to dashboard
- ✅ Form validation
- ✅ Error handling
- ✅ Loading states
- ✅ Type safety
- ✅ DevTools (development mode)

---

## 🐛 Troubleshooting

### Issue: "Network Error"
- ✅ Check backend is running on `http://localhost:3000`
- ✅ Check API endpoints are correct

### Issue: "Tokens not stored"
- ✅ Check browser console for errors
- ✅ Verify localStorage is enabled

### Issue: "Not redirecting to dashboard"
- ✅ Check `/dashboard` route exists
- ✅ Check browser console for navigation errors

---

## 📚 Full Documentation

- **Integration Summary:** `/INTEGRATION_SUMMARY.md`
- **API Hooks Docs:** `/hooks/api/README.md`
- **TanStack Query:** https://tanstack.com/query/latest

---

## ✨ Next Steps

1. Test signup and login flows
2. Implement logout button in header
3. Add more API endpoints following the same pattern
4. Customize error messages
5. Add loading animations

---

**🎉 You're all set! Both signup and login are fully integrated with TanStack Query!**

