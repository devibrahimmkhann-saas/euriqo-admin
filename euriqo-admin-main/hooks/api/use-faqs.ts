import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { ApiResponse } from '@/types/auth.types';

export interface FAQ {
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

export interface ParsedFAQItem {
  question: string;
  answer: string;
}

export interface CreateFAQData {
  projectId: string;
  faqs: string;
}

export interface UpdateFAQData {
  faqs: string;
}

export interface ProjectFAQResponse {
  faq: FAQ;
}

// Helper function to parse FAQ string into structured Q&A pairs
export function parseFAQString(faqString: string): ParsedFAQItem[] {
  const items: ParsedFAQItem[] = [];
  
  // Split by double newlines or Q: patterns
  const sections = faqString.split(/\n\s*\n|\n(?=Q:)/);
  
  let currentQuestion = '';
  let currentAnswer = '';
  
  for (const section of sections) {
    const trimmedSection = section.trim();
    if (!trimmedSection) continue;
    
    // Check if section starts with Q:
    const qMatch = trimmedSection.match(/^Q:\s*(.+?)(?:\n|$)/i);
    if (qMatch) {
      // Save previous Q&A if exists
      if (currentQuestion) {
        items.push({
          question: currentQuestion.trim(),
          answer: currentAnswer.trim() || 'No answer provided.'
        });
      }
      
      currentQuestion = qMatch[1].trim();
      
      // Look for A: in the same section
      const aMatch = trimmedSection.match(/A:\s*(.+?)(?:\n\n|$)/is);
      if (aMatch) {
        currentAnswer = aMatch[1].trim();
      } else {
        // Try to get everything after the question
        const afterQ = trimmedSection.substring(qMatch[0].length).trim();
        currentAnswer = afterQ || '';
      }
    } else {
      // If no Q: found, treat as continuation of answer or standalone text
      if (currentQuestion) {
        currentAnswer += '\n' + trimmedSection;
      } else {
        // Treat as a question without Q: prefix
        const parts = trimmedSection.split(/\?|\.(?=\s|$)/);
        if (parts.length >= 2) {
          currentQuestion = parts[0] + (trimmedSection.includes('?') ? '?' : '.');
          currentAnswer = parts.slice(1).join('.').trim();
        } else {
          currentQuestion = trimmedSection;
          currentAnswer = '';
        }
      }
    }
  }
  
  // Add the last Q&A pair
  if (currentQuestion) {
    items.push({
      question: currentQuestion.trim(),
      answer: currentAnswer.trim() || 'No answer provided.'
    });
  }
  
  return items;
}

// Hook to get FAQs by project ID
export function useProjectFAQs(projectId: string): UseQueryResult<FAQ, Error> {
  return useQuery<FAQ, Error>({
    queryKey: ['faqs', 'project', projectId],
    queryFn: async () => {
      const response = await api.faqs.getByProject(projectId);
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch FAQs');
      }
      const data = response.data as ProjectFAQResponse;
      return data.faq;
    },
    enabled: !!projectId,
    staleTime: 1000 * 60 * 1, // 1 minute
  });
}

// Hook to create FAQ
export function useCreateFAQ() {
  const queryClient = useQueryClient();
  
  return useMutation<ApiResponse<FAQ>, Error, CreateFAQData>({
    mutationFn: async (newFAQ) => {
      const response = await api.faqs.create(newFAQ);
      if (!response.success) {
        throw new Error(response.message || 'Failed to create FAQ');
      }
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['faqs', 'project', variables.projectId] });
    },
  });
}

// Hook to update FAQ
export function useUpdateFAQ(projectId: string) {
  const queryClient = useQueryClient();
  
  return useMutation<ApiResponse<FAQ>, Error, { id: string; data: UpdateFAQData }>({
    mutationFn: async ({ id, data }) => {
      const response = await api.faqs.update(id, data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to update FAQ');
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs', 'project', projectId] });
    },
  });
}

// Hook to delete FAQ
export function useDeleteFAQ(projectId: string) {
  const queryClient = useQueryClient();
  
  return useMutation<ApiResponse, Error, string>({
    mutationFn: async (id) => {
      const response = await api.faqs.delete(id);
      if (!response.success) {
        throw new Error(response.message || 'Failed to delete FAQ');
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs', 'project', projectId] });
    },
  });
}

