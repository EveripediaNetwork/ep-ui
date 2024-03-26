export const fetchTokenRate = async (
  tokenName: string,
  versusCurrency = 'usd',
) => {
  const res = await fetch(
    `api/token-rate?ids=${tokenName}&vs_currencies=${versusCurrency}`,
  )
  const data = await res.json()
  console.log({ data })
  return (await res.json())[tokenName][versusCurrency]
}
