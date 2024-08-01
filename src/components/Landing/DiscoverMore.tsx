import { useTranslation } from 'next-i18next'
import Link from 'next/link'

interface DiscoverMoreProps {
  tagsData: { id: string }[]
}
const DiscoverMore = ({ tagsData }: DiscoverMoreProps) => {
  if (!tagsData) return null
  const { t } = useTranslation('home')

  return (
    <div className="bg-gray-100 dark:bg-alpha-50">
      <div className="container mx-auto py-10 lg:py-20 relative px-4 lg:px-8 2xl:px-0 ">
        <h1 className="font-bold text-2xl">{t('DiscoverMoreHeading')}</h1>
        <div className="flex flex-wrap mt-8 gap-4">
          {tagsData?.map((tag) => (
            <Link
              className="rounded-full text-2xl border-2 border-gray-300 px-4 py-1 text-gray-600 dark:border-gray-700 dark:text-alpha-900"
              key={tag.id}
              href={`/tags/${tag.id}`}
            >
              {t(tag.id)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DiscoverMore
