import { useEffect, useState } from "react";

/**
 * Hook to debounce a value over a given delay.
 *
 * @param value - the value to debounce
 * @param delay - time in milliseconds to wait before updating the debounced value
 * @returns the debounced version of the input value
 */
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}
