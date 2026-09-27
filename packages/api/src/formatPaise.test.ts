import { describe, expect, it } from 'vitest';
import { formatPaise } from './formatPaise';

describe('formatPaise', () => {
  it('formats whole rupees correctly', () => {
    expect(formatPaise(129900)).toMatch(/₹\s?1,299/);
    expect(formatPaise(0)).toMatch(/₹\s?0/);
  });

  it('formats paise with decimals correctly', () => {
    expect(formatPaise(129950)).toMatch(/₹\s?1,299\.50/);
  });

  it('handles null, undefined, and NaN gracefully', () => {
    expect(formatPaise(null)).toBe('₹0');
    expect(formatPaise(undefined)).toBe('₹0');
    expect(formatPaise(NaN)).toBe('₹0');
  });
});
