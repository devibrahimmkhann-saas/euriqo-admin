# 🚀 Project API Integration - TanStack Query

## ✨ Overview

Professional integration of the Projects API using TanStack Query with enterprise-level features including:
- **Form validation** with real-time error feedback
- **Loading states** with spinner animations
- **Success/Error notifications** using SweetAlert2
- **Optimistic updates** and cache invalidation
- **TypeScript** type safety
- **Professional UX** with confirmation dialogs

---

## 📁 Files Created/Modified

### 1. **API Client (`lib/api-client.ts`)**

Added projects endpoints:

```typescript
projects: {
  create: (projectData: { name: string; description?: string }) =>
    apiClient.post<ApiResponse>('/api/projects', projectData),
  
  list: () =>
    apiClient.get<ApiResponse>('/api/projects'),
  
  get: (projectId: string) =>
    apiClient.get<ApiResponse>(`/api/projects/${projectId}`),
  
  update: (projectId: string, projectData: any) =>
    apiClient.put<ApiResponse>(`/api/projects/${projectId}`, projectData),
  
  delete: (projectId: string) =>
    apiClient.delete<ApiResponse>(`/api/projects/${projectId}`),
}
```

---

### 2. **TanStack Query Hooks (`hooks/api/use-projects.ts`)**

Created comprehensive hooks for project management:

#### **useCreateProject**
```typescript
const createProject = useCreateProject();

createProject.mutate(
  { name: 'My Project', description: 'Description' },
  {
    onSuccess: (data) => {
      console.log('Project created:', data.data.project);
    },
    onError: (error) => {
      console.error('Failed:', error.message);
    }
  }
);
```

#### **useProjects**
```typescript
const { data: projects, isLoading } = useProjects();
```

#### **useProject**
```typescript
const { data: project } = useProject('project-id');
```

#### **useUpdateProject**
```typescript
const updateProject = useUpdateProject();
updateProject.mutate({
  projectId: 'id',
  data: { name: 'New Name' }
});
```

#### **useDeleteProject**
```typescript
const deleteProject = useDeleteProject();
deleteProject.mutate('project-id');
```

---

### 3. **Create Project Page (`src/app/dashboard/projects/create/page.tsx`)**

Professional form with:
- Real-time validation
- Character counters
- Loading states
- Success/Error notifications
- Unsaved changes warning

---

## 🎯 Features Implemented

### 1. **Form Validation**

```typescript
// Validation Rules
- Name: Required, 3-100 characters
- Description: Optional, max 500 characters

// Real-time Error Display
{errors.name && (
  <p className="text-sm text-red-500">{errors.name}</p>
)}
```

### 2. **Character Counters**

```typescript
<p className="text-xs text-gray-500">
  {name.length}/100 characters
</p>
```

### 3. **Loading States**

```typescript
{createProjectMutation.isPending ? (
  <>
    <Spinner />
    <span>Creating...</span>
  </>
) : (
  <>
    <Icon />
    <span>Create Project</span>
  </>
)}
```

### 4. **Success Notification**

```typescript
Swal.fire({
  icon: 'success',
  title: 'Project Created!',
  text: 'Your project has been created successfully',
  confirmButtonText: 'View Dashboard',
  showCancelButton: true,
  cancelButtonText: 'Create Another',
})
```

### 5. **Error Handling**

```typescript
Swal.fire({
  icon: 'error',
  title: 'Creation Failed',
  text: error.message,
  confirmButtonText: 'OK',
})
```

### 6. **Unsaved Changes Warning**

```typescript
if (name.trim() || description.trim()) {
  Swal.fire({
    icon: 'warning',
    title: 'Discard Changes?',
    text: 'You have unsaved changes...',
    showCancelButton: true,
  })
}
```

---

## 🔄 Data Flow

```
User Fills Form
     ↓
Validates Input
     ↓
Clicks "Create Project"
     ↓
useCreateProject Mutation
     ↓
POST /api/projects
     ↓
┌─────────────┴─────────────┐
↓                           ↓
Success                   Error
↓                           ↓
- Show Success Alert    - Show Error Alert
- Invalidate Cache      - Keep Form Data
- Offer Options:        - Allow Retry
  • View Dashboard
  • Create Another
```

---

## 📊 API Integration Details

### **Request**

```typescript
POST http://localhost:3000/api/projects

Headers:
{
  "Authorization": "Bearer <access_token>",
  "Content-Type": "application/json"
}

Body:
{
  "name": "My First Chatbot",
  "description": "Test project"
}
```

### **Response**

```typescript
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "project": {
      "id": "uuid",
      "name": "My Chatbot",
      "description": "...",
      "publicId": "pk_abc123def456...",
      "active": true,
      "rateLimit": 100,
      "createdAt": "2025-12-22T...",
      "updatedAt": "2025-12-22T..."
    }
  }
}
```

---

## 🎨 UI/UX Features

### **1. Form States**

