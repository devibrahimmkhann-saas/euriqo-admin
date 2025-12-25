# FAQ API Integration Documentation

## Overview
This document describes the integration of the FAQ management system with the backend API using TanStack Query for professional, enterprise-level data management.

## API Endpoints

### 1. Get FAQs by Project
- **URL**: `GET /api/faqs/project/{projectId}`
- **Headers**: `Authorization: Bearer {accessToken}`
- **Response**:
```json
{
  "success": true,
  "message": "FAQ retrieved successfully",
  "data": {
    "faq": {
      "id": "0df4ac2b-495c-4b6d-859f-37eb88b563b7",
      "projectId": "275d4308-c4a5-4482-af5e-79ae2c798132",
      "faqs": "Q: What is your product?\nA: Our product is an AI-powered chatbot.\n\nQ: How much does it cost?\nA: We offer free and paid plans starting at $29/month.",
      "createdAt": "2025-12-23T23:30:00.573Z",
      "updatedAt": "2025-12-23T23:30:00.573Z",
      "project": {
        "id": "275d4308-c4a5-4482-af5e-79ae2c798132",
        "name": "Luxkoa",
        "publicId": "pk_a6de6c0183aa2bbe918ed2f99724ef6c",
        "description": "luxkoa is a blog",
        "domain": "www.luxkoa.com"
      }
    }
  }
}
```

### 2. Create FAQ
- **URL**: `POST /api/faqs`
- **Headers**: `Authorization: Bearer {accessToken}`
- **Body**:
```json
{
  "projectId": "project-id",
  "faqs": "Q: Your question?\nA: Your answer."
}
```

### 3. Update FAQ
- **URL**: `PUT /api/faqs/{id}`
- **Headers**: `Authorization: Bearer {accessToken}`
- **Body**:
```json
{
  "faqs": "Updated FAQ content"
}
```

### 4. Delete FAQ
- **URL**: `DELETE /api/faqs/{id}`
- **Headers**: `Authorization: Bearer {accessToken}`

## Implementation Details

### 1. API Client (`lib/api-client.ts`)
Added FAQ endpoints to the API client:
```typescript
faqs: {
  getByProject: (projectId: string) =>
    apiClient.get<ApiResponse>(`/api/faqs/project/${projectId}`),
  create: (faqData: { projectId: string; faqs: string }) =>
    apiClient.post<ApiResponse>('/api/faqs', faqData),
  update: (faqId: string, faqData: { faqs: string }) =>
    apiClient.put<ApiResponse>(`/api/faqs/${faqId}`, faqData),
  delete: (faqId: string) =>
    apiClient.delete<ApiResponse>(`/api/faqs/${faqId}`),
}
```

### 2. TanStack Query Hooks (`hooks/api/use-faqs.ts`)

#### Data Types
```typescript
interface FAQ {
  id: string;
  faqs: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  project?: {
    id: string;
    name: string;
    publicId: string;
    description?: string;
    domain: string;
  };
}

interface ParsedFAQItem {
  question: string;
  answer: string;
}
```

#### Hooks Available
- `useProjectFAQs(projectId)` - Fetches FAQs for a specific project
- `useCreateFAQ()` - Creates a new FAQ entry
- `useUpdateFAQ(projectId)` - Updates an existing FAQ
- `useDeleteFAQ(projectId)` - Deletes an FAQ entry
- `parseFAQString()` - Utility function to parse FAQ strings

### 3. FAQ String Parser
The `parseFAQString()` function intelligently parses FAQ strings in various formats:

**Supported Formats:**
1. Structured Q&A:
   ```
   Q: What is your product?
   A: Our product is an AI-powered chatbot.
   ```

2. Unstructured text:
   ```
   How to reset password? Click forgot password link.
   Pricing plans? Free, Pro, Enterprise.
   ```

3. Mixed formats - The parser handles any combination!

### 4. Knowledge Base UI

