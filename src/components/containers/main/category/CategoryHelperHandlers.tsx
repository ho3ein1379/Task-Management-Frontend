import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { App } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { statsApi } from "@/src/lib/api/stats";
import { Category } from "@/src/types/Index";
import CategoryHandlers from "@/src/components/containers/main/category/CategoryHandlers";

interface CategoriesProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  searchTerm: string;
}

export default function CategoryHelperHandlers({
  setIsModalOpen,
  searchTerm,
}: CategoriesProps) {
  const { modal } = App.useApp();

  const [categoryStats, setCategoryStats] = useState<Record<string, number>>(
    {},
  );
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const {
    categories,
    isPending,
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = CategoryHandlers();

  useEffect(() => {
    loadCategories();
    loadStats();
  }, [loadCategories]);

  const loadStats = async () => {
    try {
      const stats = await statsApi.getCategoryStats();
      const statsMap = stats.reduce<Record<string, number>>((acc, stat) => {
        acc[stat.id] = stat.taskCount;
        return acc;
      }, {});
      setCategoryStats(statsMap);
    } catch (error) {
      console.error("Failed to load category stats:", error);
    }
  };

  const handleCreate = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (category: Category) => {
    const taskCount = categoryStats[category.id] || 0;

    modal.confirm({
      title: "Delete Category",
      icon: <ExclamationCircleFilled />,
      content:
        taskCount > 0
          ? `This category has ${taskCount} task(s). Are you sure you want to delete "${category.name}"?`
          : `Are you sure you want to delete "${category.name}"?`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        await deleteCategory(category.id);
        await loadStats();
      },
    });
  };

  const handleSubmit = async (values: Parameters<typeof createCategory>[0]) => {
    if (selectedCategory) {
      await updateCategory(selectedCategory.id, values);
    } else {
      await createCategory(values);
    }
    await loadStats();
  };

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return {
    categoryStats,
    selectedCategory,
    isPending,
    handleCreate,
    handleEdit,
    handleDelete,
    handleSubmit,
    filteredCategories,
  };
}
