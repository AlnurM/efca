import Head from 'next/head'
import Link from 'next/link'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { Container } from '@/shared/ui'
import { api } from '@/shared/api'

const Vacancy = ({ vacancies }) => {
  const { t } = useTranslation()
  return (
    <>
      <Head>
        <title>{t('vacancy.head')}</title>
      </Head>
      <section className="py-10">
        <Container>
          <div>
            <h1 className="text-3xl font-bold text-primaryDark uppercase">{t('vacancy.head')}</h1>
          </div>
          <div className="mt-6 ml-auto w-full max-w-[66%]">
            {vacancies.map(item => (
              <div key={item.id} className="mb-6 p-6">
                <div className="flex flex-col">
                  <h3 className="text-2xl text-primaryDark font-semibold">{item.title}</h3>
                  <p className="mt-4 text-lg font-medium">{item.text}</p>
                </div>
                <div className="mt-6 flex justify-end items-center">
                  <div className="px-7 py-3 rounded-[40px] bg-secondaryDark font-semibold text-primary">
                    с {item.date_from} по {item.date_to}
                  </div>
                  <Link href={`/vacancy/${item.id}`} passHref>
                    <div className="ml-6 px-7 py-3 rounded-[40px] bg-primary text-white font-semibold">
                      {t('vacancy.cta')}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

export async function getStaticProps(context) {
  const { locale } = context
  const response = await api.get('/vacancy', {
    headers: { 'Accept-Language' : locale }
  })
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      ...response.data
    },
  }
}

export default Vacancy
