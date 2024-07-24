import { AllCategoriesData } from '@/data/AllCategoriesData'
import { CategoryDataType } from '@/types/CategoryDataTypes'
import { useTranslation } from 'next-i18next'
// import CategoryCard from '../Categories/CategoryCard'
import { LinkButton } from '../Elements'
import { useGetWikisAndCategoriesQuery } from '@/services/wikis'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'

const NUM_OF_CATEGORIES = 6

const CategoriesList = () => {
  const { t } = useTranslation('common')
  const { t: tr } = useTranslation('category')

  const newCategoryList: CategoryDataType[] = []

  while (newCategoryList.length < NUM_OF_CATEGORIES) {
    const randIndex = Math.floor(Math.random() * AllCategoriesData.length)
    const randCategory = AllCategoriesData[randIndex]

    if (!newCategoryList.includes(randCategory)) {
      newCategoryList.push(randCategory)
    }

    if (
      randIndex === AllCategoriesData.length - 1 &&
      !newCategoryList.includes(AllCategoriesData[randIndex])
    ) {
      newCategoryList.push(AllCategoriesData[randIndex])
    }
  }

  const { data } = useGetWikisAndCategoriesQuery({
    limit: 6,
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
      <Tabs>
        <TabsList>
          <TabsList className="flex flex-row gap-2">
            {AllCategoriesData.map((category) => (
              <TabsTrigger
                value={category.id}
                className="rounded-full border-b-0 data-[state=active]:bg-brand-500 data-[state=active]:dark:bg-brand-200 bg-alpha-50"
              >
                {tr(category.title)}
              </TabsTrigger>
            ))}
            {/* <TabsTrigger value="password">Password</TabsTrigger> */}
          </TabsList>
          <TabsContent value="account">Account</TabsContent>
          <TabsContent value="password">Password</TabsContent>
        </TabsList>
      </Tabs>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newCategoryList?.map(
          (category) =>
            category.cardImage && (
              <CategoryCard
                key={category.id}
                imageCard={category.cardImage}
                title={category.title}
                brief={t(category.description)}
                categoryId={category.id}
                coverIcon={category.icon}
              />
            ),
        )}
      </div> */}
      <div className="">
        <div className="flex justify-center items-center">
          <LinkButton
            href="/categories"
            h="50px"
            w={{ base: 32, lg: 40 }}
            variant="outline"
            bgColor="btnBgColor"
            prefetch={false}
          >
            {t('categoryViewMore')}
          </LinkButton>
        </div>
      </div>
    </div>
  )
}

export default CategoriesList
