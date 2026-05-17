import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { EditPresetModal } from '../components/modals/EditPresetModal';
import { describe, expect, it, vi } from 'vitest';

describe('EditPresetModal', () => {
  it('does not render when editingPreset is null', () => {
    render(
      <EditPresetModal 
        editingPreset={null}
        setEditingPreset={vi.fn()}
        setCustomSavedPresets={vi.fn()}
      />
    );
    expect(screen.queryByText('Edit Preset')).not.toBeInTheDocument();
  });

  it('renders correctly when editingPreset is provided', () => {
    const preset = {
      name: 'Test Preset',
      description: 'Test description',
      instructions: {}
    };

    render(
      <EditPresetModal 
        editingPreset={preset as any}
        setEditingPreset={vi.fn()}
        setCustomSavedPresets={vi.fn()}
      />
    );
    expect(screen.getByDisplayValue('Test Preset')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test description')).toBeInTheDocument();
  });
});
