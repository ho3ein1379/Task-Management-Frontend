"use client";

import { useState } from "react";
import { Button, Row, Col, Typography, Empty, Spin, Pagination } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import TasksFilter from "@/src/components/pages/card/tasks/TasksFilter";
import TaskCard from "@/src/components/pages/card/tasks/TaskCard";
import TaskFormModal from "@/src/components/pages/modal/TasksFormModal";
import TaskHelperHandlers from "@/src/components/containers/main/task/TaskHelperHandlers";
import TaskDetailsModal from "@/src/components/pages/modal/TaskDetailsModal";

const { Title } = Typography;

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const {
    selectedTask,
    filters,
    viewTask,
    tasks,
    pagination,
    isPending,
    categories,
    handleFilter,
    handlePageChange,
    handleCreate,
    handleEdit,
    handleView,
    handleDelete,
    handleSubmit,
  } = TaskHelperHandlers({ setIsModalOpen, setIsDetailsModalOpen });

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
                    onView={handleView}
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
      <TaskDetailsModal
        open={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        task={viewTask}
      />
    </DashboardLayout>
  );
}
