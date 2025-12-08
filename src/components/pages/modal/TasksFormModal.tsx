"use client";

import { useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, Space, Button } from "antd";
import { Task, TaskStatus, TaskPriority } from "@/src/types/Index";
import { CreateTaskDto } from "@/src/lib/api/tasks";
import dayjs from "dayjs";

const { TextArea } = Input;

interface TaskFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateTaskDto) => Promise<void>;
  task?: Task | null;
  categories: Array<{ id: string; name: string }>;
  loading?: boolean;
}

export default function TaskFormModal({
  open,
  onClose,
  onSubmit,
  task,
  categories,
  loading,
}: TaskFormModalProps) {
  const [form] = Form.useForm();
  const isEdit = !!task;

  useEffect(() => {
    if (open && task) {
      form.setFieldsValue({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        categoryId: task.categoryId,
        dueDate: task.dueDate ? dayjs(task.dueDate) : undefined,
      });
    } else if (open) {
      form.resetFields();
    }
  }, [open, task, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit({
        ...values,
        dueDate: values.dueDate ? values.dueDate.toISOString() : undefined,
      });
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title={isEdit ? "Edit Task" : "Create New Task"}
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          {isEdit ? "Update" : "Create"}
        </Button>,
      ]}
      width={600}
    >
      <Form form={form} layout="vertical" className="mt-4">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter task title" }]}
        >
          <Input placeholder="Enter task title" size="large" />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <TextArea
            placeholder="Enter task description"
            rows={4}
            showCount
            maxLength={500}
          />
        </Form.Item>

        <Space className="w-full" orientation="vertical" size="middle">
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select placeholder="Select status" size="large">
                <Select.Option value={TaskStatus.TODO}>To Do</Select.Option>
                <Select.Option value={TaskStatus.IN_PROGRESS}>
                  In Progress
                </Select.Option>
                <Select.Option value={TaskStatus.DONE}>Done</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="priority"
              label="Priority"
              rules={[{ required: true, message: "Please select priority" }]}
            >
              <Select placeholder="Select priority" size="large">
                <Select.Option value={TaskPriority.LOW}>Low</Select.Option>
                <Select.Option value={TaskPriority.MEDIUM}>
                  Medium
                </Select.Option>
                <Select.Option value={TaskPriority.HIGH}>High</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="categoryId" label="Category">
              <Select
                placeholder="Select category"
                size="large"
                allowClear
                showSearch={{
                  optionFilterProp:'children'
                }}
              >
                {categories.map((cat) => (
                  <Select.Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="dueDate" label="Due Date">
              <DatePicker
                className="w-full"
                size="large"
                format="YYYY-MM-DD"
                placeholder="Select due date"
              />
            </Form.Item>
          </div>
        </Space>
      </Form>
    </Modal>
  );
}
