import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import React from 'react'
import parse from 'html-react-parser'
import { Container } from '@/shared/ui'
import { api } from '@/shared/api'
import clsx from 'clsx'

const VacancyDetails = ({ data }) => {
  const { t } = useTranslation()
  return (
    <>
      <Head>
        <title>{t('vacancy.head') || ''} | {data?.title || ''}</title>
        <meta name="description" content={data?.text} />
      </Head>
      <section className="py-10">
        <Container shrink className="flex-col">
          <h1 className="text-3xl font-bold uppercase">{data.title}</h1>
          <div className="mt-4 flex">
            <div className="px-7 py-3 w-fit rounded-[40px] bg-secondaryDark font-semibold text-primary">
              Дата открытия {data.date_from} {'->'} Дата закрытия {data.date_to}
            </div>
            <div className={clsx('ml-6 px-7 py-3 w-fit rounded-[40px] font-semibold', {
              ['bg-active text-activeDark']: data.is_active,
              ['bg-passive text-passiveDark']: !data.is_active,
            })}>
              {data.is_active ? t('vacancy.active') : t('vacancy.passive')}
            </div>
          </div>
          <p className="mt-12 text-2xl font-medium">{data.text}</p>
        </Container>
      </section>
      <section className="mt-6 py-10 bg-secondary">
        <Container shrink className="flex-col">
          {data.blocks.map(item => (
            <ModifiedJSX key={item.id} html={item.html} />
          ))}
        </Container>
      </section>
      <section className="py-6 bg-white">
        <Container shrink className="flex-col">
          <h3 className="text-2xl font-semibold">{t('vacancy.links')}:</h3>
          <p className="mt-6 text-2xl font-medium">{data.link}</p>
        </Container>
      </section>
    </>
  )
}

const ModifiedJSX = ({ html }) => {
  const parsedHTML = parse(html)
  const applyStyles = (element) => {
    if (React.isValidElement(element)) {
      const elementType = element.type
      if (elementType === 'ul') {
        return React.cloneElement(element, { className: 'custom-ul' }, React.Children.map(element.props.children, applyStyles))
      } else if (elementType === 'li') {
        return React.cloneElement(element, { className: 'my-6 text-lg font-medium flex items-center before:mr-6 before:min-w-[20px] before:h-[20px] before:bg-primaryLight before:rounded-full' })
      } else if (elementType === 'p') {
        return React.cloneElement(element, { className: 'my-3 text-2xl font-semibold' })
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
  const response = await api.get('/vacancy?need_full=true', {
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
