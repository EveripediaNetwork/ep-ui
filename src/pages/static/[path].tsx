import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Index = () => {
  const router = useRouter()
  const { path } = router.query

  useEffect(() => {
    if (path) {
      router.push(`/${path}`)
    }
  }, [path, router])

  return null
}

export default Index
