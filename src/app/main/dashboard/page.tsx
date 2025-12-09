"use client";

import { Alert, Button, Spin } from "antd";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import DashboardCard from "@/src/components/pages/card/dashboard/DashboardCard";
import DashboardHandler from "@/src/components/containers/main/dashboard/DashboardHandler";

export default function Page() {
  const { stats, isPending, error, refetch } = DashboardHandler();

  if (isPending) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <Spin size="large" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <Alert
        title="Error"
        description={error}
        type="error"
        showIcon
        action={
          <Button size="small" onClick={refetch}>
            Retry
          </Button>
        }
      />
    );
  }

  return (
    <DashboardLayout>
      <DashboardCard stats={stats} />
    </DashboardLayout>
  );
}
