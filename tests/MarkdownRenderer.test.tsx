import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { describe, expect, it } from 'vitest';

describe('MarkdownRenderer', () => {
  it('renders markdown content correctly', () => {
    render(<MarkdownRenderer content="# Hello World" />);
    const heading = screen.getByText('Hello World');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H1');
  });

  it('renders bold and italic text', () => {
    render(<MarkdownRenderer content="**bold** and *italic*" />);
    expect(screen.getByText('bold').tagName).toBe('STRONG');
    expect(screen.getByText('italic').tagName).toBe('EM');
  });
});
