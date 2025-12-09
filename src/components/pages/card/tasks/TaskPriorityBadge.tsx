import { Tag } from "antd";
import { TaskPriority } from "@/src/types/Index";

interface TaskPriorityBadgeProps {
  priority: TaskPriority;
}

export default function TaskPriorityBadge({
  priority,
}: TaskPriorityBadgeProps) {
  const priorityConfig = {
    [TaskPriority.LOW]: {
      color: "success",
      text: "Low",
    },
    [TaskPriority.MEDIUM]: {
      color: "warning",
      text: "Medium",
    },
    [TaskPriority.HIGH]: {
      color: "error",
      text: "High",
    },
  };

  const config = priorityConfig[priority];

  return <Tag color={config.color}>{config.text}</Tag>;
}
