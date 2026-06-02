# Notification Preferences Service

A TypeScript service for managing user notification preferences — channel selection, priority levels, and quiet hours.

## Scripts

```bash
npm test          # run all tests
npm run typecheck # TypeScript strict check
```

## Domain

A `NotificationPreference` defines how and when a user receives notifications:
- **channel**: `email`, `sms`, or `push`
- **priority**: `low`, `medium`, or `urgent`
- **quietHours**: optional time window during which non-urgent notifications are suppressed
