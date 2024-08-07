import { createSlice } from '@reduxjs/toolkit'
import {
  LanguagesISOEnum,
  type Wiki,
  type MData,
  CommonMetaIds,
  EditSpecificMetaIds,
  CreateNewWikiSlug,
  type LinkedWikiKey,
  type BaseEvents,
  EventType,
} from '@everipedia/iq-utils'
import { sortEvents } from '@/utils/event.utils'

const getCurrentSlug = () => {
  let slug = window.location.search.split('=')[1]
  if (!slug) slug = CreateNewWikiSlug
  return slug
}

export const saveDraftInLocalStorage = (wiki: Wiki) => {
  // get slug from url
  const slug = getCurrentSlug()
  // save draft to local storage
  const wikiData = JSON.stringify(wiki)
  const timestamp = new Date().getTime()
  const wikiDataWithTimestamp = `${wikiData}|${timestamp}`
  localStorage.setItem(`draftData-${slug}`, wikiDataWithTimestamp)
}

export const getDraftFromLocalStorage = () => {
  // get slug from url
  const slug = getCurrentSlug()
  // fetch draft data from local storage
  const draftData = localStorage.getItem(`draftData-${slug}`)
  if (!draftData) return undefined
  const separatorIndex = draftData.lastIndexOf('|')
  const wikiData = draftData.slice(0, separatorIndex)
  const timestamp = draftData.slice(separatorIndex + 1, draftData.length)
  const wiki = JSON.parse(wikiData)
  const draftTimestamp = Number.parseInt(timestamp, 10)
  const currentTimestamp = new Date().getTime()
  // check if draft is older than 75 hour
  const cacheLimit = 75 * 60 * 60 * 1000
  if (currentTimestamp - draftTimestamp > cacheLimit) {
    localStorage.removeItem(`draftData-${slug}`)
    return undefined
  }
  // if draft is not older than 24 hour, return wiki
  return wiki
}

export const removeDraftFromLocalStorage = () => {
  const slug = getCurrentSlug()
  if (slug) localStorage.removeItem(`draftData-${slug}`)
}

const initialState: Wiki = {
  id: CreateNewWikiSlug,
  version: 1,
  language: LanguagesISOEnum.EN,
  title: '',
  hidden: false,
  content: '',
  summary: '',
  categories: [],
  promoted: 0,
  tags: [],
  metadata: [
    ...Object.values({ ...CommonMetaIds, ...EditSpecificMetaIds }).map(
      (mID) => ({
        id: mID,
        value: '',
      }),
    ),
  ],
  user: {
    id: '',
  },
  author: {
    id: '',
  },
  media: [],
  views: 0,
  events: [],
  linkedWikis: { founders: [], blockchains: [], speakers: [] },
  founderWikis: [],
  blockchainWikis: [],
}

