export type Blog = {
  slug: string
  digest: string
  cover_image?: string
  contributor: string
  body: string
  excerpt?: string
  image_sizes: number
  title: string
  timestamp?: number
  publishedAtTimestamp?: number
  transaction?: string
  publisher?: {
    project: {
      address: string
    }
  }
}

export type FormatedBlogType = {
  title: string
  body?: string
  excerpt?: string
  slug: string
  digest: string
  contributor: string
  timestamp: number | undefined
  cover_image: string
  image_sizes: number
}

type EntryPathPicked = Pick<Blog, 'slug' | 'timestamp'>

export interface EntryPath extends EntryPathPicked {
  path: string
}

export type BlogNode = {
  id: string
  block: {
    timestamp: number
  }
  tags: BlogTag[]
}

export type BlogTag = {
  name: string
  value: string
}

export type RawTransactions = {
  transactions: {
    edges: {
      node: BlogNode
    }[]
  }
}

export type BlogPostType = {
  maxW?: string
  post: Blog
  key: number
}
