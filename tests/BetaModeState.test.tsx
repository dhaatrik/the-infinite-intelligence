import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BetaModeState } from '../components/BetaModeState';
import { describe, expect, it } from 'vitest';

describe('BetaModeState', () => {
  it('renders beta mode initial state', () => {
    render(<BetaModeState />);
    expect(screen.getByText('Agent Forge / Beta')).toBeInTheDocument();
  });
});
