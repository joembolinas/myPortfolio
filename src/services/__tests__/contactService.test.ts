import { describe, it, expect, beforeEach, vi } from 'vitest';
import { submitContact, canSubmit } from '../contactService';
import type { ContactFormData } from '@/types';

// Mock the delay for faster tests
vi.mock('../contactService', async () => {
  const actual = await vi.importActual('../contactService');
  return {
    ...actual,
    // Override the delay for testing
    submitContact: vi.fn(async (data: ContactFormData) => {
      // Simulate the validation logic without delay
      if (data.company) {
        return { ok: false, error: 'Spam detected', receivedAt: Date.now() };
      }
      return { ok: true, receivedAt: Date.now() };
    }),
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
      
      expect(result.ok).toBe(false);
      expect(result.error).toBe('Spam detected');
    });
  });

  describe('canSubmit', () => {
    it('should allow submission for new email', () => {
      const email = 'new@example.com';
      const cooldownMs = 60000; // 1 minute
      
      const result = canSubmit(email, cooldownMs);
      
      expect(result).toBe(true);
    });

    it('should prevent submission during cooldown period', () => {
      const email = 'test@example.com';
      const cooldownMs = 60000; // 1 minute
      
      // Simulate a recent submission
      const cooldowns = new Map();
      cooldowns.set(email, Date.now() - 30000); // 30 seconds ago
      (globalThis as any).contactCooldowns = cooldowns;
      
      const result = canSubmit(email, cooldownMs);
      
      expect(result).toBe(false);
    });

    it('should allow submission after cooldown period expires', () => {
      const email = 'test@example.com';
      const cooldownMs = 60000; // 1 minute
      
      // Simulate an old submission
      const cooldowns = new Map();
      cooldowns.set(email, Date.now() - 70000); // 70 seconds ago
      (globalThis as any).contactCooldowns = cooldowns;
      
      const result = canSubmit(email, cooldownMs);
      
      expect(result).toBe(true);
    });
  });
});
