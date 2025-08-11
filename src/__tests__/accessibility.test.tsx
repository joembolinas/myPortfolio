import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from '@/App';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('App has no detectable a11y violations initially', async () => {
    const { container } = render(<App />);
    const results = await axe(container, {
      rules: {
        // Allow color contrast for dynamic gradient text to be manually verified
        'color-contrast': { enabled: false }
      }
    });
    expect(results).toHaveNoViolations();
  });
});
