import { useState, useCallback, useTransition } from "react";
import { statsApi } from "@/src/lib/api/stats";
import { Task } from "@/src/types/Index";

export default function StatsHandler() {
  const [upcoming, setUpcoming] = useState<Task[]>([]);
  const [overdue, setOverdue] = useState<Task[]>([]);
  const [recentActivity, setRecentActivity] = useState<Task[]>([]);
  const [isPending, startTransition] = useTransition();

  const loadStats = useCallback(() => {
    startTransition(async () => {
      try {
        const [upcomingData, overdueData, activityData] = await Promise.all([
          statsApi.getUpcoming(5),
          statsApi.getOverdue(),
          statsApi.getRecentActivity(10),
        ]);

        setUpcoming(upcomingData);
        setOverdue(overdueData);
        setRecentActivity(activityData);
      } catch (error) {
        console.error("Failed to load stats:", error);
      }
    });
  }, []);

  return {
    upcoming,
    overdue,
    recentActivity,
    isPending,
    loadStats,
  };
}
