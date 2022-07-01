import { whiteListedDomains } from '@/types/Wiki'

export const PasteListener = (e: Event) => {
  e.preventDefault()
  e.stopPropagation()

  const { clipboardData } = e as ClipboardEvent
  const pasteHTML = clipboardData?.getData('text/html')

  if (pasteHTML) {
    const parser = new DOMParser()
    const sanitizedPaste = parser.parseFromString(pasteHTML, 'text/html')

    const validURLRecognizer = new RegExp(
      `^https?://(www\\.)?(${whiteListedDomains.join('|')})`,
    )

    const imgTags = sanitizedPaste.getElementsByTagName('img')

    const toRemoveImages = []
    for (let i = 0; i < imgTags.length; i += 1) {
      const img = imgTags[i]
      const src = img.getAttribute('src')
      if (src && !validURLRecognizer.test(src)) {
        toRemoveImages.push(img)
      }
    }
    for (let i = 0; i < toRemoveImages.length; i += 1) {
      toRemoveImages[i].remove()
    }

    const toRemoveLinks = []
    const aTags = sanitizedPaste.getElementsByTagName('a')
    for (let i = 0; i < aTags.length; i += 1) {
      const a = aTags[i]
      const href = a.getAttribute('href')
      if (href && !validURLRecognizer.test(href)) {
        toRemoveLinks.push(a)
      }
    }
    for (let i = 0; i < toRemoveLinks.length; i += 1) {
      toRemoveLinks[i].remove()
    }

    const transformedPasteHTML = sanitizedPaste.body.innerHTML.replace(
      /<br *\/?>/g,
      '<p/>',
    )
    document.execCommand('insertHTML', false, transformedPasteHTML)
  }
}
