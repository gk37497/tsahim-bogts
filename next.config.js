/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'joyful-song-ede3e2012b.media.strapiapp.com',
      },
      {
        protocol: 'https',
        hostname: 'tsakhimbogts-strapi-93db2.ondigitalocean.app',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      }
    ],
  },
}

module.exports = nextConfig