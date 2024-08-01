import { Icon } from '@chakra-ui/react'
import { Wiki } from '@everipedia/iq-utils'
import { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useTranslation } from 'next-i18next'
import { RiStarFill } from 'react-icons/ri'
import { WikiCarousel } from '../Elements/Carousel/Carousel'
import { FeaturedWikiCard } from './FeaturedWikiCard'
import { LoadingFeaturedWikiCard } from './LoadingFeaturedWikiCard'

export const FeaturedWikis = ({ featuredWikis }: { featuredWikis: Wiki[] }) => {
  const OPTIONS: EmblaOptionsType = { loop: true }
  const { t } = useTranslation('home')

  return (
    <section className="w-full lg:h-full dark:text-white text-center justify-center bg-transparent backdrop-filter backdrop-blur-sm border dark:border-gray-700 border-gray-200 rounded-xl pb-4 xl:pb-0">
      <div className="w-full flex items-center gap-2 p-4">
        <Icon
          cursor="pointer"
          color="brandLinkColor"
          fontSize="2xl"
          fontWeight={600}
          as={RiStarFill}
        />
        <h1 className="text-base font-semibold text-center text-gray-900 dark:text-white font-montserrat">
          {t('featuredWikisTitle')}
        </h1>
      </div>
      <div className="px-4">
        {featuredWikis ? (
          <WikiCarousel plugins={[Autoplay()]} options={OPTIONS}>
            {featuredWikis.map((wiki) => (
              <div className="flex-[1_0_100%]" key={`wiki-${wiki.id}`}>
                <FeaturedWikiCard wiki={wiki} />
              </div>
            ))}
          </WikiCarousel>
        ) : (
          <LoadingFeaturedWikiCard />
        )}
      </div>
    </section>
  )
}
