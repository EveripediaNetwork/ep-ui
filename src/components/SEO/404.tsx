import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'

const ErrorPageHeader = () => {
  const { t } = useTranslation('404')
  return (
    <NextSeo
      title={t('404SeoTitle')}
      description={t('404SeoDescription')}
      noindex={true}
      nofollow={true}
    />
  )
}

export default ErrorPageHeader
