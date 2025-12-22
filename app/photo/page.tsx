"use client";

import { useEffect, useState } from "react";
import { publicApi } from "../utils/axios";


interface Photo {
  id: number;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
  price:string

}

export default function Page() {
  const [photos, setPhotos] = useState<Photo[]>([]); // Correct: array of Photo objects, initial empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        setLoading(true);
        const response = await publicApi.get<{ data: Photo[] }>("/api/v1/energisation");
        const photosData = response.data.data || response.data; // adjust if needed
        setPhotos(photosData);
      } catch (err: any) {
        console.error("Error occurred here:", err);
        setError(err.response?.data?.message || err.message || "Failed to fetch photos");
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, []); // Empty dependency array → runs once on mount

  if (loading) return <div>Loading photos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">This is the Photo Component!</h1>

      {photos.length === 0 ? (
        <p>No photos found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="border rounded-lg p-4 shadow">
              
              <img
                src={photo.url || process.env.NEXT_PUBLIC_FALLBACK_IMG}
                alt={photo.title || "Photo"}
                className="w-full h-64 object-cover rounded"
              />
              <p className=" mt-2 text-red-600">NPR {photo.price}</p>
              <p className="mt-2">{photo.title || "Untitled"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}