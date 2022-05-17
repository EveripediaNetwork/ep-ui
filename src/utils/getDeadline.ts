export const getDeadline = () => {
  const deadline = new Date()
  deadline.setHours(deadline.getHours() + 3)
  return Math.floor(deadline.getTime() / 1000.0)
}
