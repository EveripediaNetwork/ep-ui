import { NextApiRequest, NextApiResponse } from 'next'

const wiki = {
  id: 'lorem-ipsum',
  content: {
    createdAt: Date.now(),
    title: 'Lorem Ipsum',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    categories: [{ id: 'first-category', title: 'First Category' }],
    tags: [{ id: 'hello' }, { id: 'world' }],
    images: [],
    metadata: [],
    user: {
      id: '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
    },
  },
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let response = {}
  if (req.body && req.body.query) {
    if (req.body.query.includes('GetWikis')) {
      response = { data: { wikis: [wiki] } }
    } else if (req.body.query.includes('GetWiki')) {
      response = { data: { wiki } }
    }
  }
  res.status(200).json(response)
}
