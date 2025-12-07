import { useState, useTransition } from "react";
import { AxiosError } from "axios";
import { authApi } from "@/src/lib/api/auth";
import { User } from "@/src/types/Index";

interface ApiErrorResponse {
  message: string;
}

export default function ProfileHandler() {
  const [error, setError] = useState<string>("");
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isPending, startTransition] = useTransition();

  const loadProfile = () => {
    setError("");

    startTransition(async () => {
      try {
        const response = await authApi.getProfile();
        setUserProfile(response);
      } catch (err) {
        if (err instanceof AxiosError) {
          const errorMessage =
            (err.response?.data as ApiErrorResponse)?.message ||
            "Failed to get profile. Please try again.";
          setError(errorMessage);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      }
    });
  };

  return { error, userProfile, isPending, loadProfile };
}
