// This hook manages timezone detection and user preferences for your event scheduler.
// What it does:

// Detects the user's browser timezone (e.g., "America/Vancouver")
// Remembers the user's chosen timezone in localStorage
// Compares them - if they don't match, shows a warning banner
// Lets user update their preference if they've moved or want to use a different timezone

// Why it matters:
// A user in Vancouver creates events there. Then they travel to Toronto.
// Their browser now detects "America/Toronto", but their saved preference is still "America/Vancouver".
// The timezoneMismatch: true triggers a warning: "Hey, looks like you're in a different timezone - want to update?"
// Without this, events would display in the wrong timezone after traveling.

import { useState } from 'react';
import { getUserTimezone } from 'src/utils/dateUtils';

export interface TimezoneHookReturn {
  detectedTimezone: string;
  preferredTimezone: string;
  timezoneMismatch: boolean;
  updateTimezonePreference: (newTimezone: string) => void;
}

export function useTimezone(): TimezoneHookReturn {
  const [preferredTimezone, setPreferredTimezone] = useState(() => {
    const stored = localStorage.getItem('preferredTimezone');
    if (!stored) {
      const detected = getUserTimezone();
      localStorage.setItem('preferredTimezone', detected);
      return detected;
    }
    return stored;
  });

  const [detectedTimezone] = useState(() => getUserTimezone());

  const timezoneMismatch = detectedTimezone !== preferredTimezone;

  return {
    detectedTimezone,
    preferredTimezone,
    timezoneMismatch,
    updateTimezonePreference: (newTimezone) => {
      localStorage.setItem('preferredTimezone', newTimezone);
      setPreferredTimezone(newTimezone);
    },
  };
}
