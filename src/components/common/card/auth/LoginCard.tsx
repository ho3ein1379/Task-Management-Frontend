import { Alert, Card, Form, Typography } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import LoginHandler from "@/src/components/common/containers/auth/LoginHandler";
import EmailInput from "@/src/components/common/ui/field/EmailInput";
import PasswordInput from "@/src/components/common/ui/field/PasswordInput";
import AuthFooter from "@/src/components/common/ui/AuthFooter";
import { Path } from "@/src/lib/config/Path";
import "@/src/styles/RepeatStyles.css";

const { Title, Text } = Typography;
export default function LoginCard() {
  const [form] = Form.useForm();
  const { error, isPending, submitAction } = LoginHandler();

  return (
    <div className="authRepeatStyles">
      <Card className="w-full max-w-md shadow-2xl">
        <div className="text-center mb-6">
          <LoginOutlined className="text-5xl text-blue-600 mb-2" />
          <Title level={2} className="!mb-1">
            Welcome Back
          </Title>
          <Text type="secondary">Sign in to your account to continue</Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={submitAction}
          size="large"
        >
          <EmailInput
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
            autoComplete="email"
          />

          <PasswordInput
            rules={[{ required: true, message: "Please enter your password" }]}
            autoComplete="current-password"
          />

          <AuthFooter
            buttonText="Sign In"
            isPending={isPending}
            label="Do not have an account?"
            linkHref={Path.auth.register}
            linkText="Sign up"
          />
        </Form>

        {error && (
          <Alert title={error} type="error" showIcon className="mb-4" />
        )}

      </Card>
    </div>
  );
}
