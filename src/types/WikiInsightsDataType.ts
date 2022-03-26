interface RequiredWikiInsights {
  title: string
  content: string
}

interface DefaultWikiInsights extends RequiredWikiInsights {
  type?: 'statistic' | 'url' | 'address' | 'explorers'
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
interface ExplorersWikiInsights extends Omit<DefaultWikiInsights, 'content'> {
  type: 'explorers'
  content: Array<string>
}

// ===========================
// WikiInsights data type union
// ===========================

export type WikiInsights =
  | StatisticWikiInsights
  | ExplorersWikiInsights
  | DefaultWikiInsights
