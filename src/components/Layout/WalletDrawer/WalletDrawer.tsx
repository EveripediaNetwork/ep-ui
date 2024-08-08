import DisplayAvatar from '@/components/Elements/Avatar/DisplayAvatar'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useAddress } from '@/hooks/useAddress'
import { useENSData } from '@/hooks/useENSData'
import { useFetchWalletBalance } from '@/hooks/UseFetchWallet'
import { useHiIQBalance } from '@/hooks/useHiIQBalance'
import { Spinner, useToast } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { memo, useState } from 'react'
import { RiArrowLeftSLine, RiRefreshLine } from 'react-icons/ri'
import NetworkMenu from '../Network/NetworkMenu'
import { WalletDrawerBody } from '../WalletDrawer/WalletDrawerBody'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ChevronDownIcon } from 'lucide-react'
import Link from 'next/link'
import { shortenAccount } from '@/utils/textUtils'
import CopyIcon from '@/components/Icons/CopyIcon'
const WalletNavMenu = dynamic(() => import('../Navbar/WalletNavMenu'))

const WalletDrawer = ({
  isOpen,
  handleDrawerOpen,
}: { isOpen: boolean; handleDrawerOpen: () => void }) => {
  const { address: userAddress, isConnected: isUserConnected } = useAddress()
  const [, username] = useENSData(userAddress)
  useHiIQBalance(userAddress)
  const [accountRefreshLoading, setAccountRefreshLoading] = useState(false)
  const toast = useToast()
  const { refreshBalance } = useFetchWalletBalance()
  const { t } = useTranslation('common')

  const handleAccountRefresh = async () => {
    if (typeof userAddress !== 'undefined') {
      setAccountRefreshLoading(true)
      await refreshBalance()
      toast({
        description: 'Account successfully refreshed',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'bottom-right',
      })
      setAccountRefreshLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userAddress as string)
    toast({
      description: 'Address copied to clipboard',
      status: 'success',
      duration: 4000,
      isClosable: true,
      position: 'top-right',
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleDrawerOpen}>
      <SheetTrigger asChild>
        <div
          onKeyUp={(event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'Enter' || event.key === ' ') {
              handleDrawerOpen()
            }
          }}
          onClick={handleDrawerOpen}
        >
          <WalletNavMenu />
        </div>
      </SheetTrigger>
      <SheetContent
        aria-describedby={undefined}
        className="bg-white dark:bg-gray-800 p-0 z-[9999]"
      >
        <SheetHeader className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-row items-center justify-between mt-6 p-6">
            <div className="flex flex-row items-center gap-3">
              <div className="block md:hidden">
                <RiArrowLeftSLine size="30" />
              </div>
              <DisplayAvatar
                address={userAddress}
                alt={userAddress ?? 'avatar'}
              />
              <div className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="text-base font-semibold text-gray-600 dark:text-alpha-500 flex flex-row items-center gap-2 cursor-pointer">
                      {t('myWallet')}{' '}
                      {isUserConnected && (
                        <ChevronDownIcon className="w-4 h-4" />
                      )}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 ml-20 p-2.5 rounded-lg">
                    {isUserConnected && (
                      <div
                        onKeyDown={() => {}}
                        onClick={handleAccountRefresh}
                        className="flex flex-row items-center gap-2 cursor-pointer"
                      >
                        <RiRefreshLine size={25} />
                        <div>
                          <h1 className="text-sm font-bold">Refresh</h1>
                          {accountRefreshLoading && <Spinner size="sm" />}
                        </div>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
                {isUserConnected && (
                  <div className="flex flex-row gap-1 items-center">
                    <Link
                      href={`/account/${userAddress}`}
                      className="text-sm opacity-70"
                    >
                      {username || (userAddress && shortenAccount(userAddress))}
                    </Link>
                    <CopyIcon onClick={copyToClipboard} className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
            <NetworkMenu />
          </div>
        </SheetHeader>
        <div className="px-6 py-4">
          <WalletDrawerBody />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default memo(WalletDrawer)
