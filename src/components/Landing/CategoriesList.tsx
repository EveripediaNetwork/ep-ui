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
    <div className="flex flex-col gap-10 container mx-auto py-20 relative px-4 lg:px-8 2xl:px-0">
      <div className="absolute -top-1/2 right-20 rotate-6 w-[700px] h-[1500px] lg:rotate-45 rounded-[100%] bg-gradient-to-b from-brand-600/5 to-white/5 blur-3xl -z-20" />
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">{t('browseCategory')}</h1>
        <h2 className="dark:text-alpha-800 text-gray-600 font-medium max-w-3xl">
          {t('browseCategoryDescription')}
        </h2>
      </div>
      <Tabs defaultValue={AllCategoriesData[0].id} className="">
        <TabsList className="space-x-2 mb-12">
          {AllCategoriesData.map((category) => (
            <TabsTrigger
              value={category.id}
              className="rounded-full border-b-0 py-2.5 data-[state=active]:bg-brand-50 data-[state=active]:dark:bg-brand-200 bg-gray-100 dark:bg-alpha-50 dark:border-gray-700 border-gray-200/20"
            >
              {tr(category.title)}
            </TabsTrigger>
          ))}
          <Link
            href="/categories"
            className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-gray600 group h-9 border dark:border-gray-700 border-gray-200/20 bg-gray-100 dark:bg-alpha-50"
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        className="px-5 py-3 rounded-lg border dark:border-gray-700 border-gray-300 self-center mt-6 dark:text-alpha-800 text-gray-600"
      >
        {t('categoryViewMore')}
      </Link>
    </div>
  )
}

export default CategoriesList
