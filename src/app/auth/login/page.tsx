"use client";

import Link from "next/link";
import { Form, Input, Button, Card, Typography, Alert } from "antd";
import { LoginOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import LoginHandler from "@/src/components/containers/auth/LoginHandler";
import { Path } from "@/src/lib/config/Path";

const { Title, Text } = Typography;

export default function LoginPage() {
  const [form] = Form.useForm();

  const { error, loading, handleSubmit } = LoginHandler();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <div className="text-center mb-6">
          <LoginOutlined className="text-5xl text-blue-600 mb-2" />
          <Title level={2} className="!mb-1">
            Welcome Back
          </Title>
          <Text type="secondary">Sign in to your account to continue</Text>
        </div>

        {error && (
          <Alert title={error} type="error" showIcon className="mb-4" />
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="middle"
            >
              Sign In
            </Button>
          </Form.Item>

          <div className="text-center">
            <Text type="secondary">
              Do not have an account?{" "}
              <Link
                href={Path.auth.register}
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign up
              </Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
}
