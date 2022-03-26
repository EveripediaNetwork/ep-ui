interface RequiredWikiInsights {
  title: string
  content: string
}

interface DefaultWikiInsights extends RequiredWikiInsights {
  type?: 'statistic' | 'url' | 'address'
  titleTag?: string
  change?: string
  changeDirection?: 'increase' | 'decrease'
}
// ===========================
// Specific wikiInsights types
// ===========================

interface StatisticWikiInsights extends DefaultWikiInsights {
  type: 'statistic'
  change: string
  changeDirection: 'increase' | 'decrease'
}

// ===========================
// WikiInsights data type union
// ===========================

export type WikiInsights = StatisticWikiInsights | DefaultWikiInsights
