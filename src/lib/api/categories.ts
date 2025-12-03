import { api } from "./axios";
import { Category } from "@/src/types/Index";
import { endpoints } from "@/src/lib/config/endpoints";

export interface CreateCategoryDto {
  name: string;
  description?: string;
  color?: string;
}

export type UpdateCategoryDto = Partial<CreateCategoryDto>;

export const categoriesApi = {
  getAll: async () => {
    const response = await api.get<Category[]>(endpoints.main.categories.all);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Category>(
      endpoints.main.categories.get_by_id(id),
    );
    return response.data;
  },

  create: async (data: CreateCategoryDto) => {
    const response = await api.post<Category>(
      endpoints.main.categories.create,
      data,
    );
    return response.data;
  },

  update: async (id: string, data: UpdateCategoryDto) => {
    const response = await api.patch<Category>(
      endpoints.main.categories.update_by_id(id),
      data,
    );
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(endpoints.main.categories.delete_by_id(id));
  },

  getStats: async () => {
    const response = await api.get(endpoints.main.categories.get_stats);
    return response.data;
  },
};
