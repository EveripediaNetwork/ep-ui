export const dataURLtoArrayBuffer = async (imageUrl: string) => {
  console.log('dataURLtoArrayBuffer', imageUrl)
  const response = fetch(imageUrl)
  const blob = await (await response).blob()
  const arrayBuffer = await blob.arrayBuffer()
  console.log('dataURLtoArrayBuffer', arrayBuffer)
  return arrayBuffer
}
