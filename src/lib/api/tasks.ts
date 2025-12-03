import { api } from "./axios";
import { Task, TaskStatus, TaskPriority } from "@/src/types/Index";
import { endpoints } from "@/src/lib/config/endpoints";

export interface CreateTaskDto {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
  categoryId?: string;
}

export type UpdateTaskDto = Partial<CreateTaskDto>;

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  search?: string;
  page?: number;
  limit?: number;
}

export const tasksApi = {
  getAll: async (filters?: TaskFilters) => {
    const response = await api.get<Task[]>(endpoints.main.tasks.all, {
      params: filters,
    });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Task>(endpoints.main.tasks.find_by_id(id));
    return response.data;
  },

  create: async (data: CreateTaskDto) => {
    const response = await api.post<Task>(endpoints.main.tasks.create, data);
    return response.data;
  },

  update: async (id: string, data: UpdateTaskDto) => {
    const response = await api.patch<Task>(
      endpoints.main.tasks.update_by_id(id),
      data,
    );
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(endpoints.main.tasks.delete_by_id(id));
  },
};
