const getImgFromArrayBuffer = (arrayBuffer: ArrayBuffer) => {
  const arrayBufferView = new Uint8Array(arrayBuffer)
  const blob = new Blob([arrayBufferView], { type: 'image/jpeg' })
  const urlCreator = window.URL || window.webkitURL
  const imageUrl = urlCreator.createObjectURL(blob)
  return imageUrl
}

export default getImgFromArrayBuffer
