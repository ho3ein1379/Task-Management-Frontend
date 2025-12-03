export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    profile: "/auth/profile",
  },
  main: {
    tasks: {
      all: "/tasks",
      find_by_id: (id: string | string[]) => `/tasks/${id}`,
      create: "/tasks",
      update_by_id: (id: string | string[]) => `/tasks/${id}`,
      delete_by_id: (id: string | string[]) => `/tasks/${id}`,
    },
    stats: {
      overview: "/stats/overview",
      categories: "/stats/categories",
      upcoming: "/stats/upcoming",
      overdue: "/stats/overdue",
      recent_activity: "/stats/recent-activity",
      productivity: "/stats/productivity",
    },
  },
};
