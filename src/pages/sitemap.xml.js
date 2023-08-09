import { api } from '@/shared/api'
const baseUrl = 'https://efca.vercel.app'
const pages = [
  'about-us',
  'contacts',
  'faq',
  'researches',
  'team',
  'vacancy',
]

const generateSiteMap = ({ 
  vacancies 
}) => {
  const { i18n } = require('next-i18next.config')
  const locales = i18n.locales
  const basePaths = locales.flatMap((locale) =>
    pages.map(page => `${locale === 'ru' ? '' : `/${locale}`}/${page}`)
  )
  const vacancyPaths = locales.flatMap((locale) =>
    vacancies.map((item) => `${locale === 'ru' ? '' : `/${locale}`}/vacancy/${item.id}`)
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
   </urlset>
 `
}

const SiteMap = () => {
}

export const getServerSideProps = async ({ res }) => {
  const responseVacancies = await api.get('/vacancy')
  const { vacancies } = responseVacancies.data
  const sitemap = generateSiteMap({
    vacancies
  })
  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()
  return {
    props: {},
  }
}

export default SiteMap