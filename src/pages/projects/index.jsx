import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Select from 'react-select'
import InputMask from 'react-input-mask'
import { Container, Pagination } from '@/shared/ui'
import { api } from '@/shared/api'
import clsx from 'clsx'

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: 'none',
    outline: 'none',
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    fontWeight: 500
  }),
}
const Projects = ({ data, regions, donors, partners }) => {
  const { t } = useTranslation()
  const { data: list } = data
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{t('projects.head')}</title>
      </Head>
      <section className="py-10">
        <Container className="flex">
          <aside className="flex-1 flex flex-col">
            <h1 className="text-3xl font-bold text-primaryDark uppercase">{t('projects.head')}</h1>
            <div className="mt-6 p-3 rounded-lg bg-grayLight flex flex-col">
              <div className="mb-6 flex flex-col">
                <label className="mb-2 font-medium">{t('projects.filter.direction')}</label>
                <Select 
                  placeholder={t('projects.select')}
                  oprions={[]}
                  styles={customStyles}
                />
              </div>
              <div className="mb-6 flex flex-col">
                <label className="mb-2 font-medium">{t('projects.filter.donor')}</label>
                <Select 
                  placeholder={t('projects.select')}
                  options={donors.map(item => ({ value: item.id, label: item.text }))} 
                  styles={customStyles}
                />
              </div>
              <div className="mb-6 flex flex-col">
                <label className="mb-2 font-medium">{t('projects.filter.region')}</label>
                <Select 
                  placeholder={t('projects.select')}
                  options={regions.map(item => ({ value: item.id, label: item.text }))} 
                  styles={customStyles}
                />
              </div>
              <div className="mb-6 flex flex-col">
                <label className="mb-2 font-medium">{t('projects.filter.partners')}</label>
                <Select 
                  placeholder={t('projects.select')}
                  options={partners.map(item => ({ value: item.id, label: item.text }))} 
                  styles={customStyles}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 font-medium">{t('projects.filter.date')}</label>
                <div className="flex items-center">
                  <span className="mr-2">{t('projects.filter.from')}</span>
                  <InputMask 
                    mask="99.99.99"
                    className="outline-none py-2 px-3 w-24 font-medium rounded"
                  />
                  <span className="mx-2">{t('projects.filter.to')}</span>
                  <InputMask 
                    mask="99.99.99"
                    className="outline-none py-2 px-3 w-24 font-medium rounded"
                  />
                </div>
              </div>
              <div className="my-6 h-[1px] w-full bg-gray opacity-25" />
              <div className="flex flex-col">
                <label className="mb-2 font-medium">{t('projects.filter.status')}</label>
                <div className="flex items-center">
                  <input type="checkbox" />
                  <span className="ml-3 font-medium">{t('projects.filter.active')}</span>
                </div>
                <div className="mt-2 flex items-center">
                  <input type="checkbox" />
                  <span className="ml-3 font-medium">{t('projects.filter.passive')}</span>
                </div>
              </div>
            </div>
          </aside>
          <div className="ml-12 flex-[3]">
            <div className="h-[38px]"></div>
            <div className="mt-6 flex flex-col">
              {list.map(item => (
                <Link key={item.id} href={`/projects/${item.id}`}>
                  <div className="mb-6 min-h-[264px] flex cursor-pointer">
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
            <div>
              <Pagination
                currentPage={data.current_page}
                totalCount={data.total}
                pageSize={data.per_page}
                onPageChange={(page) => router.push({ pathname: '/projects', query: { page } })}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export async function getServerSideProps(context) {
  const { locale, query } = context
  console.log(query)
  const response = await api.get('/projects', {
    headers: { 'Accept-Language' : locale }
  })
  const [regions, donors, partners] = await Promise.all([
    api.get('/reference/regions'),
    api.get('/reference/donors'),
    api.get('/reference/partners'),
  ]).then(res => res.map(item => item.data.data))
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      data: response.data,
      regions, donors, partners
    }
  }
}

export default Projects
