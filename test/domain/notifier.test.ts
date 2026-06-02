import { describe, it, expect } from 'vitest'
import { shouldSendNow, computeEffectivePriority } from '../../src/domain/notifier'
import type { NotificationPreference } from '../../src/domain/preference'

const base: NotificationPreference = {
  userId: 'U-001',
  channel: 'email',
  priority: 'low',
}

describe('computeEffectivePriority', () => {
  it('returns the preference priority', () => {
    expect(computeEffectivePriority(base)).toBe('low')
  })

  it('returns urgent for urgent preferences', () => {
    expect(computeEffectivePriority({ ...base, priority: 'urgent' })).toBe('urgent')
  })
})

describe('shouldSendNow', () => {
  it('sends urgent notifications immediately', () => {
    expect(shouldSendNow({ ...base, priority: 'urgent' }, 3)).toBe(true)
  })

  it('sends when no quiet hours are set', () => {
    expect(shouldSendNow(base, 14)).toBe(true)
  })

  it('suppresses during overnight quiet hours', () => {
    const pref: NotificationPreference = {
      ...base,
      quietHours: { startHour: 22, endHour: 8 },
    }
    expect(shouldSendNow(pref, 2)).toBe(false)   // 2am is within 22–8
  })

  it('sends outside overnight quiet hours', () => {
    const pref: NotificationPreference = {
      ...base,
      quietHours: { startHour: 22, endHour: 8 },
    }
    expect(shouldSendNow(pref, 14)).toBe(true)   // 2pm is outside 22–8
  })

  it('urgent bypasses quiet hours', () => {
    const pref: NotificationPreference = {
      ...base,
      priority: 'urgent',
      quietHours: { startHour: 22, endHour: 8 },
    }
    expect(shouldSendNow(pref, 2)).toBe(true)   // urgent ignores quiet hours
  })

  it('handles same-day quiet hours range', () => {
    const pref: NotificationPreference = {
      ...base,
      quietHours: { startHour: 9, endHour: 17 },
    }
    expect(shouldSendNow(pref, 12)).toBe(false)   // noon is within 9–17
    expect(shouldSendNow(pref, 20)).toBe(true)    // 8pm is outside 9–17
  })
})
