/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', '127.0.0.1:3000', 'anotherdomain.com'],
  },
};

module.exports = nextConfig;
