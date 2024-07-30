import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ChevronDownIcon } from 'lucide-react'
import Image from 'next/image'
import { RiCheckFill } from 'react-icons/ri'

type LocaleSelectProps = {
  locale: string | undefined
  handleLangChange: (locale: string) => void
  languageData: ReadonlyArray<{
    locale: string
    name: string
    icon: string
    default?: boolean
    currency: string
  }>
}

export function LocaleSelect({
  locale,
  languageData,
  handleLangChange,
}: LocaleSelectProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="uppercase px-2 h-8 dark:bg-gray800 bg-white border-none flex flex-row items-center gap-2 font-semibold"
        >
          {locale}
          <ChevronDownIcon className="w-5 h-5 opacity-80" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 py-2 px-0" align="start">
        <div className="">
          {languageData.map((langObj) => (
            <div
              onKeyDown={() => {}}
              onClick={() => handleLangChange(langObj.locale)}
              key={langObj.locale}
              className="flex flex-row items-center relative hover:bg-gray-600 py-2 cursor-pointer transition-colors duration-300 delay-100 ease-in-out"
            >
              <div>
                {langObj.locale === locale ? (
                  <RiCheckFill className="w-4 h-4 absolute left-2 top-3" />
                ) : null}
              </div>
              <div className="flex flex-row gap-2 items-center translate-x-8">
                <Image
                  src={langObj.icon}
                  alt={langObj.name}
                  width={24}
                  height={24}
                />
                <h1>{langObj.name}</h1>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
