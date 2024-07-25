import { AllCategoriesData } from '@/data/AllCategoriesData'
import { CategoryDataType } from '@/types/CategoryDataTypes'
import { useTranslation } from 'next-i18next'
// import CategoryCard from '../Categories/CategoryCard'
import { LinkButton } from '../Elements'
import { useGetWikisAndCategoriesQuery } from '@/services/wikis'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import { getWikiImageUrl } from '@/utils/WikiUtils/getWikiImageUrl'
import Image from 'next/image'
import Link from 'next/link'
import { shortenText } from '@/utils/textUtils'
import DisplayAvatar from '../Elements/Avatar/DisplayAvatar'

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
    limit: 50,
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
        <TabsList className="space-x-4 mb-6">
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
        <TabsContent value={AllCategoriesData[0].id as string}>
          <div>
            {data?.map(
              (category) =>
                category.id === 'nfts' && (
                  <div className="grid grid-cols-3 gap-6">
                    {category.wikis.slice(0, 6).map((wiki) => {
                      return (
                        <Link
                          href={`/wiki/${wiki.id}`}
                          className="flex flex-col gap-2 border dark:border-gray-700 border-gray-200 rounded-xl"
                        >
                          <div className="h-80">
                            <Image
                              src={getWikiImageUrl(wiki.images)}
                              alt={wiki.title}
                              width={450}
                              height={450}
                              className="rounded-t-lg w-full h-full"
                            />
                          </div>
                          <div className="p-4">
                            <h1 className="text-xl font-semibold">
                              {wiki.title}
                            </h1>
                            <p className="text-alpha-800 text-sm">
                              {shortenText(wiki.summary, 100)}
                            </p>

                            <div className="flex flex-row justify-between mt-6">
                              <div className="flex flex-row gap-2 items-center">
                                <DisplayAvatar
                                  address={wiki.user?.id}
                                  avatarIPFS={wiki.user.profile?.avatar}
                                  alt={wiki.user.profile?.username}
                                />
                                <span className="text-brand-500 dark:text-brand-800 text-sm">
                                  {wiki.user?.profile?.username}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                ),
            )}
          </div>
        </TabsContent>
        <TabsContent value={AllCategoriesData[1].id as string}>
          <div>
            {data?.map(
              (category) =>
                category.id === 'defi' && (
                  <div className="grid grid-cols-3 gap-6">
                    {category.wikis.slice(0, 6).map((wiki) => {
                      return (
                        <Link
                          href={`/wiki/${wiki.id}`}
                          className="flex flex-col gap-2 border dark:border-gray-700 border-gray-200 rounded-xl"
                        >
                          <div className="h-80">
                            <Image
                              src={getWikiImageUrl(wiki.images)}
                              alt={wiki.title}
                              width={450}
                              height={450}
                              className="rounded-t-lg w-full h-full"
                            />
                          </div>
                          <div className="p-4">
                            <h1 className="text-xl font-semibold">
                              {wiki.title}
                            </h1>
                            <p className="text-alpha-800 text-sm">
                              {shortenText(wiki.summary, 100)}
                            </p>

                            <div className="flex flex-row justify-between mt-6">
                              <div className="flex flex-row gap-2 items-center">
                                <DisplayAvatar
                                  address={wiki.user?.id}
                                  avatarIPFS={wiki.user.profile?.avatar}
                                  alt={wiki.user.profile?.username}
                                />
                                <span className="text-brand-500 dark:text-brand-800 text-sm">
                                  {wiki.user?.profile?.username}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                ),
            )}
          </div>
        </TabsContent>
        <TabsContent value={AllCategoriesData[2].id as string}>
          <div>
            {data?.map(
              (category) =>
                category.id === 'exchanges' && (
                  <div className="grid grid-cols-3 gap-6">
                    {category.wikis.slice(0, 6).map((wiki) => {
                      return (
                        <Link
                          href={`/wiki/${wiki.id}`}
                          className="flex flex-col gap-2 border dark:border-gray-700 border-gray-200 rounded-xl"
                        >
                          <div className="h-80">
                            <Image
                              src={getWikiImageUrl(wiki.images)}
                              alt={wiki.title}
                              width={450}
                              height={450}
                              className="rounded-t-lg w-full h-full"
                            />
                          </div>
                          <div className="p-4">
                            <h1 className="text-xl font-semibold">
                              {wiki.title}
                            </h1>
                            <p className="text-alpha-800 text-sm">
                              {shortenText(wiki.summary, 100)}
                            </p>

                            <div className="flex flex-row justify-between mt-6">
                              <div className="flex flex-row gap-2 items-center">
                                <DisplayAvatar
                                  address={wiki.user?.id}
                                  avatarIPFS={wiki.user.profile?.avatar}
                                  alt={wiki.user.profile?.username}
                                />
                                <span className="text-brand-500 dark:text-brand-800 text-sm">
                                  {wiki.user?.profile?.username}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                ),
            )}
          </div>
        </TabsContent>
        <TabsContent value={AllCategoriesData[3].id as string}>
          <div>
            {data?.map(
              (category) =>
                category.id === 'cryptocurrencies' && (
                  <div className="grid grid-cols-3 gap-6">
                    {category.wikis.slice(0, 6).map((wiki) => {
                      return (
                        <Link
                          href={`/wiki/${wiki.id}`}
                          className="flex flex-col gap-2 border dark:border-gray-700 border-gray-200 rounded-xl"
                        >
                          <div className="h-80">
                            <Image
                              src={getWikiImageUrl(wiki.images)}
                              alt={wiki.title}
                              width={450}
                              height={450}
                              className="rounded-t-lg w-full h-full"
                            />
                          </div>
                          <div className="p-4">
                            <h1 className="text-xl font-semibold">
                              {wiki.title}
                            </h1>
                            <p className="text-alpha-800 text-sm">
                              {shortenText(wiki.summary, 100)}
                            </p>

                            <div className="flex flex-row justify-between mt-6">
                              <div className="flex flex-row gap-2 items-center">
                                <DisplayAvatar
                                  address={wiki.user?.id}
                                  avatarIPFS={wiki.user.profile?.avatar}
                                  alt={wiki.user.profile?.username}
                                />
                                <span className="text-brand-500 dark:text-brand-800 text-sm">
                                  {wiki.user?.profile?.username}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                ),
            )}
          </div>
        </TabsContent>
        <TabsContent value={AllCategoriesData[4].id as string}>
          <div>
            {data?.map(
              (category) =>
                category.id === 'defi' && (
                  <div className="grid grid-cols-3 gap-6">
                    {category.wikis.slice(0, 6).map((wiki) => {
                      return (
                        <Link
                          href={`/wiki/${wiki.id}`}
                          className="flex flex-col gap-2 border dark:border-gray-700 border-gray-200 rounded-xl"
                        >
                          <div className="h-80">
                            <Image
                              src={getWikiImageUrl(wiki.images)}
                              alt={wiki.title}
                              width={450}
                              height={450}
                              className="rounded-t-lg w-full h-full"
                            />
                          </div>
                          <div className="p-4">
                            <h1 className="text-xl font-semibold">
                              {wiki.title}
                            </h1>
                            <p className="text-alpha-800 text-sm">
                              {shortenText(wiki.summary, 100)}
                            </p>

                            <div className="flex flex-row justify-between mt-6">
                              <div className="flex flex-row gap-2 items-center">
                                <DisplayAvatar
                                  address={wiki.user?.id}
                                  avatarIPFS={wiki.user.profile?.avatar}
                                  alt={wiki.user.profile?.username}
                                />
                                <span className="text-brand-500 dark:text-brand-800 text-sm">
                                  {wiki.user?.profile?.username}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                ),
            )}
          </div>
        </TabsContent>
        <TabsContent value={AllCategoriesData[5].id as string}>
          <div>
            {data?.map(
              (category) =>
                category.id === 'people' && (
                  <div className="grid grid-cols-3 gap-6">
                    {category.wikis.slice(0, 6).map((wiki) => {
                      return (
                        <Link
                          href={`/wiki/${wiki.id}`}
                          className="flex flex-col gap-2 border dark:border-gray-700 border-gray-200 rounded-xl"
                        >
                          <div className="h-80">
                            <Image
                              src={getWikiImageUrl(wiki.images)}
                              alt={wiki.title}
                              width={450}
                              height={450}
                              className="rounded-t-lg w-full h-full"
                            />
                          </div>
                          <div className="p-4">
                            <h1 className="text-xl font-semibold">
                              {wiki.title}
                            </h1>
                            <p className="text-alpha-800 text-sm">
                              {shortenText(wiki.summary, 100)}
                            </p>

                            <div className="flex flex-row justify-between mt-6">
                              <div className="flex flex-row gap-2 items-center">
                                <DisplayAvatar
                                  address={wiki.user?.id}
                                  avatarIPFS={wiki.user.profile?.avatar}
                                  alt={wiki.user.profile?.username}
                                />
                                <span className="text-brand-500 dark:text-brand-800 text-sm">
                                  {wiki.user?.profile?.username}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                ),
            )}
          </div>
        </TabsContent>
        <TabsContent value={AllCategoriesData[5].id as string}>
          <div>
            {data?.map(
              (category) =>
                category.id === 'people' && (
                  <div className="grid grid-cols-3 gap-6">
                    {category.wikis.slice(0, 6).map((wiki) => {
                      return (
                        <Link
                          href={`/wiki/${wiki.id}`}
                          className="flex flex-col gap-2 border dark:border-gray-700 border-gray-200 rounded-xl"
                        >
                          <div className="h-80">
                            <Image
                              src={getWikiImageUrl(wiki.images)}
                              alt={wiki.title}
                              width={450}
                              height={450}
                              className="rounded-t-lg w-full h-full"
                            />
                          </div>
                          <div className="p-4">
                            <h1 className="text-xl font-semibold">
                              {wiki.title}
                            </h1>
                            <p className="text-alpha-800 text-sm">
                              {shortenText(wiki.summary, 100)}
                            </p>

                            <div className="flex flex-row justify-between mt-6">
                              <div className="flex flex-row gap-2 items-center">
                                <DisplayAvatar
                                  address={wiki.user?.id}
                                  avatarIPFS={wiki.user.profile?.avatar}
                                  alt={wiki.user.profile?.username}
                                />
                                <span className="text-brand-500 dark:text-brand-800 text-sm">
                                  {wiki.user?.profile?.username}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                ),
            )}
          </div>
        </TabsContent>
        <TabsContent value={AllCategoriesData[7].id as string}>
          <div>
            {data?.map(
              (category) =>
                category.id === 'organizations' && (
                  <div className="grid grid-cols-3 gap-6">
                    {category.wikis.slice(0, 6).map((wiki) => {
                      return (
                        <Link
                          href={`/wiki/${wiki.id}`}
                          className="flex flex-col gap-2 border dark:border-gray-700 border-gray-200 rounded-xl"
                        >
                          <div className="h-80">
                            <Image
                              src={getWikiImageUrl(wiki.images)}
                              alt={wiki.title}
                              width={450}
                              height={450}
                              className="rounded-t-lg w-full h-full"
                            />
                          </div>
                          <div className="p-4">
                            <h1 className="text-xl font-semibold">
                              {wiki.title}
                            </h1>
                            <p className="text-alpha-800 text-sm">
                              {shortenText(wiki.summary, 100)}
                            </p>

                            <div className="flex flex-row justify-between mt-6">
                              <div className="flex flex-row gap-2 items-center">
                                <DisplayAvatar
                                  address={wiki.user?.id}
                                  avatarIPFS={wiki.user.profile?.avatar}
                                  alt={wiki.user.profile?.username}
                                />
                                <span className="text-brand-500 dark:text-brand-800 text-sm">
                                  {wiki.user?.profile?.username}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                ),
            )}
          </div>
        </TabsContent>
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
