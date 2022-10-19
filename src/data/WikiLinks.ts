import { AiFillLinkedin, AiFillYoutube } from 'react-icons/ai'
import CoinGeckoIcon from '@/components/Icons/coingecko'
import CoinMarketCap from '@/components/Icons/coinmarketcap'
import TwitterIcon from '@/components/Icons/twitterIcon'
import RedditIcon from '@/components/Icons/redditIcon'
import InstagramIcon from '@/components/Icons/instagramIcon'
import FacebookIcon from '@/components/Icons/facebookIcon'
import GithubIcon from '@/components/Icons/githubIcon'
import TelegramIcon from '@/components/Icons/telegramIcon'
import OpenseaIcon from '@/components/Icons/openseaicon'
import { CommonMetaIds } from '@/types/Wiki'
import { FaFileContract } from 'react-icons/fa'
import EmailIcon from '@/components/Icons/emailIcon'
import DiscordIcon from '@/components/Icons/discordIcon'
import { RiGlobalFill } from 'react-icons/ri'

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
    tests: [/https:\/\/(www.)?instagram.com\/\w+/],
  },
  {
    id: CommonMetaIds.TWITTER_PROFILE,
    type: LinkType.SOCIAL,
    label: 'Twitter',
    icon: TwitterIcon,
    tests: [/https:\/\/(www.)?twitter.com\/\w+/],
  },
  {
    id: CommonMetaIds.LINKEDIN_PROFILE,
    type: LinkType.SOCIAL,
    label: 'Linkedin',
    icon: AiFillLinkedin,
    tests: [/https:\/\/(www.)?linkedin.com\/(in|company)\/\w+/],
  },
  {
    id: CommonMetaIds.YOUTUBE_PROFILE,
    type: LinkType.SOCIAL,
    label: 'Youtube',
    icon: AiFillYoutube,
    tests: [/https:\/\/(www.)?youtube.com\/\w+/],
  },
  {
    id: CommonMetaIds.FACEBOOK_PROFILE,
    type: LinkType.SOCIAL,
    label: 'Facebook',
    icon: FacebookIcon,
    tests: [/https:\/\/(www.)?((web|m).)?facebook.com\/\w+/],
  },
  {
    id: CommonMetaIds.COINGECKO_PROFILE,
    type: LinkType.SOCIAL,
    label: 'Coingecko',
    icon: CoinGeckoIcon,
    tests: [
      /https:\/\/(www.)?coingecko.com\/en\/coins\/|https:\/\/(www.)?coingecko.com\/en\/nft\/(.+)/,
    ],
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
    tests: [/i/],
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
    label: 'BSScan',
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
]
