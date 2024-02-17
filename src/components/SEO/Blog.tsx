import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'

const BlogHeader = () => {
  const { t } = useTranslation('blog')

  return (
    <NextSeo
      title={t('blog')}
      description={t('blogSEODescription')}
      canonical="https://iq.wiki/blog"
      openGraph={{
        title: t('blog'),
        description: t('blogSEODescription'),
      }}
      twitter={{
        cardType: 'summary_large_image',
        handle: '@IQWIKI',
        site: 'IQWiki',
      }}
    />
  )
}

export default BlogHeader
