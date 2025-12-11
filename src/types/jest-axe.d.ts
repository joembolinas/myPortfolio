/**
 * Type declarations for jest-axe
 * Provides type safety for accessibility testing utilities
 */
declare module 'jest-axe' {
  import { AxeResults } from 'axe-core';

  export function axe(
    html: Element | string,
    options?: any
  ): Promise<AxeResults>;

  export const toHaveNoViolations: {
    toHaveNoViolations(results: AxeResults): {
      pass: boolean;
      message: () => string;
    };
  };
}
