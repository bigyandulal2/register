'use client';

import { useEffect } from 'react';

export function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Optional: log to error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="p-8 text-center text-red-600">
      <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
      <p className="mb-6">{error.message}</p>
      <button
        onClick={reset} // Retries the fetch automatically
        className="px-6 py-3 bg-black text-white rounded-lg hover:opacity-80"
      >
        Try Again
      </button>
    </div>
  );
}