import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { Container, Icon } from '@/shared/ui'
import clsx from 'clsx'

const routes = [
  { 
    labelKey: 'fund', 
    children: [
      { 
        labelKey: 'about-us', 
        path: '/about-us',
        descKey: 'desc'
      },
      { 
        labelKey: 'team', 
        path: '/team',
        descKey: 'desc' 
      },
      { 
        labelKey: 'annual-reports', 
        path: '/annual-reports',
        descKey: 'desc' 
      },
      { 
        labelKey: 'faq', 
        path: '/faq',
        descKey: 'desc' 
      },
    ]
  },
  { 
    labelKey: 'activities', 
    children: [
      { labelKey: 'projects', path: '/projects' },
      { labelKey: 'success-stories', path: '/success-stories' },
      { labelKey: 'grants-competetions', path: '/grants-competetions' },
    ]
  },
  { 
    labelKey: 'materials', 
    children: [
      { labelKey: 'for-business', path: '/for-business' },
      { labelKey: 'for-ngo', path: '/for-ngo' },
      { labelKey: 'news', path: '/news' },
      { labelKey: 'researches', path: '/researches' },
      { labelKey: 'benefits', path: '/benefits' },
    ]
  },
  { 
    labelKey: 'join', 
    children: [
      { labelKey: 'vacancy', path: '/vacancy' },
      { labelKey: 'donors', path: '/donors' },
      { labelKey: 'partners', path: '/partners' },
      { labelKey: 'contacts', path: '/contacts' },
    ]
  },
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
              {t('name.first-part')} <br/> {t('name.second-part')} <br/> {t('name.third-part')}
            </span>
          </div>
        </Link>
        <div className="relative w-[704px] flex justify-between">
          {routes.map(route => (
            <MenuItem key={route.labelKey} route={route} />
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

const MenuItem = ({ route }) => {
  const router = useRouter()
  const { t } = useTranslation()
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div 
      className="py-3"
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <div className="flex items-center cursor-pointer">
        <div className="w-4 h-4 rounded-full border-4 border-primaryDark font-medium">
          <div className={clsx('w-full h-full', {
            ['bg-primaryDark']: routes?.find(f => f.labelKey === route.labelKey)?.children?.find(f => f.path === router.route)
          })} />
        </div>
        <span className="ml-2 text-black uppercase">{t('menu.' + route.labelKey + '.root')}</span>
      </div>
      {isHovered && (
        <div 
          className="z-50 absolute top-12 left-0 right-0 mx-auto p-6 w-fit bg-white rounded shadow flex animate-[growDown_0.3s_ease-in-out_forwards]"
          style={{ transformOrigin: 'top center' }}
        >
          {route.children.map((child, index) => (
            <Link key={child.path} href={child.path}>
              <div className={clsx('p-3 w-fit rounded bg-secondary whitespace-nowrap flex flex-col', {
                ['ml-6']: index > 0
              })}>
                <span className="pb-px text-sm font-bold uppercase border-b border-black">
                  {t(`menu.${route.labelKey}.${child.labelKey}.root`)}
                </span>
                {child.descKey && (
                  <span className="mt-2 whitespace-pre-wrap">
                    {t(`menu.${route.labelKey}.${child.labelKey}.${child.descKey}`)}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Header
