"use client";

import { Form, Input, Select, Button, Space, Row, Col } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import { TaskStatus, TaskPriority } from "@/src/types/Index";
import { TaskFilters } from "@/src/lib/api/tasks";

interface TasksFilterProps {
  onFilter: (filters: TaskFilters) => void;
  loading?: boolean;
}

export default function TasksFilter({ onFilter, loading }: TasksFilterProps) {
  const [form] = Form.useForm();

  const handleFilter = () => {
    const values = form.getFieldsValue();
    onFilter(values);
  };

  const handleReset = () => {
    form.resetFields();
    onFilter({});
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFilter}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Form.Item name="search" className="mb-0">
            <Input
              placeholder="Search tasks..."
              prefix={<SearchOutlined />}
              size="large"
              allowClear
              onPressEnter={handleFilter}
            />
          </Form.Item>
        </Col>

        <Col xs={12} md={5}>
          <Form.Item name="status" className="mb-0">
            <Select
              placeholder="Status"
              size="large"
              allowClear
              onChange={handleFilter}
            >
              <Select.Option value={TaskStatus.TODO}>To Do</Select.Option>
              <Select.Option value={TaskStatus.IN_PROGRESS}>
                In Progress
              </Select.Option>
              <Select.Option value={TaskStatus.DONE}>Done</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={12} md={5}>
          <Form.Item name="priority" className="mb-0">
            <Select
              placeholder="Priority"
              size="large"
              allowClear
              onChange={handleFilter}
            >
              <Select.Option value={TaskPriority.LOW}>Low</Select.Option>
              <Select.Option value={TaskPriority.MEDIUM}>Medium</Select.Option>
              <Select.Option value={TaskPriority.HIGH}>High</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} md={6}>
          <Space>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              size="large"
              onClick={handleFilter}
              loading={loading}
            >
              Filter
            </Button>
            <Button
              icon={<ReloadOutlined />}
              size="large"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
}
