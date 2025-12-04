"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Row,
  Col,
  Typography,
  Empty,
  Spin,
  Modal,
  Pagination,
} from "antd";
import { PlusOutlined, ExclamationCircleFilled } from "@ant-design/icons";

import { Task } from "@/src/types/Index";
import { TaskFilters } from "@/src/lib/api/tasks";
import TasksHandlers from "@/src/components/common/containers/main/TasksHandlers";
import CategoriesHandler from "@/src/components/common/containers/main/CategoriesHandler";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import TasksFilter from "@/src/components/common/card/tasks/TasksFilter";
import TaskCard from "@/src/components/common/card/tasks/TaskCard";
import TaskFormModal from "@/src/components/common/modal/TasksFormModal";

const { Title } = Typography;
const { confirm } = Modal;

export default function Page() {
  const {
    tasks,
    pagination,
    isPending,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
  } = TasksHandlers();

  const { categories, loadCategories } = CategoriesHandler();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<TaskFilters>({});

  useEffect(() => {
    loadTasks();
    loadCategories();
  }, [loadTasks, loadCategories]);

  const handleFilter = (newFilters: TaskFilters) => {
    setFilters(newFilters);
    loadTasks(newFilters);
  };

  const handlePageChange = (page: number, pageSize: number) => {
    loadTasks({ ...filters, page, limit: pageSize });
  };

  const handleCreate = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = (task: Task) => {
    confirm({
      title: "Delete Task",
      icon: <ExclamationCircleFilled />,
      content: `Are you sure you want to delete "${task.title}"?`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        await deleteTask(task.id);
      },
    });
  };

  const handleSubmit = async (values: Parameters<typeof createTask>[0]) => {
    if (selectedTask) {
      await updateTask(selectedTask.id, values);
    } else {
      await createTask(values);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Title level={2} className="!mb-0">
            Tasks
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={handleCreate}
          >
            New Task
          </Button>
        </div>

        <TasksFilter onFilter={handleFilter} loading={isPending} />

        {isPending ? (
          <div className="flex justify-center items-center h-96">
            <Spin size="large" />
          </div>
        ) : tasks.length === 0 ? (
          <Empty
            description={
              Object.keys(filters).length > 0
                ? "No tasks found with current filters"
                : "No tasks yet. Create your first task!"
            }
            className="my-16"
          >
            {Object.keys(filters).length === 0 && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleCreate}
              >
                Create Task
              </Button>
            )}
          </Empty>
        ) : (
          <>
            <Row gutter={[16, 16]}>
              {tasks.map((task) => (
                <Col xs={24} sm={12} lg={8} xl={6} key={task.id}>
                  <TaskCard
                    task={task}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </Col>
              ))}
            </Row>

            {pagination.totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <Pagination
                  current={pagination.page}
                  total={pagination.total}
                  pageSize={10}
                  onChange={handlePageChange}
                  showSizeChanger
                  showTotal={(total) => `Total ${total} tasks`}
                />
              </div>
            )}
          </>
        )}
      </div>

      <TaskFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        task={selectedTask}
        categories={categories}
      />
    </DashboardLayout>
  );
}
