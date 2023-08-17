import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { Container, Pagination } from '@/shared/ui'
import { api } from '@/shared/api'

const Benefits = ({ data, count, currentPage }) => {
  const { t } = useTranslation()
  return (
    <>
      <Head>
        <title>{t('benefits.head')}</title>
      </Head>
      <section className="py-10">
        <Container className="flex flex-col">
          <div>
            <h1 className="text-3xl font-bold text-primaryDark uppercase">{t('benefits.head')}</h1>
          </div>
          <div className="mt-6 ml-auto w-full max-w-[66%]">
            {data.map(item => (
              <div key={item.id} className="mb-6 min-h-[292px] flex">
                <div className="relative flex-1">
                  <Image
                    src={item.image}
                    fill={true}
                    alt={item.title}
                  />
                </div>
                <div className="p-6 flex-[2]">
                  <h3 className="text-2xl text-primaryDark font-semibold">{item.title}</h3>
                  <p className="mt-4 text-lg font-medium">{item.text}</p>
                  <div className="mt-6 flex justify-end items-center">
                    <Link href={item.file.path}>
                      <div className="px-7 py-3 rounded-[40px] bg-secondaryDark flex items-center">
                        <span className="mr-2 font-semibold text-primary">
                          {item.file.type}, {(item.file.size / 1024).toFixed(1)} MB
                        </span>
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.99219 16.2695H13.9922M9.49219 2.76953L9.49219 13.2695M9.49219 13.2695L13.2422 9.51953M9.49219 13.2695L5.74219 9.51953" stroke="#392DCA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            <Pagination 
              totalCount={count}
              currentPage={currentPage}
            />
          </div>
        </Container>
      </section>
    </>
  )
}

export async function getServerSideProps(context) {
  const { locale, query } = context
  const response = await api.get(`/benefits?page=${query.page || 1}`, {
    headers: { 'Accept-Language' : locale }
  })
  if (response.data.pages < query.page) {
    return {
      redirect: {
        destination: `/benefits?page=${response.data.pages}`,
        statusCode: 302,
      }
    }
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      ...response.data,
      currentPage: query.page || 1
    }
  }
}

export default Benefits
