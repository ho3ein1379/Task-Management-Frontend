import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAuthStore } from "@/src/lib/store/AuthStore";
import { authApi } from "@/src/lib/api/auth";
import { Path } from "@/src/lib/config/Path";

interface ApiErrorResponse {
  message: string;
}

export default function RegisterHandler() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    setLoading(true);
    setError("");

    try {
      const response = await authApi.register(values);
      setAuth(response.user, response.token);
      router.push(Path.main.dashboard);
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorMessage =
          (err.response?.data as ApiErrorResponse)?.message ||
          "Register failed. Please try again.";
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
