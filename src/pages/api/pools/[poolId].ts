import type { NextApiRequest, NextApiResponse } from 'next'
import { db, admin } from '../../../services/firebaseAdmin'
import { withSentry } from '@sentry/nextjs'

type Data = {
  error?: string
}

async function handler(req: NextApiRequest, res: NextApiResponse<Data | any>) {
  const { poolId } = req.query
  if (req.headers.authorization) {
    if (req.method === 'GET' && typeof poolId === 'string') {
      const accessToken = req.headers.authorization.replace('Bearer ', '')
      admin
        .auth()
        .verifyIdToken(accessToken)
        .then(async () => {
          const poolRef = db.collection('Pool').doc(poolId)
          const poolDoc = await poolRef.get()
          const poolData = poolDoc.data()
          if (poolData) {
            res.status(200).json(poolData)
          } else {
            res.status(404).json({ error: 'No matching pools.' })
          }
        })
        .catch(e => {
          res.status(400).json({ error: (e as Error).message })
        })
    } else {
      res.status(405).end('Method Not Allowed')
    }
  } else {
    res.status(401).end('Unauthorized')
  }
}

export default withSentry(handler)
