import type { NotificationPreference, PreferenceResult } from '../domain/preference'
import { computeEffectivePriority, shouldSendNow } from '../domain/notifier'

export function updatePreference(input: Record<string, unknown>): PreferenceResult | undefined {
  if (!input.userId || !input.channel || !input.priority) {
    return undefined
  }

  const pref: NotificationPreference = {
    userId: String(input.userId),
    channel: input.channel as NotificationPreference['channel'],
    priority: input.priority as NotificationPreference['priority'],
    quietHours: input.quietHours as NotificationPreference['quietHours'],
    priorityOverride: input.priorityOverride !== undefined ? String(input.priorityOverride) : undefined,
  }

  const currentHour = new Date().getHours()
  const effectivePriority = computeEffectivePriority(pref)
  const willSendNow = shouldSendNow(pref, currentHour)

  return {
    userId: pref.userId,
    channel: pref.channel,
    effectivePriority,
    willSendNow,
    reason: willSendNow
      ? `Sending via ${pref.channel} (priority: ${effectivePriority})`
      : `Suppressed — within quiet hours (priority: ${effectivePriority})`,
  }
}
