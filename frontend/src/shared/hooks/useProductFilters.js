import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "newest";
  const page = Number(searchParams.get("page") || 1);

  useEffect(() => {
    const t = setTimeout(() => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);

        if (searchInput !== (params.get("search") || "")) {
          if (searchInput) params.set("search", searchInput);
          else params.delete("search");
          params.set("page", 1);
        }
        return params;
      });
    }, 300);
    return () => clearTimeout(t);
  }, [searchInput, setSearchParams]);

  const updateFilter = (key, value) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (!value || value === "all") params.delete(key);
      else params.set(key, value);
      
      if (key !== "page") params.set("page", 1);
      
      return params;
    });
  };

  return {
    search,
    category,
    sort,
    page,
    searchInput,
    setSearchInput,
    updateFilter,
  };
}