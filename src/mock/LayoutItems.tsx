import { usePathname, useRouter } from "next/navigation";
import { Path } from "@/src/lib/config/Path";
import {
  BarChartOutlined,
  CheckSquareOutlined,
  DashboardOutlined,
  FolderOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

interface ItemsProps {
  handleLogout: () => void;
}

export const LayoutItems = ({ handleLogout }: ItemsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isProfilePage = pathname === Path.auth.profile;

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
      icon: (
        <UserOutlined
          style={{ color: isProfilePage ? "#1677ff" : undefined }}
        />
      ),
      label: (
        <span style={{ color: isProfilePage ? "#1677ff" : undefined }}>
          Profile
        </span>
      ),
      onClick: () => router.push(Path.auth.profile),
      style: isProfilePage
        ? { backgroundColor: "#e6f4ff", borderRadius: 6 }
        : {},
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

  return { menuItems, userMenuItems };
};
