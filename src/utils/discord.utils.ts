import { env } from '@/env.mjs'

export const sendDiscordMessage = async (feedback: string) => {
  const webHookURL = `https://discord.com/api/webhooks/${env.NEXT_PUBLIC_DISCORD_WEBHOOK_ID}/${env.NEXT_PUBLIC_DISCORD_WEBHOOK_TOKEN}`
  await fetch(webHookURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'IQ.Wiki Feedback',
      content: `Feedback: ${feedback}`,
    }),
  })
    .then((res) => {
      if (res.ok) {
        console.log('Message sent successfully to Discord channel.')
      } else {
        throw new Error('Failed to send message to Discord channel.')
      }
    })
    .catch((err) => console.error(err))
}
