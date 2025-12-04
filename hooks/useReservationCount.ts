import { useState, useEffect } from 'react';

const STORAGE_KEY = 'reservation_count';
const EXPIRATION_MS = 30 * 60 * 1000; // 30 minutes

interface StoredData {
  count: number;
  lastUpdated: number;
}

export function useReservationCount(initialCount: number) {
  const [count, setCount] = useState(initialCount);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const item = localStorage.getItem(STORAGE_KEY);
      if (item) {
        const parsed: StoredData = JSON.parse(item);
        const now = Date.now();

        // Check if expired
        if (now - parsed.lastUpdated > EXPIRATION_MS) {
          localStorage.removeItem(STORAGE_KEY);
          // No need to set count to initialCount as it's already the default state
        } else {
          // Use stored count if it's valid and greater than initial
          const newCount = Math.max(parsed.count, initialCount);
          if (newCount !== count) {
            // eslint-disable-next-line
            setCount(newCount);
          }
        }
      }
    } catch (error) {
      console.error('Failed to read reservation count from localStorage:', error);
    }
  }, [initialCount, count]);

  // Auto-increment interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => {
        const increment = Math.floor(Math.random() * 3); // 0 to 2
        const newCount = prevCount + increment;

        // Save to localStorage
        try {
          const data: StoredData = {
            count: newCount,
            lastUpdated: Date.now(),
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
          console.error('Failed to save reservation count to localStorage:', error);
        }

        return newCount;
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return count;
}
