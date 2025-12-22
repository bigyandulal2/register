"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { publicApi } from "@/app/utils/axios";
import { Product } from "@/app/interfaces/ProductType";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        const res = await publicApi.get(`/api/v1/products/${slug}`);
        setProduct(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Loading product...
      </p>
    );
  }

  if (!product) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Product not found
      </p>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* IMAGE */}
        <div className="bg-gray-100 rounded-xl overflow-hidden">
          <img
            src={
              product.thumbnail
                ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.thumbnail}`
                : process.env.NEXT_PUBLIC_FALLBACK_IMG
            }
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* DETAILS */}
        <div className="space-y-4">
          <p className="text-sm uppercase text-gray-500">
            {product.sub_title}
          </p>

          <h1 className="text-3xl font-bold text-gray-800">
            {product.title}
          </h1>

          <p className="text-gray-600">
            {product.summary}
          </p>

          {/* PRICE */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-black">
              ₹{product.selling_price}
            </span>

            {product.display_price !== product.selling_price && (
              <span className="text-lg line-through text-gray-400">
                ₹{product.display_price}
              </span>
            )}
          </div>

          {/* CTA */}
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition">
            Add to Cart
          </button>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-14">
        <h2 className="text-2xl font-semibold mb-4">
          Product Description
        </h2>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: product.description ?? "",
          }}
        />
      </div>
    </section>
  );
}