#### Main Page (`src/app/dashboard/knowledge-base/page.tsx`)
**Features:**
- **Projects Overview**: Grid of project cards
- **Click to Manage**: Navigate to project-specific FAQ page
- **Loading States**: Spinner during data fetch
- **Empty States**: Helpful messages when no projects exist

#### Project FAQ Page (`src/app/dashboard/knowledge-base/[projectId]/page.tsx`)
**Features Implemented:**
1. **Stats Dashboard**
   - Total FAQs count for the project
   - Status indicator
   - Last updated timestamp

2. **Search**
   - Real-time search through questions and answers
   - Toggle between text input and file upload methods

3. **Dual Upload Methods**
   - **Text Input**: Manual Q&A entry with form validation
   - **File Upload**: Upload .txt files (up to 5MB)

4. **FAQ Display**
   - Parsed Q&A pairs displayed as cards
   - Delete all FAQs functionality with confirmation
   - Loading and error states
   - Empty state with helpful guidance

5. **Navigation**
   - Back button to return to projects overview
   - Project name and domain in header
   - Delete all FAQs button

## State Management

### Loading States
- Initial data fetch: Shows spinner
- Creating FAQ: Button shows "Adding..." or "Uploading..."
- Deleting FAQ: Confirmation dialog with loading state

### Error Handling
- Network errors: Displayed with error icon and message
- Validation errors: SweetAlert2 warnings
- Empty states: Helpful messages guiding users

### Success Feedback
- FAQ created: Success toast with auto-dismiss
- FAQ deleted: Success confirmation
- Form reset after successful submission

## Form Validation

### Text Input Method
- Project selection: Required
- Question: Required
- Answer: Required, max 1000 characters
- Character counter for answer field

### File Upload Method
- Project selection: Required
- File: Required, .txt only, max 5MB
- File size validation with error feedback

## Cache Management

TanStack Query automatically:
- Caches FAQ data for 1 minute (staleTime)
- Invalidates cache after mutations
- Refetches data when needed
- Optimizes network requests

## UI/UX Features

1. **Professional Design**
   - Purple gradient theme (#7444FD)
   - Smooth animations and transitions
   - Dark mode support
   - Responsive layout

2. **User Feedback**
   - SweetAlert2 for confirmations and notifications
   - Loading spinners for async operations
   - Character counters
   - File name display after selection

3. **Smart Parsing**
   - Handles structured and unstructured FAQ text
   - Automatically extracts Q&A pairs
   - Fallback for missing answers
   - Flexible format support

## Usage Examples

### Adding FAQ via Text Input
1. Select a project from dropdown
2. Enter question
3. Enter answer (max 1000 chars)
4. Click "Add FAQ"
5. Form resets on success

### Adding FAQ via File Upload
1. Select a project from dropdown
2. Click upload area or drag file
3. Select .txt file
4. Click "Upload FAQs"
5. File is parsed and FAQs are created

### Filtering FAQs
1. Use project dropdown to filter by project
2. Use search bar to find specific Q&A
3. Click project cards to quick-filter

### Deleting FAQ
1. Click delete button on FAQ card
2. Confirm deletion in dialog
3. FAQ is removed and list updates

## Best Practices Implemented

1. **Type Safety**: Full TypeScript typing throughout
2. **Error Boundaries**: Graceful error handling at all levels
3. **Loading States**: Clear feedback during async operations
4. **Optimistic Updates**: Immediate UI feedback
5. **Cache Invalidation**: Automatic data refresh after mutations
6. **Form Validation**: Client-side validation before API calls
7. **Accessibility**: Semantic HTML and ARIA labels
8. **Responsive Design**: Mobile-first approach
9. **Code Reusability**: Shared hooks and utilities
10. **Professional UI**: Enterprise-grade design patterns

## Future Enhancements

Potential improvements:
- Bulk FAQ operations
- FAQ categories/tags
- Export FAQs to file
- Import from multiple formats (CSV, JSON)
- FAQ analytics (views, usage)
- Version history
- Rich text editor for answers
- FAQ templates
- AI-powered FAQ suggestions
- Multi-language support

