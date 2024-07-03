import { useEffect } from 'react'

/*
 * Adds an event listener for the install event for the PWA
 */
const PWAInstallPrompt = () => {
  console.log('<InstallPrompt />')
  useEffect(() => {
    const handleInstallPrompt = (e: any) => {
      e.preventDefault()
      console.log('Install ⚙️  event fired')
    }

    if (window) {
      window.addEventListener('beforeinstallprompt', handleInstallPrompt)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt)
    }
  }, [])

  return null
}

export default PWAInstallPrompt
