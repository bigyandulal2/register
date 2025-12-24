// app/products/loading.tsx
'use client';

export default function Loading() {
  return (
    <div className="p-8">
      <p className="text-green-500">Loading...</p>  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-80 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}