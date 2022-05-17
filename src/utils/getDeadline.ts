export const getDeadline = () => {
  const deadline = new Date()
  deadline.setHours(deadline.getHours() + 2)
  return Math.floor(deadline.getTime() / 1000.0)
}
