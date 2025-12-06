import { api } from "./axios";
import { CategoryStats, Stats } from "@/src/types/Index";
import { endpoints } from "@/src/lib/config/endpoints";

export const statsApi = {
  getOverview: async () => {
    const response = await api.get<Stats>(endpoints.main.stats.overview);
    return response.data;
  },

  getCategoryStats: async () => {
    const response = await api.get<CategoryStats[]>(
      endpoints.main.stats.categories,
    );
    return response.data;
  },

  getUpcoming: async (limit?: number) => {
    const response = await api.get(endpoints.main.stats.upcoming, {
      params: { limit },
    });
    return response.data;
  },

  getOverdue: async () => {
    const response = await api.get(endpoints.main.stats.overdue);
    return response.data;
  },

  getRecentActivity: async (limit?: number) => {
    const response = await api.get(endpoints.main.stats.recent_activity, {
      params: { limit },
    });
    return response.data;
  },

  getProductivity: async (days?: number) => {
    const response = await api.get(endpoints.main.stats.productivity, {
      params: { days },
    });
    return response.data;
  },
};
