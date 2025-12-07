"use client";

import { Space, Typography, Tag, Empty, Card } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { format, formatDistanceToNow } from "date-fns";
import { Task } from "@/src/types/Index";
import TaskPriorityBadge from "../tasks/TaskPriorityBadge";

const { Text } = Typography;

interface UpcomingTasksProps {
  tasks: Task[];
}

export default function UpcomingTasks({ tasks }: UpcomingTasksProps) {
  if (tasks.length === 0) {
    return <Empty description="No upcoming tasks" />;
  }

  return (
    <Space orientation="vertical" className="w-full" size="middle">
      {tasks.map((task) => (
        <Card key={task.id} size="small" hoverable>
          <div className="flex items-start gap-3">
            <CalendarOutlined className="text-blue-500 text-xl mt-1" />
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Text strong>{task.title}</Text>
                <TaskPriorityBadge priority={task.priority} />
              </div>
              <div className="flex items-center gap-2">
                {task.category && <Tag>{task.category.name}</Tag>}
                <Text type="secondary" className="text-xs">
                  Due: {format(new Date(task.dueDate!), "PPP")} (
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
