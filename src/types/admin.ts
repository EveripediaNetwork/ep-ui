export type EditorsType = {
  id: string
  title: string
  hidden: boolean
  created: string
  updated: string
  user: { id: string; profile: { id: string; username: string } }
  author: { id: string; profile: { username: string } }
}

export type WikisModifiedCount = {
  amount: number
  startOn: string
  endOn: string
}

// export type CreatedWikisCount = {
//   title: string
//   images: Images[]
//   author: { id: string; profile: { username: string } }
//   created: string
//   tags: Tags[]
//   promoted: number
//   hidden: boolean
// }

export interface Tag {
  id: string
}

export interface Image {
  id: string
  type: ArrayBuffer | string | File | Blob
}

export type ProfileData = {
  username: string
}

export interface Author {
  id: string | null
  profile?: ProfileData | null
}

export interface Wikis {
  title: string
  images?: Image[]
  author: Author
  created?: string
  tags: Tag[]
  promoted: number
  hidden: boolean
}

export type CreatedWikisCount = Pick<
  Wikis,
  'title' | 'images' | 'author' | 'created' | 'tags' | 'promoted' | 'hidden'
>
