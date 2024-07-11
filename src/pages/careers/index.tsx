import { useRouter } from 'next/router'
import { useEffect } from 'react'

function index() {
  const router = useRouter()
  useEffect(() => {
    router.push('https://join.com/companies/iq')
  }, [])
  return null
}

export default index
