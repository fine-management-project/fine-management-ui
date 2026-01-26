import type { NextConfig } from "next";

import { config } from "dotenv";
import path from "path";

config({ path: path.resolve(process.cwd(), ".env") });

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
