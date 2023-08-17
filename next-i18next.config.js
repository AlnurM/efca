/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  i18n: {
    locales: ['ru', 'kz', 'en'],
    defaultLocale: 'ru',
    localePath: path.resolve('./public/locales'),
    localeStructure: '{{lng}}/{{ns}}',
  },
}

module.exports = nextConfig
