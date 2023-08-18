import { api } from '@/shared/api'
const baseUrl = 'https://efca.vercel.app'
const pages = [
  'about-us',
  'benefits',
  'contacts',
  'faq',
  'grants-competetions',
  'projects',
  'success-stories',
  'researches',
  'team',
  'vacancy',
]

const generateSiteMap = ({ 
  vacancies,
  contests
}) => {
  const { i18n } = require('next-i18next.config')
  const locales = i18n.locales
  const basePaths = locales.flatMap((locale) =>
    pages.map(page => `${locale === 'ru' ? '' : `/${locale}`}/${page}`)
  )
  const vacancyPaths = locales.flatMap((locale) =>
    vacancies.map((item) => `${locale === 'ru' ? '' : `/${locale}`}/vacancy/${item.id}`)
  )
  const contestPaths = locales.flatMap((locale) =>
    contests.map((item) => `${locale === 'ru' ? '' : `/${locale}`}/grants-competetions/${item.id}`)
  )
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
      <loc>${baseUrl}</loc>
     </url>
    ${
      basePaths.map(path => (`
        <url>
          <loc>${baseUrl}${path}</loc>
        </url>
      `)).join('')
    }
    ${
      vacancyPaths.map(path => (`
        <url>
          <loc>${baseUrl}${path}</loc>
        </url>
      `)).join('')
    }
    ${
      contestPaths.map(path => (`
        <url>
          <loc>${baseUrl}${path}</loc>
        </url>
      `)).join('')
    }
   </urlset>
 `
}

const SiteMap = () => {
}

export const getServerSideProps = async ({ res }) => {
  const [{ data: vacancies }, { data: contests }] = await Promise.all([
    api.get('/vacancy?need_full=true'),
    api.get('/contest?need_full=true'),
  ]).then(res => res.map(item => item.data))
  const sitemap = generateSiteMap({
    vacancies,
    contests,
  })
  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()
  return {
    props: {},
  }
}

export default SiteMap