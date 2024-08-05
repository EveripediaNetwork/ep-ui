import { useCreateWikiContext } from '../useCreateWikiState'
import { useEffect } from 'react'
import type { Wiki } from '@everipedia/iq-utils'
import {
  getDraftFromLocalStorage,
  removeDraftFromLocalStorage,
} from '@/store/slices/wiki.slice'
import isDeepEqual from '@everipedia/iq-utils/build/main/lib/isDeepEqual'
import { HStack, Text, Button } from '@chakra-ui/react'
import { CreateNewWikiSlug } from '@everipedia/iq-utils'
import { useToast } from '@chakra-ui/react'

const useDraftNotifications = () => {
  const { isNewWiki, wikiData } = useCreateWikiContext()
  const toast = useToast()

  useEffect(() => {
    let draft: Wiki | undefined

    // Load the draft from local storage if creating a new wiki or if wiki data exists
    if (isNewWiki || wikiData) {
      draft = getDraftFromLocalStorage()
    }

    // Use the isDeepEqual function to compare the loaded draft and current wiki data
    const isDraftDifferent = draft && !isDeepEqual(draft, wikiData)

    if (!toast.isActive('draft-loaded') && draft && isDraftDifferent) {
      toast({
        id: 'draft-loaded',
        title: (
          <HStack w="full" justify="space-between" align="center">
            <Text>Loaded from saved draft</Text>
            <Button
              size="xs"
              variant="outline"
              onClick={() => {
                removeDraftFromLocalStorage()
                window.location.reload()
              }}
              sx={{
                '&:hover, &:focus, &:active': {
                  bgColor: '#0000002a',
                },
              }}
            >
              {draft?.id === CreateNewWikiSlug
                ? 'Reset State'
                : 'Reset to current wiki content'}
            </Button>
          </HStack>
        ),
        status: 'info',
        duration: 5000,
      })
    }
  }, [isNewWiki, toast, wikiData])
}

export default useDraftNotifications
