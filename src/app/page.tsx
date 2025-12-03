"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { useAuthStore } from "@/src/lib/store/AuthStore";
import { Path } from "@/src/lib/config/Path";

export default function Page() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push(Path.main.dashboard);
    } else {
      router.push(Path.auth.login);
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spin size="large" />
    </div>
  );
}
