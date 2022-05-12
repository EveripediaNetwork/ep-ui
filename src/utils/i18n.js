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
      everipedia: "",
      iq_description:
        "",
      hero_title: "",
      exploreHeroBttn: "", 
      createHeroBttn: "", 
      learnMoreHeroBttn: "",
      trendingWIkis: "", 
      browseCategory: "", 
      updatesFooterHeading: "", 
      updatesFooterText: "", 
      subScribeFooterBttn: "",
      communityFooterHeading: "", 
      visionFooterText: "",
      whatIQ: "", 
      iq: "", 
      bridges: "",
      staking: "",
      bonds: "",
      aboutUs: "", 
      careers: "", 
      brainies: "",
      resources: "",
      help: "",
      blog: "", 
      faq: "", 
      policies: "", 
      guideLines: "", 
      privacyPolicy: "", 
      termsOfService: "",
      copyRight: "",


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
      everipedia: "",
      iq_description:
        "",
      hero_title: "",
      exploreHeroBttn: "", 
      createHeroBttn: "", 
      learnMoreHeroBttn: "",
      trendingWIkis: "", 
      browseCategory: "", 
      updatesFooterHeading: "", 
      updatesFooterText: "", 
      subScribeFooterBttn: "",
      communityFooterHeading: "", 
      visionFooterText: "",
      whatIQ: "", 
      iq: "", 
      bridges: "",
      staking: "",
      bonds: "",
      aboutUs: "", 
      careers: "", 
      brainies: "",
      resources: "",
      help: "",
      blog: "", 
      faq: "", 
      policies: "", 
      guideLines: "", 
      privacyPolicy: "", 
      termsOfService: "",
      copyRight: "",


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