"use client";
import useSWR from "swr";
import { publicApi } from "../utils/axios";
const fetcher=(url:string)=>publicApi.get(url).then(res=>res.data);
export default function ProductList({ initialProducts }: { initialProducts: any[] }) {
    const { data: photos, mutate } = useSWR('/api/v1/energisation', fetcher, {
      fallbackData: initialProducts, // Instant UI from server
    });
   
    console.log("data from the client side",photos);
    return (
          <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">This is the Photo Component!</h1>

      {photos.length === 0 ? (
        <p>No photos found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {photos.map((photo:any) => (
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
      <button onClick={()=>mutate()} className="mt-4 p-2 bg-black/50 text-white rounded-[1000px] hover:opacity-85">Refetch</button>
    </div>
    );
  }