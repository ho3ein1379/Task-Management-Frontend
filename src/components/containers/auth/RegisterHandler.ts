import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { App } from "antd";
import { useAuthStore } from "@/src/store/AuthStore";
import { authApi } from "@/src/lib/api/auth";
import { Path } from "@/src/lib/config/Path";

interface ApiErrorResponse {
  message: string;
}

interface RegisterValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export default function RegisterHandler() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { message } = App.useApp();

  const [error, setError] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const submitAction = (values: RegisterValues) => {
    setError("");

    startTransition(async () => {
      try {
        const response = await authApi.register(values);
        setAuth(response.user, response.token);
        router.push(Path.main.dashboard);
        message.success(
          `Registration successfully, welcome ${response.user.firstName}`,
        );
      } catch (err) {
        if (err instanceof AxiosError) {
          const errorMessage =
            (err.response?.data as ApiErrorResponse)?.message ||
            "Registration failed. Please try again.";
          setError(errorMessage);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      }
    });
  };

  return { error, isPending, submitAction };
}
