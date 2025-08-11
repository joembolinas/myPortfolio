import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useContactForm } from '../useContactForm';

// Mock the contact service
vi.mock('@/services/contactService', () => ({
  submitContact: vi.fn(() =>
    Promise.resolve({ ok: true, message: 'Success', receivedAt: Date.now() }),
  ),
  canSubmit: vi.fn(() => true),
}));

describe('useContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty form state', () => {
    const { result } = renderHook(() => useContactForm());

    expect(result.current.state.name).toBe('');
    expect(result.current.state.email).toBe('');
    expect(result.current.state.subject).toBe('');
    expect(result.current.state.message).toBe('');
    expect(result.current.state.company).toBe('');
    expect(result.current.state.status).toBe('idle');
    expect(result.current.state.errors).toEqual({});
  });

  it('should update form fields correctly', () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.update('name', 'John Doe');
      result.current.update('email', 'john@example.com');
    });

    expect(result.current.state.name).toBe('John Doe');
    expect(result.current.state.email).toBe('john@example.com');
  });

  it('should validate required fields', async () => {
    const { result } = renderHook(() => useContactForm());

    // Try to submit empty form
    await act(async () => {
      await result.current.submit();
    });

    expect(result.current.state.errors.name).toBeDefined();
    expect(result.current.state.errors.email).toBeDefined();
    expect(result.current.state.errors.message).toBeDefined();
    expect(result.current.state.status).toBe('error');
  });

  it('should validate email format', async () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.update('name', 'John Doe');
      result.current.update('email', 'invalid-email');
      result.current.update('message', 'Test message');
    });

    await act(async () => {
      await result.current.submit();
    });

    expect(result.current.state.errors.email).toContain('valid email');
  });

  it('should validate message length', async () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.update('name', 'John Doe');
      result.current.update('email', 'john@example.com');
      result.current.update('message', 'Hi'); // Too short
    });

    await act(async () => {
      await result.current.submit();
    });

    expect(result.current.state.errors.message).toContain('10 characters');
  });

  it('should reset form after successful submission', async () => {
    const { result } = renderHook(() => useContactForm());

    // Fill form with valid data
    act(() => {
      result.current.update('name', 'John Doe');
      result.current.update('email', 'john@example.com');
      result.current.update('message', 'This is a test message that is long enough');
    });

    // Submit form
    await act(async () => {
      await result.current.submit();
    });

    expect(result.current.state.status).toBe('success');

    // Wait for auto-reset (2 seconds)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2100));
    });

    expect(result.current.state.name).toBe('');
    expect(result.current.state.email).toBe('');
    expect(result.current.state.message).toBe('');
    expect(result.current.state.status).toBe('idle');
  });

  it('should provide correct convenience flags', () => {
    const { result } = renderHook(() => useContactForm());

    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(false);

    act(() => {
      result.current.state.status = 'submitting';
    });

    // Need to trigger a re-render by updating state properly
    act(() => {
      result.current.update('name', 'Test');
    });
  });
});
