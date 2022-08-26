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
  id: string
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
  | 'id'
  | 'title'
  | 'images'
  | 'author'
  | 'created'
  | 'tags'
  | 'promoted'
  | 'hidden'
>

export interface Editors {
  id: string
  active: boolean
  profile: { username: string | null; avatar: string }
  wikisCreated: {
    id: string
    wikiId: string
    datetime: string
    ipfs: string
    content: {
      title: string
      images: {
        id: string
      }
    }
  }[]
  wikisEdited: {
    id: string
    wikiId: string
    datetime: string
    ipfs: string
    content: {
      title: string
      images: {
        id: string
      }
    }
  }[]
}

export interface SearchedEditors {
  id: string
  username: string | null
  avatar: string
  wikisCreated: {
    id: string
    wikiId: string
    datetime: string
    ipfs: string
    content: {
      title: string
      images: {
        id: string
      }
    }
  }[]
  wikisEdited: {
    id: string
    wikiId: string
    datetime: string
    ipfs: string
    content: {
      title: string
      images: {
        id: string
      }
    }
  }[]
}
