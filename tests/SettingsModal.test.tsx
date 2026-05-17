import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { SettingsModal } from '../components/modals/SettingsModal';
import { describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

describe('SettingsModal', () => {
  const defaultProps = {
    showSettings: true,
    basePath: '/',
    settingsTab: 'synthesizer' as const,
    setSettingsTab: vi.fn(),
    synthTopP: 0.9,
    setSynthTopP: vi.fn(),
    synthTemp: 0.7,
    setSynthTemp: vi.fn(),
    synthFreqPenalty: 0,
    setSynthFreqPenalty: vi.fn(),
    synthTopK: 40,
    setSynthTopK: vi.fn(),
    isWebSearchEnabled: false,
    setIsWebSearchEnabled: vi.fn(),
    activeAgents: [],
    setActiveAgents: vi.fn(),
    customSavedPresets: {},
    setCustomSavedPresets: vi.fn(),
    agentPresetSelections: {},
    setAgentPresetSelections: vi.fn(),
    customInstructions: {},
    setCustomInstructions: vi.fn(),
    isSavingPreset: false,
    setIsSavingPreset: vi.fn(),
    newPresetName: '',
    setNewPresetName: vi.fn(),
    saveCustomPreset: vi.fn(),
    isDebugMode: false,
    setIsDebugMode: vi.fn(),
    collaborationMode: 'parallel' as const,
    setCollaborationMode: vi.fn(),
    debateRounds: 1,
    setDebateRounds: vi.fn(),
    desiredOutputFormat: 'markdown' as const,
    setDesiredOutputFormat: vi.fn(),
  };

  it('renders settings modal when showSettings is true', () => {
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
        <SettingsModal {...defaultProps} />
      </BrowserRouter>
    );
    expect(screen.getByText('Orchestrator Settings')).toBeInTheDocument();
  });

  it('does not render when showSettings is false', () => {
    render(
      <BrowserRouter>
        <SettingsModal {...defaultProps} showSettings={false} />
      </BrowserRouter>
    );
    expect(screen.queryByText('Orchestrator Settings')).not.toBeInTheDocument();
  });
});
