import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="w-16 h-16 bg-primary text-black font-black flex items-center justify-center text-xl mb-6 shadow-lg">
        404
      </div>
      <h1 className="text-3xl font-black uppercase tracking-tight mb-2">
        Page Not Found
      </h1>
      <p className="text-sm text-neutral-400 max-w-md mb-8 font-mono">
        The page or route you are looking for does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-primary text-black text-xs font-black uppercase tracking-widest hover:bg-white transition-colors"
      >
        Return to Storefront Home
      </Link>
    </div>
  );
}
