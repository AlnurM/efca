import Head from 'next/head'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import React from 'react'
import parse from 'html-react-parser'
import { Container } from '@/shared/ui'
import { api } from '@/shared/api'

const GrantsCompetitionsDetails = ({ data }) => {
  const { t } = useTranslation()
  return (
    <> 
      <Head>
        <title>{t('grants-competetions.head') || ''} | {data?.title || ''}</title>
        <meta name="description" content={data?.text} />
      </Head>
      <div className="py-10">
        <Container>
          <aside className="flex-1 p-4 h-fit bg-secondary rounded-lg">
            {data.other.map(item => (
              <div key={item.id} className="overflow-hidden mb-4 w-full flex flex-col rounded-lg">
                <div className="relative w-full h-[168px]">
                  <Image
                    src={item.image}
                    fill={true}
                    alt={item.title}
                  />
                </div>
                <div className="p-4 bg-white flex flex-col">
                  <span className="text-xs font-medium text-lightgray">{item.date_from}</span>
                  <span className="text-lg font-medium text-primaryDark">{item.title}</span>
                </div>
              </div>
            ))}
          </aside>
          <section className="ml-12 flex-[4]">
            <h1 className="text-2xl font-bold">{data.title}</h1>
            <div className="mt-4 px-7 py-3 w-fit rounded-[40px] bg-secondaryDark font-semibold text-primary">
              Дата открытия {data.date_from} {'->'} Дата закрытия {data.date_to}
            </div>
            <div className="my-6 flex">
              <div className="w-4 bg-primary" style={{ flex: '1 0 8px' }} />
              <p className="ml-12 text-lg font-medium">{data.text}</p>
            </div>
            <ModifiedJSX html={data.detail}/>
          </section>
        </Container>
      </div>
    </>
  )
}

const ModifiedJSX = ({ html }) => {
  const parsedHTML = parse(html)
  const applyStyles = (element) => {
    if (React.isValidElement(element)) {
      const elementType = element.type
      if (elementType === 'ol') {
        return React.cloneElement(element, { className: 'mb-6 list-decimal list-inside' }, React.Children.map(element.props.children, applyStyles))
      } else if (elementType === 'li') {
        return React.cloneElement(element, { className: 'text-lg font-medium' })
      } else if (elementType === 'p') {
        return React.cloneElement(element, { className: 'text-lg font-medium' })
      }
    }
    return element
  }
  const jsx = React.Children.map(parsedHTML, applyStyles)
  return (
    <>
      {jsx}
    </>
  )
}

export async function getStaticPaths(context) {
  const { locale } = context
  const response = await api.get('/contest?need_full=true', {
    headers: { 'Accept-Language' : locale }
  })
  const { i18n } = require('next-i18next.config')
  const locales = i18n.locales
  const paths = locales.flatMap((locale) =>
    response.data.data.map((item) => ({ params: { id: item.id.toString() }, locale }))
  )
  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps(context) {
  const { locale } = context
  const response = await api.get('/contest/' + context.params.id, {
    headers: { 'Accept-Language' : locale }
  })
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      data: response.data
    },
  }
}

export default GrantsCompetitionsDetails
