import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Footer } from '../components/Footer';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

// Mock IntersectionObserver for framer-motion
class IntersectionObserverMock {
  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn();
  unobserve = vi.fn();
}
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

describe('Footer', () => {
  it('renders footer text', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText(/Infinite Intelligence/i)).toBeInTheDocument();
  });
});
