'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MobileFilterDrawer — off-canvas panel (slides from LEFT)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface MobileFilterDrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  activeFilterCount?: number;
}

/**
 * Reusable off-canvas filter drawer for mobile viewports.
 * Slides in from the LEFT side (matching the left-positioned trigger button),
 * with a backdrop overlay, Escape key, click-outside-to-close,
 * smooth CSS open/close transitions, and a sticky "Apply" footer.
 *
 * The component stays mounted in the DOM after first open and uses
 * CSS transform transitions for both open AND close animations.
 */
export function MobileFilterDrawer({
  children,
  isOpen,
  onClose,
  title = 'Filters',
  activeFilterCount = 0,
}: MobileFilterDrawerProps) {
  // Lazy mount: don't render until first open, then stay mounted for transitions
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  // Drives CSS transition classes — slightly delayed from isOpen to allow
  // the element to render in "closed" position before transitioning to "open"
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setHasBeenOpened(true);
      // Double-rAF ensures the browser has painted the "closed" state
      // before we flip to "open", so the transition actually plays
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!hasBeenOpened) return null;

  const isFullyClosed = !isOpen && !isVisible;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden font-sans lg:hidden"
      style={{
        pointerEvents: isFullyClosed ? 'none' : 'auto',
        visibility: isFullyClosed ? 'hidden' : 'visible',
      }}
    >
      {/* Backdrop — fades in/out */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out"
        style={{ opacity: isVisible ? 1 : 0 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel — slides from LEFT */}
      <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
        <div
          className="w-screen max-w-[340px] bg-[#ffffff] shadow-2xl flex flex-col border-r border-[#eaeaea] transition-transform duration-300 ease-in-out"
          style={{ transform: isVisible ? 'translateX(0)' : 'translateX(-100%)' }}
        >
          {/* Header */}
          <div className="bg-[#000000] text-[#ffffff] px-5 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <SlidersHorizontal className="w-4.5 h-4.5 text-primary" />
              <div>
                <h2 className="text-sm font-black uppercase tracking-wider text-white">
                  {title}
                </h2>
                {activeFilterCount > 0 && (
                  <p className="text-[10px] text-primary font-mono font-bold mt-0.5">
                    {activeFilterCount} {activeFilterCount === 1 ? 'FILTER' : 'FILTERS'} ACTIVE
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-none text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Close Filters"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-5 py-5">
            {children}
          </div>

          {/* Sticky footer */}
          <div className="shrink-0 border-t border-[#eaeaea] px-5 py-4 bg-[#fafafa]">
            <button
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 bg-[#000000] text-white text-xs font-black uppercase tracking-wider py-3 px-4 hover:bg-primary transition-colors active:scale-[0.98]"
            >
              <span>Apply Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-primary text-white text-[10px] font-extrabold px-1.5 py-0.5">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MobileFilterTrigger — compact "Filters" button (presentational)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface MobileFilterTriggerProps {
  onClick: () => void;
  activeFilterCount?: number;
  className?: string;
}

/**
 * Compact "Filters" trigger button. Purely presentational — scroll-direction
 * sticky behavior is provided by the MobileStickyFilterBar wrapper.
 */
export function MobileFilterTrigger({
  onClick,
  activeFilterCount = 0,
  className = '',
}: MobileFilterTriggerProps) {
  return (
    <button
      onClick={onClick}
      className={`lg:hidden inline-flex items-center gap-2 px-4 py-2.5 bg-[#000000] text-white text-xs font-black uppercase tracking-wider border-2 border-[#000000] hover:bg-primary hover:border-primary transition-colors active:scale-[0.97] ${className}`}
      aria-label="Open Filters"
    >
      <SlidersHorizontal className="w-4 h-4 text-primary" />
      <span>Filters</span>
      {activeFilterCount > 0 && (
        <span className="bg-primary text-white text-[10px] font-extrabold px-1.5 py-0.5 ml-0.5">
          {activeFilterCount}
        </span>
      )}
    </button>
  );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MobileStickyFilterBar — scroll-direction "smart sticky" wrapper
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

type ScrollDir = 'up' | 'down' | null;

/**
 * Lightweight scroll-direction detector for mobile only (< 1024px).
 * Uses a passive scroll listener with RAF-batched reads.
 * Threshold prevents jitter from sub-pixel / momentum scrolling.
 */
function useScrollDirection(threshold = 5): ScrollDir {
  const [direction, setDirection] = useState<ScrollDir>(null);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    lastY.current = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        // Desktop — no sticky behavior needed
        if (window.innerWidth >= 1024) {
          setDirection(null);
          ticking.current = false;
          return;
        }

        const currentY = window.scrollY;

        // At/near top — always visible in normal flow
        if (currentY <= 10) {
          setDirection(null);
          lastY.current = currentY;
          ticking.current = false;
          return;
        }

        const diff = currentY - lastY.current;
        if (diff > threshold) {
          setDirection('down');
          lastY.current = currentY;
        } else if (diff < -threshold) {
          setDirection('up');
          lastY.current = currentY;
        }

        ticking.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return direction;
}

interface MobileStickyFilterBarProps {
  children: React.ReactNode;
}

/**
 * Wraps the mobile filter trigger row (button + optional reset).
 * Provides scroll-direction-aware "smart sticky" positioning:
 *   - At top of page: normal document flow
 *   - Scrolling DOWN: slides up and hides
 *   - Scrolling UP: reappears as a fixed bar below the mobile header (top: 57px)
 *
 * MOBILE ONLY — renders as a plain wrapper with no sticky behavior on desktop.
 */
export function MobileStickyFilterBar({ children }: MobileStickyFilterBarProps) {
  const scrollDir = useScrollDirection();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasScrolledPast, setHasScrolledPast] = useState(false);
  const initialOffsetTop = useRef<number | null>(null);

  // Track whether the user has scrolled past the bar's natural position
  // so we know when to start the fixed positioning behavior
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkPosition = () => {
      if (window.innerWidth >= 1024) {
        setHasScrolledPast(false);
        return;
      }

      // Capture the initial offset once
      if (initialOffsetTop.current === null && containerRef.current) {
        initialOffsetTop.current = containerRef.current.getBoundingClientRect().top + window.scrollY;
      }

      if (initialOffsetTop.current !== null) {
        // 57px = mobile header height
        setHasScrolledPast(window.scrollY > initialOffsetTop.current - 57);
      }
    };

    // Re-check on scroll using the same RAF-batched pattern
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkPosition);
    };

    checkPosition();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Reset initial offset on resize (layout can change)
  useEffect(() => {
    const onResize = () => { initialOffsetTop.current = null; };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const shouldFloat = hasScrolledPast && scrollDir !== null;
  const isHidden = scrollDir === 'down';

  return (
    <div className="lg:hidden" ref={containerRef}>
      {/* Normal-flow placeholder — always in document flow */}
      <div
        className="flex items-center justify-between bg-[#fefefe] border border-[#eaeaea] px-4 py-3"
        style={{ visibility: shouldFloat ? 'hidden' : 'visible' }}
      >
        {children}
      </div>

      {/* Fixed floating clone — appears when scrolled past */}
      {shouldFloat && (
        <div
          className="fixed left-0 right-0 z-30 flex items-center justify-between bg-[#f7f6f2]/95 backdrop-blur-sm border-b border-[#edebe4] shadow-sm px-4 py-2.5 transition-transform duration-300 ease-in-out"
          style={{
            top: '57px',
            transform: isHidden ? 'translateY(-120%)' : 'translateY(0)',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
