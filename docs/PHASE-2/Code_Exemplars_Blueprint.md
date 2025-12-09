---
title: "Code Exemplars Blueprint - Growth Journey Portfolio"
source: ""
author: "Growth Journey Portfolio Team"
post_slug: "code-exemplars-blueprint"
categories: ["Code Examples", "Patterns", "Best Practices", "Development Guide"]
tags: ["react", "typescript", "patterns", "examples", "code-quality", "best-practices"]
ai_note: "Comprehensive code exemplars extracted from actual codebase. Provides real-world patterns for component structure, service layer, hooks, error handling, testing, and more. Use these as templates for new code generation."
summary: "Complete collection of production-ready code patterns from the Growth Journey Portfolio. Includes component structure, service layer architecture, custom hooks, error handling, state management, testing patterns, animation components, and build tooling."
date: 2025-12-09
---

# Code Exemplars Blueprint

## Executive Summary

This blueprint provides production-ready code examples extracted from the Growth Journey Portfolio codebase. Each pattern demonstrates TypeScript strict mode, accessibility best practices, performance optimization, and modern React patterns.

**Purpose:** Reference guide for consistent code generation and development patterns

**Source:** Real implementations from `src/` directory

**Tech Stack:** React 18.2 + TypeScript 5.0 + Vite 7.0 + Tailwind CSS 3.4

## Table of Contents

