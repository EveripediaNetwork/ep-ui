import { Pseudos, SemanticValue } from '@chakra-ui/react'

export type SemanticTokens = Partial<
  Record<string, Record<string, SemanticValue<keyof Pseudos>>>
>

export const semanticTokens: SemanticTokens = {
  colors: {
    brandBackground: {
      default: 'primary',
      _dark: 'brand.900',
    },
    rankCardBorder: {
      default: '#CBD5E0',
      _dark: '#3F444E',
    },
    inactiveText: {
      default: '#718096',
      _dark: '#FFFFFF',
    },
    primaryPinkIcon: {
      default: '#FF5CAA',
      _dark: '#FF1A88',
    },
    brandHero: {
      default: 'tetiaryGray',
      _dark: 'tetiaryDark',
    },
    brandAssetDownloadBttnColor: {
      default: 'brand.500',
      _dark: 'brand.800',
    },
    dimColor: {
      default: '#0000002a',
    },
    linkColor: {
      default: 'gray.600',
      _dark: 'grey.200',
    },
    brandLinkColor: {
      default: 'brand.500',
      _dark: 'brand.800',
    },
    textColor: {
      default: 'gray.900',
      _dark: 'grey.200',
    },
    homeDescriptionColor: {
      default: 'gray.600',
      _dark: 'whiteAlpha.900',
    },
    linkHoverColor: {
      default: 'gray.800',
      _dark: 'gray.400',
    },
    subMenuBg: {
      default: 'white',
      _dark: 'gray.800',
    },
    subMenuHoverBg: {
      default: 'gray.100',
      _dark: 'whiteAlpha.100',
    },
    pageBg: {
      default: 'gray.100',
      _dark: 'gray.800',
    },
    blogPageBg: {
      default: 'white',
      _dark: 'gray.800',
    },
    hoverBg: {
      default: 'gray.100',
      _dark: 'gray.600',
    },
    toolTipBg: {
      default: 'black',
      _dark: 'gray.500',
    },
    cardBg: {
      default: 'white',
      _dark: 'gray.700',
    },
    creamCardBg: {
      default: 'gray.100',
      _dark: 'gray.700',
    },
    historyCommentBg: {
      default: 'white',
      _dark: 'gray.600',
    },
    carouselArrowBg: {
      default: 'white',
      _dark: 'gray.600',
    },
    carouselArrowBorderColor: {
      default: 'gray.300',
      _dark: 'gray.600',
    },
    mobileMenuBorderColor: {
      default: 'gray.300',
      _dark: 'gray.700',
    },
    walletDrawerBorderColor: {
      default: 'gray.300',
      _dark: 'gray.600',
    },
    pageBorderColor: {
      default: 'gray.300',
      _dark: 'gray.600',
    },
    borderColor: {
      default: 'gray.300',
      _dark: 'gray.600',
    },
    borderColorHover: {
      default: 'gray.400',
      _dark: 'gray.700',
    },
    socialIconColor: {
      default: 'gray.700',
      _dark: 'gray.100',
    },
    wikiCardBg: {
      default: '#0000000A',
      _dark: 'gray.800',
    },
    wikiCardItemBg: {
      default: 'white',
      _dark: 'gray.700',
    },
    wikiTitleBg: {
      default: '#0000000A',
      _dark: 'gray.700',
    },
    wikiActionBtnDisabled: {
      default: 'gray.400',
      _dark: 'gray.600',
    },
    fadedText: {
      default: 'gray.600',
      _dark: 'whiteAlpha.900',
    },
    fadedText2: {
      default: 'gray.600',
      _dark: 'gray.500',
    },
    divider: {
      default: 'gray.200',
      _dark: 'whiteAlpha.400',
    },
    btnBgColor: {
      default: 'white',
      _dark: 'gray.800',
    },
    wikiFlagTextColor: {
      default: 'gray.800',
      _dark: 'whiteAlpha.900',
    },
    wikiFlagTextBorderColor: {
      default: 'gray.300',
      _dark: 'whiteAlpha.300',
    },
    wikiFlagTextAreaColor: {
      default: 'gray.800',
      _dark: 'whiteAlpha.800',
    },
    wikiFlagTextAreaBorderColor: {
      default: 'gray.300',
      _dark: 'whiteAlpha.200',
    },
    insertMediaDialogText: {
      default: 'gray.700',
      _dark: 'whiteAlpha.700',
    },
    wikiTitleInputText: {
      default: 'gray.600',
      _dark: 'whiteAlpha.600',
    },
    wikiSummaryLabel: {
      default: 'gray.800',
      _dark: 'whiteAlpha.900',
    },
    wikiDropzoneText: {
      default: 'blackAlpha.500',
      _dark: 'whiteAlpha.700',
    },
    thirdRankColor: {
      default: 'gray.400',
      _dark: 'whiteAlpha.500',
    },
    searchBorder: {
      default: 'gray.300',
      _dark: 'whiteAlpha.300',
    },
    emptyNotificationHeading: {
      default: 'gray.800',
      _dark: 'whiteAlpha.900',
    },
    emptyNotificationText: {
      default: 'gray.600',
      _dark: 'whiteAlpha.700',
    },
    tagColor: {
      default: 'gray.500',
      _dark: 'whiteAlpha.900',
    },
    tagHoverColor: {
      default: 'gray.100',
      _dark: 'whiteAlpha.100',
    },
    tagActiveBgColor: {
      default: 'brand.50',
      _dark: '#FFB3D7',
    },
    tagActiveColor: {
      default: 'brand.500',
      _dark: 'brand.800',
    },
    glossaryItemBg: {
      default: 'gray.50',
      _dark: 'whiteAlpha.50',
    },
    NotificationRemoveIcon: {
      default: 'gray.800',
      _dark: 'white',
    },
    NotificationAddIcon: {
      default: 'whiteAlpha.900',
      _dark: 'whiteAlpha.900',
    },
    placeholderColor: {
      default: '#ccd5e0',
      _dark: '#3f444e',
    },
    ranklistBtnBorder: {
      default: 'gray.300',
      _dark: 'whiteAlpha.300',
    },
    rankingListTableHead: {
      default: 'gray.50',
      _dark: 'whiteAlpha.100',
    },
    rankingListTableHeading: {
      default: 'gray.600',
      _dark: 'whiteAlpha.700',
    },
    rankingListText: {
      default: 'gray.600',
      _dark: 'whiteAlpha.900',
    },
    rankingListBorder: {
      default: 'gray.200',
      _dark: 'whiteAlpha.300',
    },
    rankingListTableBg: {
      default: '#FFFFFF',
      _dark: '#2D3748',
    },
    rankPageButtonText: {
      default: 'gray.700',
      _dark: 'whiteAlpha.900',
    },
    rankPageButtonBorder: {
      default: 'gray.300',
      _dark: 'whiteAlpha.400',
    },
    paginationButtonDefault: {
      default: 'gray.500',
      _dark: 'whiteAlpha.700',
    },
    paginationButtonActive: {
      default: 'brand.500',
      _dark: 'brand.800',
    },
    paginationButtonActiveBg: {
      default: 'brand.50',
      _dark: 'brand.300',
    },
    careersBackground: {
      default: 'gray.50',
      _dark: 'whiteAlpha.50',
    },
    careersHeadingColor: {
      default: 'gray.800',
      _dark: 'whiteAlpha.900',
    },
    careersTextColor: {
      default: 'gray.800',
      _dark: 'whiteAlpha.900',
    },
    careersCardBorder: {
      default: 'gray.300',
      _dark: 'whiteAlpha.200',
    },
    careersCardBg: {
      default: 'white',
      _dark: 'gray.700',
    },
    aboutFeaturesCardBg: {
      default: 'gray.50',
      _dark: 'gray.700',
    },
    aboutFeaturesCardBorder: {
      default: 'gray.300',
      _dark: 'whiteAlpha.300',
    },
  },
}
