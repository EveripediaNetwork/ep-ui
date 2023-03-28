import { GPT3_COST_PER_1K_TOKENS, GPT3_MAX_TRIES } from '@/data/Constants'
import { GPT3Completion } from '@/types/GPT3'

export const logExecutionSummary = (
  content: string,
  allGeneratedSummaries: string[],
  tries: number,
  completion: GPT3Completion,
) => {
  const summaryLengths = allGeneratedSummaries
    .map(c => {
      const l = c.length || 0
      return `${l}${l > 255 ? ' (x)' : ''}`
    })
    .join(' | ')
  const totalTokens = completion.data.usage?.total_tokens || 0

  const totalCost = (totalTokens * GPT3_COST_PER_1K_TOKENS) / 1000

  // eslint-disable-next-line no-console
  console.log(`
------------------------------
💨 Execution Summary:
------------------------------
📝 INPUT LENGTH: ${content.length}
📝 SUMMARY LENGTH: ${summaryLengths}  (should be 255 max)
🔄 TRIES: ${tries} / ${GPT3_MAX_TRIES}
🎟️ TOTAL TOKENS USED: ${totalTokens}
🏦 TOTAL COST: $${totalCost}
  `)
}
