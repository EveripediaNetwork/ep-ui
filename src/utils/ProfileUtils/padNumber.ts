export const padNumber = (val: number | undefined) => {
  return val?.toString().padStart(3, '0')
}
