import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Materials = () => {
  return (
    <>
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

export default Materials
