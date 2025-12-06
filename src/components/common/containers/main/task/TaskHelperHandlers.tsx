import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { App } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { TaskFilters } from "@/src/lib/api/tasks";
import { Task } from "@/src/types/Index";
import TaskHandlers from "@/src/components/common/containers/main/task/TaskHandlers";
import CategoryHandlers from "@/src/components/common/containers/main/category/CategoryHandlers";

interface TaskProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsDetailsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function TaskHelperHandlers({
  setIsModalOpen,
  setIsDetailsModalOpen,
}: TaskProps) {
  const { modal } = App.useApp();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<TaskFilters>({});
  const [viewTask, setViewTask] = useState<Task | null>(null);

  const {
    tasks,
    pagination,
    isPending,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
  } = TaskHandlers();

  const { categories, loadCategories } = CategoryHandlers();

  useEffect(() => {
    loadTasks();
    loadCategories();
  }, [loadTasks, loadCategories]);

  const handleFilter = (newFilters: TaskFilters) => {
    setFilters(newFilters);
    loadTasks(newFilters);
  };

  const handlePageChange = (page: number, pageSize: number) => {
    loadTasks({ ...filters, page, limit: pageSize });
  };

  const handleCreate = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleView = (task: Task) => {
    setViewTask(task);
    setIsDetailsModalOpen(true);
  };

  const handleDelete = (task: Task) => {
    modal.confirm({
      title: "Delete Task",
      icon: <ExclamationCircleFilled />,
      content: `Are you sure you want to delete "${task.title}"?`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        await deleteTask(task.id);
      },
    });
  };

  const handleSubmit = async (values: Parameters<typeof createTask>[0]) => {
    if (selectedTask) {
      await updateTask(selectedTask.id, values);
    } else {
      await createTask(values);
    }
  };

  return {
    selectedTask,
    filters,
    viewTask,
    tasks,
    pagination,
    isPending,
    categories,
    handleFilter,
    handlePageChange,
    handleCreate,
    handleEdit,
    handleView,
    handleDelete,
    handleSubmit,
  };
}
