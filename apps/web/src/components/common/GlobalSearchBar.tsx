'use client';

import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { SearchSuggestionsOverlay } from './SearchSuggestionsOverlay';
import { Input } from '@monorepo/ui';
import { Search, X } from 'lucide-react';

interface GlobalSearchBarProps {
  className?: string;
  placeholder?: string;
  showShortcutBadge?: boolean;
}

const PLACEHOLDER_KEYWORDS = [
  'Search for track helmets...',
  'Search for ceramic brake pads...',
  'Search for Akrapovic titanium exhausts...',
  'Search for 37L aluminum panniers...',
  'Search for Motul 300V synthetic oil...',
  'Search for Denali LED aux lights...',
  'Search parts by bike, SKU, brand...',
];

export function GlobalSearchBar({
  className = '',
  placeholder,
  showShortcutBadge = true,
}: GlobalSearchBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isFocused, setIsFocused] = React.useState(false);
  const [keywordIndex, setKeywordIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const {
    query,
    setQuery,
    searchResults,
    isOpen,
    setIsOpen,
    recentSearches,
    saveRecentSearch,
    removeRecentSearch,
  } = useGlobalSearch();

  // Vertical sliding placeholder ticker loop
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setKeywordIndex((prev) => (prev + 1) % PLACEHOLDER_KEYWORDS.length);
        setIsAnimating(false);
      }, 300);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  // Keyboard Command Palette Shortcut (Cmd + K / Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  // Click outside listener to close suggestions dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    saveRecentSearch(query);
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectSearchTerm = (term: string) => {
    setQuery(term);
    saveRecentSearch(term);
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <div ref={containerRef} className={`relative font-sans ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => {
            setIsFocused(true);
            setIsOpen(true);
          }}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          placeholder={placeholder ? placeholder : ''}
          className="pr-20 text-xs bg-[#ffffff] text-[#000000] border-none h-10 shadow-sm focus:ring-2 focus:ring-primary"
        />

        {/* Animated Sliding Placeholder Ticker Overlay */}
        {!placeholder && !query && !isFocused && (
          <div className="absolute left-3.5 top-0 bottom-0 right-14 flex items-center overflow-hidden pointer-events-none text-xs sm:text-sm font-semibold text-black/80 select-none">
            <span
              className={`transition-all duration-300 ease-in-out transform ${
                isAnimating ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
              }`}
            >
              {PLACEHOLDER_KEYWORDS[keywordIndex]}
            </span>
          </div>
        )}

        {/* Clear input button */}
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-12 top-2.5 text-foreground/40 hover:text-foreground p-0.5"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Search Action Button */}
        <button
          type="submit"
          className="absolute right-3 top-3 text-[#000000]/70 hover:text-primary transition-colors p-0.5"
          title="Submit search"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>

      {/* Floating Suggestions Overlay Dropdown */}
      {isOpen && (
        <SearchSuggestionsOverlay
          query={query}
          searchResults={searchResults}
          recentSearches={recentSearches}
          onSelectSearchTerm={handleSelectSearchTerm}
          onRemoveRecentSearch={removeRecentSearch}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
