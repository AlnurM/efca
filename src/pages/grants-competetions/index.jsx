import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { Container } from '@/shared/ui'
import { api } from '@/shared/api'
import clsx from 'clsx'

const GrantsCompetitions = ({ contests }) => {
  const { t } = useTranslation()
  return (
    <>
      <Head>
        <title>{t('grants-competetions.head')}</title>
      </Head>
      <section className="py-10">
        <Container className="flex flex-col">
          <div>
            <h1 className="text-3xl font-bold text-primaryDark uppercase">{t('grants-competetions.head')}</h1>
          </div>
          <div className="mt-6 ml-auto w-full max-w-[66%]">
            {contests.map(item => (
              <Link key={item.id} href={`/grants-competetions/${item.id}`}>
                <div className="mb-6 min-h-[292px] flex cursor-pointer">
                  <div className="relative flex-1">
                    <Image
                      src={item.image}
                      fill={true}
                      alt={item.title}
                    />
                  </div>
                  <div className="p-6 flex-[2]">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl text-primaryDark font-semibold">{item.title}</h3>
                      <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.0137 8.22664C19.4043 7.83611 19.4043 7.20295 19.0137 6.81242L12.6498 0.448463C12.2593 0.0579391 11.6261 0.0579391 11.2356 0.448463C10.845 0.838988 10.845 1.47215 11.2356 1.86268L16.8924 7.51953L11.2356 13.1764C10.845 13.5669 10.845 14.2001 11.2356 14.5906C11.6261 14.9811 12.2593 14.9811 12.6498 14.5906L19.0137 8.22664ZM0.306641 8.51953L18.3066 8.51953V6.51953L0.306641 6.51953L0.306641 8.51953Z" fill="#0006BB"/>
                      </svg>
                    </div>
                    <p className="mt-4 text-lg font-medium">{item.text}</p>
                    <div className="mt-6 flex justify-end items-center">
                      <div className="px-7 py-3 rounded-[40px] bg-secondaryDark font-semibold text-primary">
                        с {item.date_from} по {item.date_to}
                      </div>
                      <div className={clsx('ml-6 px-7 py-3 w-fit rounded-[40px] font-semibold', {
                        ['bg-active text-activeDark']: item.is_active,
                        ['bg-passive text-passiveDark']: !item.is_active,
                      })}>
                        {item.is_active ? t('vacancy.active') : t('vacancy.passive')}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

export async function getStaticProps(context) {
  const { locale } = context
  const response = await api.get('/contest', {
    headers: { 'Accept-Language' : locale }
  })
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      ...response.data
    }
  }
}

export default GrantsCompetitions
