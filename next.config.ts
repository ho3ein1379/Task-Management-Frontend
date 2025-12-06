import type { NextConfig } from "next";

const rawUrl = process.env.NEXT_PUBLIC_API_URL || "";
const host = rawUrl.replace("http://", "").replace("https://", "");

const [hostname = "", port = ""] = host.split(":");

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname,
        port,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
