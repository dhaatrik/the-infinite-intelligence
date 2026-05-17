import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Header } from '../components/Header';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

describe('Header', () => {
  it('renders title', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByText(/The Infinite/i)).toBeInTheDocument();
  });
});
