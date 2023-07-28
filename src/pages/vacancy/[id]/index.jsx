import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { Container } from '@/shared/ui'
import { api } from '@/shared/api'

const VacancyDetails = ({ data }) => {
  const { t } = useTranslation()
  console.log(data)
  return (
    <>
      <Head>
        <title>{t('vacancy.head') || ''} | {data.title || ''}</title>
      </Head>
      <section className="py-10">
        <Container shrink className="flex-col">
          <h1 className="text-3xl font-bold uppercase">{data.title}</h1>
          <div className="mt-4 flex">
            <div className="px-7 py-3 w-fit rounded-[40px] bg-secondaryDark font-semibold text-primary">
              Дата открытия {data.date_from} {'->'} Дата закрытия {data.date_to}
            </div>
            <div className="ml-6 px-7 py-3 w-fit rounded-[40px] bg-active font-semibold text-activeDark">
              {t('vacancy.active')}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export async function getStaticPaths(context) {
  const { locale } = context
  const response = await api.get('/vacancy', {
    headers: { 'Accept-Language' : locale }
  })
  const { vacancies } = response.data
  const paths = vacancies.map((item) => ({ params: { id: item.id.toString() } }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { locale } = context
  const response = await api.get('/vacancy/' + context.params.id, {
    headers: { 'Accept-Language' : locale }
  })
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      data: response.data
    },
  }
}

export default VacancyDetails
