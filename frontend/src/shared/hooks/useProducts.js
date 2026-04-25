import { useEffect, useState } from "react";

const PAGE_SIZE = 6;

export function useProducts({ search, category, sort, page }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["all"]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCategories() {
      try {
        const res = await fetch("/api/products/categories", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(["all", ...data]);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      }
    }

    fetchCategories();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    async function fetchProducts() {
      try {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (category && category !== "all") params.set("category", category);
        if (sort) params.set("sort", sort);
        params.set("page", page);
        params.set("limit", PAGE_SIZE);

        const res = await fetch(`/api/products?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
    return () => controller.abort();
  }, [search, category, sort, page]);

  return { products, categories, totalPages, loading, error };
}