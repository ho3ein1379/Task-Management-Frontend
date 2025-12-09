"use client";

import { Space, Typography, Tag, Empty, Card } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { Task } from "@/src/types/Index";
import TaskPriorityBadge from "../tasks/TaskPriorityBadge";
import { format, formatDistanceToNow } from "date-fns";

const { Text } = Typography;

interface OverdueTasksProps {
  tasks: Task[];
}

export default function OverdueTasks({ tasks }: OverdueTasksProps) {
  if (tasks.length === 0) {
    return <Empty description="No overdue tasks. Great job! 🎉" />;
  }

  return (
    <Space orientation="vertical" className="w-full" size="middle">
      {tasks.map((task) => (
        <Card
          key={task.id}
          size="small"
          hoverable
          className="border-l-4 border-red-500"
        >
          <div className="flex items-start gap-3">
            <WarningOutlined className="text-red-500 text-xl mt-1" />
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Text strong className="text-red-600">
                  {task.title}
                </Text>
                <TaskPriorityBadge priority={task.priority} />
              </div>
              <div className="flex items-center gap-2">
                {task.category && <Tag>{task.category.name}</Tag>}
                <Text type="danger" className="text-xs">
                  Was due: {format(new Date(task.dueDate!), "PPP")} (
                  {formatDistanceToNow(new Date(task.dueDate!), {
                    addSuffix: true,
                  })}
                  )
                </Text>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </Space>
  );
}
