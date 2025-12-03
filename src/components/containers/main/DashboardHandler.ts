import { useEffect, useState, useTransition, useCallback } from "react";
import { statsApi } from "@/src/lib/api/stats";
import { Stats } from "@/src/types/Index";

export default function DashboardHandler() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const loadStats = useCallback(() => {
    setError("");
    startTransition(async () => {
      try {
        const data = await statsApi.getOverview();
        setStats(data);
      } catch (err) {
        console.error("Failed to load stats:", err);
        setError("Failed to load statistics. Please try again.");
      }
    });
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return { stats, isPending, error, refetch: loadStats };
}
