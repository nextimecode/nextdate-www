import type { NextApiRequest, NextApiResponse } from 'next'
import { db, admin } from '../../../services/firebaseAdmin'
import { withSentry } from '@sentry/nextjs'
import { User } from '../../../types/User'

type Data = {
  error?: string
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    User | Data | admin.firestore.WriteResult | Promise<admin.firestore.WriteResult>
  >
) {
  if (req.headers.authorization) {
    const accessToken = req.headers.authorization.replace('Bearer ', '')
    admin
      .auth()
      .verifyIdToken(accessToken)
      .then(async decodedToken => {
        const uid = decodedToken.uid
        const userRef = db.collection('User').doc(uid)
        const userDoc = await userRef.get()
        const userData = userDoc.data()
        if (req.method === 'GET') {
          res.status(200).json(userData as User)
        } else {
          if (req.method === 'POST') {
            const newUser = req.body
            try {
              const doc = await db.collection('User').doc(newUser.uid).set(newUser)
              res.status(200).json(doc)
            } catch (e) {
              res.status(400).json({ error: (e as Error).message })
            }
          } else {
            if (req.method === 'DELETE') {
              try {
                const doc = userRef.delete()
                res.status(200).json(doc)
              } catch (e) {
                res.status(400).json({ error: (e as Error).message })
              }
            } else {
              res.status(405).end('Method Not Allowed')
            }
          }
        }
      })
      .catch(error => {
        res.status(400).json({ error: (error as Error).message })
      })
  } else {
    res.status(401).end('Unauthorized')
  }
}

export default withSentry(handler)
