import React from 'react'
// import { Box, Stack } from '@chakra-ui/react'
// import dynamic from 'next/dynamic'
// import Navbar from '../Navbar/Navbar'
// const Footer = dynamic(() => import('@/components/Layout/Footer/Footer'), {
//   suspense: true,
// })

const Layout = ({
  children,
}: // noFooter,
{
  children: React.ReactNode
  noFooter?: boolean
}) => {
  return (
    <div className="min-h-[100dvh] justify-between flex-col bg-white dark:bg-[#1A202C]">
      <main className="pt-[70px]">{children}</main>
    </div>
  )
}

export default Layout
