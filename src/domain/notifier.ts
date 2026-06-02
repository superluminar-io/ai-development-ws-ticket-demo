import type { NotificationPreference, Priority } from './preference'
import { isWithinQuietHours } from '../utils/time'

export function computeEffectivePriority(pref: NotificationPreference): Priority {
  if (pref.priorityOverride) {
    return pref.priorityOverride as Priority   // Bug 2: activates even when pref.priority is already 'urgent'
  }
  return pref.priority
}

export function shouldSendNow(pref: NotificationPreference, currentHour: number): boolean {
  if (pref.priority === 'urgent') return true   // Bug 3: checks pref.priority, not computeEffectivePriority
  if (pref.quietHours) {
    return !isWithinQuietHours(pref.quietHours, currentHour)
  }
  return true
}
