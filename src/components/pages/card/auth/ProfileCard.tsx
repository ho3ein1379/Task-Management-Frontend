import { useEffect } from "react";
import { Card, Descriptions, Spin, Typography } from "antd";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import ProfileHandler from "@/src/components/containers/auth/ProfileHandler";

const { Title } = Typography;

export default function ProfileCard() {
  const { error, userProfile, isPending, loadProfile } = ProfileHandler();

  useEffect(() => {
    loadProfile();
  }, []);

  if (isPending) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <Spin size="large" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">{error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Title level={2}>User Profile</Title>

        <Card>
          <Descriptions title="Profile Information" bordered column={1}>
            <Descriptions.Item label="First Name">
              {userProfile?.firstName}
            </Descriptions.Item>
            <Descriptions.Item label="Last Name">
              {userProfile?.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Full Name">
              {userProfile?.firstName} {userProfile?.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {userProfile?.email}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </DashboardLayout>
  );
}
