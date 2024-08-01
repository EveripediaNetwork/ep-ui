import { Tabs } from '@/data/NavigationTabs'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RiMoreFill } from 'react-icons/ri'

export default function NavigationTabs() {
  const path = usePathname()
  console.log(path)

  return (
    <div className="md:hidden fixed bottom-0 bg-white dark:bg-gray800 w-full border-t border-gray-200 dark:border-alpha-200 h-[72px] px-4 flex items-center justify-between z-40">
      {Tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          className={cn(
            'flex flex-col gap-2 items-center',
            path === tab.href
              ? 'text-brand-500 dark:text-brand-800'
              : ' text-gray-500 dark:text-alpha-600',
          )}
        >
          <tab.icon className="w-6 h-6" />
          <span className="text-xs">{tab.title}</span>
        </Link>
      ))}
      <div className="flex flex-col gap-2 items-center text-xs text-gray-500 dark:text-alpha-600">
        <RiMoreFill className="w-6 h-6" />
        More
      </div>
    </div>
  )
}
