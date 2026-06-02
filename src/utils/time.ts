import type { QuietHours } from '../domain/preference'

export function isWithinQuietHours(quietHours: QuietHours, currentHour: number): boolean {
  const { startHour, endHour } = quietHours
  if (startHour <= endHour) {
    return currentHour >= startHour && currentHour <= endHour
  }
  // Overnight range (e.g. 22–8)
  return currentHour >= startHour || currentHour <= endHour
}
