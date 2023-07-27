import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { Container, Button, Icon } from '@/shared/ui'

const Footer = () => {
  const { t } = useTranslation()

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <section className="py-12 bg-secondary">
        <Container>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">
              {t('footer.offer')}
            </h2>
            <p className="mt-6 text-lg font-medium">
              Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor
            </p>
          </div>
          <form className="flex-1 flex items-center" onSubmit={handleSubmit}>
            <input className="py-3 px-6 min-w-[394px] h-fit font-semibold text-base rounded-[40px] outline-none" placeholder={t('footer.placeholder')} />
            <Button className="ml-6">
              {t('footer.cta')}
            </Button>
          </form>
        </Container>
      </section>
      <footer className="py-[68px] bg-darkened">
        <Container className="flex flex-col items-center">
          <div className="w-full flex justify-between">
            <Link href="/">
              <div className="text-2xl font-semibold text-white">ФЕЦА Казахстан</div>
            </Link>
            <div>

            </div>
          </div>
          <div className="mt-10 w-full flex justify-between">
            <span className="font-medium text-white">{t('footer.address')}</span>
            <span className="min-w-[187px] font-medium text-white">Email: <Link href="mailto:almaty@ef-ca.org"><span className="text-primaryLight hover:underline">almaty@ef-ca.org</span></Link></span>
            <span className="min-w-[226px] font-medium text-white">{t('footer.phone')}: <Link href="tel:+77272501810"><span className="text-primaryLight hover:underline">+7 (727) 250-18-10</span></Link></span>
            <div className="flex items-center">
              <span className="font-medium text-white uppercase whitespace-pre-wrap">{t('footer.socials')}</span>
              <Icon src="/assets/ic_facebook.svg" className="ml-10" width={24} height={24} />
              <Icon src="/assets/ic_instagram.svg" className="ml-10" width={24} height={24} />
              <Icon src="/assets/ic_youtube.svg" className="ml-10" width={24} height={24} />
            </div>
          </div>
          <span className="mt-10 text-[#B0B0B0] font-medium">Copyright © 2014 КФ «Фонд Евразия Центральной Азии». All Rights Reserved</span>
        </Container>
      </footer>
    </>
  )
}

export default Footer
