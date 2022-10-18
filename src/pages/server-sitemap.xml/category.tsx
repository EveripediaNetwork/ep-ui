import { getCategories } from '@/services/categories'
import { store } from '@/store/store'
import { GetServerSideProps } from 'next'
import { getServerSideSitemap, ISitemapField } from 'next-sitemap'

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { data: categories } = await store.dispatch(getCategories.initiate())
  const fields: ISitemapField[] =
    categories?.map(category => ({
      loc: `${process.env.NEXT_PUBLIC_DOMAIN}/categories/${category.id}`,
      lastmod: new Date().toISOString(),
    })) || []
  return getServerSideSitemap(ctx, fields)
}

export default function Site() {}