| State | Visual Feedback |
|-------|----------------|
| **Idle** | Normal form |
| **Typing** | Character counter updates |
| **Error** | Red border + error message |
| **Submitting** | Disabled inputs + spinner |
| **Success** | Success modal |
| **Failed** | Error modal |

### **2. Button States**

```typescript
// Idle
[+] Create Project

// Loading
[⟳] Creating...

// Disabled
[+] Create Project (grayed out)
```

### **3. Validation Messages**

```
❌ Project name is required
❌ Project name must be at least 3 characters
❌ Project name must be less than 100 characters
❌ Description must be less than 500 characters
```

---

## 🔧 Cache Management

### **Automatic Cache Invalidation**

```typescript
onSuccess: () => {
  // Refetch projects list
  queryClient.invalidateQueries({ queryKey: ['projects'] });
  
  // Refetch profile (updates project count)
  queryClient.invalidateQueries({ queryKey: ['auth', 'profile'] });
}
```

### **Benefits:**
- ✅ Dashboard automatically shows new project
- ✅ Profile project count updates
- ✅ No manual refresh needed
- ✅ Consistent data across app

---

## 🧪 Testing Scenarios

### **Scenario 1: Successful Creation**
1. User enters valid name
2. Clicks "Create Project"
3. Shows loading spinner
4. API returns success
5. Shows success modal
6. User clicks "View Dashboard"
7. Redirects to dashboard with new project visible

### **Scenario 2: Validation Error**
1. User enters name with 2 characters
2. Clicks "Create Project"
3. Shows error: "Project name must be at least 3 characters"
4. Form stays open for correction

### **Scenario 3: API Error**
1. User enters valid data
2. Clicks "Create Project"
3. API returns error (network/server)
4. Shows error modal with message
5. User can retry

### **Scenario 4: Unsaved Changes**
1. User types in form
2. Clicks "Cancel"
3. Shows warning modal
4. User can:
   - Discard and leave
   - Stay and continue editing

---

## 📝 Type Safety

### **Project Interface**

```typescript
interface Project {
  id: string;
  name: string;
  description?: string;
  publicId: string;
  active: boolean;
  rateLimit: number;
  createdAt: string;
  updatedAt: string;
}
```

### **Create Data Interface**

```typescript
interface CreateProjectData {
  name: string;
  description?: string;
}
```

### **Response Interface**

```typescript
interface ProjectResponse {
  success: true;
  message: string;
  data: {
    project: Project;
  };
}
```

---

## 🎯 Best Practices Implemented

### **1. Separation of Concerns**
- ✅ API logic in `api-client.ts`
- ✅ React hooks in `use-projects.ts`
- ✅ UI logic in page component

### **2. Error Handling**
- ✅ Try-catch in API calls
- ✅ User-friendly error messages
- ✅ Fallback UI states

### **3. Loading States**
- ✅ Disabled inputs during submission
- ✅ Loading spinner on button
- ✅ "Creating..." text feedback

### **4. User Feedback**
- ✅ Real-time validation
- ✅ Character counters
- ✅ Success notifications
- ✅ Error notifications
- ✅ Confirmation dialogs

### **5. Performance**
- ✅ Optimistic updates
- ✅ Cache invalidation
- ✅ Stale-while-revalidate strategy
- ✅ Automatic refetching

---

## 🚀 Usage Examples

### **Creating a Project**

```typescript
import { useCreateProject } from '@/hooks/api';

function MyComponent() {
  const createProject = useCreateProject();

  const handleCreate = () => {
    createProject.mutate(
      { 
        name: 'My Project',
        description: 'Optional description' 
      },
      {
        onSuccess: (data) => {
          console.log('Created:', data.data.project.id);
        }
      }
    );
  };

  return (
    <button 
      onClick={handleCreate}
      disabled={createProject.isPending}
    >
      {createProject.isPending ? 'Creating...' : 'Create'}
    </button>
  );
}
```

### **Listing Projects**

```typescript
import { useProjects } from '@/hooks/api';

function ProjectList() {
  const { data: projects, isLoading, error } = useProjects();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {projects?.map(project => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
}
```

---

## ✅ Checklist

- [x] API endpoints added to `api-client.ts`
- [x] TanStack Query hooks created
- [x] Form validation implemented
- [x] Loading states added
- [x] Success notifications
- [x] Error handling
- [x] Unsaved changes warning
- [x] Cache invalidation
- [x] TypeScript types
- [x] Character counters
- [x] Professional UI/UX
- [x] Responsive design
- [x] Dark mode support

---

## 🎉 Result

**Professional, enterprise-grade project creation with:**
- ✅ Real-time validation
- ✅ Beautiful loading states
- ✅ User-friendly notifications
- ✅ Automatic cache updates
- ✅ Type-safe code
- ✅ Error resilience
- ✅ Excellent UX

**The form is production-ready and follows all best practices!** 🚀

