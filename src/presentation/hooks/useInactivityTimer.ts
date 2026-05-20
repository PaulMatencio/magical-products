import { useEffect, useState, useRef } from 'react';
import appConfig from '../../config/appConfig';
import { anonymousActivityService } from '../../services/anonymousActivityService';

export function useInactivityTimer(user: any) {
  const [lastActivity, setLastActivity] = useState<number>(() => {
    const saved = localStorage.getItem('last_activity_timestamp');
    if (saved) return parseInt(saved, 10);
    const now = Date.now();
    localStorage.setItem('last_activity_timestamp', now.toString());
    return now;
  });

  const lastActivityRef = useRef<number>(lastActivity);
  const lastAnonymousActivitySyncRef = useRef<number>(0);
  const userRef = useRef<any>(user);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  const updateActivity = () => {
    const now = Date.now();
    setLastActivity(now);
    lastActivityRef.current = now;
    localStorage.setItem('last_activity_timestamp', now.toString());

    const currentUser = userRef.current;
    if (currentUser?.is_anonymous) {
      const minSyncGapMs = Math.max(60, appConfig.inactivityCheckIntervalSeconds) * 1000;
      if (now - lastAnonymousActivitySyncRef.current >= minSyncGapMs) {
        lastAnonymousActivitySyncRef.current = now;
        anonymousActivityService.recordActivity(currentUser.id);
      }
    }
  };

  useEffect(() => {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'mousemove'];
    const handler = () => updateActivity();
    events.forEach(event => window.addEventListener(event, handler));

    return () => {
      events.forEach(event => window.removeEventListener(event, handler));
    };
  }, []);

  useEffect(() => {
    if (user?.is_anonymous) {
      lastAnonymousActivitySyncRef.current = Date.now();
      anonymousActivityService.recordActivity(user.id);
    }
  }, [user]);

  return { lastActivity, updateActivity };
}
