import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { AgentPresetsSidebar } from '../components/modals/AgentPresetsSidebar';
import { describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

describe('AgentPresetsSidebar', () => {
  it('does not render when isOpen is false', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(
      <BrowserRouter>
        <AgentPresetsSidebar 
          showAgentPresets={false}
          basePath="/"
          customSavedPresets={{}}
          setActiveAgents={vi.fn()}
          setEditingPreset={vi.fn()}
          setCustomSavedPresets={vi.fn()}
        />
      </BrowserRouter>
    );
    expect(screen.queryByText('Agent Presets')).not.toBeInTheDocument();
  });

  it('renders presets container', () => {
    render(
      <BrowserRouter>
        <AgentPresetsSidebar 
          showAgentPresets={true}
          basePath="/"
          customSavedPresets={{}}
          setActiveAgents={vi.fn()}
          setEditingPreset={vi.fn()}
          setCustomSavedPresets={vi.fn()}
        />
      </BrowserRouter>
    );
    expect(screen.getByText('Agent Presets')).toBeInTheDocument();
  });
});
