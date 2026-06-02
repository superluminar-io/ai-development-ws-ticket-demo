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
})
