const getImgFromArrayBuffer = (arrayBuffer: ArrayBuffer) => {
  var arrayBufferView = new Uint8Array(arrayBuffer)
  var blob = new Blob([arrayBufferView], { type: 'image/jpeg' })
  var urlCreator = window.URL || window.webkitURL
  var imageUrl = urlCreator.createObjectURL(blob)
  return imageUrl
}

export default getImgFromArrayBuffer
