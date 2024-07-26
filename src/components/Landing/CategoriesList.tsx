import { AllCategoriesData } from '@/data/AllCategoriesData'
import { useTranslation } from 'next-i18next'
import { useGetWikisAndCategoriesQuery } from '@/services/wikis'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import CategoriesCard from '../Categories/CategoriesCard'
import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

const CategoriesList = () => {
  const { t } = useTranslation('common')
  const { t: tr } = useTranslation('category')

  const { data } = useGetWikisAndCategoriesQuery({
    limit: 30,
  })

  console.log(data)

  return (
    <div className="flex flex-col gap-10 container mx-auto py-20 relative">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">{t('browseCategory')}</h1>
        <h2 className="text-alpha-800 font-medium max-w-3xl">
          {t('browseCategoryDescription')}
        </h2>
      </div>
      <Tabs defaultValue={AllCategoriesData[0].id} className="">
        <TabsList className="space-x-2 mb-12">
          {AllCategoriesData.map((category) => (
            <TabsTrigger
              value={category.id}
              className="rounded-full border-b-0 py-2.5 data-[state=active]:bg-brand-500 data-[state=active]:dark:bg-brand-200 bg-alpha-50"
            >
              {tr(category.title)}
            </TabsTrigger>
          ))}
          <Link
            href="/categories"
            className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm group dark:bg-alpha-50 h-9"
          >
            View all
            <ArrowRightIcon className="w-3 h-3 transition-transform group-hover:translate-x-1 duration-300 ease-in-out delay-150" />
          </Link>
        </TabsList>
        {AllCategoriesData.map((allCategory) => (
          <TabsContent value={allCategory?.id}>
            <div>
              {data?.map(
                (category) =>
                  category?.id === allCategory.id && (
                    <div className="grid grid-cols-3 gap-6">
                      {category.wikis.slice(0, 6).map((wiki) => (
                        <CategoriesCard wiki={wiki} />
                      ))}
                    </div>
                  ),
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <Link
        href="/categories"
        prefetch={false}
        className="px-5 py-3 rounded-lg  border dark:border-gray-700 border-gray-200 text-white self-center mt-6"
      >
        {t('categoryViewMore')}
      </Link>
    </div>
  )
}

export default CategoriesList
