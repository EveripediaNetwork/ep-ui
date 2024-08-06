import React from 'react'
import { useTranslation } from 'next-i18next'

export const Hero = () => {
  const { t } = useTranslation('home')
  return (
    <section className="bg-slate-100 dark:bg-alpha-50 dark:text-white pt-16 md:pt-32 pb-60 md:pb-40 lg:pb-32 lg:pt-14 xl:pt-24 relative">
      <div className="absolute top-0 left-0 lg:w-[420px] w-72 lg:h-96 h-60 bg-gradient-to-r from-brand-800/10 to-brand-800/10 blur-3xl" />
      <h1 className="xl:text-6xl text-3xl md:text-5xl lg:text-5xl font-semibold text-center text-gray-900 dark:text-white max-w-6xl mx-auto container font-montserrat">

        {t('hero_heading1')}{' '}
        <span className="text-brand-800">{t('hero_heading2')}</span>
        {t('hero_heading3')}
      </h1>
    </section>
  )
}
