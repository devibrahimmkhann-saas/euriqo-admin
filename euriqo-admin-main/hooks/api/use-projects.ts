'use client';

import { useMutation, useQuery, useQueryClient, UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { ApiResponse } from '@/types/auth.types';

// Project types
export interface Project {
  id: string;
  name: string;
  description?: string;
  domain: string;
  publicId: string;
  active: boolean;
  rateLimit: number;
  createdAt: string;
  updatedAt: string;
  _count?: {
    chats: number;
    rateLimitLogs: number;
  };
}

export interface ProjectsListResponse {
  success: true;
  message: string;
  data: {
    projects: Project[];
    count: number;
    plan: string;
    limits: {
      free: number;
      pro: number;
      enterprise: string;
    };
  };
}

export interface CreateProjectData {
  name: string;
  description?: string;
  domain: string;
}

export interface ProjectResponse {
  success: true;
  message: string;
  data: {
    project: Project;
  };
}

/**
 * Hook to create a new project
 */
export function useCreateProject(): UseMutationResult<ProjectResponse, Error, CreateProjectData> {
  const queryClient = useQueryClient();

  return useMutation<ProjectResponse, Error, CreateProjectData>({
    mutationFn: async (projectData: CreateProjectData) => {
      const response = await api.projects.create(projectData);
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to create project');
      }

      return response as ProjectResponse;
    },
    onSuccess: (data) => {
      // Invalidate projects list to refetch
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      
      // Invalidate profile to update project count
      queryClient.invalidateQueries({ queryKey: ['auth', 'profile'] });
    },
  });
}

/**
 * Hook to fetch all projects
 */
export function useProjects(): UseQueryResult<ProjectsListResponse['data'], Error> {
  return useQuery<ProjectsListResponse['data'], Error>({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await api.projects.list();
      
      if (!response.success || !response.data) {
        throw new Error('Failed to fetch projects');
      }

      return response.data as ProjectsListResponse['data'];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch a single project
 */
export function useProject(projectId: string): UseQueryResult<Project, Error> {
  return useQuery<Project, Error>({
    queryKey: ['projects', projectId],
    queryFn: async () => {
      const response = await api.projects.get(projectId);
      
      if (!response.success || !response.data) {
        throw new Error('Failed to fetch project');
      }

      return response.data.project;
    },
    enabled: !!projectId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to update a project
 */
export function useUpdateProject(): UseMutationResult<ProjectResponse, Error, { projectId: string; data: Partial<CreateProjectData> }> {
  const queryClient = useQueryClient();

  return useMutation<ProjectResponse, Error, { projectId: string; data: Partial<CreateProjectData> }>({
    mutationFn: async ({ projectId, data }) => {
      const response = await api.projects.update(projectId, data);
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to update project');
      }

      return response as ProjectResponse;
    },
    onSuccess: (data, variables) => {
      // Invalidate specific project
      queryClient.invalidateQueries({ queryKey: ['projects', variables.projectId] });
      
      // Invalidate projects list
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

/**
 * Hook to delete a project
 */
export function useDeleteProject(): UseMutationResult<ApiResponse, Error, string> {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, string>({
    mutationFn: async (projectId: string) => {
      const response = await api.projects.delete(projectId);
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to delete project');
      }

      return response;
    },
    onSuccess: () => {
      // Invalidate projects list
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      
      // Invalidate profile to update project count
      queryClient.invalidateQueries({ queryKey: ['auth', 'profile'] });
    },
  });
}

