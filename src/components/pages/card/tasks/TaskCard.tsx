"use client";

import { Card, Space, Typography, Button, Dropdown, Tag } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  CalendarOutlined,
  FolderOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { format } from "date-fns";
import TaskStatusBadge from "@/src/components/pages/card/tasks/TaskStatusBadge";
import TaskPriorityBadge from "@/src/components/pages/card/tasks/TaskPriorityBadge";
import { Task } from "@/src/types/Index";
import "@/src/styles/Antdstyles.css";

const { Text, Paragraph } = Typography;

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onView: (task: Task) => void;
}

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onView,
}: TaskCardProps) {
  const menuItems = [
    {
      key: "edit",
      icon: <EditOutlined />,
      label: "Edit",
      onClick: () => onEdit(task),
    },
    {
      type: "divider" as const,
    },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      label: "Delete",
      danger: true,
      onClick: () => onDelete(task),
    },
  ];

  return (
    <Card
      className="h-full"
      actions={[
        <Button
          key="view"
          type="text"
          icon={<EyeOutlined />}
          onClick={() => onView(task)}
        >
          View
        </Button>,
        <Button
          key="edit"
          type="text"
          icon={<EditOutlined />}
          onClick={() => onEdit(task)}
        >
          Edit
        </Button>,
        <Button
          key="delete"
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onDelete(task)}
        >
          Delete
        </Button>,
      ]}
      extra={
        <Dropdown menu={{ items: menuItems }} trigger={["hover"]}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      }
    >
      <Space orientation="vertical" className="w-full" size="middle">
        <div>
          <Text strong className="text-lg">
            {task.title}
          </Text>
        </div>

        {task.description && (
          <Paragraph
            ellipsis={{ rows: 2 }}
            className="text-gray-600 mb-0"
            style={{ minHeight: "3em" }}
          >
            {task.description}
          </Paragraph>
        )}

        <Space wrap>
          <TaskStatusBadge status={task.status} />
          <TaskPriorityBadge priority={task.priority} />
        </Space>

        <Space orientation="vertical" size="small" className="w-full">
          {task.category && (
            <Space size="small">
              <FolderOutlined className="text-gray-400" />
              <Tag>{task.category.name}</Tag>
            </Space>
          )}

          {task.dueDate && (
            <Space size="small">
              <CalendarOutlined className="text-gray-400" />
              <Text type="secondary" className="text-sm">
                Due: {format(new Date(task.dueDate), "MMM dd, yyyy")}
              </Text>
            </Space>
          )}
        </Space>

        <div className="text-xs text-gray-400">
          Created: {format(new Date(task.createdAt), "MMM dd, yyyy")}
        </div>
      </Space>
    </Card>
  );
}
