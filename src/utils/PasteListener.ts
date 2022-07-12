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
      toRemoveLinks[i].removeAttribute('href')
    }

    const divTags = sanitizedPaste.getElementsByTagName('div')
    for (let i = 0; i < divTags.length; i += 1) {
      const div = divTags[i]
      const className = div.getAttribute('class')
      if (className?.match(/Typography__Paragraph/)) {
        const newDiv = document.createElement('div')
        newDiv.innerHTML = `${div.innerHTML}<p/>`
        div.parentNode?.replaceChild(newDiv, div)
      }
    }

    const transformedPasteHTML = sanitizedPaste.body.innerHTML
      .replace(/<br *\/?>/g, '<p/>') // fixes <br>s not being inserted to editor
      .replace(/\[[0-9]+\](?!( *(<\/sup>)? *<\/a>))/g, '') // removes cite marks which are not wrapped in <a>

    document.execCommand('insertHTML', false, transformedPasteHTML)
  }
}
