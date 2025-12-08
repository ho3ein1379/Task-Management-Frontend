import Link from "next/link";
import { Button, Form, Typography } from "antd";

const { Text } = Typography;

interface AuthLinkProps {
  buttonText: string;
  isPending: boolean;
  label: string;
  linkText: string;
  linkHref: string;
}

export default function AuthFooter({
  buttonText,
  isPending,
  label,
  linkText,
  linkHref,
}: AuthLinkProps) {
  return (
    <>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isPending}
          block
          size="large"
        >
          {buttonText}
        </Button>
      </Form.Item>
      <div className="text-center">
        <Text type="secondary">
          {label}{" "}
          <Link
            href={linkHref}
            className="text-blue-600 font-semibold hover:underline"
          >
            {linkText}
          </Link>
        </Text>
      </div>
    </>
  );
}
