import { describe, it, expect, vi } from 'vitest'
import { formatMessageTime } from './utils'

describe('formatMessageTime', () => {
  it('returns the time string from date', () => {
    // stub toLocaleTimeString to be deterministic
    const original = Date.prototype.toLocaleTimeString
    Date.prototype.toLocaleTimeString = function () { return '10:05 AM' }

    const result = formatMessageTime('2025-01-01T10:05:00Z')
    expect(result).toBe('10:05 AM')

    Date.prototype.toLocaleTimeString = original
  })
})
