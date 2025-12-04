import { useState, useCallback, useTransition } from "react";
import { categoriesApi } from "@/src/lib/api/categories";
import { Category } from "@/src/types/Index";

export default function CategoriesHandler() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const loadCategories = useCallback(() => {
    setError("");
    startTransition(async () => {
      try {
        const data = await categoriesApi.getAll();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories:", err);
        setError("Failed to load categories");
      }
    });
  }, []);

  return {
    categories,
    isPending,
    error,
    loadCategories,
    refetch: loadCategories,
  };
}
