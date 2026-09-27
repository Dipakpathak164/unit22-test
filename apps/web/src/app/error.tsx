'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring if needed
    console.error('Unhandled storefront error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="w-16 h-16 bg-red-600 text-white font-black flex items-center justify-center text-xl mb-6 shadow-lg">
        !
      </div>
      <h1 className="text-3xl font-black uppercase tracking-tight mb-2">
        Something Went Wrong
      </h1>
      <p className="text-sm text-neutral-400 max-w-md mb-8 font-mono">
        An unexpected error occurred while loading this page. Please try again.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-primary text-black text-xs font-black uppercase tracking-widest hover:bg-white transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-3 border border-white/20 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
