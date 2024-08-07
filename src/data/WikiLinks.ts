import { AiFillLinkedin, AiFillYoutube } from 'react-icons/ai'
import CoinGeckoIcon from '@/components/Icons/coingecko'
import CoinMarketCap from '@/components/Icons/coinmarketcap'
import TwitterIcon from '@/components/Icons/twitterIcon'
import MediumIcon from '@/components/Icons/mediumIcon'
import RedditIcon from '@/components/Icons/redditIcon'
import InstagramIcon from '@/components/Icons/instagramIcon'
import FacebookIcon from '@/components/Icons/facebookIcon'
import GithubIcon from '@/components/Icons/githubIcon'
import TelegramIcon from '@/components/Icons/telegramIcon'
import OpenseaIcon from '@/components/Icons/openseaicon'
import { CommonMetaIds } from '@everipedia/iq-utils'
import { FaFileContract } from 'react-icons/fa'
import EmailIcon from '@/components/Icons/emailIcon'
import DiscordIcon from '@/components/Icons/discordIcon'
import { RiGlobalFill } from 'react-icons/ri'
import MirrorIcon from '@/components/Icons/mirrorIcon'
import TiktokIcon from '@/components/Icons/tiktokicon'

export const LinkType = {
  WEBSITE: 'website',
  SOCIAL: 'social',
  CONTRACT: 'contract',
  EXPLORER: 'explorer',
}
export const LINK_OPTIONS = [
  {
    id: CommonMetaIds.REDDIT_URL,
    type: LinkType.SOCIAL,
    label: 'Reddit',
    icon: RedditIcon,
    tests: [/https:\/\/www\.reddit\.com\/r\//i],
  },
  {
    id: CommonMetaIds.DISCORD_PROFILE,
    type: LinkType.SOCIAL,
    label: 'Discord',
    icon: DiscordIcon,
    tests: [/https:\/\/discord\.(gg|com)\//i],
  },
  {
    id: CommonMetaIds.EMAIL_URL,
    type: LinkType.SOCIAL,
    label: 'Email',
    icon: EmailIcon,
    tests: [/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/],
  },
  {
    id: CommonMetaIds.GITHUB_URL,
    type: LinkType.SOCIAL,
    label: 'Github',
    icon: GithubIcon,
    tests: [/https:\/\/github\.com\//i],
  },
  {
    id: CommonMetaIds.TELEGRAM_URL,
    type: LinkType.SOCIAL,
    label: 'Telegram',
    icon: TelegramIcon,
    tests: [/https:\/\/t\.me\//i],
  },
  {
    id: CommonMetaIds.INSTAGRAM_PROFILE,
    type: LinkType.SOCIAL,
    label: 'Instagram',
    icon: InstagramIcon,
    tests: [/https:\/\/(www.)?instagram.com\/[\p{L}\p{N}\p{M}._]+\/?$/u],
  },
  {
    id: CommonMetaIds.TWITTER_PROFILE,
    type: LinkType.SOCIAL,
    label: 'Twitter',
    icon: TwitterIcon,
    tests: [
      /https:\/\/(www\.)?twitter\.com\/[\p{L}\p{N}\p{M}_]+\/?$/u,
      /https:\/\/(www\.)?x\.com\/[\p{L}\p{N}\p{M}_]+\/?$/u,
    ],
  },

  {
    id: CommonMetaIds.TIKTOK_PROFILE,
    type: LinkType.SOCIAL,
    label: 'Tiktok',
    icon: TiktokIcon,
    tests: [/https?:\/\/(www\.)?tiktok\.com\/@[\p{L}\p{N}\p{M}._-]+\/?$/u],
  },
  {
    id: CommonMetaIds.LINKEDIN_PROFILE,
    type: LinkType.SOCIAL,
    label: 'Linkedin',
    icon: AiFillLinkedin,
    tests: [
      /https:\/\/(www.)?linkedin.com\/(in|company)\/[\p{L}\p{N}\p{M}-]+\/?$/u,
    ],
  },
  {
    id: CommonMetaIds.YOUTUBE_PROFILE,
    type: LinkType.SOCIAL,
    label: 'Youtube',
    icon: AiFillYoutube,
    tests: [/https:\/\/(www.)?youtube.com\/[\w@]+/],
  },
  {
    id: CommonMetaIds.FACEBOOK_PROFILE,
    type: LinkType.SOCIAL,
    label: 'Facebook',
    icon: FacebookIcon,
    tests: [
      /https:\/\/(www\.)?(web\.|m\.)?facebook\.com\/[\p{L}\p{N}\p{M}.-]+\/?$/u,
    ],
  },

  {
    id: CommonMetaIds.COINGECKO_PROFILE,
    type: LinkType.SOCIAL,
    label: 'Coingecko',
    icon: CoinGeckoIcon,
    tests: [/https:\/\/(www.)?coingecko.com\/en\/(nft|coins)\/(.+)/],
  },
  {
    id: CommonMetaIds.COIN_MARKET_CAP,
    type: LinkType.SOCIAL,
    label: 'Coin Market Cap',
    icon: CoinMarketCap,
    tests: [/https:\/\/coinmarketcap\.com\/currencies\//i],
  },
  {
    id: CommonMetaIds.OPENSEA_PROFILE,
    type: LinkType.SOCIAL,
    label: 'Opensea',
    icon: OpenseaIcon,
    tests: [/https:\/\/opensea\.io\/\w+/],
  },
  {
    id: CommonMetaIds.MIRROR_PROFILE,
    type: LinkType.SOCIAL,
    label: 'Mirror',
    icon: MirrorIcon,
    tests: [
      /https:\/\/([\p{L}\p{N}\p{M}-]+\.)?mirror\.xyz(\/[\p{L}\p{N}\p{M}-]+)*\/?$/u,
    ],
  },
  {
    id: CommonMetaIds.MEDIUM_PROFILE,
    type: LinkType.SOCIAL,
    label: 'Medium',
    icon: MediumIcon,
    tests: [
      /^(https?:\/\/)?(www\.)?medium\.com\/[a-zA-Z0-9-]+(?:\/[a-zA-Z0-9-]+)*(?:\?[^\s]*)?$/,
      /^https:\/\/[\p{L}\p{N}\p{M}-]+\.medium\.com\/.*$/u,
      /^https:\/\/medium\.com\/@[\p{L}\p{N}\p{M}._-]+\/?$/u,
    ],
  },
  {
    id: CommonMetaIds.WEBSITE,
    type: LinkType.WEBSITE,
    label: 'Website',
    icon: RiGlobalFill,
    tests: [/https:\/\/(www.)?\w+.\w+/],
  },
  {
    id: CommonMetaIds.CONTRACT_URL,
    type: LinkType.CONTRACT,
    label: 'Contract URL',
    icon: FaFileContract,
    tests: [/[a-z]/],
  },
  {
    id: CommonMetaIds.ETHERSCAN_PROFILE,
    type: LinkType.EXPLORER,
    label: 'Etherscan',
    icon: FaFileContract,
    tests: [/https:\/\/(www.)?etherscan.io\/\w+/],
  },
  {
    id: CommonMetaIds.BSCSCAN_PROFILE,
    type: LinkType.EXPLORER,
    label: 'BscScan',
    icon: FaFileContract,
    tests: [/https:\/\/(www.)?bscscan.com\/\w+/],
  },
  {
    id: CommonMetaIds.ARBISCAN_PROFILE,
    type: LinkType.EXPLORER,
    label: 'Arbiscan',
    icon: FaFileContract,
    tests: [/https:\/\/(www.)?arbiscan.io\/\w+/],
  },
  {
    id: CommonMetaIds.POLYGONSCAN_PROFILE,
    type: LinkType.EXPLORER,
    label: 'Polygonscan',
    icon: FaFileContract,
    tests: [/https:\/\/(www.)?polygonscan.com\/\w+/],
  },
  {
    id: CommonMetaIds.OPTIMISTIC_ETHERSCAN_PROFILE,
    type: LinkType.EXPLORER,
    label: 'Optimistic Etherscan',
    icon: FaFileContract,
    tests: [/https:\/\/(www.)?optimistic.etherscan.io\/\w+/],
  },
  {
    id: CommonMetaIds.BASESCAN_PROFILE,
    type: LinkType.EXPLORER,
    label: 'BaseScan',
    icon: FaFileContract,
    tests: [/https:\/\/(www.)?basescan.org\/\w+/],
  },
  {
    id: CommonMetaIds.FTMSCAN_PROFILE,
    type: LinkType.EXPLORER,
    label: 'FTMScan',
    icon: FaFileContract,
    tests: [/https:\/\/((www.)?ftmscan.com|explorer.fantom.network)\/\w+/],
  },
  {
    id: CommonMetaIds.SOLSCAN_PROFILE,
    type: LinkType.EXPLORER,
    label: 'Solscan',
    icon: FaFileContract,
    tests: [/https:\/\/(www\.)?solscan\.(com|io)\/.*/],
  },
  {
    id: CommonMetaIds.AVASCAN_PROFILE,
    type: LinkType.EXPLORER,
    label: 'AvaScan',
    icon: FaFileContract,
    tests: [/https:\/\/(www\.)?avascan\.(com|info)\/.*/],
  },
  {
    id: CommonMetaIds.NEARBLOCKS_PROFILE,
    type: LinkType.EXPLORER,
    label: 'NearBlocks',
    icon: FaFileContract,
    tests: [/https:\/\/(www\.)?nearblocks\.(com|io)\/.*/],
  },
  {
    id: CommonMetaIds.TROSCAN_PROFILE,
    type: LinkType.EXPLORER,
    label: 'Tronscan',
    icon: FaFileContract,
    tests: [/https:\/\/(www\.)?tronscan\.(io|org)\/#\/\w+/],
  },
  {
    id: CommonMetaIds.XRPSCAN_PROFILE,
    type: LinkType.EXPLORER,
    label: 'Xrpscan',
    icon: FaFileContract,
    tests: [/https:\/\/(www.)?xrpscan.com\/\w+/],
  },
  {
    id: CommonMetaIds.KAVASCAN_PROFILE,
    type: LinkType.EXPLORER,
    label: 'Kavascan',
    icon: FaFileContract,
    tests: [/https:\/\/(www\.)?kavascan\.(com|io)\/.*/],
  },
  {
    id: CommonMetaIds.TONSCAN_PROFILE,
    type: LinkType.EXPLORER,
    label: 'Tonscan',
    icon: FaFileContract,
    tests: [/https:\/\/(www\.)?tonscan\.org\/\w+/],
  },
  {
    id: CommonMetaIds.CELOSCAN_PROFILE,
    type: LinkType.EXPLORER,
    label: 'Celoscan',
    icon: FaFileContract,
    tests: [/https:\/\/(www\.)?(celoscan|explorer.celo)\.(io|org)\/\w+/],
  },
  {
    id: CommonMetaIds.CRONOSCAN_PROFILE,
    type: LinkType.EXPLORER,
    label: 'Cronoscan',
    icon: FaFileContract,
    tests: [/https:\/\/(www\.)?(cronoscan|cronos)\.(com|org)\/\w+/],
  },
  {
    id: CommonMetaIds.ZKSCAN_PROFILE,
    type: LinkType.EXPLORER,
    label: 'Zkscan',
    icon: FaFileContract,
    tests: [/https:\/\/(www\.)?(explorer.zksync|zkscan)\.io\/\w+/],
  },
  {
    id: CommonMetaIds.EXPLORER_INJECTIVE,
    type: LinkType.EXPLORER,
    label: 'Explorer Injective',
    icon: FaFileContract,
    tests: [/https:\/\/(www\.)?explorer.injective.network\/\w+/],
  },
  {
    id: CommonMetaIds.BLASTSCAN_PROFILE,
    type: LinkType.EXPLORER,
    label: 'Blastscan',
    icon: FaFileContract,
    tests: [/^https:\/\/blastscan\.io\/token\/0x[a-fA-F0-9]{40}$/],
  },
]
