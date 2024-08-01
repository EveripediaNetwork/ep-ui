import { Logo } from '@/components/Elements'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Link from 'next/link'
import {
  RiBook2Fill,
  RiCodeBoxFill,
  RiGroup2Fill,
  RiMoreFill,
  RiNewspaperFill,
  RiNumbersFill,
  RiSearchEyeFill,
  RiStarSFill,
} from 'react-icons/ri'

export const moreItems = [
  {
    id: 'learn',
    label: 'IQ Learn',
    icon: RiBook2Fill,
    href: 'https://learn.everipedia.org/iq/',
    target: '_blank',
  },
  {
    id: 'dashboard',
    label: 'IQ Dashboard',
    icon: RiNumbersFill,
    href: 'https://iq.braindao.org',
    target: '_blank',
  },
  {
    id: 'glossary',
    label: 'Glossary',
    icon: RiStarSFill,
    href: '/glossary',
  },
  {
    id: 'iq-gpt',
    label: 'IQ GPT',
    icon: RiSearchEyeFill,
    href: 'https://iqgpt.com',
    target: '_blank',
  },
  {
    id: 'iq-code',
    label: 'IQ Code',
    icon: RiCodeBoxFill,
    href: 'https://iqcode.ai',
    target: '_blank',
  },
  {
    id: 'blog',
    label: 'Blog',
    icon: RiNewspaperFill,
    href: '/blog',
  },
  {
    id: 'braindao',
    label: 'BrainDAO',
    icon: RiGroup2Fill,
    href: 'https://braindao.org',
    target: '_blank',
  },
]

export function MoreDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="bg-white dark:bg-gray800 border-none w-0 hover:dark:bg-gray800"
        >
          <div className="flex flex-col gap-2 items-center text-xs text-gray-500 dark:text-alpha-600">
            <RiMoreFill className="w-6 h-6" />
            More
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full bg-white dark:bg-gray-800 p-0">
        <SheetHeader className="flex items-start p-6 border-b dark:border-alpha-400">
          <SheetTitle>
            <div className="flex flex-row gap-2 items-center">
              <Logo />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                IQ.wiki
              </h1>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-8 p-6">
          {moreItems.map((item) => (
            <Link
              href={item.href}
              key={item.id}
              className="flex flex-row gap-4 items-center text-gray-500 dark:text-alpha-800"
            >
              <item.icon className="w-6 h-6" />
              <span className="text-base">{item.label}</span>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
