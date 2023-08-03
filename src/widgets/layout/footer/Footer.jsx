import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { useDebounce } from '@/shared/hooks'
import { validateEmail } from '@/shared/lib'
import { Container, Button, Icon } from '@/shared/ui'
import { api } from '@/shared/api'

const routes = [
  { labelKey: 'fund', path: '/' },
  { labelKey: 'activities.projects', path: '/projects' },
  { labelKey: 'join.partners', path: '/partners' },
  { labelKey: 'materials.for-business', path: '/for-business' },
  { labelKey: 'materials.for-ngo', path: '/for-ngo' },
  { labelKey: 'materials.news', path: '/news' },
  { labelKey: 'join.contacts', path: '/contacts' },
]
const Footer = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const isEmailValid = useDebounce(validateEmail(email), 500)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.post('/mailing', {
      email
    })
    setEmail('')
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
          <div className="flex-1 flex flex-col justify-center">
            <form className="flex items-center" onSubmit={handleSubmit}>
              <input 
                placeholder={t('footer.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-3 px-6 min-w-[394px] h-fit font-semibold text-base rounded-[40px] outline-none" 
              />
              <Button className="ml-6" disabled={!isEmailValid}>
                {t('footer.cta')}
              </Button>
            </form>
            <span className="mt-2 pl-6 h-[24px] text-[red]">
              {email.length > 3 && !isEmailValid && t('footer.emailError')}
            </span>
          </div>
        </Container>
      </section>
      <footer className="py-[68px] bg-darkened">
        <Container className="flex flex-col items-center">
          <div className="w-full flex justify-between">
            <Link href="/">
              <div className="text-2xl font-semibold text-white">ФЕЦА Казахстан</div>
            </Link>
            <div>
              {routes.map(route => (
                <Link key={route.path} href={route.path}>
                  <span className="ml-6 font-medium text-white">{t('menu.' + route.labelKey + '.root')}</span>
                </Link>
              ))}
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
