import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { LinkButton } from '../Elements'
import AboutGPTMockup from '../Elements/Image/AboutGPTMockup'
import { ArrowRightIcon } from 'lucide-react'

const AboutIqgpt = () => {
  const { t } = useTranslation('home')
  return (
    <div className="container mx-auto px-6 lg:px-8 2xl:px-0 relative py-20">
      <div className="flex flex-col gap-2 lg:gap-6 dark:bg-alpha-50 bg-gray-100 justify-center items-center pt-6 rounded-xl mb-96">
        <div className="flex flex-row gap-2 bg-brand-50 dark:bg-brand-100 rounded-2xl text-brand-500 dark:text-brand-800 p-1">
          <div className="bg-white py-0.5 px-3 rounded-full">
            {t('IQGPTHeading1')}
          </div>

          <Link
            href={'https://iqgpt.com/'}
            target="_blank"
            passHref
            rel="noreferrer noopener"
            className="flex items-center gap-1 group"
          >
            <h1 className="text-sm md:text-base">{t('IQGPTHeading2')}</h1>
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300 delay-150 ease-linear" />
          </Link>
        </div>
        <div className="flex flex-col gap-4 text-center items-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white text-center">
            {t('IQGPTHeading3')}
          </h1>
          <p className="text-sm md:text-base text-center text-alpha-600 dark:text-alpha-600 max-w-5xl mt-2">
            {`${t('aboutIQGPTBody')}`}
          </p>
          <div className="flex flex-row gap-5 my-4">
            <LinkButton
              href={'https://iqgpt.com/'}
              target="_blank"
              className="dark:bg-brand-800 bg-brand-500 text-white"
            >
              {t('IQGPTBtn1')}
            </LinkButton>
            <LinkButton
              href={'https://iq.wiki/wiki/iq'}
              target="_blank"
              className="bg-white text-black"
            >
              {t('IQGPTBtn2')}
            </LinkButton>
          </div>
          <div className="hidden lg:block -mb-96">
            <AboutGPTMockup
              bg={{
                light: '/images/mockups/mockup-xl.png',
                dark: '/images/mockups/mockup-xl-dark.png',
              }}
              w={1020}
              h={768}
            />
          </div>
          <div className="hidden md:block lg:hidden -mb-80">
            <AboutGPTMockup
              bg={{
                light: '/images/mockups/mockup-md.png',
                dark: '/images/mockups/mockup-md-dark.png',
              }}
              w={570}
              h={548}
            />
          </div>
          <div className="block md:hidden">
            <AboutGPTMockup
              bg={{
                light: '/images/mockups/mockup-sm.png',
                dark: '/images/mockups/mockup-sm-dark.png',
              }}
              w={500}
              h={360}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutIqgpt
