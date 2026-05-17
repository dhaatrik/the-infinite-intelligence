import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatTurn } from '../components/ChatTurn';
import { describe, expect, it, vi } from 'vitest';
import { AgentId, ProcessingState } from '../types';

describe('ChatTurn', () => {
  const mockTurn = {
    id: '1',
    prompt: 'Hello there',
    agentResults: [],
    dynamicAgents: [],
    agentOutputs: {} as Record<AgentId, any>,
    processingState: { step: 'DONE' },
    finalOutput: 'This is the final response.',
    timestamp: Date.now()
  };

  const mockProcessingState: ProcessingState = {
    isProcessing: false,
    step: 'DONE'
  };

  it('renders prompt and final output', () => {
    render(
      <ChatTurn 
        turn={mockTurn as any} 
        turns={[mockTurn as any]}
        agentResults={{} as any}
        processingState={mockProcessingState}
        setProcessingState={vi.fn()}
        isHitlEnabled={false}
        activeAgentTab=""
        setActiveAgentTab={vi.fn()}
        agentViewMode="grid"
        handleFeedback={vi.fn()}
        handleFinalFeedback={vi.fn()}
        handleActiveFinalFeedback={vi.fn()}
        finalOutput="This is the final response."
        isFinalOutputStreaming={false}
        finalCopied={false}
        setFinalCopied={vi.fn()}
        isSpeaking={false}
        exportToPDF={vi.fn()}
        exportToMarkdown={vi.fn()}
        exportToJSON={vi.fn()}
        toggleSpeech={vi.fn()}
        branchConversation={vi.fn()}
        setViewingTurn={vi.fn()}
        setEditingTurnId={vi.fn()}
        setEditingTitle={vi.fn()}
        editingTurnId={null}
        editingTitle=""
        saveTurnTitle={vi.fn()}
        resumeSynthesis={vi.fn()}
        finalRef={{ current: null }}
        reportRef={{ current: null }}
      />
    );
    expect(screen.getByText('Hello there')).toBeInTheDocument();
    expect(screen.getByText('This is the final response.')).toBeInTheDocument();
  });

  it('calls export functions when buttons are clicked', () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    
    const mockPDF = vi.fn();
    const mockMarkdown = vi.fn();
    const mockJSON = vi.fn();

    render(
      <ChatTurn 
        turn={mockTurn as any} 
        turns={[mockTurn as any]}
        agentResults={{} as any}
        processingState={mockProcessingState}
        setProcessingState={vi.fn()}
        isHitlEnabled={false}
        activeAgentTab=""
        setActiveAgentTab={vi.fn()}
        agentViewMode="grid"
        handleFeedback={vi.fn()}
        handleFinalFeedback={vi.fn()}
        handleActiveFinalFeedback={vi.fn()}
        finalOutput="This is the final response."
        isFinalOutputStreaming={false}
        finalCopied={false}
        setFinalCopied={vi.fn()}
        isSpeaking={false}
        exportToPDF={mockPDF}
        exportToMarkdown={mockMarkdown}
        exportToJSON={mockJSON}
        toggleSpeech={vi.fn()}
        branchConversation={vi.fn()}
        setViewingTurn={vi.fn()}
        setEditingTurnId={vi.fn()}
        setEditingTitle={vi.fn()}
        editingTurnId={null}
        editingTitle=""
        saveTurnTitle={vi.fn()}
        resumeSynthesis={vi.fn()}
        finalRef={{ current: null }}
        reportRef={{ current: null }}
      />
    );

    const buttons = screen.getAllByRole('button');
    buttons.forEach(btn => fireEvent.click(btn));
    expect(mockPDF).toHaveBeenCalled();
    expect(mockMarkdown).toHaveBeenCalled();
    expect(mockJSON).toHaveBeenCalled();
  });
});
