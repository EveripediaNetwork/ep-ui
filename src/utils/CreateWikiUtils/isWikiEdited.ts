import { EditSpecificMetaIds, Wiki } from '@everipedia/iq-utils'

function isDeepEqual(obj1: any, obj2: any): boolean {
  // If both are strings, compare them ignoring whitespace
  if (typeof obj1 === 'string' && typeof obj2 === 'string') {
    return obj1.replace(/\s+/g, '') === obj2.replace(/\s+/g, '')
  }

  // Check if they are the same reference or both null/undefined
  if (obj1 === obj2) {
    return true
  }

  // Check if either is null/undefined, or not both are objects (including functions)
  if (
    typeof obj1 !== 'object' ||
    obj1 === null ||
    typeof obj2 !== 'object' ||
    obj2 === null
  ) {
    return false
  }

  // Get the keys of both objects
  const keysA = Object.keys(obj1)
  const keysB = Object.keys(obj2)

  // Check if the number of properties is different
  if (keysA.length !== keysB.length) {
    return false
  }

  // Check if obj2 has all keys present in obj1 and compare each key
  for (const key of keysA) {
    if (!keysB.includes(key)) {
      return false
    }

    // Check if the property is a function and compare the function's code
    if (typeof obj1[key] === 'function' || typeof obj2[key] === 'function') {
      if (obj1[key].toString() !== obj2[key].toString()) {
        return false
      }
    } else {
      // Recursive call for nested objects or arrays
      if (!isDeepEqual(obj1[key], obj2[key])) {
        return false
      }
    }
  }
  return true
}

const isWikiEdited = (wikiToBeEdited: Wiki, editedWiki: Wiki) => {
  const { metadata } = wikiToBeEdited
  const { metadata: wikiMetadata } = editedWiki
  const promotedWiki = wikiToBeEdited.promoted ?? 0

  const resolvedMetaI = metadata.filter(
    (meta) =>
      !Object.values(EditSpecificMetaIds).includes(
        meta.id as EditSpecificMetaIds,
      ),
  )

  const resolvedMetaII = wikiMetadata.filter(
    (meta) => meta.value !== '' && meta.value !== '[]',
  )
  const sanitized = {
    ...wikiToBeEdited,
    metadata: [...resolvedMetaI],
    promoted: promotedWiki,
  }

  const sanitizedWikiState = {
    ...editedWiki,
    metadata: [...resolvedMetaII],
  }

  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  const { version, language, ...newSanitizedWikiState } = sanitizedWikiState

  return isDeepEqual(sanitized, newSanitizedWikiState)
}

export default isWikiEdited
