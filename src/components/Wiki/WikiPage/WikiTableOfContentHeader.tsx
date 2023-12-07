import ArrowDown from '@/components/Icons/arrowDown'
import SquareFill from '@/components/Icons/squareFill'
import { Box, Icon, Link, Text } from '@chakra-ui/react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'

type TocData = Array<{
  id: string
  title: string
  level: number
  subChildren?: TocData
}>

export function WikiTableOfContentHeader({
  toc,
  activeId,
}: {
  toc: TocData[0]
  activeId?: string | null
}) {
  const [open, setOpen] = useState(false)

  if (!toc.subChildren) {
    return (
      <Box
        display={'flex'}
        alignItems={'center'}
        pl={`${
          toc.level === 1
            ? `calc(${(toc.level - 1) * 20}px)`
            : `calc(${(toc.level - 1) * 20 + 6}px)`
        }`}
        py={`${toc.level === 1 ? '' : '12px'}`}
      >
        {toc.level === 1 && (
          <Icon
            as={SquareFill}
            flexShrink={0}
            color={activeId === toc.id ? 'brandLinkColor' : ''}
          />
        )}
        <Text
          color={activeId === toc.id ? 'brandLinkColor' : 'unset'}
          boxShadow={
            activeId === toc.id && toc.level !== 1
              ? '-2px 0px 0px 0px #ff5caa'
              : '0'
          }
          outlineColor="brandLinkColor"
          pl={2}
        >
          <Link href={`#${toc.id}`}>{toc.title}</Link>
        </Text>
      </Box>
    )
  }
  return (
    <Collapsible.Root defaultOpen open={open} onOpenChange={setOpen}>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={2}
        pl={`calc(${(toc.level - 1) * 20}px)`}
      >
        <Collapsible.Trigger>
          <Icon
            as={ArrowDown}
            flexShrink={0}
            color={activeId === toc.id ? 'brandLinkColor' : ''}
            transform={open ? 'rotate(0deg)' : 'rotate(-90deg)'}
          />
        </Collapsible.Trigger>
        <Text
          color={activeId === toc.id ? 'brandLinkColor' : 'unset'}
          outlineColor="brandLinkColor"
        >
          <Link href={`#${toc.id}`}>{toc.title}</Link>
        </Text>
      </Box>
      <Collapsible.Content>
        {toc.subChildren.map((toc) => (
          <WikiTableOfContentHeader
            key={toc.id}
            toc={toc}
            activeId={activeId}
          />
        ))}
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
