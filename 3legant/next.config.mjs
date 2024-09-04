/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    const allowedOrigins = [
      "https://3legant-sepia.vercel.app",
      "https://3legant-git-main-chayuds-projects.vercel.app",
      "https://3legant-exwg6w1bm-chayuds-projects.vercel.app",
    ]; // กำหนด ตัว origin ในนี้ว่า domain ไหนบ้าง ที่สามารถ access ตัว api endpoint ใน api handler ได้

    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: (req) => {
              const origin = req.headers.origin;
              if (allowedOrigins.includes(origin)) {
                return origin;
              }
              return allowedOrigins[0]; // Default origin if none match
            },
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
