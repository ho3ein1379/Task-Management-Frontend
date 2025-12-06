import { useState, useCallback, useTransition } from "react";
import { App } from "antd";
import { tasksApi, TaskFilters } from "@/src/lib/api/tasks";
import { Task } from "@/src/types/Index";

export default function TaskHandlers() {
  const { message } = App.useApp();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 1,
  });
  const [error, setError] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const loadTasks = useCallback((filters?: TaskFilters) => {
    setError("");
    startTransition(async () => {
      try {
        const response = await tasksApi.getAll(filters);
        setTasks(response.data);
        setPagination({
          total: response.total,
          page: response.page,
          totalPages: response.totalPages,
        });
      } catch (err) {
        console.error("Failed to load tasks:", err);
        setError("Failed to load tasks. Please try again.");
      }
    });
  }, []);

  const createTask = useCallback(
    async (data: Parameters<typeof tasksApi.create>[0]) => {
      try {
        const newTask = await tasksApi.create(data);
        setTasks((prev) => [newTask, ...prev]);
        message.success("Task created successfully");
        return newTask;
      } catch (err) {
        console.error("Failed to create task:", err);
        message.error("Failed to create task");
        throw err;
      }
    },
    [message],
  );

  const updateTask = useCallback(
    async (id: string, data: Parameters<typeof tasksApi.update>[1]) => {
      try {
        const updatedTask = await tasksApi.update(id, data);
        setTasks((prev) =>
          prev.map((task) => (task.id === id ? updatedTask : task)),
        );
        message.success("Task updated successfully");
        return updatedTask;
      } catch (err) {
        console.error("Failed to update task:", err);
        message.error("Failed to update task");
        throw err;
      }
    },
    [message],
  );

  const deleteTask = useCallback(
    async (id: string) => {
      try {
        await tasksApi.delete(id);
        setTasks((prev) => prev.filter((task) => task.id !== id));
        message.success("Task deleted successfully");
      } catch (err) {
        console.error("Failed to delete task:", err);
        message.error("Failed to delete task");
        throw err;
      }
    },
    [message],
  );

  return {
    tasks,
    pagination,
    isPending,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    refetch: loadTasks,
  };
}
