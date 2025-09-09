/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '7500',
        pathname: '/api/images/**',
      },
    ],
  },
};

export default nextConfig;
