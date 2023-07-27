import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Home = () => {
  return (
    <>
      <Head>
        <title></title>
      </Head>
      <main>
        
      </main>
    </>
  )
}

export async function getStaticProps(context) {
  const { locale } = context
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default Home
