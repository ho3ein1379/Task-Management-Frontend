"use client";

import { Space, Typography, Tag, Empty, Card } from "antd";
import { Task } from "@/src/types/Index";
import { formatDistanceToNow } from "date-fns";
import TaskStatusBadge from "../tasks/TaskStatusBadge";
import TaskPriorityBadge from "../tasks/TaskPriorityBadge";

const { Text } = Typography;

interface RecentActivityProps {
  tasks: Task[];
}

export default function RecentActivity({ tasks }: RecentActivityProps) {
  if (tasks.length === 0) {
    return <Empty description="No recent activity" />;
  }

  return (
    <Space orientation="vertical" className="w-full" size="middle">
      {tasks.map((task) => (
        <Card key={task.id} size="small" hoverable>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Text strong>{task.title}</Text>
              <TaskStatusBadge status={task.status} />
            </div>
            <div className="flex items-center gap-2">
              <TaskPriorityBadge priority={task.priority} />
              {task.category && <Tag>{task.category.name}</Tag>}
              <Text type="secondary" className="text-xs">
                {formatDistanceToNow(new Date(task.updatedAt), {
                  addSuffix: true,
                })}
              </Text>
            </div>
          </div>
        </Card>
      ))}
    </Space>
  );
}
