import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/proof", destination: "/validation", permanent: true },
      { source: "/deployments", destination: "/projects", permanent: true },
      {
        source: "/deployments/:slug",
        destination: "/projects/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
