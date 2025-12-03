import { useState, useCallback, useTransition } from "react";
import { message } from "antd";
import { tasksApi, TaskFilters } from "@/src/lib/api/tasks";
import { Task } from "@/src/types/Index";

export default function TasksHandlers() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const loadTasks = useCallback((filters?: TaskFilters) => {
    setError("");
    startTransition(async () => {
      try {
        const data = await tasksApi.getAll(filters);
        setTasks(data);
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
    [],
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
    [],
  );

  const deleteTask = useCallback(async (id: string) => {
    try {
      await tasksApi.delete(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      message.success("Task deleted successfully");
    } catch (err) {
      console.error("Failed to delete task:", err);
      message.error("Failed to delete task");
      throw err;
    }
  }, []);

  return {
    tasks,
    isPending,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    refetch: loadTasks,
  };
}
