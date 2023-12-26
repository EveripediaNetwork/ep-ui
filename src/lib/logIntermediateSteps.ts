import { IntermediateStep } from '@/hooks/useStream/schema'
import chalk from 'chalk'

const logIntermediateSteps = (intermediateSteps: IntermediateStep[]) => {
  intermediateSteps.forEach((step, i) => {
    console.log(chalk.bgMagenta(`${i + 1}) ${step.action.tool}`))
    console.log(chalk.blue('INPUT : '), JSON.stringify(step.action.toolInput))
    console.log(chalk.blue('OUTPUT: '), step.observation)
  })
}

export default logIntermediateSteps
