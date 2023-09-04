import Head from 'next/head'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import React, { Component } from 'react'
import parse from 'html-react-parser'
import { Container } from '@/shared/ui'
import { api } from '@/shared/api'
import clsx from 'clsx'

const ProjectDetails = ({ data }) => {
  const { t } = useTranslation()
  const block = {
    default: () => <></>,
    main: ({ data }) => (
      <>
        <Head>
          <title>{data.title}</title>
          <meta name="description" content={data.text} />
        </Head>
        <main className="mb-6">
          <Container>
            <div className="flex-[2] mr-12 flex flex-col justify-center">
              <h1 className="text-4xl font-bold">{data.title}</h1>
              <div className="mt-10 flex items-center">
                <span className="mr-1 font-semibold">{t('projects.donor')}:</span>
                <span>{data.donor}</span>
              </div>
              <div className="mt-6 flex items-center">
                <span className="mr-1 font-semibold">{t('projects.period')}:</span>
                <span>{data.date_from} - {data.date_to}</span>
              </div>
              <div className="mt-6 flex items-center">
                <span className="mr-1 font-semibold">{t('projects.region')}:</span>
                <span>{data.region}</span>
              </div>
              <div className="mt-6 flex items-center">
                <span className="mr-1 font-semibold">{t('projects.socials')}:</span>
                <span>{data.social_media}</span>
              </div>
              <div className="mt-10 w-full flex flex-wrap">
                {data.images.map((item, index) => (
                  <div key={index} className="mr-8 relative w-[68px] h-[68px]">
                    <Image
                      src={item}
                      fill={true}
                      alt={'image-' + index}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex-[3] h-[600px]">
              <Image
                src={data.image}
                fill={true}
                alt={data.title}
              />
            </div>
          </Container>
        </main>
      </>
    ),
    statistics: ({ data }) => (
      <Container className="mb-6">
        <div className="w-full flex flex-wrap items-center justify-between">
          {data.data.map((item, index) => (
            <div 
              key={index} 
              className={clsx('w-[calc(33.3333%-24px)] h-[138px] rounded-lg flex justify-center items-center', {
                ['mt-4']: index > 2
              })}
              style={{ background: item.color }}
            >
              <div className="mr-6 w-[145px] flex justify-center items-end">
                <span className="mr-1 font-semibold">{item.prefix}</span>
                <span className="text-3xl font-bold">{item.value}</span>
              </div>
              <span className="w-[145px] font-semibold">{item.text}</span>
            </div>
          ))}
        </div>
      </Container>
    ),
    paragraph: ({ data }) => {
      const parsedTitle = parse(data.title)
      const parsedText = parse(data.text)
      return (
        <section>
          <Container shrink className="flex-col">
            <h3 className="text-2xl font-medium">{parsedTitle.props?.children}</h3>
            {data.images.length > 0 && (
              <div className="my-6 w-full flex flex-col">
                <div className="overflow-hidden relative w-full h-auto rounded-lg">
                  <Image
                    width={300}
                    height={200}
                    src={data.images[0]}
                    alt={parsedTitle}
                    layout="responsive"
                  />
                </div>
                {data.images.length > 1 && (
                  <div className="mt-4 flex flex-wrap">
                    <div className="mr-4 overflow-hidden relative w-[calc(33.3333%-12px)] h-[164px] rounded-lg">
                      <Image
                        src={data.images[1]}
                        alt={parsedTitle}
                        fill={true}
                      />
                    </div>
                    {data.images[2] && (
                      <div className="mr-4 overflow-hidden relative w-[calc(33.3333%-12px)] h-[164px] rounded-lg">
                        <Image
                          src={data.images[2]}
                          alt={parsedTitle}
                          fill={true}
                        />
                      </div>
                    )}
                    {data.images[3] && (
                      <div className="overflow-hidden relative w-[calc(33.3333%-12px)] h-[164px] rounded-lg">
                        <Image
                          src={data.images[3]}
                          alt={parsedTitle}
                          fill={true}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            <p className="text-lg font-medium">{parsedText}</p>
          </Container>
        </section>
      )
    },
    quote: ({ data }) => {
      return (
        <Container shrink className="flex flex-col items-center">
          <div className="w-[200px] h-[2px] bg-[#C9C9C9]" />
          <div className="my-9 px-6 text-center">
            <p className="font-medium text-2xl">
              {data.text}
            </p>
          </div>
          <div className="w-[200px] h-[2px] bg-[#C9C9C9]" />
        </Container>
      )
    },
    more: ({ data }) => {
      return (
        <Container shrink className="mt-6 flex-col">
          <h3 className="font-semibold text-2xl">{t('projects.more')}</h3>
          <div className="mt-6 w-full flex flex-wrap">
            {data.data.map((item, index) => (
              <div key={index} className={clsx('mb-6 w-[calc(50%-24px)] flex flex-col', {
                ['ml-6']: index % 2
              })}>
                <div className="overflow-hidden relative w-full h-[212px] rounded-lg">
                  <Image 
                    src={item.image}
                    alt={item.title}
                    fill={true}
                  />
                </div>
                <div className="p-5">
                  <span className="font-medium text-primaryDark text-lg">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      )
    },
    contacts: ({ data }) => {
      return (
        <Container shrink className="my-6 flex-col">
          <h3 className="font-semibold text-2xl">{t('projects.contacts')}:</h3>
          <div className="mt-6 flex">
            {data.data.map((item, index) => (
              <div key={index} className="mr-8 flex flex-col justify-start items-center">
                <div className="relative overflow-hidden border-4 border-white w-[140px] h-[140px] rounded-full duration-150 hover:border-primary">
                  <Image
                    src={item.image}
                    alt={item.full_name}
                    fill={true}
                  />
                </div>
                <span className="mt-4 font-medium">{item.full_name}</span>
                <span className="mt-2 text-sm font-medium text-center text-primary">{item.position}</span>
              </div>
            ))}
          </div>
        </Container>
      )
    }
  }
  return data.blocks.map(item => {
    const Component = block[item.type] || block['default'];
    return <Component data={item} key={item.id} />;
  })
}

export async function getStaticPaths(context) {
  const { locale } = context
  const response = await api.get('/projects?need_full=true', {
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
  const response = await api.get('/projects/' + context.params.id, {
    headers: { 'Accept-Language' : locale }
  })
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      data: response.data
    },
  }
}

export default ProjectDetails
