import { useState, useCallback, useTransition } from "react";
import { App } from "antd";
import { categoriesApi, CreateCategoryDto } from "@/src/lib/api/categories";
import { Category } from "@/src/types/Index";

export default function CategoryHandlers() {
  const { message } = App.useApp();
  const [isPending, startTransition] = useTransition();

  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>("");

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

  const createCategory = useCallback(
    async (data: CreateCategoryDto) => {
      try {
        const newCategory = await categoriesApi.create(data);
        setCategories((prev) => [newCategory, ...prev]);
        message.success("Category created successfully");
        return newCategory;
      } catch (err) {
        console.error("Failed to create category:", err);
        message.error("Failed to create category");
        throw err;
      }
    },
    [message],
  );

  const updateCategory = useCallback(
    async (id: string, data: Partial<CreateCategoryDto>) => {
      try {
        const updatedCategory = await categoriesApi.update(id, data);
        setCategories((prev) =>
          prev.map((cat) => (cat.id === id ? updatedCategory : cat)),
        );
        message.success("Category updated successfully");
        return updatedCategory;
      } catch (err) {
        console.error("Failed to update category:", err);
        message.error("Failed to update category");
        throw err;
      }
    },
    [message],
  );

  const deleteCategory = useCallback(
    async (id: string) => {
      try {
        await categoriesApi.delete(id);
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
        message.success("Category deleted successfully");
      } catch (err) {
        console.error("Failed to delete category:", err);
        message.error("Failed to delete category");
        throw err;
      }
    },
    [message],
  );

  return {
    categories,
    isPending,
    error,
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    refetch: loadCategories,
  };
}
