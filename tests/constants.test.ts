import { describe, expect, it } from 'vitest';
import { AGENTS, AGENT_PRESETS } from '../constants';

describe('constants', () => {
  it('should have 8 defined agents', () => {
    expect(Object.keys(AGENTS).length).toBe(8);
  });

  it('should have valid dynamic agent icons', () => {
    expect(AGENTS['DYNAMIC_1'].icon).toBe('Lightbulb');
    expect(AGENTS['DYNAMIC_2'].icon).toBe('Hammer');
    expect(AGENTS['DYNAMIC_3'].icon).toBe('ShieldCheck');
    expect(AGENTS['DYNAMIC_4'].icon).toBe('BrainCircuit');
  });

  it('should have standard presets defined', () => {
    expect(AGENT_PRESETS).toHaveProperty('Basic');
    expect(AGENT_PRESETS).toHaveProperty('Creative');
    expect(AGENT_PRESETS).toHaveProperty('Analytical');
    expect(AGENT_PRESETS).toHaveProperty('Practical');
  });
});
