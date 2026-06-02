import type { NotificationPreference, Priority } from './preference'
import { isWithinQuietHours } from '../utils/time'

export function computeEffectivePriority(pref: NotificationPreference): Priority {
  return pref.priority
}

export function shouldSendNow(pref: NotificationPreference, currentHour: number): boolean {
  const effective = computeEffectivePriority(pref)
  if (effective === 'urgent') return true
  if (pref.quietHours) {
    return !isWithinQuietHours(pref.quietHours, currentHour)
  }
  return true
}
