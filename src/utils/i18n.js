import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

export const resources = {
  en: {
    translation: {
      // |||||||||||||||||||| SECTIONS ||||||||||||||||||||
      // init
      //--Copies for Everipedia--

      //Home page
      everipedia: 'Everipedia',
      iq_description: 'Everipedia is the biggest Blockchain Encyclopedia',
      exploreHeroBttn: 'Explore',
      learnMoreHeroBttn: 'Learn',
      trendingWikis: 'Trending Wikis',
      trendingWikisDescription:
        'The hotest wikis trending on everipedia right now and in the blockchain world.',
      browseCategory: 'Wiki Categories',
      updatesFooterHeading: 'Get updated with Everipedia',
      updatesFooterText:
        'Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating Everipedia.',
      subScribeFooterBttn: 'Subscribe now',
      communityFooterHeading: 'Community Hub',
      visionFooterText:
        "Everipedia's vision is to bring blockchain knowledge to the world and knowledge onto the blockchain.",
      whatIQ: "What's IQ?",
      iq: 'IQ',
      bridges: 'Bridges',
      staking: 'Staking',
      bonds: 'Bonds',
      aboutUs: 'About us',
      careers: 'Careers',
      brainies: 'brainies',
      resources: 'Resources',
      help: 'help',
      blog: 'blog',
      faq: 'faq',
      policies: 'Policies',
      guideLines: 'Guidelines',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of service',
      copyRight: '© 2022 Everipedia. All rights reserved',

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
      wikiSummaryPlaceholder: 'Summary of wiki',
      dragMainImgLabel: 'Drag and drop a main image, or click to select',
      pasteMainImgLabel: '(or) paste image link here',
      pasteModalMainImgLabel: '(or) paste a youtube or image link here',
      pageTypeLabel: 'Page Type',
      categoryTypeLabel: 'Category',
      twitterProfileLabel: 'Twitter profile',

      //About page
      aboutHeroHeading: 'Bringing knowledge to the blockchain.',
      aboutHeroPhrase:
        "Everipedia's mission is to bring the world's knowledge on-chain through the IQ token.",
      aboutSignUpBttn: 'Sign Up',
      aboutgoTo: 'Go to IQ Site',
      aboutFeatHeading: 'Taking the Online Encyclopedia into the Modern Age',
      aboutFeatContent:
        'Everipedia uses blockchain technology to help us fulfill our vision for a world where all knowledge is available to all people - a world in which everyone, everywhere can participate in sharing what they know and providing value to others.',
      abtFeatOneHeading: 'Modern Design and Features',
      abtFeatOneContent:
        'Everipedia’s design and features have been built for the modern age.',
      abtFeatTwoHeading: 'More Articles and Content',
      abtFeatTwoContent:
        'Everipedia allows you to create an article about anything as long as you have a citation. This allows for a much broader scope of content in the knowledge base.',
      abtFeatThreeHeading: 'Democratic Governance',
      abtFeatThreeContent:
        'Anyone with IQ Tokens is a stakeholder in the Everipedia Network. Using IQ tokens to vote, users decide which new articles and edits are added to the knowledge base.',
      aboutTestimonialHeading:
        ' An open community bringing blockchain knowledge to the world',
      aboutTestimonialContent:
        "Everipedia's vibrant community is open and welcoming to everyone. We're already the world's largest blockchain encyclopedia, but we're far from complete. Join us today.",
      aboutTestimonialOneContent:
        'Thanks to new technology, it is now possible for Everipedia to move beyond Wikipedia just like how we moved beyond Britannica almost two decades ago.',
      aboutTestimonialOneAuthor: 'Larry Sanger',
      aboutTestimonialOneDesig: 'Co-Founder Wikipedia',
      aboutTestimonialOneLocation: 'Columbus, Ohio',
      aboutTestimonialTwoContent:
        'As an editor, the killer feature of Everipedia is that as long as you use sources and a neutral wording, you can write an article about anything you want. A dapp you like, yourself — anything.',
      aboutTestimonialTwoAuthor: 'Wilfra',
      aboutTestimonialTwoDesig: 'Marketcap.one',
      aboutTestimonialThreeContent:
        'I love Everipedia because everyone benefits, particularly the contributors. As an IQ token holder, I have an incentive to participate in the network.',
      aboutTestimonialThreeAuthor: 'Samuel Joseph',
      aboutTestimonialThreeDesig: 'Editor',
      aboutTestimonialThreeLocation: 'Lagos, Nigeria',
      meetTeamHead: 'Meet our team',
      meetTeamContent:
        'Our mission to build the world’s greatest encyclopedia requires a skilled executive team that embraces grand challenges. At Everipedia, we are fortunate to have people with deep experience and knowledge in both the education and blockchain industry.',
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
        'Suscribe to our mailing list to get the latest from everipedia',

      //FAQ
      faqHeader: 'Frequently Asked Questions',
      faqPhrase: 'Have questions? We are here to help you.',
      faqSectionOne: 'Getting Started',
      faqSectionTwo: 'Using Everipedia',
      faqSectionThree: 'Advanced',
      getterStartedOneHead: 'What is Everipedia?',
      getterStartedOneBody:
        'Everipedia encyclopedia is the largest Web3 encyclopedia and the leading encyclopedia in the crypto space with a wealth of encyclopedia pages. At Everipedia, our mission is to bring the world’s knowledge on-chain through the IQ token.',
      getterStartedTwoHead: 'What is IQ?',
      getterStartedTwoBody:
        'The IQ token is a DeFi, NFT, and Oracle token centered around bridging the real world and the Metaverse through BrainDAO. BrainDAO will use the IQ Token to fund the future of knowledge on the blockchain. The IQ token is multichain available on Ethereum, Binance Smart Chain, Polygon, Klaytn, and EOS. The IQ token was first launched in 2018 and powers Everipedia encyclopedia, the decentralized prediction market PredIQt, the first-party oracle service Everipedia OraQles, and the staking platform HiIQ',
      getterStartedThreeHead: 'Signing up',
      getterStartedThreeBody: '',
      getterStartedFourHead: 'Profiles',
      getterStartedFourBody: '',
      getterStartedFiveHead: 'How Do I Earn IQ?',
      getterStartedFiveBody: '',
      getterStartedSixHead: 'Search',
      getterStartedSixBody: '',
      getterStartedSevenHead: 'Activity',
      getterStartedSevenBody: '',
      getterStartedEightHead: 'Getting In Touch',
      getterStartedEightBody: '',

      usingEveripediaOneHead: 'Creating an Article',
      usingEveripediaOneBody: '',
      usingEveripediaTwoHead: 'Editing an Article',
      usingEveripediaTwoBody: '',
      usingEveripediaThreeHead: 'Edit History',
      usingEveripediaThreeBody: '',
      usingEveripediaFourHead: 'Categories and Tags',
      usingEveripediaFourBody: '',
      usingEveripediaFiveHead: 'Advanced Editor Guide',
      usingEveripediaFiveBody: '',
      usingEveripediaSixHead: 'Everipedia Guidelines',
      usingEveripediaSixBody:
        'Everipedia takes pride in being an inclusive platform with a simple onboarding process. That said, there are a few editorial-related policies / do’s and don’t’s we believe everyone should follow. DO: Write on anything crypto-related: Everipedia is to bring blockchain knowledge to the world and knowledge onto the blockchain, so editors should only write on crypto-related topics. Write in a third-person, objective tone: because Everipedia is a knowledge base, one of the precedents we have set is to think from the perspective of an academic scholar. When editing an Everipedia article, ask yourself, “Would this be considered an objective resource if someone else read this?” Cite your sources where needed: It is important for Everipedia’s platform to present accurate information. To make it easier for contributors and readers alike to see where editors get their information from (and the validity of those resources), it is important to cite their sources. This allows the community to check editors’ work and work with editors in an environment that is inherently collaborative. Do NOT: Use inappropriate topics: editors are supposed to create crypto-related content only. Plagiarise: publish content that is not your own and represent it as your work; this typically includes copying/pasting content without citing its original source and giving proper credit to the creator. It also includes violating copyright. Vandalize: deliberately attempt to add, change, or remove content to tarnish the page. Spam: reference content that attempts to promote irrelevant or inappropriate products to a page; these edit proposals tend to be in the form of advertisements and violate Everipedia’s policy of writing in an objective tone. ',

      //Global text
      seenItAll: 'Yay! You have seen it all 🥳 ',
      //---End of Copies for Everipedia--

      // ---------------------------------------------------------------

      en: 'EN',
      ko: '한국어',
      zh: '中文',
    },
  },
  ko: {
    translation: {
      // |||||||||||||||||||| SECTIONS ||||||||||||||||||||
      // init
      //--Copies for Everipedia--

      //Home page
      everipedia: 'Everipedia',
      iq_description: 'Everipedia is the biggest Blockchain Encyclopedia',
      exploreHeroBttn: 'Explore',
      learnMoreHeroBttn: 'Learn More',
      trendingWikis: 'Trending Wikis',
      trendingWikisDescription:
        'The hotest wikis trending on everipedia right now and in the blockchain world.',
      browseCategory: 'Wiki Categories',
      updatesFooterHeading: 'Get updated with Everipedia',
      updatesFooterText:
        'Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating Everipedia.',
      subScribeFooterBttn: 'Subscribe now',
      communityFooterHeading: 'Community Hub',
      visionFooterText:
        "Everipedia's vision is to bring blockchain knowledge to the world and knowledge onto the blockchain.",
      whatIQ: "What's IQ?",
      iq: 'IQ',
      bridges: 'Bridges',
      staking: 'Staking',
      bonds: 'Bonds',
      aboutUs: 'About us',
      careers: 'Careers',
      brainies: 'brainies',
      resources: 'Resources',
      help: 'help',
      blog: 'blog',
      faq: 'faq',
      policies: 'Policies',
      guideLines: 'Guidelines',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of service',
      copyRight: '© 2022 Everipedia. All rights reserved',

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
      wikiSummaryPlaceholder: 'Summary of wiki',
      dragMainImgLabel: 'Drag and drop a main image, or click to select',
      pasteMainImgLabel: '(or) paste image link here',
      pasteModalMainImgLabel: '(or) paste a youtube or image link here',
      pageTypeLabel: 'Page Type',
      categoryTypeLabel: 'Category',
      twitterProfileLabel: 'Twitter profile',

      //About page
      aboutHeroHeading: 'Bringing knowledge to the blockchain.',
      aboutHeroPhrase:
        "Everipedia's mission is to bring the world's knowledge on-chain through the IQ token.",
      aboutSignUpBttn: 'Sign Up',
      aboutgoTo: 'Go to IQ Site',
      aboutFeatHeading: 'Taking the Online Encyclopedia into the Modern Age',
      aboutFeatContent:
        'Everipedia uses blockchain technology to help us fulfill our vision for a world where all knowledge is available to all people - a world in which everyone, everywhere can participate in sharing what they know and providing value to others.',
      abtFeatOneHeading: 'Modern Design and Features',
      abtFeatOneContent:
        'Everipedia’s design and features have been built for the modern age.',
      abtFeatTwoHeading: 'More Articles and Content',
      abtFeatTwoContent:
        'Everipedia allows you to create an article about anything as long as you have a citation. This allows for a much broader scope of content in the knowledge base.',
      abtFeatThreeHeading: 'Democratic Governance',
      abtFeatThreeContent:
        'Anyone with IQ Tokens is a stakeholder in the Everipedia Network. Using IQ tokens to vote, users decide which new articles and edits are added to the knowledge base.',
      aboutTestimonialHeading:
        ' An open community bringing blockchain knowledge to the world',
      aboutTestimonialContent:
        "Everipedia's vibrant community is open and welcoming to everyone. We're already the world's largest blockchain encyclopedia, but we're far from complete. Join us today.",
      aboutTestimonialOneContent:
        'Thanks to new technology, it is now possible for Everipedia to move beyond Wikipedia just like how we moved beyond Britannica almost two decades ago.',
      aboutTestimonialOneAuthor: 'Larry Sanger',
      aboutTestimonialOneDesig: 'Co-Founder Wikipedia',
      aboutTestimonialOneLocation: 'Columbus, Ohio',
      aboutTestimonialTwoContent:
        'As an editor, the killer feature of Everipedia is that as long as you use sources and a neutral wording, you can write an article about anything you want. A dapp you like, yourself — anything.',
      aboutTestimonialTwoAuthor: 'Wilfra',
      aboutTestimonialTwoDesig: 'Marketcap.one',
      aboutTestimonialThreeContent:
        'I love Everipedia because everyone benefits, particularly the contributors. As an IQ token holder, I have an incentive to participate in the network.',
      aboutTestimonialThreeAuthor: 'Samuel Joseph',
      aboutTestimonialThreeDesig: 'Editor',
      aboutTestimonialThreeLocation: 'Lagos, Nigeria',
      meetTeamHead: 'Meet our team',
      meetTeamContent:
        'Our mission to build the world’s greatest encyclopedia requires a skilled executive team that embraces grand challenges. At Everipedia, we are fortunate to have people with deep experience and knowledge in both the education and blockchain industry.',
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

      //FAQ
      faqHeader: 'Frequently Asked Questions',
      faqPhrase: 'Have questions? We are here to help you.',
      faqSectionOne: 'Getting Started',
      faqSectionTwo: 'Using Everipedia',
      faqSectionThree: 'Advanced',
      faqOneHead: 'What is IQ',
      faqOneBody:
        'The IQ token is a DeFi, NFT, and Oracle token centered around bringing the world’s knowledge on-chain from finance to art to data. The IQ token is multichain available on Ethereum, Binance Smart Chain, Polygon, and EOS. The IQ token will also be the native token of the upcoming Brainchain, the first blockchain dedicated to bringing real-world knowledge on-chain. The IQ token was first launched in 2018 and powers Everipedia encyclopedia, the decentralized prediction market PredIQt, the first-party oracle service Everipedia OraQles, and HiIQ.',

      //Global text
      seenItAll: 'Yay! You have seen it all 🥳 ',
      //---End of Copies for Everipedia--

      // ---------------------------------------------------------------

      en: 'EN',
      ko: '한국어',
      zh: '中文',
    },
  },

  zh: {
    translation: {
      // |||||||||||||||||||| SECTIONS ||||||||||||||||||||
      // init
      //Home page
      everipedia: 'Everipedia',
      iq_description: 'Everipedia is the biggest Blockchain Encyclopedia',
      exploreHeroBttn: 'Explore',
      learnMoreHeroBttn: 'Learn More',
      trendingWikis: 'Trending Wikis',
      trendingWikisDescription:
        'The hotest wikis trending on everipedia right now and in the blockchain world.',
      browseCategory: 'Wiki Categories',
      updatesFooterHeading: 'Get updated with Everipedia',
      updatesFooterText:
        'Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating Everipedia.',
      subScribeFooterBttn: 'Subscribe now',
      communityFooterHeading: 'Community Hub',
      visionFooterText:
        "Everipedia's vision is to bring blockchain knowledge to the world and knowledge onto the blockchain.",
      whatIQ: "What's IQ?",
      iq: 'IQ',
      bridges: 'Bridges',
      staking: 'Staking',
      bonds: 'Bonds',
      aboutUs: 'About us',
      careers: 'Careers',
      brainies: 'brainies',
      resources: 'Resources',
      help: 'help',
      blog: 'blog',
      faq: 'faq',
      policies: 'Policies',
      guideLines: 'Guidelines',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of service',
      copyRight: '© 2022 Everipedia. All rights reserved',

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
      wikiSummaryPlaceholder: 'Summary of wiki',
      dragMainImgLabel: 'Drag and drop a main image, or click to select',
      pasteMainImgLabel: '(or) paste image link here',
      pasteModalMainImgLabel: '(or) paste a youtube or image link here',
      pageTypeLabel: 'Page Type',
      categoryTypeLabel: 'Category',
      twitterProfileLabel: 'Twitter profile',

      //About page
      aboutHeroHeading: 'Bringing knowledge to the blockchain.',
      aboutHeroPhrase:
        "Everipedia's mission is to bring the world's knowledge on-chain through the IQ token.",
      aboutSignUpBttn: 'Sign Up',
      aboutgoTo: 'Go to IQ Site',
      aboutFeatHeading: 'Taking the Online Encyclopedia into the Modern Age',
      aboutFeatContent:
        'Everipedia uses blockchain technology to help us fulfill our vision for a world where all knowledge is available to all people - a world in which everyone, everywhere can participate in sharing what they know and providing value to others.',
      abtFeatOneHeading: 'Modern Design and Features',
      abtFeatOneContent:
        'Everipedia’s design and features have been built for the modern age.',
      abtFeatTwoHeading: 'More Articles and Content',
      abtFeatTwoContent:
        'Everipedia allows you to create an article about anything as long as you have a citation. This allows for a much broader scope of content in the knowledge base.',
      abtFeatThreeHeading: 'Democratic Governance',
      abtFeatThreeContent:
        'Anyone with IQ Tokens is a stakeholder in the Everipedia Network. Using IQ tokens to vote, users decide which new articles and edits are added to the knowledge base.',
      aboutTestimonialHeading:
        ' An open community bringing blockchain knowledge to the world',
      aboutTestimonialContent:
        "Everipedia's vibrant community is open and welcoming to everyone. We're already the world's largest blockchain encyclopedia, but we're far from complete. Join us today.",
      aboutTestimonialOneContent:
        'Thanks to new technology, it is now possible for Everipedia to move beyond Wikipedia just like how we moved beyond Britannica almost two decades ago.',
      aboutTestimonialOneAuthor: 'Larry Sanger',
      aboutTestimonialOneDesig: 'Co-Founder Wikipedia',
      aboutTestimonialOneLocation: 'Columbus, Ohio',
      aboutTestimonialTwoContent:
        'As an editor, the killer feature of Everipedia is that as long as you use sources and a neutral wording, you can write an article about anything you want. A dapp you like, yourself — anything.',
      aboutTestimonialTwoAuthor: 'Wilfra',
      aboutTestimonialTwoDesig: 'Marketcap.one',
      aboutTestimonialThreeContent:
        'I love Everipedia because everyone benefits, particularly the contributors. As an IQ token holder, I have an incentive to participate in the network.',
      aboutTestimonialThreeAuthor: 'Samuel Joseph',
      aboutTestimonialThreeDesig: 'Editor',
      aboutTestimonialThreeLocation: 'Lagos, Nigeria',
      meetTeamHead: 'Meet our team',
      meetTeamContent:
        'Our mission to build the world’s greatest encyclopedia requires a skilled executive team that embraces grand challenges. At Everipedia, we are fortunate to have people with deep experience and knowledge in both the education and blockchain industry.',
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
      wikiInCategory: 'Wikis in thiss category',

      //FAQ
      faqHeader: 'Frequently Asked Questions',
      faqPhrase: 'Have questions? We are here to help you.',
      faqSectionOne: 'Getting Started',
      faqSectionTwo: 'Using Everipedia',
      faqSectionThree: 'Advanced',
      faqOneHead: 'What is IQ',
      faqOneBody:
        'The IQ token is a DeFi, NFT, and Oracle token centered around bringing the world’s knowledge on-chain from finance to art to data. The IQ token is multichain available on Ethereum, Binance Smart Chain, Polygon, and EOS. The IQ token will also be the native token of the upcoming Brainchain, the first blockchain dedicated to bringing real-world knowledge on-chain. The IQ token was first launched in 2018 and powers Everipedia encyclopedia, the decentralized prediction market PredIQt, the first-party oracle service Everipedia OraQles, and HiIQ.',

      //Global text
      seenItAll: 'Yay! You have seen it all 🥳 ',
      //---End of Copies for Everipedia--

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
