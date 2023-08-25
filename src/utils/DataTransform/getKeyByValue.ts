export const getKeyByValue = <T>(
  object: Record<string, T>,
  value: T,
): string | undefined =>
  Object.keys(object).find((key) => object[key] === value)
