import { Form, Input } from "antd";
import type { Rule } from "antd/es/form";
import { MailOutlined } from "@ant-design/icons";

interface EmailInputProps {
  rules: Rule[];
  autoComplete: string;
}

export default function EmailInput({ rules, autoComplete }: EmailInputProps) {
  return (
    <Form.Item name="email" rules={rules}>
      <Input
        prefix={<MailOutlined />}
        placeholder="Email"
        autoComplete={autoComplete}
      />
    </Form.Item>
  );
}
