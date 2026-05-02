import type { NextConfig } from "next";

function buildContentSecurityPolicy(): string {
  const isDev = process.env.NODE_ENV !== "production";
  const apiUrlRaw = process.env.NEXT_PUBLIC_API_URL;
  let connectOrigin = "";
  if (typeof apiUrlRaw === "string" && apiUrlRaw.trim() !== "") {
    try {
      connectOrigin = ` ${new URL(apiUrlRaw.trim()).origin}`;
    } catch {
      /* ignore invalid NEXT_PUBLIC_API_URL */
    }
  }

  const directives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    `connect-src 'self'${connectOrigin}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ];
  return directives.join("; ");
}

function securityHeaders(): { key: string; value: string }[] {
  const headers: { key: string; value: string }[] = [
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Content-Security-Policy", value: buildContentSecurityPolicy() },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=()",
    },
  ];

  if (process.env.NODE_ENV === "production") {
    headers.push({
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    });
  }

  return headers;
}

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/api-client"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders(),
      },
    ];
  },
};

export default nextConfig;
