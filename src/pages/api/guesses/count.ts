import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../services/firebaseAdmin'
import { withSentry } from '@sentry/nextjs'

type Data = {
  count?: number
  error?: string
}

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    try {
      const collectionRef = db.collection('Guess')
      const snapshot = await collectionRef.count().get()
      const count = snapshot.data().count
      res.status(200).json({ count })
    } catch (e) {
      res.status(400).json({ error: (e as Error).message })
    }
  } else {
    res.status(405).end('Method Not Allowed')
  }
}

export default withSentry(handler)
