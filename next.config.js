/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    domains: ['m.media-amazon.com']
  }
}

module.exports = nextConfig
