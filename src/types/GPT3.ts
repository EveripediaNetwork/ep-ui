export type GPT3Completion = {
  data: {
    choices: {
      text: string
    }[]
    usage: {
      total_tokens: number
    }
  }
}
