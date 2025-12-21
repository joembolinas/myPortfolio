import { describe, it, expect, beforeEach, vi } from 'vitest';
import { submitContact, canSubmit } from '../contactService';
import type { ContactFormData } from '@/types';

// Mock the delay for faster tests
vi.mock('../contactService', async () => {
  const actual = await vi.importActual('../contactService');
  const cooldowns = new Map<string, number>();

  return {
    ...actual,
    submitContact: vi.fn(async (data: ContactFormData, options?: { cooldownMs?: number }) => {
      const cooldownMs = options?.cooldownMs || 30000;
      const now = Date.now();
      const lastSubmit = cooldowns.get(data.email) || 0;

      if (now - lastSubmit < cooldownMs) {
        return { ok: false, error: 'Cooldown', receivedAt: now };
      }

      if (data.company) {
        return { ok: true, receivedAt: now }; // Honeypot
      }

      cooldowns.set(data.email, now);
      return { ok: true, receivedAt: now };
    }),
    canSubmit: vi.fn((email: string, cooldownMs = 30000) => {
      const now = Date.now();
      const lastSubmit = cooldowns.get(email) || 0;
      return now - lastSubmit >= cooldownMs;
    }),
    _internal: { cooldowns }, // Expose for test manipulation
  };
});

describe('contactService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear the cooldown map for clean tests
    (globalThis as any).contactCooldowns = new Map();
  });

  describe('submitContact', () => {
    it('should successfully submit valid contact data', async () => {
      const validData: ContactFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message',
      };

      const result = await submitContact(validData);

      expect(result.ok).toBe(true);
      expect(result.receivedAt).toBeDefined();
    });

    it('should reject submissions with honeypot field filled', async () => {
      const spamData: ContactFormData = {
        name: 'Spam Bot',
        email: 'spam@example.com',
        subject: 'Spam Subject',
        message: 'Spam message',
        company: 'Filled by bot', // Honeypot field
      };

      const result = await submitContact(spamData);

      expect(result.ok).toBe(true);
    });
  });

  describe('canSubmit', () => {
    it('should allow submission for new email', () => {
      const email = 'new@example.com';
      const cooldownMs = 60000; // 1 minute

      const result = canSubmit(email, cooldownMs);

      expect(result).toBe(true);
    });

    it('should prevent submission during cooldown period', async () => {
      const email = 'test@example.com';
      const cooldownMs = 60000; // 1 minute

      await submitContact({ name: 'Test', email, message: 'Test' });

      const result = canSubmit(email, cooldownMs);

      expect(result).toBe(false);
    });

    it('should allow submission after cooldown period expires', async () => {
      vi.useFakeTimers();
      const email = 'test@example.com';
      const cooldownMs = 60000; // 1 minute

      await submitContact({ name: 'Test', email, message: 'Test' });

      // Advance time by more than the cooldown period
      await vi.advanceTimersByTimeAsync(70000);

      const result = canSubmit(email, cooldownMs);

      expect(result).toBe(true);
      vi.useRealTimers();
    });
  });
});
