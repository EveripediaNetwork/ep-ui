import React, { useState } from 'react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Box, Button } from '@chakra-ui/react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ComboBoxProps } from '@/types/EditWikiTypes'

const ComboBoxPopup = ({
  groupedOptions,
  options,
  selected,
  setSelected,
  placeholder,
  t,
}: ComboBoxProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const flattenedOptions = groupedOptions?.flatMap(group => group.options)

  const vSelected =
    flattenedOptions?.find(option => option.id === selected)?.label ||
    options?.find(option => option === selected)

  const hideSearch = (flattenedOptions?.length || options?.length || 0) < 10

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          justifyContent="space-between"
          rounded="md"
          fontWeight="medium"
          overflowX="hidden"
          pr={7}
          fontSize={['xs', 'sm']}
          _hover={{ bgColor: 'transparent', opacity: 1 }}
        >
          {vSelected || placeholder}
          <Box bg="tetiaryDark" position="absolute" right={0}>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 mr-2" />
          </Box>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className={cn('w-[210px] p-0 pb-1', { 'pt-1': hideSearch })}
        align="start"
      >
        <Command>
          {!hideSearch && <CommandInput placeholder="Search..." />}
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandList scroll="extra-thin">
            {groupedOptions?.map(group => (
              <CommandGroup key={group.title} heading={group.title}>
                {group.options.map(el => (
                  <CommandItem
                    key={el.id}
                    value={el.id}
                    onSelect={value => {
                      setSelected(value === selected ? '' : value)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn('mr-2 h-4 w-4 opacity-0', {
                        'opacity-100': selected === el.id,
                      })}
                    />
                    {t ? t(el.label) : el.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
            {options?.map(option => (
              <CommandItem
                key={option}
                value={option}
                onSelect={value => {
                  setSelected(value === selected ? '' : value)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn('mr-2 h-4 w-4 opacity-0', {
                    'opacity-100': selected === option,
                  })}
                />
                {t ? t(option) : option}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ComboBoxPopup
