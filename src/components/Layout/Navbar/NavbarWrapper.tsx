import useDisclosure from '@/hooks/useDisclosure'
import { setDrawerOpen } from '@/store/slices/app-slice'
import { store } from '@/store/store'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { Logo } from '@/components/Elements'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

export const NavbarWrapper = () => {
  const dispatch = useDispatch()

  const drawerOperations = useDisclosure({
    defaultIsOpen: store.getState().app.isDrawerOpen,
    onOpen: () => {
      dispatch(setDrawerOpen(true))
    },
    onClose: () => {
      dispatch(setDrawerOpen(false))
    },
  })

  return (
    <div
      className={`fixed shadow-sm z-[1200] w-full ${
        drawerOperations.isOpen ? 'h-full' : 'h-[unset]'
      } md:h-[unset] bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-alpha-300`}
    >
      <div className="flex h-[70px] justify-between items-center px-4 md:px-8">
        <div className="flex items-center gap-6">
          <Link prefetch={false} href="/">
            <div className="flex items-center gap-2">
              <Logo />
              <p className="font-bold text-xl text-gray-800 dark:text-white">
                IQ.wiki
              </p>
            </div>
          </Link>
          <NavigationMenu>
            <NavigationMenuList className="gap-4 items-center">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="!bg-transparent p-0 text-sm font-medium text-gray-600 dark:text-alpha-900">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Link</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/activity" passHref>
                  <NavigationMenuLink className="text-sm font-medium text-gray-600 dark:text-alpha-900">
                    Activity
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/rank" passHref>
                  <NavigationMenuLink className="text-sm font-medium text-gray-600 dark:text-alpha-900">
                    Rank
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="https://iqgpt.com" target="_blank">
                  <NavigationMenuLink className="text-sm font-medium text-gray-600 dark:text-alpha-900">
                    IQ GPT
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="!bg-transparent p-0 text-sm font-medium text-gray-600 dark:text-alpha-900">
                  Learn
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Hello world</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/events" passHref>
                  <NavigationMenuLink className="text-sm font-medium text-gray-600 dark:text-alpha-900">
                    Events
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  )
}
