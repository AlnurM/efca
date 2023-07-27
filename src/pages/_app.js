import Head from 'next/head'
import { useRouter } from 'next/router'
import { appWithTranslation } from 'next-i18next'
import { Header, Footer } from '@/widgets/layout'
import { Layout } from '@/shared/ui'
import '@/shared/styles/globals.css'

const App = ({ Component, pageProps }) => {
  const { locale } = useRouter()
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout header={<Header locale={locale} />} content={<Component locale={locale} {...pageProps} />} footer={<Footer />} />
    </>
  )
}


export default appWithTranslation(App)