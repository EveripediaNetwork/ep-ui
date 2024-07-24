import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '../Navbar/Navbar'

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
    <main>
      <Navbar />
      <div>{children}</div>
      <Suspense>{!noFooter && <Footer />}</Suspense>
    </main>
  )
}

export default Layout
