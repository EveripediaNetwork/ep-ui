import dynamic from 'next/dynamic'

export const getBootStrapIcon = iconName => {
  return dynamic(
    async () => {
      const reactIconLib = await import(`react-icons/bs`)
      return reactIconLib[iconName]
    },
    { ssr: true },
  )
}
