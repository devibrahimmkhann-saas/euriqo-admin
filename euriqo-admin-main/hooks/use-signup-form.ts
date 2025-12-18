'use client';

import { useState } from 'react';
import { useSignup } from '@/hooks/api';
import { RegisterRequest } from '@/types/auth.types';

// Form validation rules
interface ValidationRules {
  email: (value: string) => string | null;
  password: (value: string) => string | null;
}

// Form state interface
interface FormState {
  values: RegisterRequest;
  errors: Partial<Record<keyof RegisterRequest, string>>;
  touched: Partial<Record<keyof RegisterRequest, boolean>>;
}

/**
 * Custom hook for signup form with TanStack Query integration
 * Handles form state, validation, and submission
 */
export function useSignupForm() {
  const signupMutation = useSignup();

  const [formState, setFormState] = useState<FormState>({
    values: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
    errors: {},
    touched: {},
  });

  // Validation rules - simplified to match API requirements (email and password only)
  const validationRules: ValidationRules = {
    email: (value: string) => {
      if (!value) return 'Email is required';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return 'Please enter a valid email address';
      return null;
    },
    password: (value: string) => {
      if (!value) return 'Password is required';
      if (value.length < 6) return 'Password must be at least 6 characters';
      return null;
    },
  };

  // Validate field
  const validateField = (name: keyof RegisterRequest, value: string): string | null => {
    const rule = validationRules[name as keyof ValidationRules];
    return rule ? rule(value) : null;
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof RegisterRequest, string>> = {};
    let isValid = true;

    // Only validate email and password (required by API)
    const emailError = validateField('email', formState.values.email);
    const passwordError = validateField('password', formState.values.password);

    if (emailError) {
      errors.email = emailError;
      isValid = false;
    }

    if (passwordError) {
      errors.password = passwordError;
      isValid = false;
    }

    setFormState(prev => ({ ...prev, errors }));
    return isValid;
  };

  // Handle input change
  const handleChange = (name: keyof RegisterRequest, value: string) => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values, [name]: value },
      errors: { ...prev.errors, [name]: undefined },
      touched: { ...prev.touched, [name]: true },
    }));

    // Clear mutation error when user starts typing
    if (signupMutation.error) {
      signupMutation.reset();
    }
  };

  // Handle blur
  const handleBlur = (name: keyof RegisterRequest) => {
    const error = validateField(name, formState.values[name]);
    setFormState(prev => ({
      ...prev,
      errors: { ...prev.errors, [name]: error || undefined },
      touched: { ...prev.touched, [name]: true },
    }));
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Call the signup mutation - it will automatically handle success/error
    signupMutation.mutate({
      email: formState.values.email,
      password: formState.values.password,
      firstName: formState.values.firstName || '',
      lastName: formState.values.lastName || '',
    });
  };

  // Clear error
  const clearError = () => {
    signupMutation.reset();
  };

  return {
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    isSubmitting: signupMutation.isPending,
    globalError: signupMutation.error?.message || null,
    handleChange,
    handleBlur,
    handleSubmit,
    clearError,
  };
}

