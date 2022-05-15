/* eslint-disable no-nested-ternary */
import { CiteReference } from '@/types/Wiki'
import { Box, Button, Input, Text, VStack } from '@chakra-ui/react'
import Fuse from 'fuse.js'
import React, { useEffect, useMemo } from 'react'
import { tuiEditorInputStyles } from './CiteFromNewURL'
import { ReferenceCard } from './ReferenceCard'

interface AddFromExistingProps {
  refCount: number
  references: CiteReference[]
  handleExistingCiteSubmit: (ref: CiteReference, index: number) => void
  setTabIndex: (index: number) => void
  fetchReferences: () => void
}

const NoCitationsMessage = ({
  setTabIndex,
}: {
  setTabIndex: (index: number) => void
}) => {
  return (
    <Box p="10px !important" mb={8} w="100%" textAlign="center" fontSize="14px">
      <Text p="10px !important" w="100%" textAlign="center" fontSize="14px">
        This Page has no Citations
      </Text>
      <Text
        fontSize="12px"
        fontWeight="100 !important"
        opacity={0.5}
        w="60%"
        mx="auto"
      >
        Add a Citation to this Page by clicking the New URL tab at the top
      </Text>
      <Button
        className="toastui-editor-ok-button"
        outline="0 !important"
        w="60% !important"
        mt="10px !important"
        onClick={() => setTabIndex(0)}
      >
        Cite New
      </Button>
    </Box>
  )
}

export const CiteFromExistingRefs = ({
  refCount,
  references,
  handleExistingCiteSubmit,
  setTabIndex,
  fetchReferences,
}: AddFromExistingProps) => {
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [search, setSearch] = React.useState<string>('')
  const [searchResults, setSearchResults] = React.useState<CiteReference[]>([])

  const fuse = useMemo(
    () =>
      new Fuse(
        references.map((ref, i) => ({ ...ref, index: `ID${i + 1}` })),
        {
          keys: ['index', 'url', 'description'],
          threshold: 0.2,
        },
      ),
    [references],
  )

  useEffect(() => {
    if (search.length > 0) {
      const results = fuse.search(search)
      setSearchResults(results.map(result => result.item))
    } else {
      setSearchResults([])
    }
  }, [fuse, search])

  // if editingId changes to null, reset the search
  useEffect(() => {
    if (editingId === null) {
      setSearch('')
      setSearchResults([])
    }
  }, [editingId])

  // based on if the user is editing a reference or not,
  // and if there are any search results, change shown references
  let shownReferences = []
  if (editingId) {
    shownReferences = references.filter(ref => {
      return ref.id === editingId
    })
  } else if (searchResults.length > 0) {
    shownReferences = searchResults
  } else shownReferences = references

  return (
    <VStack maxH="350px">
      {!editingId && (
        <Input
          w="100% !important"
          m="5px"
          {...tuiEditorInputStyles}
          placeholder="Search for a Reference"
          value={search}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setSearch(e.target.value)
          }
        />
      )}
      <VStack w="100%" overflowY="scroll" spacing={8}>
        {refCount ? (
          shownReferences.map(reference => (
            <ReferenceCard
              handleExistingCiteSubmit={handleExistingCiteSubmit}
              reference={reference}
              setEditingId={setEditingId}
              editingId={editingId}
              allReferences={references}
              fetchReferences={fetchReferences}
            />
          ))
        ) : (
          <NoCitationsMessage setTabIndex={setTabIndex} />
        )}
      </VStack>
    </VStack>
  )
}
