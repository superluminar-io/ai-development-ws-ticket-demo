import { describe, it, expect } from 'vitest'
import { updatePreference } from '../../src/handlers/updatePreference'

describe('updatePreference', () => {
  it('returns undefined when userId is missing', () => {
    expect(updatePreference({ channel: 'email', priority: 'low' })).toBeUndefined()
  })

  it('returns undefined when channel is missing', () => {
    expect(updatePreference({ userId: 'U-001', priority: 'low' })).toBeUndefined()
  })

  it('returns undefined when priority is missing', () => {
    expect(updatePreference({ userId: 'U-001', channel: 'email' })).toBeUndefined()
  })

  it('processes a valid low-priority email preference', () => {
    const result = updatePreference({
      userId: 'U-001',
      channel: 'email',
      priority: 'low',
    })
    expect(result).toBeDefined()
    expect(result?.userId).toBe('U-001')
    expect(result?.channel).toBe('email')
    expect(result?.effectivePriority).toBe('low')
    expect(result?.willSendNow).toBe(true)
  })

  it('sends urgent notifications even with all-day quiet hours', () => {
    const result = updatePreference({
      userId: 'U-002',
      channel: 'sms',
      priority: 'urgent',
      quietHours: { startHour: 0, endHour: 23 },
    })
    expect(result?.willSendNow).toBe(true)
    expect(result?.effectivePriority).toBe('urgent')
  })
})
