import Head from 'next/head'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Slider from 'react-slick'
import { Container } from '@/shared/ui'
import { api } from '@/shared/api'
import clsx from 'clsx'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  nextArrow: (
    <button className="ml-4 outline-none">
      <svg width="14" height="23" viewBox="0 0 14 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.8673 12.5607C13.4531 11.9749 13.4531 11.0251 12.8673 10.4393L3.32136 0.893398C2.73557 0.307611 1.78583 0.307611 1.20004 0.893398C0.614252 1.47919 0.614252 2.42893 1.20004 3.01472L9.68532 11.5L1.20004 19.9853C0.614252 20.5711 0.614252 21.5208 1.20004 22.1066C1.78583 22.6924 2.73557 22.6924 3.32136 22.1066L12.8673 12.5607ZM10.8066 13H11.8066V10H10.8066V13Z" fill="#0006BB"/>
      </svg>
    </button>
  ),
  prevArrow: (
    <button className="mr-4 outline-none">
      <svg width="13" height="23" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.745981 12.5607C0.160194 11.9749 0.160194 11.0251 0.745981 10.4393L10.2919 0.893398C10.8777 0.307611 11.8275 0.307611 12.4132 0.893398C12.999 1.47919 12.999 2.42893 12.4132 3.01472L3.92796 11.5L12.4132 19.9853C12.999 20.5711 12.999 21.5208 12.4132 22.1066C11.8275 22.6924 10.8777 22.6924 10.2919 22.1066L0.745981 12.5607ZM2.80664 13H1.80664L1.80664 10H2.80664L2.80664 13Z" fill="#0006BB"/>
      </svg>
    </button>
  )
}
const Team = ({ trustees, employees }) => {
  const { t } = useTranslation()
  return (
    <>
      <Head>
        <title>{t('team.head')}</title>
      </Head>
      <section className="p-12 bg-secondary">
        <Container className="flex flex-col">
          <h1 className="text-3xl font-bold uppercase text-primaryDark">{t('team.trustees')}</h1>
          <Slider {...settings} className="mt-10">
            {trustees.map((item, index) => (
              <div key={'trustee-'+index}>
                <div className="flex flex-col justify-center items-center">
                  <div className="relative overflow-hidden border-4 border-secondary w-[140px] h-[140px] rounded-full duration-150 hover:border-primary">
                    <Image
                      src={item.image}
                      alt={item.full_name}
                      fill={true}
                    />
                  </div>
                  <span className="mt-4 font-medium text-center">{item.full_name}</span>
                </div>
              </div>
            ))}
          </Slider>
        </Container>
      </section>
      <section className="p-12 bg-white">
        <Container className="flex flex-col">
          <h2 className="text-3xl font-bold uppercase text-primaryDark">{t('team.employees')}</h2>
          <div className="mt-10 w-full flex flex-wrap">
            {employees.map((item, index) => (
              <div key={'employee'+index} className={clsx('mb-12 px-3 w-[calc(100%/6)] flex flex-col justify-start items-center')}>
                <div className="relative overflow-hidden border-4 border-white w-[140px] h-[140px] rounded-full duration-150 hover:border-primary">
                  <Image
                    src={item.image}
                    alt={item.full_name}
                    fill={true}
                  />
                </div>
                <span className="mt-4 font-medium">{item.full_name}</span>
                <span className="mt-2 text-sm font-medium text-center text-primary">{item.position}</span>
                <span className="mt-2 text-sm font-medium text-center text-gray">{item.email}</span>
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
  const response = await api.get('/team', {
    headers: { 'Accept-Language' : locale }
  })
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      ...response.data
    },
  }
}

export default Team
