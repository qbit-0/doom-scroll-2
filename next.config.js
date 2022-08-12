/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // experimental: {
  //   images: {
  //     remotePatterns: [
  //       {
  //         protocol: "https",
  //         hostname: "**",
  //       },
  //       {
  //         protocol: "http",
  //         hostname: "**",
  //       },
  //     ],
  //   },
  // },
};

module.exports = nextConfig;
