import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputArea } from '../components/InputArea';
import { describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

describe('InputArea', () => {
  it('calls onSubmit with input text', () => {
    const handleSubmit = vi.fn();
    render(
      <BrowserRouter>
        <InputArea onSend={handleSubmit} disabled={false} />
      </BrowserRouter>
    );
    
    const input = screen.getByPlaceholderText(/Ask the Infinite Intelligence/i);
    fireEvent.change(input, { target: { value: 'Test prompt' } });
    
    const buttons = screen.getAllByRole('button');
    const submitBtn = buttons[buttons.length - 1]; // Send button
    
    if (submitBtn) {
      fireEvent.click(submitBtn);
    }
    
    expect(handleSubmit).toHaveBeenCalledWith('Test prompt');
    expect(input).toHaveValue('');
  });

  it('disables input when disabled is true', () => {
    const handleSubmit = vi.fn();
    render(
      <BrowserRouter>
        <InputArea onSend={handleSubmit} disabled={true} />
      </BrowserRouter>
    );
    
    const input = screen.getByPlaceholderText(/Ask the Infinite Intelligence/i);
    expect(input).toBeDisabled();
    
    // Last button is submit btn
    const buttons = screen.getAllByRole('button');
    expect(buttons[buttons.length - 1]).toBeDisabled();
  });
});
