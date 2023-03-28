export const fetchTokenRate = async (
  tokenName: string,
  versusCurrency = 'usd',
) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${tokenName}&vs_currencies=${versusCurrency}`,
  )
  return (await res.json())[tokenName][versusCurrency]
}
