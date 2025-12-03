import { Alert, Card, Col, Form, Input, Row, Typography } from "antd";
import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import RegisterHandler from "@/src/components/common/containers/auth/RegisterHandler";
import EmailInput from "@/src/components/common/ui/field/EmailInput";
import PasswordInput from "@/src/components/common/ui/field/PasswordInput";
import AuthFooter from "@/src/components/common/ui/AuthFooter";
import { Path } from "@/src/lib/config/Path";
import "@/src/styles/RepeatStyles.css";

const { Title, Text } = Typography;

export default function RegisterCard() {
  const [form] = Form.useForm();
  const { error, isPending, submitAction } = RegisterHandler();

  return (
    <div className="authRepeatStyles">
      <Card className="w-full max-w-md shadow-2xl">
        <div className="text-center mb-6">
          <UserAddOutlined className="text-5xl text-blue-600 mb-2" />
          <Title level={2} className="!mb-1">
            Create Account
          </Title>
          <Text type="secondary">Sign up to get started</Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={submitAction}
          size="large"
        >
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                rules={[{ required: true, message: "Required" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                rules={[{ required: true, message: "Required" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Last Name" />
              </Form.Item>
            </Col>
          </Row>

          <EmailInput
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
            autoComplete="email"
          />

          <PasswordInput
            rules={[
              { required: true, message: "Please enter a password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
            helpText="Minimum 6 characters"
            autoComplete="new-password"
          />

          <AuthFooter
            buttonText="Sign Up"
            isPending={isPending}
            label="Already have an account?"
            linkHref={Path.auth.login}
            linkText="Sign in"
          />
        </Form>

        {error && (
          <Alert title={error} type="error" showIcon className="mb-4" />
        )}
      </Card>
    </div>
  );
}
