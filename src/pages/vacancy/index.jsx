import Head from 'next/head'
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
      <section className="py-10 px-12 flex">
        <Container>
          <h1 className="flex-[2] text-3xl font-bold text-primaryDark uppercase">{t('vacancy.head')}</h1>
          <div className="flex-[6] ml-12">
            {vacancies.map(item => (
              <div key={item.id} className="p-6">
                <div className="flex flex-col">
                  <h3 className="text-2xl text-primaryDark font-semibold">{item.title}</h3>
                  <p className="mt-4 text-lg font-medium">{item.text}</p>
                </div>
                <div className="mt-6 flex justify-end items-center">
                  <div className="px-7 py-3 rounded-[40px] bg-secondaryDark font-semibold text-primary">
                    с {item.date_from} по {item.date_to}
                  </div>
                  <button className="ml-6 px-7 py-3 rounded-[40px] outline-none bg-primary text-white font-semibold">
                    {t('vacancy.cta')}
                  </button>
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
