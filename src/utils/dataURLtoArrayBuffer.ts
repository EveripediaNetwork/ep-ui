export const dataURLtoArrayBuffer = async (imageUrl: string) => {
  const response = fetch(imageUrl)
  const blob = await (await response).blob()
  const arrayBuffer = await blob.arrayBuffer()
  return arrayBuffer
}
