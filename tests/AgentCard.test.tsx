import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { AgentCard } from '../components/AgentCard';
import { AgentStatus } from '../types';
import { AGENTS } from '../constants';
import { describe, expect, it } from 'vitest';

describe('AgentCard', () => {
  const mockAgent = AGENTS['LOGOS'];

  it('renders agent name and role', () => {
    render(
      <AgentCard 
        agent={mockAgent} 
        status={AgentStatus.IDLE} 
        content="" 
      />
    );
    expect(screen.getByText('Logos')).toBeInTheDocument();
    expect(screen.getByText('The Analyst')).toBeInTheDocument();
  });

  it('displays loading state when thinking', () => {
    render(
      <AgentCard 
        agent={mockAgent} 
        status={AgentStatus.THINKING} 
        content="" 
      />
    );
    expect(screen.getByText('Thinking...')).toBeInTheDocument();
  });

  it('renders markdown content when completed', () => {
    render(
      <AgentCard 
        agent={mockAgent} 
        status={AgentStatus.COMPLETED} 
        content="**Success**" 
      />
    );
    expect(screen.getByText('Success')).toBeInTheDocument();
  });
});
