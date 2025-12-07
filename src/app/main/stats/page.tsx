"use client";

import { useEffect } from "react";
import { Card, Row, Col, Typography, Spin, Tabs } from "antd";
import {
  CalendarOutlined,
  WarningOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import UpcomingTasks from "@/src/components/common/card/stats/UpcomingTasks";
import OverdueTasks from "@/src/components/common/card/stats/OverdueTasks";
import RecentActivity from "@/src/components/common/card/stats/RecentActivity";
import StatsHandler from "@/src/components/common/containers/main/stats/StatsHandler";

const { Title } = Typography;

export default function Page() {
  const { upcoming, overdue, recentActivity, isPending, loadStats } =
    StatsHandler();

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  if (isPending) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <Spin size="large" />
        </div>
      </DashboardLayout>
    );
  }

  const items = [
    {
      key: "upcoming",
      label: (
        <span>
          <CalendarOutlined /> Upcoming ({upcoming.length})
        </span>
      ),
      children: (
        <Card>
          <UpcomingTasks tasks={upcoming} />
        </Card>
      ),
    },
    {
      key: "overdue",
      label: (
        <span>
          <WarningOutlined /> Overdue ({overdue.length})
        </span>
      ),
      children: (
        <Card>
          <OverdueTasks tasks={overdue} />
        </Card>
      ),
    },
    {
      key: "activity",
      label: (
        <span>
          <HistoryOutlined /> Recent Activity
        </span>
      ),
      children: (
        <Card>
          <RecentActivity tasks={recentActivity} />
        </Card>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Title level={2}>Statistics</Title>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card className="text-center">
              <CalendarOutlined className="text-4xl text-blue-500 mb-2" />
              <Title level={3} className="!mb-0">
                {upcoming.length}
              </Title>
              <p className="text-gray-500">Upcoming Tasks</p>
            </Card>
          </Col>

          <Col xs={24} sm={8}>
            <Card className="text-center">
              <WarningOutlined className="text-4xl text-red-500 mb-2" />
              <Title level={3} className="!mb-0">
                {overdue.length}
              </Title>
              <p className="text-gray-500">Overdue Tasks</p>
            </Card>
          </Col>

          <Col xs={24} sm={8}>
            <Card className="text-center">
              <HistoryOutlined className="text-4xl text-green-500 mb-2" />
              <Title level={3} className="!mb-0">
                {recentActivity.length}
              </Title>
              <p className="text-gray-500">Recent Activities</p>
            </Card>
          </Col>
        </Row>

        <Tabs items={items} />
      </div>
    </DashboardLayout>
  );
}