const wikiSlice = createSlice({
  name: 'wiki',
  initialState,
  reducers: {
    setInitialWikiState(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    setCurrentWiki(state, action) {
      const newState = {
        ...state,
        ...action.payload,
      }
      saveDraftInLocalStorage(newState)
      return newState
    },
    setContent(state, action) {
      const newState = {
        ...state,
        content: action.payload,
      }
      if (newState.content.trim()) {
        saveDraftInLocalStorage(newState)
      }
      return newState
    },
    updateCategories(state, action) {
      const newState = {
        ...state,
        categories: [action.payload],
      }
      saveDraftInLocalStorage(newState)
      return newState
    },
    deleteCategories(state) {
      const newState = {
        ...state,
        categories: [],
      }
      saveDraftInLocalStorage(newState)
      return newState
    },
    addTag(state, action) {
      const newState = {
        ...state,
        tags: [...state.tags, action.payload],
      }
      saveDraftInLocalStorage(newState)
      return newState
    },
    setTags(state, action) {
      const newState = {
        ...state,
        tags: action.payload,
      }
      saveDraftInLocalStorage(newState)
      return newState
    },
    addMedia(state, action) {
      if (state.media) {
        const newState = {
          ...state,
          media: [...state.media, action.payload],
        }
        saveDraftInLocalStorage(newState)
        return newState
      }
      return state
    },
    addWikiImageIPFS(state, action) {
      if (state.media) {
        const newState = {
          ...state,
          images: [{ id: action.payload, type: 'image/jpeg, image/png' }],
        }
        saveDraftInLocalStorage(newState)
        return newState
      }
      return state
    },
    deleteWikiImages(state) {
      const newState = state
      delete newState.images
      saveDraftInLocalStorage(newState)
      return newState
    },
    removeMedia(state, action) {
      if (state.media) {
        const updatedMedia = state.media.filter(
          (media) => media.id !== action.payload.id,
        )
        const newState = {
          ...state,
          media: updatedMedia,
        }
        saveDraftInLocalStorage(newState)
        return newState
      }
      return state
    },
    updateMediaDetails(state, action) {
      if (state.media) {
        const findMediaIndex = state.media.findIndex(
          (media) => media.id === action.payload.id,
        )
        const updatedMedia = [...state.media]
        updatedMedia[findMediaIndex] = {
          ...updatedMedia[findMediaIndex],
          ...action.payload,
          ...{ id: action.payload.hash },
        }
        const newState = {
          ...state,
          media: updatedMedia,
        }
        saveDraftInLocalStorage(newState)
        return newState
      }
      return state
    },
    updateMetadata(state, action) {
      const ob = action.payload
      const newState = {
        ...state,
        metadata: state.metadata.map((m: MData) =>
          m.id === ob.id ? { id: ob.id, value: ob.value } : m,
        ),
      }
      saveDraftInLocalStorage(newState)
      return newState
    },
    addLinkedWiki(state, action) {
      const { linkType, wikiId } = action.payload as {
        linkType: LinkedWikiKey
        wikiId: string
      }
      const newState = {
        ...state,
        linkedWikis: {
          ...state.linkedWikis,
          [linkType]: state.linkedWikis
            ? [...(state.linkedWikis[linkType] || []), wikiId]
            : [wikiId],
        },
      }

      saveDraftInLocalStorage(newState)
      return newState
    },
    removeLinkedWiki(state, action) {
      const { linkType, wikiId } = action.payload as {
        linkType: LinkedWikiKey
        wikiId: string
      }
      const newLinkedWikis = {
        ...state.linkedWikis,
        [linkType]: state.linkedWikis
          ? (state.linkedWikis[linkType] || []).filter(
              (id: string) => id !== wikiId,
            )
          : [],
      }

      const newState: Wiki = {
        ...state,
        linkedWikis: newLinkedWikis,
      }

      saveDraftInLocalStorage(newState)
      return newState
    },
    addEvent(state, action) {
      const {
        title,
        description,
        type,
        date,
        link,
        multiDateStart,
        multiDateEnd,
      } = action.payload as BaseEvents

      let index = -1

      if (action.payload.type === EventType.MULTIDATE) {
        index = Number(
          state.events?.findIndex(
            (e) =>
              e.multiDateStart === multiDateStart &&
              e.multiDateEnd === multiDateEnd,
          ),
        )
      } else {
        index = Number(state.events?.findIndex((e) => e.date === date))
      }

      if (index !== -1) {
        const updatedEvent = {
          title,
          description,
          link,
          date,
          type,
          multiDateStart,
          multiDateEnd,
        }
        const events = state.events ? [...state.events] : []
        events[index] = updatedEvent
        const sortedEvents = sortEvents(events)
        const newState = { ...state, events: sortedEvents }
        saveDraftInLocalStorage(newState)
        return newState
      }

      const newEvent = {
        title,
        description,
        link,
        date,
        type,
        multiDateStart,
        multiDateEnd,
      }
      const events = state.events ? [...state.events, newEvent] : [newEvent]
      const sortedEvents = sortEvents(events)
      const newState = { ...state, events: sortedEvents }
      saveDraftInLocalStorage(newState)
      return newState
    },
    removeEvent(state, action) {
      if (state.events) {
        if (state.events.length === 1) {
          let updatedEvents = []
          if (action.payload.type === EventType.MULTIDATE) {
            updatedEvents = state.events.filter(
              (event) =>
                event.multiDateStart !== action.payload.multiDateStart ||
                event.multiDateEnd !== action.payload.multiDateEnd,
            )
          } else {
            updatedEvents = state.events.filter(
              (event) => event.date !== action.payload.date,
            )
          }

          const newState = {
            ...state,
            events: updatedEvents,
          }

          saveDraftInLocalStorage(newState)
          return newState
        }
      }

      if (state.events && state.events?.length > 1) {
        const firstEvent = state.events.find(
          (event) => event.type === EventType.CREATED,
        )

        if (action.payload.date === firstEvent?.date) {
          return state
        }

        let updatedEvents = []

        if (action.payload.type === EventType.MULTIDATE) {
          updatedEvents = state.events.filter((event) => {
            return (
              event.multiDateStart !== action.payload.multiDateStart ||
              event.multiDateEnd !== action.payload.multiDateEnd
            )
          })
        } else {
          updatedEvents = state.events.filter(
            (event) => event.date !== action.payload.date,
          )
        }

        const newState = {
          ...state,
          events: updatedEvents,
        }

        saveDraftInLocalStorage(newState)
        return newState
      }
      return state
    },

    reset() {
      return initialState
    },
  },
})

export const { setCurrentWiki } = wikiSlice.actions
export default wikiSlice.reducer
