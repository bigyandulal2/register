"use client";

import { useState } from "react";
import { Product } from "../interfaces/ProductType";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
      
      {/* Image */}
      <div className="relative aspect-square bg-gray-100">
        <img
          src={process.env.NEXT_PUBLIC_FALLBACK_IMG}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <p className="text-xs text-gray-500 uppercase">
          {product.sub_title}
        </p>

        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {product.title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {product.summary}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold text-black">
            ₹{product.selling_price}
          </span>

          {product.display_price !== product.selling_price && (
            <span className="text-sm line-through text-gray-400">
              NPR {product.display_price}
            </span>
          )}
        </div>

        {/* Description (Toggle) */}
        <div
  className={`text-sm text-gray-600 transition-all duration-300 overflow-auto ${
    showDescription ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
  }`}
  dangerouslySetInnerHTML={{ __html: product.description }}
></div>



        {/* Button */}
        <button
          onClick={() => setShowDescription((prev) => !prev)}
          className="w-full mt-3 bg-black text-white py-2 rounded-lg text-sm hover:opacity-85 transition cursor-pointer"
        >
          {showDescription ? "Hide Details" : "View Product"}
        </button>
      </div>
    </div>
  );
}
