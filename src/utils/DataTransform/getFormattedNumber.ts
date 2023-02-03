export const formatNumbers = (x: number | undefined) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
