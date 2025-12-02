import { api } from "./axios";
import { endpoints } from "@/src/lib/config/endpoints";
import { AuthResponse } from "@/src/types/Index";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      endpoints.auth.login,
      credentials,
    );
    return response.data;
  },
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      endpoints.auth.register,
      credentials,
    );
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get(endpoints.auth.profile);
    return response.data;
  },
};
