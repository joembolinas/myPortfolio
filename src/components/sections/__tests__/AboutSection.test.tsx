import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AboutSection } from '../AboutSection';

describe('AboutSection', () => {
  it('renders the main heading', () => {
    render(<AboutSection />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });
});
