import React from 'react'
import { useTranslation } from 'next-i18next'

export const Hero = () => {
  const { t } = useTranslation('home')

  return (
    <section className="bg-white dark:bg-alpha-50 dark:text-white py-6 lg:pb-32 lg:pt-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[420px] h-96 bg-gradient-to-r from-brand-800/5 to-brand-800/5 blur-3xl" />
      <h1 className="2xl:text-6xl text-3xl md:text-5xl lg:text-4xl font-bold text-center text-gray-900 dark:text-white max-w-6xl mx-auto container font-montserrat">
        {t('hero_heading1')}{' '}
        <span className="text-brand-800">{t('hero_heading2')}</span>
        {t('hero_heading3')}
      </h1>
    </section>
  )
}
