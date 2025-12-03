import { Tag } from "antd";
import {
  ClockCircleOutlined,
  SyncOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { TaskStatus } from "@/src/types/Index";

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

export default function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const statusConfig = {
    [TaskStatus.TODO]: {
      color: "default",
      icon: <ClockCircleOutlined />,
      text: "To Do",
    },
    [TaskStatus.IN_PROGRESS]: {
      color: "processing",
      icon: <SyncOutlined spin />,
      text: "In Progress",
    },
    [TaskStatus.DONE]: {
      color: "success",
      icon: <CheckCircleOutlined />,
      text: "Done",
    },
  };

  const config = statusConfig[status];

  return (
    <Tag color={config.color} icon={config.icon}>
      {config.text}
    </Tag>
  );
}