1. [Component Structure Patterns](#1-component-structure-patterns)
2. [Service Layer Architecture](#2-service-layer-architecture)
3. [Custom Hooks Patterns](#3-custom-hooks-patterns)
4. [API Integration Patterns](#4-api-integration-patterns)
5. [Error Handling Patterns](#5-error-handling-patterns)
6. [State Management Patterns](#6-state-management-patterns)
7. [Form Handling Patterns](#7-form-handling-patterns)
8. [Animation Components](#8-animation-components)
9. [UI Component Library](#9-ui-component-library)
10. [Utility Functions](#10-utility-functions)
11. [Testing Patterns](#11-testing-patterns)
12. [Build Tooling (Vite Plugins)](#12-build-tooling-vite-plugins)
13. [Performance Optimization](#13-performance-optimization)
14. [Accessibility Patterns](#14-accessibility-patterns)
15. [Type Definitions](#15-type-definitions)

---

## 1. Component Structure Patterns

### 1.1 Section Component Pattern

**Purpose:** Full-page section with animations, accessibility, and semantic HTML

**File:** `src/components/sections/HeroSection.tsx`

```typescript
import React from 'react';
import { Button } from '@/components/ui/Button';
import { useScrollTo } from '@/hooks/useScrollTo';
import { ParticleBackground } from '@/components/animations/ParticleBackground';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';
import { CyclicText } from '@/components/animations/CyclicText';
import { motion } from 'framer-motion';

/**
 * Hero section with particle background and morphing text
 * Demonstrates: Framer Motion animations, accessibility, semantic HTML, custom hooks
 */
export const HeroSection: React.FC = () => {
  const { scrollToSection } = useScrollTo();

  const careerTitles = [
    'Full Stack Developer',
    'Frontend Specialist',
    'React Enthusiast',
    'Career Changer',
    'Problem Solver',
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      role="banner"
      aria-label="Introduction and primary presentation"
    >
      {/* Interactive particle background */}
      <ParticleBackground
        particleCount={100}
        colors={['rgba(59, 130, 246, 0.3)', 'rgba(147, 51, 234, 0.2)']}
        className="absolute inset-0"
      />

      <div className="text-center max-w-4xl mx-auto relative z-10">
        {/* Main heading with staggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            Hello, I'm{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Joem</span>
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.25, 0.4, 0.25],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              />
            </span>
          </h1>
        </motion.div>

        {/* Career transition subtitle with morphing text */}
        <FadeInOnScroll delay={0.4}>
          <div className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            <CyclicText
              texts={careerTitles}
              className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold"
              interval={3000}
            />
            <div className="mt-2">
              passionate about creating beautiful, functional, and user-friendly applications
            </div>
          </div>
        </FadeInOnScroll>

        {/* Call-to-action buttons with hover animations */}
        <FadeInOnScroll delay={0.6}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="primary"
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View My Work
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => scrollToSection('learning-journey')}
                className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                My Journey
              </Button>
            </motion.div>
          </div>
        </FadeInOnScroll>

        {/* Floating elements for visual interest */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full opacity-60"
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 1,
          }}
        />
      </div>
    </section>
  );
};
```

**Key Patterns:**
- ✅ Named export with `React.FC` type
- ✅ JSDoc comment explaining purpose
- ✅ Semantic HTML (`<section>`, `role="banner"`)
- ✅ ARIA labels for accessibility
- ✅ Framer Motion for animations
- ✅ Custom hooks for shared logic
- ✅ Tailwind CSS utility classes
- ✅ Responsive design (`md:` breakpoints)

---

## 2. Service Layer Architecture

### 2.1 API Service Class Pattern

**Purpose:** Encapsulate API calls with caching, error handling, and type safety

**File:** `src/services/githubAPI.ts`

```typescript
// GitHub API service for fetching live portfolio data
// Provides methods for authentication, data fetching, and caching

export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  clone_url: string;
  language: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  size: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  topics: string[];
  visibility: 'public' | 'private';
}

export interface GitHubStats {
  totalCommits: number;
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  languageStats: Record<string, number>;
  recentActivity: GitHubCommit[];
}

/**
 * GitHub API service with caching and error handling
 * Singleton pattern for shared state across application
 */
class GitHubAPIService {
  private baseURL = 'https://api.github.com';
  private username = 'joembolinas';
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheExpiry = 5 * 60 * 1000; // 5 minutes

  /**
   * Simple cache mechanism for API responses
   * Reduces API calls and improves performance
   */
  private getCached<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached.data as T;
    }
    return null;
  }

  private setCached<T>(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  /**
   * Generic API request with error handling and caching
   * @param endpoint - API endpoint path
   * @returns Promise with typed response data
   */
  private async apiRequest<T>(endpoint: string): Promise<T> {
    const cacheKey = endpoint;
    const cached = this.getCached<T>(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App',
        },
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      this.setCached(cacheKey, data);
      return data;
    } catch (error) {
      console.error('GitHub API request failed:', error);
      throw error;
    }
  }

  /**
   * Fetch user profile information
   * @returns GitHub user data
   */
  async getUser(): Promise<GitHubUser> {
    return this.apiRequest<GitHubUser>(`/users/${this.username}`);
  }

  /**
   * Fetch user repositories with optional filtering
   * @param options - Repository query options
   * @returns Array of repository data
   */
  async getRepositories(
    options: {
      sort?: 'created' | 'updated' | 'pushed' | 'full_name';
      direction?: 'asc' | 'desc';
      per_page?: number;
      type?: 'all' | 'owner' | 'member';
    } = {},
  ): Promise<GitHubRepo[]> {
    const params = new URLSearchParams({
      sort: options.sort || 'updated',
      direction: options.direction || 'desc',
      per_page: (options.per_page || 30).toString(),
      type: options.type || 'owner',
    });

    return this.apiRequest<GitHubRepo[]>(`/users/${this.username}/repos?${params}`);
  }

  /**
   * Get aggregated statistics across all repositories
   * @returns GitHub statistics and analytics
   */
  async getStats(): Promise<GitHubStats> {
    try {
      const [user, repos] = await Promise.all([
        this.getUser(),
        this.getRepositories({ per_page: 100 }),
      ]);

      const languageStats: Record<string, number> = {};
      let totalStars = 0;
      let totalForks = 0;

      // Aggregate repository statistics
      repos.forEach((repo) => {
        if (repo.language) {
          languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
        }
        totalStars += repo.stargazers_count;
        totalForks += repo.forks_count;
      });

      return {
        totalCommits: 0, // Placeholder
        totalRepos: user.public_repos,
        totalStars,
        totalForks,
        languageStats,
        recentActivity: [],
      };
    } catch (error) {
      console.error('Failed to fetch GitHub stats:', error);
      throw error;
    }
  }

  /**
   * Clear cache manually if needed
   */
  clearCache(): void {
    this.cache.clear();
  }
}

// Export singleton instance
export const githubAPI = new GitHubAPIService();
```

**Key Patterns:**
- ✅ Class-based service with private methods
- ✅ Singleton pattern for shared state
- ✅ Generic type parameters for flexibility
- ✅ In-memory caching with expiration
- ✅ Comprehensive JSDoc comments
- ✅ Error handling with try-catch
- ✅ URLSearchParams for query strings
- ✅ Promise.all for parallel requests

---

## 3. Custom Hooks Patterns

### 3.1 Async Data Fetching Hook

**Purpose:** Fetch data with loading/error states and refetch capability

**File:** `src/hooks/useGitHub.ts`

```typescript
import { useState, useEffect, useCallback } from 'react';
import { githubAPI, GitHubUser, GitHubRepo, GitHubStats } from '@/services/githubAPI';

/**
 * Custom hook for fetching GitHub user data
 * Provides loading states, error handling, and refetch capability
 * 
 * @returns Object with user data, loading state, error, and refetch function
 * 
 * @example
 * const { user, loading, error, refetch } = useGitHubUser();
 * if (loading) return <Spinner />;
 * if (error) return <Error message={error} />;
 * return <Profile user={user} />;
 */
export const useGitHubUser = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await githubAPI.getUser();
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading, error, refetch: fetchUser };
};

/**
 * Hook for repositories data with filtering options
 * Demonstrates parameterized custom hooks
 */
export const useGitHubRepos = (options?: {
  sort?: 'created' | 'updated' | 'pushed' | 'full_name';
  direction?: 'asc' | 'desc';
  per_page?: number;
}) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const reposData = await githubAPI.getRepositories(options);
      setRepos(reposData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
    } finally {
      setLoading(false);
    }
  }, [options]);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  return { repos, loading, error, refetch: fetchRepos };
};

/**
 * Combined hook for all GitHub data
 * Demonstrates composition of multiple hooks
 */
export const useAllGitHubData = () => {
  const userResult = useGitHubUser();
  const statsResult = useGitHubStats();
  const portfolioReposResult = usePortfolioRepos();

  const loading = userResult.loading || statsResult.loading || portfolioReposResult.loading;
  const error = userResult.error || statsResult.error || portfolioReposResult.error;

  const refetchAll = useCallback(() => {
    userResult.refetch();
    statsResult.refetch();
    portfolioReposResult.refetch();
  }, [userResult, statsResult, portfolioReposResult]);

  return {
    user: userResult.user,
    stats: statsResult.stats,
    portfolioRepos: portfolioReposResult.portfolioRepos,
    loading,
    error,
    refetch: refetchAll,
  };
};
```

**Key Patterns:**
- ✅ Named export with `use*` prefix
- ✅ Return object with data/loading/error/refetch
- ✅ `useCallback` for memoized functions
- ✅ Type guard for error handling
- ✅ Comprehensive JSDoc with @example
- ✅ Hook composition for complex state

---

## 4. API Integration Patterns

### 4.1 Service with Throttling/Cooldown

**Purpose:** Prevent spam submissions with client-side throttling

**File:** `src/services/contactService.ts`

```typescript
import { ContactFormData, ContactSubmitResult } from '@/types';

// Simple in-memory throttle map (by email) to prevent rapid re-submits
const lastSubmitMap = new Map<string, number>();
const COOLDOWN_MS = 30_000; // 30 seconds

export interface ContactServiceOptions {
  simulateDelay?: number;
  cooldownMs?: number;
}

const defaultOptions: Required<ContactServiceOptions> = {
  simulateDelay: 1200,
  cooldownMs: COOLDOWN_MS,
};

/**
 * Submit contact form with honeypot detection and throttling
 * 
 * @param data - Contact form data
 * @param options - Service options (delay, cooldown)
 * @returns Promise with submission result
 */
export async function submitContact(
  data: ContactFormData,
  options: ContactServiceOptions = {},
): Promise<ContactSubmitResult> {
  const { simulateDelay, cooldownMs } = { ...defaultOptions, ...options };

  // Honeypot detection (bots fill hidden field)
  if (data.company && data.company.trim().length > 0) {
    return {
      ok: true, // Pretend success but silently drop
      id: 'honeypot-suppressed',
      receivedAt: Date.now(),
    };
  }

  // Throttle check
  const now = Date.now();
  const last = lastSubmitMap.get(data.email) || 0;
  if (now - last < cooldownMs) {
    return {
      ok: false,
      error: 'Please wait a moment before sending another message.',
      receivedAt: now,
    };
  }

  lastSubmitMap.set(data.email, now);

  // Simulate network latency
  await new Promise((res) => setTimeout(res, simulateDelay));

  // Mock success response
  return {
    ok: true,
    id: 'contact_' + Math.random().toString(36).slice(2, 10),
    receivedAt: Date.now(),
  };
}

/**
 * Check if user can submit (not in cooldown)
 */
export function canSubmit(email: string, cooldownMs: number = COOLDOWN_MS): boolean {
  const last = lastSubmitMap.get(email) || 0;
  return Date.now() - last >= cooldownMs;
}
```

**Key Patterns:**
- ✅ Map-based throttling with timestamps
- ✅ Honeypot spam detection
- ✅ Configurable options with defaults
- ✅ Simulated network delay for testing
- ✅ Helper function for validation
- ✅ Consistent error response format

---

## 5. Error Handling Patterns

### 5.1 Service Layer Error Handling

```typescript
/**
 * Generic API request with comprehensive error handling
 */
private async apiRequest<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App',
      },
    });

    // HTTP error handling
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Log error for debugging
    console.error('API request failed:', error);
    
    // Re-throw for caller to handle
    throw error;
  }
}
```

### 5.2 Hook Error Handling

```typescript
const fetchData = useCallback(async () => {
  try {
    setLoading(true);
    setError(null);
    const result = await apiCall();
    setData(result);
  } catch (err) {
    // Type guard for Error type
    setError(err instanceof Error ? err.message : 'Unknown error occurred');
  } finally {
    setLoading(false);
  }
}, []);
```

### 5.3 Component Error Handling

```typescript
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert" className="p-4 bg-red-100 border border-red-400 rounded">
      <h2 className="text-red-800 font-bold">Something went wrong</h2>
      <pre className="text-sm text-red-600">{error.message}</pre>
    </div>
  );
}

// Usage
export function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Section />
    </ErrorBoundary>
  );
}
```

---

## 6. State Management Patterns

### 6.1 Local State with Hooks

```typescript
/**
 * Component with multiple state values
 * Demonstrates useState with TypeScript
 */
export const Component: React.FC = () => {
  // Primitive state
  const [count, setCount] = useState<number>(0);
  
  // Object state
  const [user, setUser] = useState<User | null>(null);
  
  // Array state
  const [items, setItems] = useState<string[]>([]);
  
  // Update object state immutably
  const updateUser = (name: string) => {
    setUser((prev) => (prev ? { ...prev, name } : null));
  };
  
  // Update array state immutably
  const addItem = (item: string) => {
    setItems((prev) => [...prev, item]);
  };
  
  return <div>...</div>;
};
```

### 6.2 Derived State with useMemo

```typescript
import { useMemo } from 'react';

export const Component: React.FC<{ items: Item[] }> = ({ items }) => {
  // Expensive computation only runs when items change
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.title.localeCompare(b.title));
  }, [items]);
  
  const itemCount = useMemo(() => items.length, [items]);
  
  return (
    <div>
      <p>Total: {itemCount}</p>
      {sortedItems.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};
```

### 6.3 Callback Memoization

```typescript
import { useCallback } from 'react';

export const Parent: React.FC = () => {
  const [selected, setSelected] = useState<string>('');
  
  // Callback doesn't change on re-renders (prevents child re-renders)
  const handleSelect = useCallback((id: string) => {
    setSelected(id);
  }, []); // Empty deps = never changes
  
  // Callback with dependencies
  const handleSelectWithLog = useCallback((id: string) => {
    console.log('Previous:', selected);
    setSelected(id);
  }, [selected]); // Re-creates when selected changes
  
  return <Child onSelect={handleSelect} />;
};
```

---

## 7. Form Handling Patterns

### 7.1 Custom Form Hook

**File:** `src/hooks/useContactForm.ts`

```typescript
import { useCallback, useState } from 'react';
import { ContactFormData, ContactFormState } from '@/types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE = 1500;
const MIN_MESSAGE = 10;

/**
 * Validate form data
 * Returns object with field-specific errors
 */
function validate(values: ContactFormData) {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};
  
  if (!values.name.trim()) errors.name = 'Name is required';
  if (!values.email.trim()) errors.email = 'Email is required';
  else if (!EMAIL_REGEX.test(values.email)) errors.email = 'Invalid email';
  if (!values.message.trim()) errors.message = 'Message is required';
  else if (values.message.length < MIN_MESSAGE) errors.message = 'Too short';
  else if (values.message.length > MAX_MESSAGE) errors.message = 'Too long';
  
  return errors;
}

export interface UseContactFormOptions {
  onSuccess?: (result: ContactSubmitResult) => void;
  onError?: (error: string) => void;
}

/**
 * Custom hook for contact form state and validation
 * Handles all form logic in one place
 */
export function useContactForm(options: UseContactFormOptions = {}) {
  const [state, setState] = useState<ContactFormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '', // Honeypot field
    status: 'idle',
    errors: {},
  });

  // Update single field
  const update = useCallback(
    <K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) => {
      setState((s) => ({ ...s, [key]: value }));
    },
    [],
  );

  // Reset form
  const reset = useCallback(() => {
    setState({
      name: '',
      email: '',
      subject: '',
      message: '',
      company: '',
      status: 'idle',
      errors: {},
    });
  }, []);

  // Submit form
  const submit = useCallback(async () => {
    if (state.status === 'submitting') return;
    
    // Validation
    setState((s) => ({ ...s, status: 'validating' }));
    const errors = validate(state);
    if (Object.keys(errors).length) {
      setState((s) => ({ ...s, errors, status: 'error' }));
      return { ok: false, error: 'Validation failed' };
    }
    
    // Throttle check
    if (!canSubmit(state.email, COOLDOWN_MS)) {
      const err = 'Please wait before sending another message.';
      setState((s) => ({ ...s, status: 'error', errors: { email: err } }));
      return { ok: false, error: err };
    }
    
    // Submit
    setState((s) => ({ ...s, status: 'submitting', errors: {} }));
    const result = await submitContact(state);
    
    if (result.ok) {
      setState((s) => ({ ...s, status: 'success' }));
      options.onSuccess?.(result);
      setTimeout(() => reset(), 2000);
    } else {
      setState((s) => ({ ...s, status: 'error' }));
      options.onError?.(result.error || 'Unknown error');
    }
    
    return result;
  }, [state, options, reset]);

  return {
    state,
    update,
    submit,
    reset,
    isSubmitting: state.status === 'submitting',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
  };
}
```

**Usage in Component:**

```typescript
export const ContactForm: React.FC = () => {
  const { state, update, submit, isSubmitting, isSuccess } = useContactForm({
    onSuccess: () => console.log('Sent!'),
    onError: (err) => console.error(err),
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); submit(); }}>
      <input
        type="text"
        value={state.name}
        onChange={(e) => update('name', e.target.value)}
        aria-invalid={!!state.errors.name}
      />
      {state.errors.name && <span role="alert">{state.errors.name}</span>}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>
      
      {isSuccess && <div role="status">Message sent!</div>}
    </form>
  );
};
```

---

## 8. Animation Components

### 8.1 Scroll-Triggered Fade-In

**File:** `src/components/animations/FadeInOnScroll.tsx`

```typescript
import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface FadeInOnScrollProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  className?: string;
  stagger?: boolean;
  staggerDelay?: number;
}

/**
 * Fade-in animation triggered when element scrolls into view
 * Uses IntersectionObserver for performance
 * 
 * @example
 * <FadeInOnScroll direction="up" delay={0.2}>
 *   <h2>Title</h2>
 * </FadeInOnScroll>
 */
export const FadeInOnScroll = ({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 50,
  className = '',
  stagger = false,
  staggerDelay = 0.1,
}: FadeInOnScrollProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true, // Trigger once
    margin: '-10% 0px -10% 0px', // Trigger when 10% visible
  });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  const variants = {
    hidden: getInitialPosition(),
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1], // Custom cubic-bezier
        ...(stagger && {
          staggerChildren: staggerDelay,
          delayChildren: delay,
        }),
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Child component for staggered animations
 */
export const FadeInChild = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <motion.div variants={childVariants} className={className}>
      {children}
    </motion.div>
  );
};
```

**Usage:**

```typescript
<FadeInOnScroll direction="up" delay={0.2} stagger staggerDelay={0.15}>
  <FadeInChild><Card /></FadeInChild>
  <FadeInChild><Card /></FadeInChild>
  <FadeInChild><Card /></FadeInChild>
</FadeInOnScroll>
```

---

## 9. UI Component Library

### 9.1 Button Component with Variants

**File:** `src/components/ui/Button.tsx`

```typescript
import React from 'react';
import { ButtonProps } from '@/types';

/**
 * Reusable button component with variants
 * Optimized with React.memo to prevent unnecessary re-renders
 * 
 * @example
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Click me
 * </Button>
 */
export const Button: React.FC<ButtonProps> = React.memo(
  ({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    className = '',
    disabled = false,
    type = 'button',
  }) => {
    // Base styles shared across all variants
    const baseStyles =
      'font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';

    // Variant styles
    const variantStyles = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondary:
        'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white',
      outline: 'border-2 border-blue-600 hover:bg-blue-600 text-blue-600 hover:text-white',
    };

    // Size styles
    const sizeStyles = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-8 py-3',
      lg: 'px-10 py-4 text-lg',
    };

    // Disabled styles
    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : '';

    return (
      <button
        type={type}
        onClick={!disabled ? onClick : undefined}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
        disabled={disabled}
        aria-disabled={disabled}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
```

**Key Patterns:**
- ✅ React.memo for performance
- ✅ Variant system with style objects
- ✅ Tailwind class composition
- ✅ Accessibility attributes
- ✅ TypeScript props interface
- ✅ DisplayName for debugging

---

## 10. Utility Functions

### 10.1 Markdown Parser

**File:** `src/utils/markdownParser.ts`

```typescript
import matter from 'gray-matter';

export interface ParsedMarkdownContent {
  frontMatter: {
    title: string;
    date: string;
    category: string;
    description: string;
    tags: string[];
  };
  sections: {
    overview: string;
    keyLearnings: string[];
    achievements: string[];
  };
}

/**
 * Parse markdown file with YAML frontmatter
 * Extracts structured content from learning journey files
 * 
 * @param content - Raw markdown string
 * @returns Parsed frontmatter and sections
 */
export function parseMarkdownContent(content: string): ParsedMarkdownContent {
  const { data, content: markdown } = matter(content);

  const sections = parseMarkdownSections(markdown);

  return {
    frontMatter: {
      title: data.title || '',
      date: data.date || new Date().toISOString(),
      category: data.category || 'general',
      description: data.description || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
    },
    sections,
  };
}

/**
 * Parse markdown sections by headings
 */
function parseMarkdownSections(markdown: string): ParsedMarkdownContent['sections'] {
  const sections = {
    overview: '',
    keyLearnings: [],
    achievements: [],
  };

  // Split by heading 2 (##)
  const parts = markdown.split(/\n## /);

  for (const part of parts) {
    const [heading, ...content] = part.split('\n');
    const text = content.join('\n').trim();

    if (!text) continue;

    switch (heading.toLowerCase()) {
      case 'overview':
        sections.overview = text;
        break;
      case 'key learnings':
        sections.keyLearnings = parseListItems(text);
        break;
      case 'achievements':
        sections.achievements = parseListItems(text);
        break;
    }
  }

  return sections;
}

/**
 * Parse markdown list items
 */
function parseListItems(text: string): string[] {
  return text
    .split('\n')
    .filter((line) => line.trim().startsWith('-') || line.trim().startsWith('*'))
    .map((line) => line.replace(/^[-*]\s*/, '').trim());
}
```

---

## 11. Testing Patterns

### 11.1 Accessibility Testing

**File:** `src/__tests__/accessibility.test.tsx`

```typescript
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import App from '@/App';

expect.extend(toHaveNoViolations);

/**
 * Accessibility test suite
 * Uses axe-core to detect WCAG violations
 */
describe('Accessibility', () => {
  it('App has no detectable a11y violations', async () => {
    const { container } = render(<App />);
    
    const results = await axe(container, {
      rules: {
        // Disable color contrast for gradient text (manual verification)
        'color-contrast': { enabled: false },
      },
    });
    
    expect(results).toHaveNoViolations();
  });

  it('navigation is keyboard accessible', () => {
    const { getByRole } = render(<Navigation />);
    const nav = getByRole('navigation');
    const links = within(nav).getAllByRole('link');
    
    links.forEach((link) => {
      expect(link).toHaveAttribute('href');
      expect(link).not.toHaveAttribute('tabindex', '-1');
    });
  });
});
```

### 11.2 Component Testing

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>Click</Button>);
    
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies variant styles correctly', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByText('Primary')).toHaveClass('bg-blue-600');
    
    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByText('Outline')).toHaveClass('border-2');
  });
});
```

---

## 12. Build Tooling (Vite Plugins)

### 12.1 Virtual Module Plugin

**File:** `src/vite/contentDataPlugin.ts`

```typescript
import type { Plugin } from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

/**
 * Vite plugin to parse markdown content at build time
 * Creates virtual modules for importing content data
 * 
 * @example
 * import { projectsData } from 'virtual:content/projects';
 */
export function contentDataPlugin(): Plugin {
  const VIRTUAL_PREFIX = 'virtual:content/';
  const RESOLVED_PREFIX = '\0' + VIRTUAL_PREFIX;

  return {
    name: 'content-data-plugin',

    resolveId(id: string) {
      // Handle virtual module imports
      if (id.startsWith(VIRTUAL_PREFIX)) {
        return RESOLVED_PREFIX + id.slice(VIRTUAL_PREFIX.length);
      }
    },

    load(id: string) {
      // Parse content when virtual module is loaded
      if (id.startsWith(RESOLVED_PREFIX)) {
        const contentType = id.slice(RESOLVED_PREFIX.length);
        const contentDir = path.join(process.cwd(), 'content', contentType);

        try {
          const files = fs.readdirSync(contentDir);
          const content = files
            .filter((file) => file.endsWith('.md'))
            .map((file) => {
              const filePath = path.join(contentDir, file);
              const raw = fs.readFileSync(filePath, 'utf-8');
              const { data } = matter(raw);
              return { id: file.replace('.md', ''), ...data };
            });

          // Return as ES module
          return `export const ${contentType}Data = ${JSON.stringify(content)};`;
        } catch (error) {
          console.error(`Failed to load ${contentType}:`, error);
          return `export const ${contentType}Data = [];`;
        }
      }
    },

    handleHotUpdate({ file, server }) {
      // Hot reload when content files change
      if (file.includes('content/') && file.endsWith('.md')) {
        server.ws.send({ type: 'full-reload' });
      }
    },
  };
}
```

**Key Patterns:**
- ✅ Virtual module pattern (`virtual:*` prefix)
- ✅ Build-time content parsing
- ✅ Hot module replacement support
- ✅ Error handling with fallback
- ✅ TypeScript Plugin type

---

## 13. Performance Optimization

### 13.1 Lazy Loading Components

```typescript
import { lazy, Suspense } from 'react';

// Lazy load heavy components
const GitHubSection = lazy(() => import('@/components/sections/GitHubSection'));
const ProjectsSection = lazy(() => import('@/components/sections/ProjectsSection'));

export function App() {
  return (
    <div>
      <HeroSection /> {/* Loaded immediately */}
      
      <Suspense fallback={<Spinner />}>
        <GitHubSection /> {/* Loaded on demand */}
      </Suspense>
      
      <Suspense fallback={<Skeleton />}>
        <ProjectsSection />
      </Suspense>
    </div>
  );
}
```

### 13.2 Image Lazy Loading

```typescript
/**
 * Lazy image component with blur-up effect
 */
export const LazyImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative">
      {/* Blurred placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}
      
      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        loading="lazy" // Native lazy loading
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};
```

### 13.3 Virtualization Pattern

```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

/**
 * Virtual scrolling for large lists
 * Only renders visible items
 */
export const VirtualList: React.FC<{ items: Item[] }> = ({ items }) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100, // Estimated item height
  });

  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <Item data={items[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## 14. Accessibility Patterns

### 14.1 Keyboard Navigation

```typescript
/**
 * Button-like div with keyboard support
 * AVOID THIS - prefer <button> when possible
 */
export const InteractiveDiv: React.FC = () => {
  const handleActivate = () => console.log('Activated');

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleActivate();
        }
      }}
      aria-label="Custom action"
    >
      Click or press Enter
    </div>
  );
};
```

### 14.2 Focus Management

```typescript
import { useRef, useEffect } from 'react';

/**
 * Focus section heading after navigation
 * Improves screen reader experience
 */
export function focusSectionHeading(sectionId: string): void {
  const section = document.getElementById(sectionId);
  const heading = section?.querySelector('h1, h2, h3');

  if (heading instanceof HTMLElement) {
    heading.setAttribute('tabindex', '-1');
    heading.focus();
    
    // Remove tabindex after blur
    heading.addEventListener('blur', () => {
      heading.removeAttribute('tabindex');
    }, { once: true });
  }
}
```

### 14.3 Live Regions

```typescript
/**
 * Announce dynamic updates to screen readers
 */
export const StatusMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only" // Visually hidden
    >
      {message}
    </div>
  );
};

// Usage
<StatusMessage message={isLoading ? 'Loading...' : 'Loaded'} />
```

---

## 15. Type Definitions

### 15.1 Component Props

```typescript
// src/types/index.ts

import type { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  title: string;
  description: string;
  image?: string;
  gradient?: string;
  className?: string;
}
```

### 15.2 Data Models

```typescript
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  gradient: string;
  demoUrl?: string;
  sourceUrl?: string;
  image?: string;
}

export interface Skill {
  name: string;
  category: 'dev' | 'network' | 'data' | 'ai' | 'tools' | 'learning';
  proficiency: 'beginner' | 'intermediate' | 'advanced';
  icon?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  publishDate: string;
  readTime?: number;
  category?: string;
  tags?: string[];
  status: 'draft' | 'published' | 'coming-soon';
}
```

### 15.3 API Response Types

```typescript
export interface ApiResponse<T> {
  data: T;
  error: Error | null;
  loading: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  hasMore: boolean;
}

export interface ContactSubmitResult {
  ok: boolean;
  id?: string;
  error?: string;
  receivedAt: number;
}
```

---

## Quick Reference

### Common Patterns Summary

| Pattern | Location | Use Case |
|---------|----------|----------|
| **Section Component** | `components/sections/` | Full-page sections with animations |
| **UI Component** | `components/ui/` | Reusable buttons, cards, inputs |
| **Animation Wrapper** | `components/animations/` | Scroll-triggered animations |
| **Data Fetching Hook** | `hooks/use*.ts` | Async data with loading/error states |
| **Service Class** | `services/*.ts` | API calls with caching |
| **Form Hook** | `hooks/useContactForm.ts` | Form state + validation |
| **Utility Function** | `utils/*.ts` | Pure helper functions |
| **Virtual Module** | `vite/*.ts` | Build-time content parsing |
| **Accessibility Test** | `__tests__/accessibility.test.tsx` | axe-core testing |

### Import Patterns

```typescript
// React and hooks
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { ReactNode, FC } from 'react';

// Animation
import { motion, useInView } from 'framer-motion';

// Path aliases
import { Component } from '@/components/Component';
import { useHook } from '@/hooks/useHook';
import type { Type } from '@/types';

// Virtual modules
import { projectsData } from 'virtual:content/projects';
```

### Naming Conventions

- **Components:** `PascalCase.tsx` (HeroSection, Button)
- **Hooks:** `camelCase.ts` with `use*` prefix (useGitHub, useScrollTo)
- **Utilities:** `camelCase.ts` (markdownParser, iconColorGenerator)
- **Types:** `PascalCase` interfaces (Project, Skill, ButtonProps)
- **Files:** PascalCase for components, camelCase for utilities
- **Constants:** `SCREAMING_SNAKE_CASE` (MAX_RETRIES, API_BASE_URL)

---

**Revision History:**

| Date | Author | Changes |
|------|--------|---------|
| 2025-12-09 | Growth Journey Team | Initial version extracted from production codebase |

---

v1.0.0 | Active | Last Updated: Dec 09 2025 - 17:00
