"use client";

import { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

export function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#2563eb",
            borderRadius: 8,
            fontFamily: "var(--font-geist-sans)",
          },
          components: {
            Button: {
              controlHeight: 40,
              fontSize: 14,
            },
            Input: {
              controlHeight: 40,
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
}
