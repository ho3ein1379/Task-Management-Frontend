"use client";

import {
  Card,
  Row,
  Col,
  Statistic,
  Progress,
  Spin,
  Typography,
  Alert,
  Button,
} from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  FolderOutlined,
  FileOutlined,
  CloudOutlined,
} from "@ant-design/icons";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import DashboardHandler from "@/src/components/containers/main/DashboardHandler";

const { Title } = Typography;

export default function DashboardPage() {
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
      <div className="space-y-6">
        <Title level={2}>Dashboard</Title>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Tasks"
                value={stats?.overview.totalTasks}
                prefix={<CheckCircleOutlined />}
                styles={{ content: { color: "#3f8600" } }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Categories"
                value={stats?.overview.totalCategories}
                prefix={<FolderOutlined />}
                styles={{ content: { color: "#1890ff" } }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Attachments"
                value={stats?.overview.totalAttachments}
                prefix={<FileOutlined />}
                styles={{ content: { color: "#722ed1" } }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Storage"
                value={stats?.overview.totalStorageMB}
                suffix="MB"
                prefix={<CloudOutlined />}
                styles={{ content: { color: "#faad14" } }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card title="Tasks by Status" className="h-full">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>
                      <ClockCircleOutlined className="mr-2" />
                      To Do
                    </span>
                    <span className="font-semibold">
                      {stats?.tasksByStatus.todo}
                    </span>
                  </div>
                  <Progress
                    percent={
                      stats?.overview.totalTasks
                        ? Math.round(
                            (stats.tasksByStatus.todo /
                              stats.overview.totalTasks) *
                              100,
                          )
                        : 0
                    }
                    strokeColor="#faad14"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>
                      <SyncOutlined spin className="mr-2" />
                      In Progress
                    </span>
                    <span className="font-semibold">
                      {stats?.tasksByStatus.inProgress}
                    </span>
                  </div>
                  <Progress
                    percent={
                      stats?.overview.totalTasks
                        ? Math.round(
                            (stats.tasksByStatus.inProgress /
                              stats.overview.totalTasks) *
                              100,
                          )
                        : 0
                    }
                    strokeColor="#1890ff"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>
                      <CheckCircleOutlined className="mr-2" />
                      Done
                    </span>
                    <span className="font-semibold">
                      {stats?.tasksByStatus.done}
                    </span>
                  </div>
                  <Progress
                    percent={
                      stats?.overview.totalTasks
                        ? Math.round(
                            (stats.tasksByStatus.done /
                              stats.overview.totalTasks) *
                              100,
                          )
                        : 0
                    }
                    strokeColor="#52c41a"
                  />
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="Completion Rate" className="h-full">
              <div className="flex items-center justify-center h-48">
                <Progress
                  type="circle"
                  percent={stats?.overview.completionRate}
                  strokeColor={{
                    "0%": "#108ee9",
                    "100%": "#87d068",
                  }}
                  size={180}
                />
              </div>
              <p className="text-center mt-4 text-gray-500">
                Overall task completion rate
              </p>
            </Card>
          </Col>
        </Row>

        {/* Task Priority */}
        <Card title="Tasks by Priority">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Statistic
                title="High Priority"
                value={stats?.tasksByPriority.high}
                styles={{ content: { color: "#cf1322" } }}
              />
            </Col>
            <Col xs={24} sm={8}>
              <Statistic
                title="Medium Priority"
                value={stats?.tasksByPriority.medium}
                styles={{ content: { color: "#faad14" } }}
              />
            </Col>
            <Col xs={24} sm={8}>
              <Statistic
                title="Low Priority"
                value={stats?.tasksByPriority.low}
                styles={{ content: { color: "#52c41a" } }}
              />
            </Col>
          </Row>
        </Card>
      </div>
    </DashboardLayout>
  );
}
