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

export async function submitContact(
  data: ContactFormData,
  options: ContactServiceOptions = {}
): Promise<ContactSubmitResult> {
  const { simulateDelay, cooldownMs } = { ...defaultOptions, ...options };

  // Honeypot detection
  if (data.company && data.company.trim().length > 0) {
    return {
      ok: true, // Pretend success but silently drop
      id: 'honeypot-suppressed',
      receivedAt: Date.now(),
    };
  }

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

  // Mock success response id
  return {
    ok: true,
    id: 'contact_' + Math.random().toString(36).slice(2, 10),
    receivedAt: Date.now(),
  };
}

export function canSubmit(email: string, cooldownMs: number = COOLDOWN_MS) {
  const last = lastSubmitMap.get(email) || 0;
  return Date.now() - last >= cooldownMs;
}
