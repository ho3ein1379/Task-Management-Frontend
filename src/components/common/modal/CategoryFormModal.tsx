"use client";

import { useEffect } from "react";
import { Modal, Form, Input, Button, Space } from "antd";
import { Category } from "@/src/types/Index";
import { CreateCategoryDto } from "@/src/lib/api/categories";

const { TextArea } = Input;

interface CategoryFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateCategoryDto) => Promise<void>;
  category?: Category | null;
  loading?: boolean;
}

const PRESET_COLORS = [
  "#1890ff",
  "#52c41a",
  "#faad14",
  "#f5222d",
  "#722ed1",
  "#eb2f96",
  "#13c2c2",
  "#fa8c16",
];

export default function CategoryFormModal({
  open,
  onClose,
  onSubmit,
  category,
  loading,
}: CategoryFormModalProps) {
  const [form] = Form.useForm();
  const isEdit = !!category;

  useEffect(() => {
    if (open && category) {
      form.setFieldsValue({
        name: category.name,
        description: category.description,
        color: category.color,
      });
    } else if (open) {
      form.resetFields();
    }
  }, [open, category, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      destroyOnHidden
      title={isEdit ? "Edit Category" : "Create New Category"}
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
      width={500}
    >
      <Form form={form} layout="vertical" className="mt-4">
        <Form.Item
          name="name"
          label="Category Name"
          rules={[
            { required: true, message: "Please enter category name" },
            { max: 50, message: "Name must be less than 50 characters" },
          ]}
        >
          <Input placeholder="Enter category name" size="large" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              max: 200,
              message: "Description must be less than 200 characters",
            },
          ]}
        >
          <TextArea
            placeholder="Enter category description (optional)"
            rows={3}
            showCount
            maxLength={200}
          />
        </Form.Item>

        <Form.Item name="color" hidden>
          <Input />
        </Form.Item>

        <Form.Item
          label="Color"
          extra="Choose a color for this category"
          shouldUpdate
        >
          {() => {
            const colorValue = form.getFieldValue("color") || "";

            return (
              <div className="space-y-3">
                <div className="flex gap-2 flex-wrap">
                  {PRESET_COLORS.map((color) => {
                    const active = colorValue === color;

                    return (
                      <button
                        key={color}
                        type="button"
                        className="w-10 h-10 rounded-full border-2 hover:scale-110 transition-transform"
                        style={{
                          backgroundColor: color,
                          borderColor: active ? "#000" : "#d9d9d9",
                        }}
                        onClick={() => form.setFieldValue("color", color)}
                      />
                    );
                  })}
                </div>

                <Space.Compact style={{ width: "100%" }}>
                  <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-lg bg-gray-50">
                    <div
                      className="w-6 h-6 rounded border"
                      style={{
                        backgroundColor: colorValue || "#1890ff",
                      }}
                    />
                  </div>

                  <Input
                    name="color"
                    placeholder="#1890ff"
                    value={colorValue}
                    onChange={(e) =>
                      form.setFieldValue("color", e.target.value)
                    }
                    className="flex-1"
                  />
                </Space.Compact>
              </div>
            );
          }}
        </Form.Item>
      </Form>
    </Modal>
  );
}
