import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../services/firebaseAdmin'
import { withSentry } from '@sentry/nextjs'

import Cors from 'cors'

const cors = Cors({
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  origin: '*',
  optionsSuccessStatus: 200
})
// eslint-disable-next-line @typescript-eslint/ban-types
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

type Data = {
  count?: number
  error?: string
}

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  await runMiddleware(req, res, cors)
  if (req.method === 'GET') {
    try {
      const collectionRef = db.collection('Pool')
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
