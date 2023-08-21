export const getKeyByValue = <T>(
  object: Record<string, T>,
  value: T,
): string | undefined =>
  Object.keys(object).find((key) => object[key] === value)

export const getValueByKey = <T>(
  object: Record<string, T>,
  key: string,
): T | undefined => object[key]
