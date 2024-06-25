'use client'
import React, { useRef } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Link } from '@chakra-ui/react'
import { mooLahLah } from '@/pages/_app'

export const StickyScrollReveal = ({
  content,
  contentClassName,
}: {
  content: {
    title: string
    description: string
    year: number
  }[]
  contentClassName?: string
}) => {
  const [activeCard, setActiveCard] = React.useState(0)
  const ref = useRef<any>(null)
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ['start start', 'end start'],
  })
  const cardLength = content.length

  useMotionValueEvent(scrollYProgress, 'change', (latest: any) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength)
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint)
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index
        }
        return acc
      },
      0,
    )
    setActiveCard(closestBreakpointIndex)
  })

  // regex to process links within a paragragh
  const processText = (inputText: string): React.ReactNode[] => {
    const linkRegex = /<Link href='([^']*)'>(.*?)<\/Link>/g
    const elements: React.ReactNode[] = []
    let lastIndex = 0

    inputText.replace(linkRegex, (match, href, linkText, index) => {
      elements.push(inputText.substring(lastIndex, index))
      lastIndex = index + match.length

      elements.push(
        <Link
          color="brandLinkColor"
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkText}
        </Link>,
      )

      return match
    })

    elements.push(inputText.substring(lastIndex))

    return elements
  }
  return (
    <motion.div
      className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div>
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-4xl font-bold text-gray-800 dark:text-white max-w-lg"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-md text-gray-600 dark:text-white/80 max-w-xl mt-5"
              >
                {processText(item.description)}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>

      <div
        className={cn(
          'hidden sm:block h-60 w-80 sticky top-28 overflow-hidden text-brand-500 dark:text-brand-800 text-center text-9xl',
          contentClassName,
          mooLahLah.className,
        )}
      >
        {content[activeCard].year ?? null}
      </div>
    </motion.div>
  )
}
