"use client";

import { Card, Space, Typography, Button, Tag } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import { format } from "date-fns";
import { Category } from "@/src/types/Index";

const { Text, Paragraph } = Typography;

interface CategoryCardProps {
  category: Category;
  taskCount?: number;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export default function CategoryCard({
  category,
  taskCount = 0,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  return (
    <Card
      className="h-full"
      actions={[
        <Button
          key="edit"
          type="text"
          icon={<EditOutlined />}
          onClick={() => onEdit(category)}
        >
          Edit
        </Button>,
        <Button
          key="delete"
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onDelete(category)}
        >
          Delete
        </Button>,
      ]}
    >
      <Space orientation="vertical" className="w-full" size="middle">
        <div className="flex items-center justify-between">
          <Space>
            <FolderOutlined
              style={{ fontSize: 24, color: category.color || "#1890ff" }}
            />
            <Text strong className="text-lg">
              {category.name}
            </Text>
          </Space>
          {category.color && (
            <div
              className="w-6 h-6 rounded-full border-2 border-gray-200"
              style={{ backgroundColor: category.color }}
            />
          )}
        </div>

        {category.description && (
          <Paragraph
            ellipsis={{ rows: 2 }}
            className="text-gray-600 mb-0"
            style={{ minHeight: "3em" }}
          >
            {category.description}
          </Paragraph>
        )}

        <div className="flex items-center justify-between">
          <Tag color="blue">{taskCount} Tasks</Tag>
          <Text type="secondary" className="text-xs">
            Created: {format(new Date(category.createdAt), "MMM dd, yyyy")}
          </Text>
        </div>
      </Space>
    </Card>
  );
}
