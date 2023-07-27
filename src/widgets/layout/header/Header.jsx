import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Container, Icon } from '@/shared/ui'
import clsx from 'clsx'

const routes = [
  { labelKey: 'fund', path: '/' },
  { labelKey: 'activities', path: '/activities' },
  { labelKey: 'materials', path: '/materials' },
  { labelKey: 'join', path: '/join' },
]
const Header = ({ locale }) => {
  const router = useRouter()
  const { t } = useTranslation()
  return (
    <header>
      <Container className="flex items-center justify-between">
        <Link href="/">
          <div className="py-6 flex items-center">
            <Icon src="/assets/logo.png" width={40} height={58} />
            <span className="ml-4 leading-5 font-semibold text-black">
              {t('name.first_part')} <br/> {t('name.second_part')} <br/> {t('name.third_part')}
            </span>
          </div>
        </Link>
        <div className="w-[704px] flex justify-between">
          {routes.map(route => (
            <Link key={route.path} href={route.path}>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full border-4 border-primaryDark font-medium">
                  <div className={clsx('w-full h-full', {
                    ['bg-primaryDark']: router.route.split('/').filter(Boolean).includes(route.path.replace('/', '')) || ((!router.route.split('/').filter(Boolean).length && !route.path.replace('/', '')))
                  })} />
                </div>
                <span className="ml-2 text-black uppercase">{t('menu.' + route.labelKey)}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex">
          <Link href={router.asPath} locale={'kz'}>
            <span className={clsx('font-medium uppercase', { 
              ['!text-black']: locale === 'kz', 
              ['text-gray']: locale !== 'kz' 
            })}>
              kz
            </span>
          </Link>
          <Link href={router.asPath} locale={'ru'}>
            <span className={clsx('mx-5 font-medium uppercase', {
              ['!text-black']: locale === 'ru', 
              ['text-gray']: locale !== 'ru' 
            })}>
              ru
            </span>
          </Link>
          <Link href={router.asPath} locale={'en'}>
            <span className={clsx('font-medium uppercase', {
              ['!text-black']: locale === 'en', 
              ['text-gray']: locale !== 'en' 
            })}>
                eng
            </span>
          </Link>
        </div>
      </Container>
    </header>
  )
}

export default Header
