import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /**
   * Garante que os source maps sejam gerados para os arquivos JavaScript,
   * o que pode ser útil para depuração de problemas no ambiente de produção,
   * como aqueles relatados pelo Lighthouse.
   */
  productionBrowserSourceMaps: true,

  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
