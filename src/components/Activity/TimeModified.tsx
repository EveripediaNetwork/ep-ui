import React, { useEffect, useState } from 'react'

function timeSince(timeStamp: string) {
  const seconds = Math.floor(
    (new Date().valueOf() - new Date(timeStamp).valueOf()) / 1000,
  )
  let interval = seconds / 31536000
  if (interval > 1) {
    return `${Math.floor(interval)} years`
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return `${Math.floor(interval)} months`
  }
  interval = seconds / 86400
  if (interval > 1) {
    return `${Math.floor(interval)} days`
  }
  interval = seconds / 3600
  if (interval > 1) {
    return `${Math.floor(interval)} hours`
  }
  interval = seconds / 60
  if (interval > 1) {
    return `${Math.floor(interval)} minutes`
  }
  return `${Math.floor(seconds)} seconds`
}

const TimeModified = ({ lastModTimeStamp }: { lastModTimeStamp: string }) => {
  const [timeModified, setTimeModified] = useState<string | null>(
    timeSince(lastModTimeStamp),
  )

  useEffect(() => {
    // update last modified time every 5 seconds
    const intervalId = setInterval(() => {
      setTimeModified(timeSince(lastModTimeStamp))
    }, 5000)

    // clean up setInterval
    return () => clearInterval(intervalId)
  }, [lastModTimeStamp])
  return <b>{timeModified} ago</b>
}

export default TimeModified
