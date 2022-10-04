export type Blog = {
  slug: string
  digest: string
  cover_image?: string
  contributor: string
  body: string
  image_sizes: number
  title: string
  timestamp?: number
  transaction?: string
  publisher?: {
    project: {
      address: string
    }
  }
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
  tags: Array<BlogTag>
}

export type BlogTag = {
  name: string
  value: string
}

export type RawTransactions = {
  transactions: {
    edges: Array<{
      node: BlogNode
    }>
  }
}
