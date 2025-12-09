"use client";

import { useState } from "react";
import { Button, Row, Col, Typography, Empty, Spin, Input } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import CategoryCard from "@/src/components/pages/card/categories/CategoryCard";
import CategoryFormModal from "@/src/components/pages/modal/CategoryFormModal";
import CategoryHelperHandlers from "@/src/components/containers/main/category/CategoryHelperHandlers";

const { Title } = Typography;
const { Search } = Input;

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    categoryStats,
    selectedCategory,
    isPending,
    handleCreate,
    handleEdit,
    handleDelete,
    handleSubmit,
    filteredCategories,
  } = CategoryHelperHandlers({ setIsModalOpen, searchTerm });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <Title level={2} className="!mb-0">
            Categories
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={handleCreate}
          >
            New Category
          </Button>
        </div>

        <Search
          placeholder="Search categories..."
          allowClear
          size="large"
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: 400 }}
        />

        {isPending ? (
          <div className="flex justify-center items-center h-96">
            <Spin size="large" />
          </div>
        ) : filteredCategories.length === 0 ? (
          <Empty
            description={
              searchTerm
                ? "No categories found"
                : "No categories yet. Create your first category!"
            }
            className="my-16"
          >
            {!searchTerm && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleCreate}
              >
                Create Category
              </Button>
            )}
          </Empty>
        ) : (
          <Row gutter={[16, 16]}>
            {filteredCategories.map((category) => (
              <Col xs={24} sm={12} lg={8} xl={6} key={category.id}>
                <CategoryCard
                  category={category}
                  taskCount={categoryStats[category.id] || 0}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </Col>
            ))}
          </Row>
        )}
      </div>

      <CategoryFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        category={selectedCategory}
      />
    </DashboardLayout>
  );
}
