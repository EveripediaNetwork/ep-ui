import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

export const resources = {
  en: {
    translation: {
      // |||||||||||||||||||| SECTIONS ||||||||||||||||||||
      // init
      iq_description:
        "The 🧠 IQ token is a multichain token that powers the Everipedia ecosystem of dapps and features! Read the",
      hero_title: "An Ecosystem of Knowledge on the Blockchain.",
      docs: "docs",
      for_technical_specs: "for the technical specs.",
      bridge: "Bridge",
      bridge_desc:
        "your token from all chains IQ circulates on, using our bridge UI. IQ is multichain.",
      iq_defi_token: "IQ is a DeFi token that can be",
      staked_for_hiiq: "staked for hiIQ",
      to_earn:
        " to earn rewards+yield. NFT giveaways to hiIQ stakers and new features soon.",
      check_the: "Check the ",
      stats_desc:
        "page for a comprehensive, global look at IQ holders, market capitalization, and more.",
      other_feats: "Other features such as ",
      new_feats_soon: " for new staking features coming soon!",
      add_token: "Add token to metamask",
      // EOS → pIQ
      swap: "Swap",
      login_info_eos: "Login on EOS Wallet to bridge your tokens",
      // pIQ → IQ
      swap_to_iq_erc20: "Swap to IQ ERC20",
      // ETH → EOS
      your_eos_address: "Your EOS Account",
      eos_account: "EOS account",
      swap_iq_to_eos: "Swap IQ to EOS",
      transactions_broadcasted: "Transactions broadcasted",
      // lock
      lock: "Lock",
      lock_description:
        "The longer you lock your IQ, the more hiIQ you will receive. hiIQ decays slowly over your locking period, eventually reaching 1-to-1 with IQ.",
      withdraw: "Withdraw",
      expired_tokens: " expired tokens",
      expired: "Expired",
      expiring_on: "Expiring on",
      login_info_eth_locking: "Login on ETH Wallet to lock your tokens",
      locked_for_4_years: "locked for 4 years",
      locked_for_3_years: "locked for 3 years",
      locked_for_2_years: "locked for 2 years",
      locked_for_1_year: "locked for 1 year",
      increase_amount: "Increase amount",
      increase_lock_time: "Increase lock time",
      withdraw_your_iq_tokens_first: "Withdraw your IQ tokens first",
      // ## lockHeader
      updating_balance: "Updating balance...",
      no_hiiq_tokens_locked: "No hiIQ tokens locked so far",
      loading: "Loading",
      disconnected: "Disconnected",
      you_have_locked: "You have locked: ",
      // ## lockPeriod
      lock_period: "Lock period (weeks)",
      value_restriction: "You can increase the lock time for a maximum of",
      weeks: " weeks",
      // ## lock stats
      claim: "Claim Rewards",
      checkpoint: "Checkpoint",
      loading_rewards: "Loading rewards...",
      retrieving_in: "Retrieving in: ",
      needed_to_keep_track:
        "Needed to keep track of the HIIQ supply within our rewards system",
      login_to_see_more_stats: "Login to see more stats",
      login: "Login",
      // voting
      voting: "Voting",
      select_a_proposal: "Select a proposal",
      select_proposal_to_see_details: "Select a proposal to see details",
      vote: "Vote",
      voting_ended: "Voting ended",
      no_votes_so_far: "No votes so far",
      // ## votingChart
      loadingVotes: "Loading Votes",
      // stats
      holders: "Holders",
      volume: "volume",
      total: "total",
      apps: "apps",
      prediqt_markets: "PredIQt markets",
      everipedia_articles: "Everipedia articles",
      everipedia_onchain_edits: "Everipedia Onchain Edits",
      everipedia_page_views: "Everipedia Page Views",
      liquidity: "liquidity",
      social: "Social",
      twitter_follower: "Twitter followers",
      circulating_supply: "Circulating supply",
      // error
      error: "Error",
      // ---------------------------------------------------------------

      // |||||||||||||||||||| COMMON ||||||||||||||||||||
      your_eth_address: "Your Ethereum Address",
      from: "from",
      tx_executed: "Tx executed",
      login_info_eth: "Login on ETH Wallet to swap your tokens",
      // ---------------------------------------------------------------

      // |||||||||||||||||||| COMPONENTS ||||||||||||||||||||
      // acountDetailsDialog
      copied_to_clipboard: "Copied to clipboard!",
      copy_address: "Copy Address",
      view_on_block_explorer: "View on Block Explorer",
      last_transactions: "Last transactions",
      transactions_will_appear_here: "Transactions will appear here...",
      // ethereumWalletModal
      select_wallet: "Select a wallet",
      // infoSwapCard
      time_locked: "Time Locked (days)",
      new_hiiq_balance: "New hiIQ",
      // proposalsModal
      details: "Details",
      current_proposals: "Current Proposals",
      // rewardsCalculatorDialog
      supply: "Supply",
      you_will_get: "You will get",
      percentage_yield: "Yield across lock period",
      rewards_calculator: "Rewards Calculator",
      with_1m_lock: "With a lock of 1M IQ",
      with_4year_lock: "Yield Earned Over 4 Years",
      years: "Years",
      stats: "Stats",
      locked_iq: "Locked IQ",
      // proposalDetails
      close_details: "Close details",
      open_details: "Open details",
      started: "Started",
      at: "At",
      ending: "Ending",
      ended: "Ended",
      select_for_voting: "Select for voting",
      selected: "Selected",
      see_on_snapshot: "Go to proposals",
      // voteBreakdown
      votes_breakdown: "Votes Breakdown",
      // swapContainer
      balance: "balance",
      // txSuccessAlert
      transaction_executed: "Transaction Executed",
      go_to: "Go to",
      step_2: "Step 2",
      // wrongChainModal
      wrong_chain_modal_title: "Wrong Network",
      wrong_chain_modal_body:
        "Please connect to the appropiate Ethereum Network",
      // layout
      logout: "Logout",
      eos_wallet: "EOS Wallet",
      ethereum_wallet: "Ethereum Wallet",
      rewards: "Rewards",
      // languageSeletcor
      language: "Language",
      select_a_language: "Select a Language",
      done: "Done",
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
      iq_description:
        "🧠IQ토큰은 dapp 및 기능과 에브리피디아의 생태계를 지원하는 멀티체인 토큰입니다!",
      docs: "문서",
      hero_title: "멀티체인 토큰입니다",
      for_technical_specs: "기술 사양.",
      bridge: "브릿지",
      bridge_desc:
        "당신의 토큰들은 IQ의 토큰은 브리지 UI를 사용하여 순환합니다. IQ토큰은 멀티체인입니다.",
      iq_defi_token: "IQ토큰 DeFi 토큰입니다.",
      staked_for_hiiq: "hiIQ을 위해 스테이킹",
      to_earn:
        " 보상 + 이자를 얻으려면. hiIQ 스테이커들을 위해 새로운 기능과 NFT 경품이 곧 출시됩니다.",
      check_the: "확인해주세요 ",
      stats_desc:
        "IQ토큰 보유자수, 시가 총액, 글로벌한 IQ홀더들 정보와 다른 통계를 보시려면 해당 페이지를 참조하십시오.",
      other_feats: "다른 기능 ",
      new_feats_soon: " 새로운 스테이킹 기능이 곧 제공될 예정입니다!",
      add_token: "Add token to metamask",
      // EOS → pIQ
      swap: "스왑",
      login_info_eos: "이오스 지갑에 로그인하여 토큰을 브리지합니다.",
      // pIQ → IQ
      swap_to_iq_erc20: "IQ ERC20으로 스왑",
      // ETH → EOS
      your_eos_address: "귀하의 EOS 주소",
      eos_account: "EOS 계정",
      swap_iq_to_eos: "IQ를 EOS로 스왑",
      transactions_broadcasted: "브로드캐스트된 트랜잭션",
      // lock
      lock: "락업",
      lock_description:
        "IQ를 오래 잠글수록 더 많은 hiIQ를 받게됩니다. hiIQ는 잠금 기간 동안 천천히 감소하여 결국 IQ와 1 : 1에 도달합니다.",
      withdraw: "Withdraw",
      expired_tokens: " 만료된 토큰",
      expired: "만료",
      expiring_on: "만료일",
      login_info_eth_locking: "토큰을 잠 그려면 ETH 지갑에 로그인하세요.",
      locked_for_4_years: "4년 동안 락업",
      locked_for_3_years: "3년 동안 락업",
      locked_for_2_years: "2년 동안 락업",
      locked_for_1_year: "1년 동안 락업",
      increase_amount: "수량 추가",
      increase_lock_time: "락업 시간 추가",
      withdraw_your_iq_tokens_first: "먼저 IQ토큰을 인출하십시오",
      // ## lockHeader
      updating_balance: "잔액 업데이트 중 ...",
      no_hiiq_tokens_locked: "지금까지 잠긴 hiIQ 토큰이 없습니다.",
      loading: "로딩 중",
      disconnected: "연결 끊김",
      you_have_locked: "락업한 수량: ",
      // ## lockPeriod
      lock_period: "락업 기간 (주간)",
      value_restriction: "최대 늘릴 수 있는 락업 기간",
      weeks: " 주",
      // ## lock stats
      claim: "보상 클레임",
      checkpoint: "체크포인트",
      loading_rewards: "보상 로딩중...",
      retrieving_in: "회수: ",
      needed_to_keep_track:
        "보상 시스템 내에서 HIIQ 공급을 추적하는 데 필요합니다",
      login_to_see_more_stats: "더 많은 통계를 보려면 로그인하세요.",
      login: "로그인",
      // voting
      voting: "투표",
      select_a_proposal: "제안 선택",
      select_proposal_to_see_details: "세부 정보를 보려면 제안을 선택하세요.",
      vote: "투표",
      voting_ended: "투표 종료",
      no_votes_so_far: "지금까지 투표가 없습니다.",
      // ## votingChart
      loadingVotes: "투표 로딩중",
      // stats
      holders: "홀더들",
      volume: "볼륨",
      total: "총",
      apps: "앱",
      prediqt_markets: "PredIQt 예측시장 개수",
      everipedia_articles: "에브리피디아 위키 페이지 개수",
      everipedia_onchain_edits: "에브리피디아 온체인 편집수",
      everipedia_page_views: "에브리피디아 페이지 조회수",
      liquidity: "유동성",
      social: "SNS",
      twitter_follower: "트위터 팔로워수",
      circulating_supply: "유통 공급량",
      // error
      error: "오류",
      // ---------------------------------------------------------------

      // |||||||||||||||||||| COMMON ||||||||||||||||||||
      your_eth_address: "귀하의 이더 리움 주소",
      from: "부터",
      tx_executed: "트랜잭션 실행",
      login_info_eth: "ETH 지갑에 로그인하여 토큰 교환",
      // ---------------------------------------------------------------

      // |||||||||||||||||||| COMPONENTS ||||||||||||||||||||
      // acountDetailsDialog
      copied_to_clipboard: "클립보드에 복사완료!",
      copy_address: "주소 복사",
      view_on_block_explorer: "블록익스플로러에서 보기",
      last_transactions: "최근 트랜잭션 목록",
      transactions_will_appear_here: "트랜잭션은 여기에 표시됩니다...",
      // ethereumWalletModal
      select_wallet: "지갑 선택",
      // infoSwapCard
      time_locked: "잠긴 시간 (일)",
      new_hiiq_balance: "새로운 hiIQ",
      // proposalsModal
      details: "세부 정보",
      current_proposals: "현재 제안",
      // rewardsCalculatorDialog
      supply: "공급",
      you_will_get: "얻게 됩니다",
      percentage_yield: "% yield across lock period",
      rewards_calculator: "보상 계산기",
      with_1m_lock: "With a lock of 1M IQ",
      with_4year_lock: "Yield Earned Over 4 Years",
      years: "년",
      stats: "통계",
      locked_iq: "락업된 IQ",
      // proposalDetails
      close_details: "세부 정보 닫기",
      open_details: "세부 정보 열기",
      started: "투표 시작 날짜",
      at: "시간",
      ending: "투표 마감 날짜",
      ended: "투표 마감",
      select_for_voting: "투표를 위해 선택",
      selected: "선택 완료",
      see_on_snapshot: "제안 보기",
      // voteBreakdown
      votes_breakdown: "투표 내역",
      // swapContainer
      balance: "밸런스",
      // txSuccessAlert
      transaction_executed: "거래 실행",
      go_to: "이동",
      step_2: "2 단계",
      // wrongChainModal
      wrong_chain_modal_title: "잘못된 네트워크",
      wrong_chain_modal_body: "적절한 이더 리움 네트워크에 연결하십시오",
      // layout
      logout: "로그 아웃",
      eos_wallet: "EOS 지갑",
      ethereum_wallet: "이더 리움 지갑",
      rewards: "보상",
      // languageSelector
      language: "언어",
      select_a_language: "언어 선택",
      done: "끝난",
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
      iq_description:
        "🧠IQ代币是一种多链代币，驱动Everipedia的dapps生态和特色！阅读",
      docs: "文档",
      for_technical_specs: "以了解技术规格.",
      bridge: "桥接",
      bridge_desc:
        "您的代币，通过我们的桥接页面从所有支持IQ流通的区块链进行桥接。IQ是多链架构。",
      iq_defi_token: "IQ是一个DeFi代币，可以",
      staked_for_hiiq: "质押为 hiIQ",
      to_earn:
        " 以赚取奖励和收益耕种。很快将会给HiIQ质押者发放NFT和上线新功能。",
      check_the: "查看 ",
      stats_desc: "统计页面，全面了解，全球IQ持有者，市值以及更多信息。",
      other_feats: "其他功能，例如 ",
      new_feats_soon: " 新质押功能很快即将上线！",
      add_token: "Add token to metamask",
      // EOS → pIQ
      swap: "交换",
      login_info_eos: "登录 EOS 钱包以桥接您的代币",
      // pIQ → IQ
      swap_to_iq_erc20: "交易IQ至ERC20",
      // ETH → EOS
      your_eos_address: "您的 EOS 账户",
      eos_account: "EOS账户",
      swap_iq_to_eos: "交易IQ至EOS",
      transactions_broadcasted: "交易已广播",
      // lock
      lock: "锁",
      lock_description:
        "锁定 IQ 的时间越长，您获得的 hiIQ 就越多。hiIQ 在锁定期间缓慢衰减，最终与 IQ 达到 1 比 1。",
      withdraw: "Withdraw",
      expired_tokens: " 过期的代币",
      expired: "过期",
      expiring_on: "到期日",
      login_info_eth_locking: "登录 ETH 钱包以锁定您的代币",
      locked_for_4_years: "锁定 4 年",
      locked_for_3_years: "锁定 3 年",
      locked_for_2_years: "锁定 2 年",
      locked_for_1_year: "锁定 1 年",
      increase_amount: "增加数量",
      increase_lock_time: "增加锁定时间",
      withdraw_your_iq_tokens_first: "先取回您的IQ代币",
      // ## lockHeader
      updating_balance: "正在更新余额...",
      no_hiiq_tokens_locked: "到目前为止还没有锁定 hiIQ 代币",
      loading: "加载中",
      disconnected: "Disconnected",
      you_have_locked: "您已经锁定：",
      // ## lockPeriod
      lock_period: "锁定时间 (周)",
      value_restriction: "您可以增加的最大的锁定时间",
      weeks: " 周",
      // ## lock stats
      claim: "申领奖励",
      checkpoint: "检查点",
      loading_rewards: "加载奖励...",
      retrieving_in: "检索中:",
      needed_to_keep_track: "需要在我们的奖励系统中跟踪HIIQ的供应",
      login_to_see_more_stats: "登录查看更多数据",
      login: "登录",
      // voting
      voting: "投票",
      select_a_proposal: "选择一个提案",
      select_proposal_to_see_details: "选择一个提案以了解详情",
      vote: "投票",
      voting_ended: "投票结束",
      no_votes_so_far: "暂无投票",
      // ## votingChart
      loadingVotes: "加载投票",
      // stats
      holders: "持有者",
      volume: "总量",
      total: "总计",
      apps: "应用",
      prediqt_markets: "PredIQt 市场",
      everipedia_articles: "Everipedia 文章",
      everipedia_onchain_edits: "Everipedia 链上编辑",
      everipedia_page_views: "Everipedia 页面浏览量",
      liquidity: "流动性",
      social: "社交媒体",
      twitter_follower: "社交媒体",
      circulating_supply: "流通供应",
      // error
      error: "错误",
      // ---------------------------------------------------------------

      // |||||||||||||||||||| COMMON ||||||||||||||||||||
      your_eth_address: "你的以太坊地址",
      from: "从",
      tx_executed: "Tx 已执行",
      login_info_eth: "登录 ETH 钱包以交换您的代币",
      // ---------------------------------------------------------------

      // |||||||||||||||||||| COMPONENTS ||||||||||||||||||||
      // acountDetailsDialog
      copied_to_clipboard: "复制到剪贴板!",
      copy_address: "复制地址",
      view_on_block_explorer: "在区块浏览器上查看",
      last_transactions: "上一笔交易",
      transactions_will_appear_here: "交易将出现在这里...",
      // ethereumWalletModal
      select_wallet: "选择钱包",
      // infoSwapCard
      time_locked: "锁定时间（天）",
      new_hiiq_balance: "新高智商",
      // proposalsModal
      details: "详情",
      current_proposals: "当前提案",
      // rewardsCalculatorDialog
      supply: "供应",
      you_will_get: "您将获得",
      percentage_yield: "% yield across lock period",
      rewards_calculator: "奖励计算器",
      with_1m_lock: "With a lock of 1M IQ",
      with_4year_lock: "Yield Earned Over 4 Years",
      years: "年",
      stats: "统计数据",
      locked_iq: "锁定的 IQ",
      // proposalDetails
      close_details: "关闭详情",
      open_details: "打开详情",
      started: "开始",
      at: "时间",
      ending: "结束中",
      ended: "已结束",
      select_for_voting: "选择投票",
      selected: "已选",
      see_on_snapshot: "前往提案",
      // voteBreakdown
      votes_breakdown: "投票明细",
      // swapContainer
      balance: "余额",
      // txSuccessAlert
      transaction_executed: "交易执行",
      go_to: "去",
      step_2: "第2步",
      // wrongChainModal
      wrong_chain_modal_title: "错误的网络",
      wrong_chain_modal_body: "请连接到合适的以太坊网络",
      // layout
      logout: "登出",
      eos_wallet: "EOS钱包",
      ethereum_wallet: "以太坊钱包",
      rewards: "Rewards",
      // languageSelector
      language: "语",
      select_a_language: "选择语言",
      done: "完毕",
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