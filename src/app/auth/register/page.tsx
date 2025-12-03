"use client";

import Link from "next/link";
import { Form, Input, Button, Card, Typography, Alert, Row, Col } from "antd";
import {
  UserAddOutlined,
  MailOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Path } from "@/src/lib/config/Path";
import RegisterHandler from "@/src/components/containers/auth/RegisterHandler";

const { Title, Text } = Typography;

export default function RegisterPage() {
  const [form] = Form.useForm();

  const { error, isPending, submitAction } = RegisterHandler();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4 cursor-default">
      <Card className="w-full max-w-md shadow-2xl">
        <div className="text-center mb-6">
          <UserAddOutlined className="text-5xl text-blue-600 mb-2" />
          <Title level={2} className="!mb-1">
            Create Account
          </Title>
          <Text type="secondary">Sign up to get started</Text>
        </div>

        {error && (
          <Alert title={error} type="error" showIcon className="mb-4" />
        )}

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
            rules={[
              { required: true, message: "Please enter a password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
            help="Minimum 6 characters"
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
              block
              size="large"
            >
              Sign Up
            </Button>
          </Form.Item>

          <div className="text-center">
            <Text type="secondary">
              Already have an account?{" "}
              <Link
                href={Path.auth.login}
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign in
              </Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
}
