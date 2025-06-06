import { useEffect, type RefObject } from "react";

/**
 * Hook to detect clicks outside of a given element.
 *
 * @param ref - reference to the container element to protect
 * @param callback - function to execute when a click outside is detected
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void
) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
}
