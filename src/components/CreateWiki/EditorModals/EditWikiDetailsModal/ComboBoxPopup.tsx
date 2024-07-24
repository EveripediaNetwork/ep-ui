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
import { useColorMode } from '@chakra-ui/react'

const ComboBoxPopup = ({
  groupedOptions,
  options,
  defaultSelect,
  onSelect,
  placeholder,
  t,
}: ComboBoxProps) => {
  const [selected, setSelected] = useState(defaultSelect)
  const [open, setOpen] = useState<boolean>(false)
  const { colorMode } = useColorMode()

  const allOptions =
    groupedOptions?.flatMap((group) => group.options) || options

  const matchedOption = allOptions?.find((option) =>
    typeof option === 'string' ? option === selected : option.id === selected,
  )

  const matchedLabel =
    typeof matchedOption === 'string' ? matchedOption : matchedOption?.label

  const hideSearch = (allOptions?.length || 0) < 10

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          justifyContent="space-between"
          rounded="md"
          fontWeight="medium"
          overflowX="hidden"
          pr={9}
          fontSize={['xs', 'sm']}
          _hover={{ bgColor: 'transparent', opacity: 1 }}
        >
          {matchedLabel || placeholder}
          <Box
            bg={colorMode === 'dark' ? 'tetiaryDark' : 'white'}
            position="absolute"
            right={0}
          >
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
            {groupedOptions?.map((group) => (
              <CommandGroup key={group.title} heading={group.title}>
                {group.options.map((el) => (
                  <CommandItem
                    key={el.id}
                    value={el.id}
                    disabled={el.disabled}
                    onSelect={(value) => {
                      setSelected(value)
                      onSelect?.(el.id)
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
            {options?.map((option) => {
              const isStringOption = typeof option === 'string'
              const id = isStringOption ? option : option?.id
              const label = isStringOption ? option : option?.label
              return (
                <CommandItem
                  key={id}
                  value={id}
                  disabled={!isStringOption && option?.disabled}
                  onSelect={(value) => {
                    setSelected(value)
                    onSelect?.(value)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn('mr-2 h-4 w-4 opacity-0', {
                      'opacity-100': selected === option,
                    })}
                  />
                  {t ? t(label) : label}
                </CommandItem>
              )
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ComboBoxPopup
