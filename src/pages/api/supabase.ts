import { createClient } from '@supabase/supabase-js'
import { NextApiRequest, NextApiResponse } from 'next'

const supabase = createClient(
  String(process.env.SUPABASE_URL),
  String(process.env.SUPABASE_ANON_KEY),
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let result
  if (req) {
    result = await supabase.from('wiki_embedding').insert({
      embedding: req.body.embed,
    })
  }
  res.json({ message: result })
}
