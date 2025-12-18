'use client';

import { useState } from 'react';
import { useLogin } from '@/hooks/api';
import { LoginRequest } from '@/types/auth.types';

// Form validation rules
interface ValidationRules {
  email: (value: string) => string | null;
  password: (value: string) => string | null;
}

// Form state interface
interface FormState {
  values: LoginRequest;
  errors: Partial<Record<keyof LoginRequest, string>>;
  touched: Partial<Record<keyof LoginRequest, boolean>>;
}

/**
 * Custom hook for login form with TanStack Query integration
 * Handles form state, validation, and submission
 */
export function useLoginForm() {
  const loginMutation = useLogin();

  const [formState, setFormState] = useState<FormState>({
    values: {
      email: '',
      password: '',
    },
    errors: {},
    touched: {},
  });

  // Validation rules
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
  const validateField = (name: keyof LoginRequest, value: string): string | null => {
    const rule = validationRules[name];
    return rule ? rule(value) : null;
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof LoginRequest, string>> = {};
    let isValid = true;

    // Validate email and password
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
  const handleChange = (name: keyof LoginRequest, value: string) => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values, [name]: value },
      errors: { ...prev.errors, [name]: undefined },
      touched: { ...prev.touched, [name]: true },
    }));

    // Clear mutation error when user starts typing
    if (loginMutation.error) {
      loginMutation.reset();
    }
  };

  // Handle blur
  const handleBlur = (name: keyof LoginRequest) => {
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

    // Call the login mutation - it will automatically handle success/error
    loginMutation.mutate({
      email: formState.values.email,
      password: formState.values.password,
    });
  };

  // Clear error
  const clearError = () => {
    loginMutation.reset();
  };

  return {
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    isSubmitting: loginMutation.isPending,
    globalError: loginMutation.error?.message || null,
    handleChange,
    handleBlur,
    handleSubmit,
    clearError,
  };
}

