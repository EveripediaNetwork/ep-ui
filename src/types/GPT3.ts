export type GPT3Completion = {
  data: {
    choices: {
      message: {
        content: string
      }
    }[]
    usage: {
      total_tokens: number
    }
  }
}
