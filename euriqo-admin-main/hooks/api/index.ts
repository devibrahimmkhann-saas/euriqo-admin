/**
 * API Hooks - Enterprise-level TanStack Query hooks for API integration
 * 
 * This module exports all API hooks for authentication and other features.
 * All hooks follow TanStack Query best practices for data fetching and mutations.
 */

export { useSignup, useLogin, useLogout } from './use-auth';
export { useProfile } from './use-profile';
export { 
  useCreateProject, 
  useProjects, 
  useProject, 
  useUpdateProject, 
  useDeleteProject 
} from './use-projects';
export type { Project, CreateProjectData, ProjectResponse } from './use-projects';

