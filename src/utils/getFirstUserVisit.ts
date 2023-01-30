const TIME_LIMIT = 60

export const userFirstVisit = () => {
  const currentDate = new Date()
  if (typeof localStorage === 'undefined') return true

  const firstVisitedString = localStorage.getItem('FIRST_VISITED')

  if (!firstVisitedString) {
    localStorage.setItem('FIRST_VISITED', currentDate.toString())
    return true
  }

  const firstVisited = new Date(firstVisitedString)

  const timeDifference =
    (currentDate.getTime() - firstVisited.getTime()) / (1000 * 60)

  if (timeDifference > TIME_LIMIT) {
    return false
  }

  return true
}
