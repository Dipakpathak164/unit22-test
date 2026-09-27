'use client';

import { useState, useEffect, useMemo } from 'react';
import { MOCK_PRODUCTS, MOCK_BRANDS, MOCK_BIKES } from '@monorepo/mocks';

const RECENT_SEARCHES_KEY = 'u22_recent_searches';

export function useGlobalSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch {
      // Ignore SSR / localStorage disabled
    }
  }, []);

  // 300ms Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  // Grouped Results Matching Debounced Query
  const searchResults = useMemo(() => {
    if (!debouncedQuery) {
      return { products: [], brands: [], fitmentBikes: [] };
    }

    const q = debouncedQuery.toLowerCase();

    const matchedProducts = MOCK_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.brand.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
    ).slice(0, 4);

    const matchedBrands = MOCK_BRANDS.filter(
      (b) => b.name.toLowerCase().includes(q) || b.slug.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedBikes = MOCK_BIKES.filter(
      (b) =>
        b.make.toLowerCase().includes(q) ||
        b.model.toLowerCase().includes(q) ||
        `${b.make} ${b.model}`.toLowerCase().includes(q)
    ).slice(0, 3);

    return {
      products: matchedProducts,
      brands: matchedBrands,
      fitmentBikes: matchedBikes,
    };
  }, [debouncedQuery]);

  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return;
    const cleanTerm = term.trim();
    const updated = [cleanTerm, ...recentSearches.filter((s) => s.toLowerCase() !== cleanTerm.toLowerCase())].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const removeRecentSearch = (term: string) => {
    const updated = recentSearches.filter((s) => s !== term);
    setRecentSearches(updated);
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  return {
    query,
    setQuery,
    debouncedQuery,
    searchResults,
    isOpen,
    setIsOpen,
    recentSearches,
    saveRecentSearch,
    removeRecentSearch,
  };
}
