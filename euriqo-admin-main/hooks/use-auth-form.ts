'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { LoginRequest, RegisterRequest } from '@/types/auth.types';
import { ApiError } from '@/lib/api-client';

// Form validation rules
interface ValidationRules {
  email: (value: string) => string | null;
  password: (value: string) => string | null;
  firstName?: (value: string) => string | null;
  lastName?: (value: string) => string | null;
  confirmPassword?: (value: string, password: string) => string | null;
}

// Form state interface
interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
}

// Login form hook
export function useLoginForm() {
  const router = useRouter();
  const { login, state, clearError } = useAuth();

  const [formState, setFormState] = useState<FormState<LoginRequest>>({
    values: {
      email: '',
      password: '',
    },
    errors: {},
    touched: {},
    isSubmitting: false,
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

    Object.keys(formState.values).forEach((key) => {
      const fieldName = key as keyof LoginRequest;
      const error = validateField(fieldName, formState.values[fieldName]);
      if (error) {
        errors[fieldName] = error;
        isValid = false;
      }
    });

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

    // Clear global error when user starts typing
    if (state.error) {
      clearError();
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

    setFormState(prev => ({ ...prev, isSubmitting: true }));

    try {
      await login(formState.values);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Error is handled by the auth context
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  return {
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    isSubmitting: formState.isSubmitting,
    globalError: state.error,
    handleChange,
    handleBlur,
    handleSubmit,
    clearError,
  };
}

// Register form hook
export function useRegisterForm() {
  const router = useRouter();
  const { register, state, clearError } = useAuth();

  interface RegisterFormData extends RegisterRequest {
    confirmPassword: string;
  }

  const [formState, setFormState] = useState<FormState<RegisterFormData>>({
    values: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
    errors: {},
    touched: {},
    isSubmitting: false,
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
      if (value.length < 8) return 'Password must be at least 8 characters';
      if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter';
      if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter';
      if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number';
      if (!/(?=.*[@$!%*?&])/.test(value)) return 'Password must contain at least one special character';
      return null;
    },
    firstName: (value: string) => {
      if (!value) return 'First name is required';
      if (value.length < 2) return 'First name must be at least 2 characters';
      return null;
    },
    lastName: (value: string) => {
      if (!value) return 'Last name is required';
      if (value.length < 2) return 'Last name must be at least 2 characters';
      return null;
    },
    confirmPassword: (value: string, password: string) => {
      if (!value) return 'Please confirm your password';
      if (value !== password) return 'Passwords do not match';
      return null;
    },
  };

  // Validate field
  const validateField = (name: keyof RegisterFormData, value: string): string | null => {
    const rule = validationRules[name];
    if (!rule) return null;
    
    if (name === 'confirmPassword') {
      return rule(value, formState.values.password);
    }
    
    return rule(value);
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof RegisterFormData, string>> = {};
    let isValid = true;

    Object.keys(formState.values).forEach((key) => {
      const fieldName = key as keyof RegisterFormData;
      const error = validateField(fieldName, formState.values[fieldName]);
      if (error) {
        errors[fieldName] = error;
        isValid = false;
      }
    });

    setFormState(prev => ({ ...prev, errors }));
    return isValid;
  };

  // Handle input change
  const handleChange = (name: keyof RegisterFormData, value: string) => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values, [name]: value },
      errors: { ...prev.errors, [name]: undefined },
      touched: { ...prev.touched, [name]: true },
    }));

    // Clear global error when user starts typing
    if (state.error) {
      clearError();
    }

    // Re-validate confirm password if password changes
    if (name === 'password' && prev.touched.confirmPassword) {
      const confirmPasswordError = validateField('confirmPassword', prev.values.confirmPassword);
      setFormState(current => ({
        ...current,
        errors: { ...current.errors, confirmPassword: confirmPasswordError || undefined },
      }));
    }
  };

  // Handle blur
  const handleBlur = (name: keyof RegisterFormData) => {
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

    setFormState(prev => ({ ...prev, isSubmitting: true }));

    try {
      const { confirmPassword, ...registerData } = formState.values;
      await register(registerData);
      router.push('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      // Error is handled by the auth context
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  return {
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    isSubmitting: formState.isSubmitting,
    globalError: state.error,
    handleChange,
    handleBlur,
    handleSubmit,
    clearError,
  };
}
