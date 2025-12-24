
import { publicApi } from "../utils/axios";
import ProductList from "./ProductList";
async function getProducts() {
  const res = await publicApi.get("/api/v1/energisation");
  return res.data;
}
export default async function PhotosPage(){
   const initialProducts=await getProducts();
   return <ProductList initialProducts={initialProducts}/>
}