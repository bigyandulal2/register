"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { publicApi } from "../utils/axios";
import { Product } from "../interfaces/ProductType";
import { ProductGrid } from "../components/ProductGrid";

interface Search {
  category_id: string;
  sub_category_id: string;
  min_price: string;
  max_price: string;
}

export default function Page() {
  const [formData, setFormData] = useState<Search>({
    category_id: "",
    sub_category_id: "",
    min_price: "",
    max_price: "",
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.sub_category_id || !formData.min_price || !formData.max_price) {
      toast.error("Please fill up the form");
      return;
    }

    const formToSend = new FormData();
    formToSend.append("category_id", formData.category_id);
    formToSend.append("sub_category_id", formData.sub_category_id);
    formToSend.append("min_price", formData.min_price);
    formToSend.append("max_price", formData.max_price);

    try {
      setLoading(true);

      const res = await publicApi.post(
        "/api/v1/search-products",
        formToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProducts(res.data);
      toast.success("Products loaded");
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-gray-100 px-4 py-10">
      {/* SEARCH FORM */}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 space-y-5"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Search Products
        </h2>
        <input
          type="text"
          name="category_id"
          placeholder="Sub Category ID"
          value={formData.category_id}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-500"
        />
        <input
          type="text"
          name="sub_category_id"
          placeholder="Sub Category ID"
          value={formData.sub_category_id}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-500"
        />

        <input
          type="text"
          name="min_price"
          placeholder="Minimum Price"
          value={formData.min_price}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-500"
        />

        <input
          type="text"
          name="max_price"
          placeholder="Maximum Price"
          value={formData.max_price}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-500"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:opacity-80 transition cursor-pointer"
        >
          Search
        </button>
      </form>

      {/* RESULTS */}
      {loading && (
        <p className="text-center mt-10 text-gray-500">Loading products...</p>
      )}

      {!loading && <ProductGrid products={products} />}
    </section>
  );
}
