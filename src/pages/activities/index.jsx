import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Activities = () => {
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

export default Activities
