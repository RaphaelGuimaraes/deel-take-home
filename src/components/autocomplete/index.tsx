import React, { useState, useEffect, useRef } from "react";

import type { User } from "../../types/User";

import { useClickOutside, useDebouncedValue } from "../../hooks/index";

import styles from "./autocomplete.module.css";

type AutoCompleteProps = {
  fetchData: (query: string) => Promise<User[]>;
};

export const AutoComplete: React.FC<AutoCompleteProps> = ({ fetchData }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showResults, setShowResults] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebouncedValue(query, 300);

  useClickOutside(containerRef, () => {
    setShowResults(false);
    setActiveIndex(-1);
  });

  useEffect(() => {
    if (debouncedQuery.trim()) {
      fetchData(debouncedQuery).then((data) => {
        setResults(data);
        setShowResults(true);
      });
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [debouncedQuery]);

  const highlight = (name: string) => {
    const i = name.toLowerCase().indexOf(query.toLowerCase());
    if (i === -1) return name;
    const before = name.slice(0, i);
    const match = name.slice(i, i + query.length);
    const after = name.slice(i + query.length);

    return `${before}<strong>${match}</strong>${after}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0) {
        setQuery(results[activeIndex].name);
        setShowResults(false);
      }
    } else if (e.key === "Escape") {
      setShowResults(false);
    }
  };

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <input
        type="text"
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search user..."
      />
      {showResults && results.length > 0 && (
        <ul className={styles.results}>
          {results.map((user, idx) => (
            <li
              key={user.id}
              className={`${styles.item} ${idx === activeIndex ? styles.active : ''}`}
              onMouseDown={() => {
                setQuery(user.name);
                setShowResults(false);
              }}
              dangerouslySetInnerHTML={{ __html: highlight(user.name) }}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
