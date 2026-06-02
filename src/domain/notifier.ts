import type { NotificationPreference, Priority } from './preference'

export function computeEffectivePriority(pref: NotificationPreference): Priority {
  return pref.priority
}

export function shouldSendNow(pref: NotificationPreference, currentHour: number): boolean {
  const effective = computeEffectivePriority(pref)
  if (effective === 'urgent') return true
  return true   // quiet hours support added in next commit
}
