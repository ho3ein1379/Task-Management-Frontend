"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Layout, Menu, Avatar, Dropdown, Space, Typography } from "antd";
import {
  DashboardOutlined,
  CheckSquareOutlined,
  FolderOutlined,
  BarChartOutlined,
  LogoutOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useAuthStore } from "@/src/lib/store/AuthStore";
import { Path } from "@/src/lib/config/Path";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    router.push(Path.auth.login);
  };

  const menuItems = [
    {
      key: Path.main.dashboard,
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => router.push(Path.main.dashboard),
    },
    {
      key: Path.main.tasks,
      icon: <CheckSquareOutlined />,
      label: "Tasks",
      onClick: () => router.push(Path.main.tasks),
    },
    {
      key: Path.main.categories,
      icon: <FolderOutlined />,
      label: "Categories",
      onClick: () => router.push(Path.main.categories),
    },
    {
      key: Path.main.stats,
      icon: <BarChartOutlined />,
      label: "Statistics",
      onClick: () => router.push(Path.main.stats),
    },
  ];

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: () => {},
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: collapsed ? 16 : 20,
            fontWeight: "bold",
          }}
        >
          {collapsed ? "📋" : "📋 Task Manager"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
        />
      </Sider>

      <Layout
        style={{ marginLeft: collapsed ? 80 : 200, transition: "all 0.2s" }}
      >
        <Header
          style={{
            padding: "0 24px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 1px 4px rgba(0,21,41,.08)",
          }}
        >
          <div>
            {collapsed ? (
              <MenuUnfoldOutlined
                className="text-lg cursor-pointer"
                onClick={() => setCollapsed(false)}
              />
            ) : (
              <MenuFoldOutlined
                className="text-lg cursor-pointer"
                onClick={() => setCollapsed(true)}
              />
            )}
          </div>

          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Space className="cursor-pointer">
              <Avatar icon={<UserOutlined />} />
              <Text strong>
                {user?.firstName} {user?.lastName}
              </Text>
            </Space>
          </Dropdown>
        </Header>

        <Content style={{ margin: "24px", minHeight: 280 }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
