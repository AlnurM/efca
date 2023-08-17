/** @type {import('next').NextConfig} */
const path = require('path')
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  i18n,
  reactStrictMode: false,
  swcMinify: false,
  env: {
    BASE_URL: 'http://194.4.56.53/api'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '194.4.56.53',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },
}

module.exports = nextConfig
