export type Channel = 'email' | 'sms' | 'push'
export type Priority = 'low' | 'medium' | 'urgent'

export type QuietHours = {
  startHour: number   // 0–23, inclusive
  endHour: number     // 0–23, inclusive
}

export type NotificationPreference = {
  userId: string
  channel: Channel
  priority: Priority
  quietHours?: QuietHours
  priorityOverride?: string   // Bug 1: should be Priority, not string
}

export type PreferenceResult = {
  userId: string
  channel: Channel
  effectivePriority: Priority
  willSendNow: boolean
  reason: string
}
