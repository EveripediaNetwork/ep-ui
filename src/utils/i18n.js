import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

export const resources = {
  en: {
    translation: {
      // |||||||||||||||||||| SECTIONS ||||||||||||||||||||
      // init
      //--Copies for IQ.Wiki--

      //Home page
      everipedia: 'IQ.wiki',
      iq_description:
        'Start your crypto journey with IQ.wiki! The compass for exploring your web3 curiosities.',
      iq_descriptionShort: 'Start your crypto journey with IQ.wiki!',
      exploreHeroBttn: 'Explore',
      learnMoreHeroBttn: 'Learn more',
      trendingWikis: 'Latest from IQ.Wiki',
      rankingListHeading: 'Wiki Rank By MarketCap',
      rankingListDescription:
        'A list of wikis in different categories, including Defi, NFTs, DAOs and Cryptocurrencies, ranked based on the global marketcap respectively.',
      trendingWikisDescription:
        'Top wikis, recent edits and popular wikis on IQ.wiki.',
      browseCategory: 'Wiki Categories',
      browseCategoryDescription:
        'Explore your endless curiosities in different categories on IQ.wiki, Ranging from NFTs, to DeFi, Cryptocurrencies and more.',
      updatesFooterHeading: 'Join the IQ Brainlist',
      updatesFooterText:
        'Sign up for the IQ Brainlist to get early access to editing on the IQ.wiki beta site!',
      subScribeFooterBttn: 'Join Now',
      communityFooterHeading: 'Community Hub',
      visionFooterText:
        "IQ.wiki's vision is to bring blockchain knowledge to the world and knowledge onto the blockchain.",
      whatIQ: "What's IQ?",
      iq: 'IQ',
      bridges: 'Bridges',
      staking: 'Staking',
      bonds: 'Bonds',
      aboutUs: 'About us',
      careers: 'Careers',
      brainies: 'brainies',
      resources: 'Resources',
      glossary: 'Glossary',
      help: 'Help',
      blog: 'Blog',
      faq: 'FAQ',
      policies: 'Policies',
      guideLines: 'Guidelines',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of service',
      privacyRights: 'Your CA Privacy Rights',
      copyRight: 'IQ.Wiki Powered By ',

      //Desktop Nav
      Explore: 'Explore',
      Activity: 'Activity',
      Resources: 'Resources',
      Aboutus: 'About us',
      CreateWiki: 'Create Wiki',
      HelpCenter: 'Help Center',
      //Category page
      wikiCategory: 'Wiki Categories',
      trendingCategory: 'Trending Wiki Categories',

      //Create wiki page
      wikiTitlePlaceholder: 'Title goes here',
      wikiSummaryLabel: 'Wiki Summary',
      wikiSummaryPlaceholder: 'Write wiki summary or Generate with GPT-3 AI',
      dragMainImgLabel: 'Drag and drop a main image, or click to select',
      pasteMainImgLabel: '(or) paste image link here',
      pasteModalMainImgLabel: '(or) paste a youtube or image link here',
      pageTypeLabel: 'Page Type',
      categoryTypeLabel: 'Category',
      twitterProfileLabel: 'Twitter profile',

      //About page
      aboutHeroHeading:
        'Bringing blockchain knowledge to the world and knowledge to the blockchain.',
      aboutHeroPhrase:
        "IQ.Wiki is the world's largest blockchain and cryptocurrency encyclopedia with thousands of wikis on all topics and branches of knowledge in the crypto space.",
      aboutSignUpBttn: 'Sign Up',
      aboutgoTo: 'Go to IQ Site',
      aboutFeatHeading:
        'Our mission is to educate the world on blockchain technology',
      aboutFeatContent:
        'We are the primary source of objective, high quality knowledge on the Internet today for everything related to blockchain technology and cryptocurrencies. Our vision is to make blockchain more discoverable and accessible around the world and empower users with information they can trust.',
      abtFeatOneHeading: 'Bringing blockchain to the world',
      abtFeatOneContent:
        'The most comprehensive blockchain and crypto knowledge base in the world provides users with thousands of wikis on everything from Bitcoin, NFTs, DAO’s and so much more.',
      abtFeatTwoHeading: 'Powered by the IQ token',
      abtFeatTwoContent:
        'IQ.wiki is a central part of the IQ ecosystem. The IQ token powers the encyclopedia and allows anyone to be a stakeholder in the ecosystem.',
      abtFeatThreeHeading: 'Democratic Governance',
      abtFeatThreeContent:
        'Anyone with IQ Tokens is a stakeholder in the IQ.Wiki Network. Using IQ tokens to vote, users decide which new articles and edits are added to the knowledge base.',
      meetTeamHead: 'Meet our team',
      meetTeamContent:
        'At IQ.wiki we are fortunate to have a passionate team of people with deep experience and knowledge in both the educational and blockchain industry.',
      latestFromBlogHeading: 'Latest from our blog',

      //Profile page
      selectAllItems: 'All items',
      selectRecentListed: 'Recently Listed',
      selectRecentCreated: 'Recently Created',
      selectRecentSold: 'Recently Sold',
      selectRecentReceived: 'Recendtly Received',
      selectEndingSoon: 'Ending Soon',
      selectPriceLowtoHigh: 'Price: Low to High',
      selectPriceHighttoLow: 'Price: High to Low',
      selectHightLost: 'Highest Lost Sale',
      selectMostView: 'Most Viewed',
      selectMostFav: 'Most Favorited',
      selectOldest: 'Oldest',
      selectSingleItem: 'Single items',
      selectBundles: 'Bundles',
      shareBttnText: 'Share',
      settingBttnText: 'Settings',

      //Category page:
      wikiInCategory: 'Wikis in this category',

      //Career
      careerHeading: 'Careers',
      noOpeningsHeading: 'There are currently no open positions at this time',
      careerSubscribeText:
        'Subscribe to our mailing list to get the latest from IQ.wiki',

      //FAQ
      faqHeader: 'Frequently Asked Questions',
      faqPhrase: 'Have questions? We are here to help you.',
      faqSectionOne: 'Getting Started',
      faqSectionTwo: 'Creating Wikis on IQ.wiki',
      faqSectionThree: 'Editing Wikis on IQ.wiki',
      getterStartedOneHead: 'What is IQ.wiki?',
      getterStartedOneBody:
        'IQ.wiki formerly Everipedia, is the world’s largest crypto encyclopedia with thousands of pages. The new IQ.wiki platform has been built from the ground up to be fully Web3 with all edits recorded on-chain through Polygon and IPFS. The encyclopedia is governed by IQ token stakers who earn rewards for their contributions. For more information on IQ.wiki see the IQ.wiki page on IQ.wiki.',
      getterStartedTwoHead:
        'How do I join Brainlist and start editing IQ.wiki?',
      getterStartedTwoBody:
        'While the site is in beta, to get started editing you need to sign up for the Brainlist using this form. As part of the signing up, you’ll need to create a Polygon address as well as a MetaMask or WalletConnect wallet. For more information on how to set up a Polygon address with your MetaMask wallet check out this Coindesk guide. After you submit your Brainlist application you will receive an initial confirmation email. And then if you are approved to Brainlist you will receive an approval email. We’ll be approving people for Brainlist on a rolling basis so don’t worry if you’ve already applied and have not been approved yet. After the beta period, IQ.wiki plans on stopping Brainlist and introducing HiIQ Brain Pass NFTs which will provide several benefits including the ability to edit on IQ.wiki. Users will get the HiIQ Brain Pass NFTs by staking IQ with HiIQ or be able to acquire the NFTs by purchasing them with IQ tokens.',
      getterStartedThreeHead: 'What is the IQ token?',
      getterStartedThreeBody:
        "The IQ token is a cryptocurrency dedicated to the future of knowledge. The IQ token powers IQ.wiki, the world's largest cryptocurrency encyclopedia. IQ is both a governance and DeFi token with IQ stakers governing the platform and earning rewards. The token is managed by BrainDAO and backed by BrainDAO's treasury of IQ tokens, stablecoins, blue chip NFTs, and other digital assets. For more information about the IQ token see the IQ token page on IQ.wiki.",
      getterStartedFourHead: 'Where do I get IQ tokens?',
      getterStartedFourBody:
        'You can get IQ tokens from a variety of centralized and decentralized exchanges including Binance, Crypto.com, Fraxswap, and more. See the Exchanges section of our Learn site for the full list.',
      getterStartedFiveHead:
        'How do I stake IQ to earn token rewards and get involved in governance?',
      getterStartedFiveBody:
        'For more information on how to start earning IQ token rewards and get involved in the governance of the IQ token, check out the HiIQ page on our Learn site which explains how staking works and includes tutorials on how to stake.',
      getterStartedSixHead: 'IQ.wiki Rules',
      getterStartedSixBody:
        'Standards: IQ.wiki is a cryptocurrency encyclopedia so all IQ.wiki articles must be related to the cryptocurrency or blockchain space.For people to have a wiki, they need to have made contributions to the crypto space or worked in the crypto space.  Editors should follow the minimum content requirements: at least 300 words in the wiki’s main body, using appropriate categories and tags, and uploaded media should be only of high quality.All content has to be cited. This allows the community to check editors’ work and work with editors in an environment that is inherently collaborative.All content has to be neutral. Because IQ.wiki is a knowledge base, editors should think from the perspective of an academic scholar and provide unbiased information.All content should be written in the third person.  Spelling and grammar should be carefully checked before an edit submission.Pages that have a completion score lower than 50 are subject to removal.To maintain the quality of the encyclopedia low quality wikis will be removed. Do Not: Plagiarize content that is not your own and represent it as your work; this typically includes copying/pasting content without citing its original source and giving proper credit to the creator. It also includes violating copyright.Vandalize: deliberately attempt to add, change, or remove content to tarnish the wiki.Spam: reference content that attempts to promote irrelevant or inappropriate products to a page; these edit proposals tend to be in the form of advertisements and violate IQ.wiki’s policy of writing in a neutral tone.',

      usingEveripediaOneHead: 'Getting Started',
      usingEveripediaOneBody:
        "Before you can create or edit an IQ.wiki article you'll need to click the wallet icon and log in with your Brainlisted Polygon address using MetaMask or WalletConnect. Prior to creating the new wiki, check if it does not exist yet. Go to the Search Bar and insert the title. The site will search our existing database to see if an article about the same topic already exists. If it does, edit the existing article. If there are no suggestions from the system, you can feel free to create a new article. Click the Create Wiki button in the header navigation. Add your desired article title. Make sure that it is short and comprehensive - the system will generate the unique URL from the title. https://www.youtube.com/watch?v=Y4gWJUFchrc ",
      usingEveripediaTwoHead: 'Adding a featured image',
      usingEveripediaTwoBody:
        'To add or update a featured image, click on the placeholder image. You can easily add a photo by dragging and dropping it or clicking to select an image from your PC. You can also clicking "Image URL" and paste in a link to the image and the system will fetch it automatically. https://www.youtube.com/watch?v=3DFzzleCCNo ',
      usingEveripediaThreeHead: 'Filling in the article',
      usingEveripediaThreeBody:
        'This is your chance to start writing and explaining the topic of your article. The intro should answer the basics and provide the most important info while headers can be used to create sections that provide additional details.',
      usingEveripediaFourHead: 'Adding a citation',
      usingEveripediaFourBody:
        'To add a reference or citation to the body of an article, first select where you want to add the citation by clicking on the place in the article where you would like to add the citation (you can start with adding a citation at the end of the first paragraph). To actually add the citation click the “Cite” button, enter the URL, and a short description of the link you’re choosing to add (for example, you can enter the title of the article, the author, and/or the publishing date in the description). To actually insert the reference, click the pink “Cite” button. https://www.youtube.com/watch?v=NrAUvtOpY0E ',
      usingEveripediaFiveHead: 'Submitting a wiki',
      usingEveripediaFiveBody:
        "category, tags and add social media links in the Edit Wiki Details section. When all these steps are done, you can hit the Publish button to save your page. You will have the option to add a comment while publishing.Comments give editors the opportunity to provide additional context or rationale for their edits. This creates more transparency within the community.After pushing the Publish button, the system will initiate a gasless transaction, which you should sign with your wallet. Press Sign in the wallet pop-up window. In several moments your page should be recorded on the blockchain. Once your changes have been authorized by your wallet, you can see your wiki in the Reading Mode. After submission, you will also be able to view the transaction on block explorer and IPFS. If the changes are not visible make sure to hard refresh the page. Most edits go through in under a minute but it could take a few minutes if the Polygon network is congested. https://www.youtube.com/watch?v=8ml3S6KUX3U  If you're looking for ways to improve your editing skills and make your pages stand out with Twitter feeds, headers, links to other IQ.wiki pages, quotes, categories, and infoboxes check out our Editing Guide below. ",

      usingEveripediaOneHead: 'Getting Started',
      usingEveripediaOneBody:
        "Before you can create or edit an IQ.wiki article you'll need to click the wallet icon and log in with your Brainlisted Polygon address using MetaMask or WalletConnect. Prior to creating the new wiki, check if it does not exist yet. Go to the Search Bar and insert the title. The site will search our existing database to see if an article about the same topic already exists. If it does, edit the existing article. If there are no suggestions from the system, you can feel free to create a new article. Click the Create Wiki button in the header navigation. Add your desired article title. Make sure that it is short and comprehensive - the system will generate the unique URL from the title. https://www.youtube.com/watch?v=Y4gWJUFchrc ",
      usingEveripediaTwoHead: 'Adding a featured image',
      usingEveripediaTwoBody:
        'To add or update a featured image, click on the placeholder image. You can easily add a photo by dragging and dropping it or clicking to select an image from your PC. You can also clicking "Image URL" and paste in a link to the image and the system will fetch it automatically. https://www.youtube.com/watch?v=3DFzzleCCNo ',
      usingEveripediaThreeHead: 'Filling in the article',
      usingEveripediaThreeBody:
        'This is your chance to start writing and explaining the topic of your article. The intro should answer the basics and provide the most important info while headers can be used to create sections that provide additional details.',
      usingEveripediaFourHead: 'Adding a citation',
      usingEveripediaFourBody:
        'To add a reference or citation to the body of an article, first select where you want to add the citation by clicking on the place in the article where you would like to add the citation (you can start with adding a citation at the end of the first paragraph). To actually add the citation click the “Cite” button, enter the URL, and a short description of the link you’re choosing to add (for example, you can enter the title of the article, the author, and/or the publishing date in the description). To actually insert the reference, click the pink “Cite” button. https://www.youtube.com/watch?v=NrAUvtOpY0E ',
      usingEveripediaFiveHead: 'Submitting a wiki',
      usingEveripediaFiveBody:
        "category, tags and add social media links in the Edit Wiki Details section. When all these steps are done, you can hit the Publish button to save your page. You will have the option to add a comment while publishing.Comments give editors the opportunity to provide additional context or rationale for their edits. This creates more transparency within the community.After pushing the Publish button, the system will initiate a gasless transaction, which you should sign with your wallet. Press Sign in the wallet pop-up window. In several moments your page should be recorded on the blockchain. Once your changes have been authorized by your wallet, you can see your wiki in the Reading Mode. After submission, you will also be able to view the transaction on block explorer and IPFS. If the changes are not visible make sure to hard refresh the page. Most edits go through in under a minute but it could take a few minutes if the Polygon network is congested. https://www.youtube.com/watch?v=8ml3S6KUX3U  If you're looking for ways to improve your editing skills and make your pages stand out with Twitter feeds, headers, links to other IQ.wiki pages, quotes, categories, and infoboxes check out our Editing Guide below. ",

      advancedFAQOneHead: 'Getting Started',
      advancedFAQOneBody:
        "Before you can edit an IQ.wiki article you'll need to log in with your Brainlisted Polygon address using MetaMask or Walletconnect. Editing an article is quite similar to creating an article. The only difference is that you need to start with an existing IQ.wiki article and open the Edit Mode instead of starting with the Create Wiki button.",
      advancedFAQTwoHead: 'Editing Mode',
      advancedFAQTwoBody:
        'To open the Editing Mode and start editing an IQ.wiki article click the "Edit" button. To learn the basics of editing on IQ.wiki, how to add a featured image, information, and citations as well as how to submit your page, first make sure to read the Creating an Article of this FAQ page.',

      advancedFAQThreeHead: 'Headers and Sections',
      advancedFAQThreeBody:
        'You can use headers like Overview, Use Cases, and Tokenomics, to create different sections on your wiki and make it easier to read. To add a header click the H button, choose the appropriate size and type in the title of the section. You can use H1 to H6 to create subsections as part of the original section. Use “paragraph” for the plain text. https://www.youtube.com/watch?v=qshwjtDtNss ',

      advancedFAQFourHead: 'Quotes',
      advancedFAQFourBody:
        'Quotes are a great way to add the perspectives of the people/companies involved or covered in the wiki. To add a quote select the quoted information and click the blockquote button. https://www.youtube.com/watch?v=P1yHumUmO6k',

      advancedFAQFiveHead: 'Adding Links to the Infobox',
      advancedFAQFiveBody:
        'Users can add social media links (such as Instagram, Reddit etc), contract URLs and links to the biggest crypto trackers (such as Coinmarketcap and Coingecko) within the Edit Wiki Details panel. To add a link to the infobox, choose the network from the list, insert the link and press Add. You can add a direct Twitter feed to the wiki by adding a Twitter handle to the list of social media links located within the Edit Wiki Details menu just underneath the main image. https://www.youtube.com/watch?v=q269vk780Nk ',

      advancedFAQSixHead: 'Adding Item to the Media Gallery',
      advancedFAQSixBody:
        'To add an image to the media gallery, navigate to the media gallery on the right side of the article (below the main image) and click new “Add images/video”. You can drag and drop an image or video or click to select it from your PC. You can paste a YouTube or image link as well as the system will automatically fetch the media.',

      advancedFAQSevenHead: 'Embedding Images & Videos',
      advancedFAQSevenBody:
        'To add an image or video to the body of an IQ.wiki article, first select where you want to add the media by clicking on the place in the article where you would like to add the media (you can start with adding media to the introduction by placing your cursor before the first word of the article). To actually add the media click the “Media” button in the editor toolbar, select the photo or video, and press the one you want to add. https://www.youtube.com/watch?v=_54xE_e5BiQ',

      advancedFAQEightHead: 'Categories and Tags',
      advancedFAQEightBody:
        'Categories allow users to group wikis together by topic and make it easier for readers to discover related wikis. To add a category click the Edit Categories section and type out the category you want to add. The six initial categories on IQ.wiki are: NFTs, Decentralized Finance, Exchanges, Cryptocurrencies, People in Crypto and DAOs. Tags allow users to go from one page to another within the specific topic in question. Pressing on some specific tags, for example, Games will lead a user to the list with all the wikis about crypto-based games on IQ.wiki.Both of these features are accessible from Edit Wiki Details panel that can be found under the main image. https://www.youtube.com/watch?v=XWFeUeEVW0c',

      advancedFAQNineHead: 'Adding Internal Links',
      advancedFAQNineBody:
        'Adding a link to another IQ.wiki article is a great way to refer people to information related to the article you are editing. To add an internal link, click on the place in the article where you would like to add an internal link, press “Insert Wiki Link” and type in the article you would like to include. Then press “Link” to insert it. *There is an “override text” option, which allows you to make the clickable text of the link different from the title of the IQ.wiki article.  By using the override text feature, you can have BAYC appear as the visible text instead of Bored Ape Yacht Club. https://www.youtube.com/watch?v=WyLVpULmyP4',

      advancedFAQTenHead: 'Edit History',
      advancedFAQTenBody:
        'To see the past edits that have been made to an IQ.wiki article you can click on the History button which is located below the Edit button. The History feature allows users to examine the different versions of an article and the differences between them on a special timeline. The History page also links to the Polygon transaction and IPFS hash for each edit. https://www.youtube.com/watch?v=gjYErj7O-PQ',

      //Global text
      seenItAll: 'Yay! You have seen it all 🥳 ',
      //---End of Copies for IQ.Wiki--

      // ---------------------------------------------------------------

      en: 'EN',
      ko: '한국어',
      zh: '中文',
    },
  },
}

const languageDetector = new LanguageDetector(null, {
  order: ['querystring', 'localStorage', 'navigator'],
  lookupLocalStorage: 'storeLang',
  caches: ['localStorage'],
})

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    supportedLngs: ['en', 'ko', 'zh'],
  })

export default i18n
