import { useCallback, useState } from 'react';
import { ContactFormData, ContactFormState, ContactSubmitResult } from '@/types';
import { submitContact, canSubmit } from '@/services/contactService';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE = 1500;
const MIN_MESSAGE = 10;
const COOLDOWN_MS = 30_000;

function validate(values: ContactFormData) {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};
  if (!values.name.trim()) errors.name = 'Name is required';
  if (!values.email.trim()) errors.email = 'Email is required';
  else if (!EMAIL_REGEX.test(values.email)) errors.email = 'Invalid email';
  if (!values.message.trim()) errors.message = 'Message is required';
  else if (values.message.length < MIN_MESSAGE) errors.message = 'Too short';
  else if (values.message.length > MAX_MESSAGE) errors.message = 'Too long';
  if (values.subject && values.subject.length > 120) errors.subject = 'Subject too long';
  return errors;
}

export interface UseContactFormOptions {
  onSuccess?: (r: ContactSubmitResult) => void;
  onError?: (err: string) => void;
}

export function useContactForm(opts: UseContactFormOptions = {}) {
  const [state, setState] = useState<ContactFormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
    status: 'idle',
    errors: {},
  });

  const update = useCallback(<K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) => {
    setState((s) => ({ ...s, [key]: value }));
  }, []);

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

  const submit = useCallback(async () => {
    if (state.status === 'submitting') return;
    setState((s) => ({ ...s, status: 'validating' }));
    const errors = validate(state);
    if (Object.keys(errors).length) {
      setState((s) => ({ ...s, errors, status: 'error' }));
      return { ok: false, error: 'Validation failed', receivedAt: Date.now() } as ContactSubmitResult;
    }
    if (!canSubmit(state.email, COOLDOWN_MS)) {
      const err = 'Please wait before sending another message.';
      setState((s) => ({ ...s, status: 'error', errors: { email: err } }));
      return { ok: false, error: err, receivedAt: Date.now() } as ContactSubmitResult;
    }
    setState((s) => ({ ...s, status: 'submitting', errors: {} }));
    const { company, ...payload } = state; // Exclude honeypot if empty
    const res = await submitContact(payload as ContactFormData);
    if (res.ok) {
      setState((s) => ({ ...s, status: 'success' }));
      opts.onSuccess?.(res);
      setTimeout(() => reset(), 2000);
    } else {
      setState((s) => ({ ...s, status: 'error' }));
      opts.onError?.(res.error || 'Unknown error');
    }
    return res;
  }, [state, opts, reset]);

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
