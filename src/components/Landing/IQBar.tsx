import { cn } from '@/lib/utils'
import { useGetCgTokenDataQuery } from '@/services/cgTokenDetails'
import { useGetCmcTokenDataQuery } from '@/services/cmcTokenDetails'
import { Button, Icon, IconButton, Spinner } from '@chakra-ui/react'
import * as Humanize from 'humanize-plus'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { usePostHog } from 'posthog-js/react'
import { RiArrowDownLine, RiArrowUpLine, RiGlobalLine } from 'react-icons/ri'
import { Logo } from '../Elements'
import BinanceIcon from '../Icons/binance'
import FraxIcon from '../Icons/frax'
import OneinchIcon from '../Icons/oneInch'
import UpbitIcon from '../Icons/upbit'
import IQGraph from './IQGraph'

export const IQBar = () => {
  const { t } = useTranslation('home')
  const { data: iqData, isLoading, isError } = useGetCgTokenDataQuery()
  const posthog = usePostHog()

  const {
    data: cmcData,
    isLoading: cmcLoading,
    isError: cmcError,
  } = useGetCmcTokenDataQuery('IQ')
  const price = Humanize.formatNumber(cmcData?.IQ?.quote.USD.price ?? 0, 4)
  const mcap = Humanize.compactInteger(
    cmcData?.IQ?.quote?.USD?.market_cap ?? 0,
    2,
  )
  const areaGraphData = iqData?.prices
  const iqChange = cmcData?.IQ?.quote?.USD?.percent_change_24h

  return (
    <section className="-top-52 md:top-[-80px] xl:top-[-60px] relative px-4 lg:px-8 2xl:px-0 container mx-auto">
      <div className="p-4 dark:bg-gray-900/40 backdrop-filter backdrop-blur-sm bg-white/30 text-gray-600 rounded-xl dark:text-white flex md:grid lg:grid-cols-5 flex-col md:grid-cols-2 gap-4 flex-wrap border dark:border-gray-700 border-gray-100">
        <div className="iq-price bg-transparent backdrop-filter backdrop-blur-sm border dark:border-gray-800 border-gray-200 rounded-xl p-3 flex flex-row text-sm justify-between items-center">
          <div className="flex flex-col gap-2 text-sm">
            <h3 className="text-xs">{t('iqPrice')}</h3>
            <div className="flex flex-col gap-1.5">
              {cmcLoading ? (
                <Spinner size="sm" />
              ) : cmcError ? (
                <h2 className="text-sm text-red-500">{t('errorPrice')}</h2>
              ) : (
                <h1 className="text-xl font-semibold">{`$${price}`}</h1>
              )}
              <div className="flex items-center">
                <div
                  className={cn(
                    'flex items-center gap-1 rounded-xl text-sm',
                    iqChange && iqChange <= 0
                      ? 'text-red-500'
                      : 'text-green-600',
                  )}
                >
                  <Icon
                    as={
                      iqChange && iqChange > 0 ? RiArrowUpLine : RiArrowDownLine
                    }
                    boxSize={3}
                  />
                  <h3>{Humanize.formatNumber(iqChange ?? 0, 2)}%</h3>
                </div>
              </div>
            </div>
          </div>
          <Link
            href="https://iq.braindao.org/dashboard"
            onClick={() => {
              posthog.capture('check_iq_click', {
                target: 'IQ Dashboard',
              })
            }}
            target="_blank"
          >
            <Button
              variant="outline"
              aria-label="IQ"
              border="1px"
              borderColor="gray.200"
              rounded="full"
              p={1}
              _dark={{ borderColor: 'rgba(255, 255, 255, 0.24)' }}
            >
              <Logo boxSize="2em" />
            </Button>
          </Link>
        </div>
        <div className="iq-market-cap bg-transparent backdrop-filter backdrop-blur-sm border dark:border-gray-800 border-gray-200 rounded-xl p-3 flex flex-row justify-between items-center text-sm">
          <div className="flex flex-col gap-2 justify-between">
            <h3 className="text-sm">{t('iqMarketCap')}</h3>
            <div className="flex flex-col gap-1.5">
              {isLoading ? (
                <Spinner size="sm" />
              ) : isError ? (
                <h2 className="text-xs text-red-500">{t('errorMarketCap')}</h2>
              ) : (
                <h1 className="text-xl font-semibold">{`$${mcap}`}</h1>
              )}
              <div
                className={cn(
                  'flex items-center rounded-xl gap-1 text-sm',
                  iqChange && iqChange <= 0 ? 'text-red-500' : 'text-green-600',
                )}
              >
                <Icon
                  as={
                    iqChange && iqChange > 0 ? RiArrowUpLine : RiArrowDownLine
                  }
                  boxSize={3}
                />
                <h3>{Humanize.formatNumber(iqChange ?? 0, 2)}%</h3>
              </div>
            </div>
          </div>
          <Link
            href="https://coinmarketcap.com/currencies/iq/"
            target="_blank"
            data-ph-capture-attribute-exchange-link="coinmarketcap"
            rel="noopener nofollow"
          >
            <Button
              variant="outline"
              rounded="full"
              border="1px"
              p="1"
              borderColor="gray.200"
              _dark={{ borderColor: 'rgba(255, 255, 255, 0.24)' }}
            >
              <RiGlobalLine size="2em" color="#FF5CAA" />
            </Button>
          </Link>
        </div>
        <div className="iq-get-iq bg-transparent backdrop-filter backdrop-blur-sm border dark:border-gray-800 border-gray-200 rounded-xl p-3 flex flex-col gap-4 text-sm">
          <h1 className="text-xs">{t('exchanges')}</h1>
          <div className="flex items-center justify-center">
            <Link
              href="https://www.binance.com/en/trade/IQ_USDT?theme=dark&type=spot"
              target="_blank"
              rel="noopener nofollow"
              data-ph-capture-attribute-exchange-link="binance"
            >
              <IconButton
                variant="outline"
                fontSize="xx-large"
                isRound
                border="none"
                icon={<BinanceIcon />}
                aria-label="binance"
              />
            </Link>
            <div className="border-l border-gray-200 h-[24px] mx-2 dark:border-alpha-400" />
            <Link
              href="https://app.1inch.io/#/1/simple/swap/USDT/IQ"
              target="_blank"
              rel="noopener nofollow"
              data-ph-capture-attribute-exchange-link="1inch"
            >
              <IconButton
                variant="outline"
                fontSize="xx-large"
                isRound
                border="none"
                icon={<OneinchIcon />}
                aria-label="One Inch"
              />
            </Link>
            <div className="border-l border-gray-200 h-[24px] mx-2 dark:border-alpha-400" />
            <Link
              target="_blank"
              rel="noopener nofollow"
              href="https://upbit.com/exchange?code=CRIX.UPBIT.KRW-IQ"
              data-ph-capture-attribute-exchange-link="upbit"
            >
              <IconButton
                variant="outline"
                fontSize="xx-large"
                isRound
                border="none"
                icon={<UpbitIcon />}
                aria-label="Upbit"
              />
            </Link>
            <div className="border-l border-gray-200 h-[24px] mx-2 dark:border-alpha-400" />
            <Link
              href="https://frax.finance/"
              target="_blank"
              rel="noopener nofollow"
              data-ph-capture-attribute-exchange-link="frax-finance"
            >
              <IconButton
                variant="outline"
                fontSize="xx-large"
                isRound
                border="none"
                icon={<FraxIcon />}
                aria-label="Frax"
              />
            </Link>
          </div>
        </div>
        <div className="iq-historical-graph bg-transparent backdrop-filter backdrop-blur-sm border dark:border-gray-800 border-gray-200 rounded-xl flex flex-col gap-2 text-sm p-3 lg:col-span-2">
          <div className="flex justify-between text-xs">
            <h3>{t('iqGraph')}</h3>
            <h3>{`$${price}`}</h3>
          </div>
          {isError ? (
            <h1 className="text-sm text-red-500">{t('errorGraphData')}</h1>
          ) : (
            <IQGraph areaGraphData={areaGraphData} />
          )}
        </div>
      </div>
    </section>
  )
}
