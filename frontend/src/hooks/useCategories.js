import { useEffect, useState } from "react";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCategories() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/categories", {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();

        setCategories(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();

    return () => controller.abort();
  }, []);

  return {
    categories,
    loading,
    error,
  };
}