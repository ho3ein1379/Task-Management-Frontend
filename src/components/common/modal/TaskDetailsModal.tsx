"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { Modal, Descriptions, Tag, Spin, Tabs } from "antd";
import { format } from "date-fns";
import { Task } from "@/src/types/Index";
import { uploadApi } from "@/src/lib/api/upload";
import { Attachment } from "@/src/types/Index";
import TaskStatusBadge from "@/src/components/common/card/tasks/TaskStatusBadge";
import TaskPriorityBadge from "@/src/components/common/card/tasks/TaskPriorityBadge";
import TaskUpload from "@/src/components/common/card/tasks/TaskUpload";

interface TaskDetailsModalProps {
  open: boolean;
  onClose: () => void;
  task: Task | null;
}

export default function TaskDetailsModal({
  open,
  onClose,
  task,
}: TaskDetailsModalProps) {
  const [isPending, startTransition] = useTransition();

  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const loadAttachments = useCallback(() => {
    if (!task) return;

    startTransition(async () => {
      try {
        const data = await uploadApi.getTaskAttachments(task.id);
        setAttachments(data);
      } catch (error) {
        console.error("Failed to load attachments:", error);
      }
    });
  }, [task]);

  useEffect(() => {
    if (open && task) {
      loadAttachments();
    }
  }, [loadAttachments, open, task]);

  if (!task) return null;

  const items = [
    {
      key: "details",
      label: "Details",
      children: (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Title">{task.title}</Descriptions.Item>
          {task.description && (
            <Descriptions.Item label="Description">
              {task.description}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Status">
            <TaskStatusBadge status={task.status} />
          </Descriptions.Item>
          <Descriptions.Item label="Priority">
            <TaskPriorityBadge priority={task.priority} />
          </Descriptions.Item>
          {task.category && (
            <Descriptions.Item label="Category">
              <Tag>{task.category.name}</Tag>
            </Descriptions.Item>
          )}
          {task.dueDate && (
            <Descriptions.Item label="Due Date">
              {format(new Date(task.dueDate), "PPP")}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Created">
            {format(new Date(task.createdAt), "PPP")}
          </Descriptions.Item>
          <Descriptions.Item label="Last Updated">
            {format(new Date(task.updatedAt), "PPP")}
          </Descriptions.Item>
        </Descriptions>
      ),
    },
    {
      key: "attachments",
      label: `Attachments (${attachments.length})`,
      children: isPending ? (
        <div className="flex justify-center py-8">
          <Spin />
        </div>
      ) : (
        <TaskUpload
          taskId={task.id}
          attachments={attachments}
          onUploadSuccess={loadAttachments}
        />
      ),
    },
  ];

  return (
    <Modal
      title="Task Details"
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
      className="cursor-default"
    >
      <Tabs items={items} />
    </Modal>
  );
}
