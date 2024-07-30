import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '../Navbar/Navbar'
import NavigationTabs from './NavigationTabs'

const Footer = dynamic(() => import('@/components/Layout/Footer/Footer'), {
  suspense: true,
})

const Layout = ({
  children,
  noFooter,
}: {
  children: React.ReactNode
  noFooter?: boolean
}) => {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div>{children}</div>
      <NavigationTabs />
      <Suspense>{!noFooter && <Footer />}</Suspense>
    </main>
  )
}

export default Layout
