import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/lib/store/AuthStore";
import { authApi } from "@/src/lib/api/auth";
import { Path } from "@/src/lib/config/Path";
import { AxiosError } from "axios";

interface ApiErrorResponse {
  message: string;
}

export default function LoginHandler() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError("");

    try {
      const response = await authApi.login(values);
      setAuth(response.user, response.token);
      router.push(Path.main.dashboard);
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorMessage =
          (err.response?.data as ApiErrorResponse)?.message ||
          "Login failed. Please try again.";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, handleSubmit };
}
