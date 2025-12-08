import { Form, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";
import type { Rule } from "antd/es/form";

interface PasswordInputProps {
  rules: Rule[];
  helpText?: string;
  autoComplete: string;
}

export default function PasswordInput({
  rules,
  helpText,
  autoComplete,
}: PasswordInputProps) {
  return (
    <Form.Item name="password" rules={rules} help={helpText}>
      <Input.Password
        prefix={<LockOutlined />}
        placeholder="Password"
        autoComplete={autoComplete}
      />
    </Form.Item>
  );
}
