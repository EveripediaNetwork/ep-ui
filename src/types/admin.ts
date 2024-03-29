import { ChangeEvent } from 'react'

export type EditorsType = {
  id: string
  title: string
  hidden: boolean
  created: string
  updated: string
  user: { id: string; profile: { id: string; username: string } }
  author: { id: string; profile: { username: string } }
}

export type ContentFeedbackArgs = {
  contentId: string
  rating: number
}

export type WikisModifiedCount = {
  amount: number
  startOn: string
  endOn: string
}
export interface Tag {
  id: string
}
export interface Categories {
  id: string
  title: string
}
export interface Image {
  id: string
  type: ArrayBuffer | string | File | Blob
}

export interface ToggleUser {
  id: string
  active: boolean
}

export interface RevalidateURL {
  route: string
}
export type ProfileData = {
  username: string
  avatar: string
}

export interface User {
  id: string
  profile: ProfileData
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
  content: string
  summary: string
  updated: string
  user: User
  categories: Categories[]
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
  | 'content'
  | 'summary'
  | 'updated'
  | 'user'
  | 'categories'
>

export interface Editors {
  id: string
  active: boolean
  username?: string
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
      }[]
    }[]
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
      }[]
    }[]
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

export interface EditorsTable {
  editorName: string
  createdWikis: {
    id: string
    wikiId: string
    datetime: string
    ipfs: string
    content: { title: string; images: { id: string } }
  }[]
  editiedWikis: {
    content: {
      title: string
      images: {
        id: string
      }
    }
    datetime: string
    id: string
    ipfs: string
    wikiId: string
  }[]
  lastCreatedWiki: any
  editorAvatar: string
  latestActivity: string
  editorAddress: string
  active: boolean
}

export type InsightTableWikiEditorsProps = {
  wikiInsightData: Editors[] | undefined
  toggleUserFunc?: (active: boolean, id: string) => void
  editorsIsFetching: boolean
  hiddenEditorsIsFetching: boolean
}

export type WikiEditorsInsightActionBarProps = {
  handleSearchKeyword: (e: ChangeEvent<HTMLInputElement>) => void
  handleSortChange: () => void
  isOpenFilter: boolean
  onCloseFilter: () => void
  ApplyFilterItems: (e: React.FormEvent<HTMLFormElement>) => void
  onToggleFilter: () => void
  FilterArray: {
    id: string
    value: string
  }[]
  sortIcon: JSX.Element
  setChecked: (checked: number) => void
  checked: number
  setFilterEditors: (editors: string[]) => void
  setPaginateOffset: (offset: number) => void
}

export type PromoteCreatedWikisModalProps = {
  isOpen: boolean
  onClose: () => void
  wikiChosenTitle: string
  wikiChosenId: string
  hideFunc: () => void
  setSuccessModal: (value: React.SetStateAction<boolean>) => void
}

export type HideWikiNotificationProps = {
  isOpen: boolean
  onClose: () => void
  wikiChosenId: string
  IsHide: boolean
  hideFunc: () => void
}

export type ContentProps = {
  activeStep: number
  steps?: {
    label: string
    description: string
  }[]
  Close?: () => void
  buttonOne?: string
  buttonTwo?: string
  promotedWikis: CreatedWikisCount[] | undefined
  Data: CreatedWikisCount | undefined
  value: string
  setValue: (value: React.SetStateAction<string>) => void
  promotion?: () => Promise<void>
  loading?: boolean
}

export type WikisTableProps = {
  wikiTableData: Wikis[]
  findSection: (promotedNum: number) => void
  shouldPromote: (wikiTitle: string, id: string) => void
  shouldArchive: (ishidden: boolean, wikiId: string) => void
}
export type WikiTableColProps = {
  item: Wikis
  PromoteClickOne: () => void
  PromoteClickTwo: () => void
  ArchiveClickOne: () => void
  ArchiveClickTwo: () => void
}

export type InsightTableWikiCreatedProps = {
  wikiCreatedInsightData: Wikis[]
  hideWikisFunc: () => void
}

export type WikiCreatedFooterProps = {
  activatePrevious: boolean
  scrolltoTableTop: () => void
  setPaginateOffset: React.Dispatch<React.SetStateAction<number>>
  paginateOffset: number
  setActivatePrevious: (value: React.SetStateAction<boolean>) => void
  wikis: CreatedWikisCount[] | undefined
  nextBtnDisabled: boolean
}

export type WikiCreatedActionBarProps = {
  setsearchKeyWord: (value: React.SetStateAction<string>) => void
  sortIcon: JSX.Element
  isOpen: boolean
  onClose: () => void
  onToggle: () => void
  handleSortChange: (value: number) => void
  checked: number
  setChecked: (value: React.SetStateAction<number>) => void
  setPaginateOffset: (value: React.SetStateAction<number>) => void
  setFilterItems: (value: React.SetStateAction<unknown[] | undefined>) => void
}
