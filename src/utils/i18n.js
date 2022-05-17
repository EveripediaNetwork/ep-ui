import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

export const resources = {
  en: {
    translation: {
      // |||||||||||||||||||| SECTIONS ||||||||||||||||||||
      // init
      //--Copies for Everipedia--

      //Home page
      everipedia: "Everipedia",
      iq_description:
        "Everipedia is the world’s largest crypto knowledge base",
      hero_title: "An Ecosystem of Knowledge on the Blockchain.",
      exploreHeroBttn: "Explore", 
      createHeroBttn: "Create", 
      learnMoreHeroBttn: "Learn more about Everipedia",
      trendingWIkis: "Trending Wikis", 
      browseCategory: "Browse by category", 
      updatesFooterHeading: "Get updated with Everipedia", 
      updatesFooterText: "Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating Everipedia.", 
      subScribeFooterBttn: "Subscribe now",
      communityFooterHeading: "Community Hub", 
      visionFooterText: "Everipedia's vision is to bring blockchain knowledge to the world and knowledge onto the blockchain.",
      whatIQ: "What's IQ?", 
      iq: "IQ", 
      bridges: "Bridges",
      staking: "Staking",
      bonds: "Bonds",
      aboutUs: "About us", 
      careers: "Careers", 
      brainies: "brainies",
      resources: "Resources",
      help: "help",
      blog: "blog", 
      faq: "faq", 
      policies: "Policies", 
      guideLines: "Guidelines", 
      privacyPolicy: "Privacy Policy", 
      termsOfService: "Terms of service",
      copyRight: "© 2022 Everipedia. All rights reserved",

      //Desktop Nav 
      Explore: "Explore",
      Activity: "Activity",
      Resources: "Resources",
      Aboutus: "About us", 
      CreateWiki: "Create Wiki",
      HelpCenter: "Help Center",
      //Category page
      wikiCategory: "Wiki Categories", 
      trendingCategory: "Trending Wiki Categories",

      //Create wiki page
      wikiTitlePlaceholder: "Title goes here",
      wikiSummaryLabel: "Wiki Summary",
      wikiSummaryPlaceholder: "Summary of wiki",
      dragMainImgLabel: "Drag and drop a main image, or click to select",
      pasteMainImgLabel: "(or) paste image link here",
      pageTypeLabel: "Page Type", 
      categoryTypeLabel: "Category", 
      twitterProfileLabel: "Twitter profile",

      //About page 
      aboutHeroHeading: "Bringing knowledge to the blockchain.", 
      aboutHeroPhrase: "Everipedia's mission is to bring the world's knowledge on-chain through the IQ token.",
      aboutSignUpBttn: "Sign Up", 
      aboutgoTo: "Go to IQ Site",
      aboutFeatHeading: "Taking the Online Encyclopedia into the Modern Age", 
      aboutFeatContent: "Everipedia uses blockchain technology to help us fulfill our vision for a world where all knowledge is available to all people - a world in which everyone, everywhere can participate in sharing what they know and providing value to others.", 
      abtFeatOneHeading: "Modern Design and Features", 
      abtFeatOneContent: "Everipedia’s design and features have been built for the modern age.", 
      abtFeatTwoHeading: "More Articles and Content", 
      abtFeatTwoContent: "Everipedia allows you to create an article about anything as long as you have a citation. This allows for a much broader scope of content in the knowledge base.",
      abtFeatThreeHeading: "Democratic Governance", 
      abtFeatThreeContent: "Anyone with IQ Tokens is a stakeholder in the Everipedia Network. Using IQ tokens to vote, users decide which new articles and edits are added to the knowledge base.",
      aboutTestimonialHeading: " An open community bringing blockchain knowledge to the world", 
      aboutTestimonialContent: "Everipedia's vibrant community is open and welcoming to everyone. We're already the world's largest blockchain encyclopedia, but we're far from complete. Join us today.", 
      aboutTestimonialOneContent: "Thanks to new technology, it is now possible for Everipedia to move beyond Wikipedia just like how we moved beyond Britannica almost two decades ago.", 
      aboutTestimonialOneAuthor: "Larry Sanger", 
      aboutTestimonialOneDesig: "Co-Founder Wikipedia",  
      aboutTestimonialOneLocation: "Columbus, Ohio",
      aboutTestimonialTwoContent: "As an editor, the killer feature of Everipedia is that as long as you use sources and a neutral wording, you can write an article about anything you want. A dapp you like, yourself — anything.", 
      aboutTestimonialTwoAuthor: "Wilfra", 
      aboutTestimonialTwoDesig: "Marketcap.one",  
      aboutTestimonialThreeContent: "I love Everipedia because everyone benefits, particularly the contributors. As an IQ token holder, I have an incentive to participate in the network.", 
      aboutTestimonialThreeAuthor: "Samuel Joseph", 
      aboutTestimonialThreeDesig: "Editor", 
      aboutTestimonialThreeLocation: "Lagos, Nigeria",
      meetTeamHead: "Meet our team", 
      meetTeamContent: "Our mission to build the world’s greatest encyclopedia requires a skilled executive team that embraces grand challenges. At Everipedia, we are fortunate to have people with deep experience and knowledge in both the education and blockchain industry.",
      latestFromBlogHeading: "Latest from our blog",

      //Profile page 
      selectAllItems: "All items", 
      selectRecentListed: "Recently Listed", 
      selectRecentCreated: "Recently Created", 
      selectRecentSold: "Recently Sold", 
      selectRecentReceived: "Recendtly Received", 
      selectEndingSoon: "Ending Soon", 
      selectPriceLowtoHigh: "Price: Low to High", 
      selectPriceHighttoLow: "Price: High to Low", 
      selectHightLost: "Highest Lost Sale", 
      selectMostView: "Most Viewed",
      selectMostFav: "Most Favorited", 
      selectOldest: "Oldest", 
      selectSingleItem: "Single items", 
      selectBundles: "Bundles", 
      shareBttnText: "Share", 
      settingBttnText: "Settings",  

      //Category page: 
      wikiInCategory: "Wikis in this category",

      //Global text 
      seenItAll: "Yay! You have seen it all 🥳 ", 
      //---End of Copies for Everipedia--

      
      // ---------------------------------------------------------------

      en: "EN",
      ko: "한국어",
      zh: "中文"
    }
  },
  ko: {
    translation: {
      // |||||||||||||||||||| SECTIONS ||||||||||||||||||||
      // init
      //--Copies for Everipedia--

      //Home page
      everipedia: "Everipedia",
      iq_description:
        "Everipedia is the world’s largest crypto knowledge base",
      hero_title: "An Ecosystem of Knowledge on the Blockchain.",
      exploreHeroBttn: "Explore", 
      createHeroBttn: "Create", 
      learnMoreHeroBttn: "Learn more about Everipedia",
      trendingWIkis: "Trending Wikis", 
      browseCategory: "Browse by category", 
      updatesFooterHeading: "Get updated with Everipedia", 
      updatesFooterText: "Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating Everipedia.", 
      subScribeFooterBttn: "Subscribe now",
      communityFooterHeading: "Community Hub", 
      visionFooterText: "Everipedia's vision is to bring blockchain knowledge to the world and knowledge onto the blockchain.",
      whatIQ: "What's IQ?", 
      iq: "IQ", 
      bridges: "Bridges",
      staking: "Staking",
      bonds: "Bonds",
      aboutUs: "About us", 
      careers: "Careers", 
      brainies: "brainies",
      resources: "Resources",
      help: "help",
      blog: "blog", 
      faq: "faq", 
      policies: "Policies", 
      guideLines: "Guidelines", 
      privacyPolicy: "Privacy Policy", 
      termsOfService: "Terms of service",
      copyRight: "© 2022 Everipedia. All rights reserved",

      //Desktop Nav 
      Explore: "Explore",
      Activity: "Activity",
      Resources: "Resources",
      Aboutus: "About us", 
      CreateWiki: "Create Wiki",
      HelpCenter: "Help Center",
      //Category page
      wikiCategory: "Wiki Categories", 
      trendingCategory: "Trending Wiki Categories",

      //Create wiki page
      wikiTitlePlaceholder: "Title goes here",
      wikiSummaryLabel: "Wiki Summary",
      wikiSummaryPlaceholder: "Summary of wiki",
      dragMainImgLabel: "Drag and drop a main image, or click to select",
      pasteMainImgLabel: "(or) paste image link here",
      pageTypeLabel: "Page Type", 
      categoryTypeLabel: "Category", 
      twitterProfileLabel: "Twitter profile",

      //About page 
      aboutHeroHeading: "Bringing knowledge to the blockchain.", 
      aboutHeroPhrase: "Everipedia's mission is to bring the world's knowledge on-chain through the IQ token.",
      aboutSignUpBttn: "Sign Up", 
      aboutgoTo: "Go to IQ Site",
      aboutFeatHeading: "Taking the Online Encyclopedia into the Modern Age", 
      aboutFeatContent: "Everipedia uses blockchain technology to help us fulfill our vision for a world where all knowledge is available to all people - a world in which everyone, everywhere can participate in sharing what they know and providing value to others.", 
      abtFeatOneHeading: "Modern Design and Features", 
      abtFeatOneContent: "Everipedia’s design and features have been built for the modern age.", 
      abtFeatTwoHeading: "More Articles and Content", 
      abtFeatTwoContent: "Everipedia allows you to create an article about anything as long as you have a citation. This allows for a much broader scope of content in the knowledge base.",
      abtFeatThreeHeading: "Democratic Governance", 
      abtFeatThreeContent: "Anyone with IQ Tokens is a stakeholder in the Everipedia Network. Using IQ tokens to vote, users decide which new articles and edits are added to the knowledge base.",
      aboutTestimonialHeading: " An open community bringing blockchain knowledge to the world", 
      aboutTestimonialContent: "Everipedia's vibrant community is open and welcoming to everyone. We're already the world's largest blockchain encyclopedia, but we're far from complete. Join us today.", 
      aboutTestimonialOneContent: "Thanks to new technology, it is now possible for Everipedia to move beyond Wikipedia just like how we moved beyond Britannica almost two decades ago.", 
      aboutTestimonialOneAuthor: "Larry Sanger", 
      aboutTestimonialOneDesig: "Co-Founder Wikipedia",  
      aboutTestimonialOneLocation: "Columbus, Ohio",
      aboutTestimonialTwoContent: "As an editor, the killer feature of Everipedia is that as long as you use sources and a neutral wording, you can write an article about anything you want. A dapp you like, yourself — anything.", 
      aboutTestimonialTwoAuthor: "Wilfra", 
      aboutTestimonialTwoDesig: "Marketcap.one",  
      aboutTestimonialThreeContent: "I love Everipedia because everyone benefits, particularly the contributors. As an IQ token holder, I have an incentive to participate in the network.", 
      aboutTestimonialThreeAuthor: "Samuel Joseph", 
      aboutTestimonialThreeDesig: "Editor", 
      aboutTestimonialThreeLocation: "Lagos, Nigeria",
      meetTeamHead: "Meet our team", 
      meetTeamContent: "Our mission to build the world’s greatest encyclopedia requires a skilled executive team that embraces grand challenges. At Everipedia, we are fortunate to have people with deep experience and knowledge in both the education and blockchain industry.",
      latestFromBlogHeading: "Latest from our blog",

      //Profile page 
      selectAllItems: "All items", 
      selectRecentListed: "Recently Listed", 
      selectRecentCreated: "Recently Created", 
      selectRecentSold: "Recently Sold", 
      selectRecentReceived: "Recendtly Received", 
      selectEndingSoon: "Ending Soon", 
      selectPriceLowtoHigh: "Price: Low to High", 
      selectPriceHighttoLow: "Price: High to Low", 
      selectHightLost: "Highest Lost Sale", 
      selectMostView: "Most Viewed",
      selectMostFav: "Most Favorited", 
      selectOldest: "Oldest", 
      selectSingleItem: "Single items", 
      selectBundles: "Bundles", 
      shareBttnText: "Share", 
      settingBttnText: "Settings",  

      //Global text 
      seenItAll: "Yay! You have seen it all 🥳 ", 
      //---End of Copies for Everipedia--
      
      // ---------------------------------------------------------------

      en: "EN",
      ko: "한국어",
      zh: "中文"
    }
  },

  zh: {
    translation: {
      // |||||||||||||||||||| SECTIONS ||||||||||||||||||||
      // init
      //Home page
      everipedia: "Everipedia",
      iq_description:
        "Everipedia is the world’s largest crypto knowledge base",
      hero_title: "An Ecosystem of Knowledge on the Blockchain.",
      exploreHeroBttn: "Explore", 
      createHeroBttn: "Create", 
      learnMoreHeroBttn: "Learn more about Everipedia",
      trendingWIkis: "Trending Wikis", 
      browseCategory: "Browse by category", 
      updatesFooterHeading: "Get updated with Everipedia", 
      updatesFooterText: "Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating Everipedia.", 
      subScribeFooterBttn: "Subscribe now",
      communityFooterHeading: "Community Hub", 
      visionFooterText: "Everipedia's vision is to bring blockchain knowledge to the world and knowledge onto the blockchain.",
      whatIQ: "What's IQ?", 
      iq: "IQ", 
      bridges: "Bridges",
      staking: "Staking",
      bonds: "Bonds",
      aboutUs: "About us", 
      careers: "Careers", 
      brainies: "brainies",
      resources: "Resources",
      help: "help",
      blog: "blog", 
      faq: "faq", 
      policies: "Policies", 
      guideLines: "Guidelines", 
      privacyPolicy: "Privacy Policy", 
      termsOfService: "Terms of service",
      copyRight: "© 2022 Everipedia. All rights reserved",

      //Desktop Nav 
      Explore: "Explore",
      Activity: "Activity",
      Resources: "Resources",
      Aboutus: "About us", 
      CreateWiki: "Create Wiki",
      HelpCenter: "Help Center",
      //Category page
      wikiCategory: "Wiki Categories", 
      trendingCategory: "Trending Wiki Categories",

      //Create wiki page
      wikiTitlePlaceholder: "Title goes here",
      wikiSummaryLabel: "Wiki Summary",
      wikiSummaryPlaceholder: "Summary of wiki",
      dragMainImgLabel: "Drag and drop a main image, or click to select",
      pasteMainImgLabel: "(or) paste image link here",
      pageTypeLabel: "Page Type", 
      categoryTypeLabel: "Category", 
      twitterProfileLabel: "Twitter profile",

      //About page 
      aboutHeroHeading: "Bringing knowledge to the blockchain.", 
      aboutHeroPhrase: "Everipedia's mission is to bring the world's knowledge on-chain through the IQ token.",
      aboutSignUpBttn: "Sign Up", 
      aboutgoTo: "Go to IQ Site",
      aboutFeatHeading: "Taking the Online Encyclopedia into the Modern Age", 
      aboutFeatContent: "Everipedia uses blockchain technology to help us fulfill our vision for a world where all knowledge is available to all people - a world in which everyone, everywhere can participate in sharing what they know and providing value to others.", 
      abtFeatOneHeading: "Modern Design and Features", 
      abtFeatOneContent: "Everipedia’s design and features have been built for the modern age.", 
      abtFeatTwoHeading: "More Articles and Content", 
      abtFeatTwoContent: "Everipedia allows you to create an article about anything as long as you have a citation. This allows for a much broader scope of content in the knowledge base.",
      abtFeatThreeHeading: "Democratic Governance", 
      abtFeatThreeContent: "Anyone with IQ Tokens is a stakeholder in the Everipedia Network. Using IQ tokens to vote, users decide which new articles and edits are added to the knowledge base.",
      aboutTestimonialHeading: " An open community bringing blockchain knowledge to the world", 
      aboutTestimonialContent: "Everipedia's vibrant community is open and welcoming to everyone. We're already the world's largest blockchain encyclopedia, but we're far from complete. Join us today.", 
      aboutTestimonialOneContent: "Thanks to new technology, it is now possible for Everipedia to move beyond Wikipedia just like how we moved beyond Britannica almost two decades ago.", 
      aboutTestimonialOneAuthor: "Larry Sanger", 
      aboutTestimonialOneDesig: "Co-Founder Wikipedia",  
      aboutTestimonialOneLocation: "Columbus, Ohio",
      aboutTestimonialTwoContent: "As an editor, the killer feature of Everipedia is that as long as you use sources and a neutral wording, you can write an article about anything you want. A dapp you like, yourself — anything.", 
      aboutTestimonialTwoAuthor: "Wilfra", 
      aboutTestimonialTwoDesig: "Marketcap.one",  
      aboutTestimonialThreeContent: "I love Everipedia because everyone benefits, particularly the contributors. As an IQ token holder, I have an incentive to participate in the network.", 
      aboutTestimonialThreeAuthor: "Samuel Joseph", 
      aboutTestimonialThreeDesig: "Editor", 
      aboutTestimonialThreeLocation: "Lagos, Nigeria",
      meetTeamHead: "Meet our team", 
      meetTeamContent: "Our mission to build the world’s greatest encyclopedia requires a skilled executive team that embraces grand challenges. At Everipedia, we are fortunate to have people with deep experience and knowledge in both the education and blockchain industry.",
      latestFromBlogHeading: "Latest from our blog",

      //Profile page 
      selectAllItems: "All items", 
      selectRecentListed: "Recently Listed", 
      selectRecentCreated: "Recently Created", 
      selectRecentSold: "Recently Sold", 
      selectRecentReceived: "Recendtly Received", 
      selectEndingSoon: "Ending Soon", 
      selectPriceLowtoHigh: "Price: Low to High", 
      selectPriceHighttoLow: "Price: High to Low", 
      selectHightLost: "Highest Lost Sale", 
      selectMostView: "Most Viewed",
      selectMostFav: "Most Favorited", 
      selectOldest: "Oldest", 
      selectSingleItem: "Single items", 
      selectBundles: "Bundles", 
      shareBttnText: "Share", 
      settingBttnText: "Settings",  

      //Category page: 
      wikiInCategory: "Wikis in thiss category",

      //Global text 
      seenItAll: "Yay! You have seen it all 🥳 ", 
      //---End of Copies for Everipedia--
      
      // ---------------------------------------------------------------

      en: "EN",
      ko: "한국어",
      zh: "中文"
    }
  }
};

const languageDetector = new LanguageDetector(null, {
  order: ["querystring", "localStorage", "navigator"],
  lookupLocalStorage: "storeLang",
  caches: ["localStorage"]
});

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    keySeparator: false,
    interpolation: {
      escapeValue: false
    },
    supportedLngs: ["en", "ko", "zh"]
  });

export default i18n;