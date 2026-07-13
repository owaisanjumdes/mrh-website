import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Stop browsers from MIME-sniffing responses into executable types.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Disallow embedding the site in third-party frames (clickjacking).
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Send only the origin when navigating cross-origin.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // The site never needs these browser capabilities.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          // Enforce HTTPS on repeat visits (no-op over plain HTTP in dev).
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
        ],
      },
    ];
  },
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
