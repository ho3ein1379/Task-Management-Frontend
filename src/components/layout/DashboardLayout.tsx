"use client";

import { ReactNode, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Space,
  Typography,
  App,
  Grid,
  Drawer,
} from "antd";
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useAuthStore } from "@/src/lib/store/AuthStore";
import { Path } from "@/src/lib/config/Path";
import { LayoutItems } from "@/src/mock/LayoutItems";
import "@/src/styles/Antdstyles.css";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { message } = App.useApp();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const [collapsed, setCollapsed] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleLogout = () => {
    logout();
    message.success(`Logout successfully`);
    router.push(Path.auth.login);
  };

  const { menuItems, userMenuItems } = LayoutItems({ handleLogout });

  return (
    <Layout style={{ minHeight: "100vh" }} className="cursor-default">
      {isMobile ? (
        <>
          <Drawer
            open={drawerVisible}
            placement="left"
            closable={false}
            styles={{
              body: { padding: 0 },
            }}
            className="drawerStyle"
            onClose={() => setDrawerVisible(false)}
          >
            <div
              style={{
                padding: "0 24px",
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "white",
                backgroundColor: "#001529",
                fontSize: drawerVisible ? 20 : 16,
                fontWeight: "bold",
              }}
            >
              {drawerVisible ? "📋 Task Manager" : "📋"}
              <MenuFoldOutlined
                className="text-lg cursor-pointer"
                onClick={() => setDrawerVisible(false)}
              />
            </div>
            <Menu
              theme="dark"
              className="h-full"
              mode="inline"
              selectedKeys={[pathname]}
              items={menuItems}
            />
          </Drawer>

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
            <MenuUnfoldOutlined
              className="text-lg cursor-pointer"
              onClick={() => setDrawerVisible(true)}
            />

            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space className="cursor-pointer">
                <Avatar icon={<UserOutlined />} />
                <Text strong>
                  {user?.firstName} {user?.lastName}
                </Text>
              </Space>
            </Dropdown>
          </Header>
        </>
      ) : (
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
      )}

      <Layout
        style={{
          marginLeft: isMobile ? 0 : collapsed ? 80 : 200,
          transition: "all 0.3s",
        }}
      >
        <Header
          style={{
            padding: "0 24px",
            background: "#fff",
            display: isMobile ? "none" : "flex",
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
        <App>
          <Content style={{ margin: "24px", minHeight: 280 }}>
            {children}
          </Content>
        </App>
      </Layout>
    </Layout>
  );
}
