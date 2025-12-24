import { publicApi } from "../utils/axios";
async function getCosmetics() {
    const res = await publicApi.get("/api/v1/energisation");
    return res.data;
  }

export default async function Page(){
    const photos=await getCosmetics();
    console.log("cosmetics dataaaaa",photos);
    return(
        <>
        
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
    </div>
        
        
        </>
    )
}