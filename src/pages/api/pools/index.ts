import type { NextApiRequest, NextApiResponse } from 'next'
import { db, admin } from '../../../services/firebaseAdmin'
import { withSentry } from '@sentry/nextjs'
import { z } from 'zod'
import { Pool } from '../../../types/Pool'
import { User } from '../../../types/User'

type Data = {
  error?: string
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | Data | admin.firestore.DocumentData | undefined>
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
        if (req.method === 'POST') {
          try {
            const createPoolBody = z.object({
              title: z.string()
            })
            const { title } = createPoolBody.parse(req.body)
            const newPool = {
              createdAt: new Date(),
              ownerName: `${userData?.firstName} ${userData?.lastName}`,
              title,
              participants: [uid]
            } as Pool
            const responseAddPool = await db.collection('Pool').add(newPool)

            const poolRef = db.collection('Pool').doc(responseAddPool.id)
            let participatingAt
            if (userData && !userData.participatingAt) {
              participatingAt = []
            }
            if (userData && userData.participatingAt) {
              participatingAt = userData.participatingAt
            }
            participatingAt.push(responseAddPool.id)
            const updateUser = {
              participatingAt
            }
            await userRef.update(updateUser)
            await poolRef.update({ id: responseAddPool.id })
            res.status(200).json({ userData, newPool })
          } catch (e: any) {
            res.status(400).json({ error: e.issues[0].message })
          }
        } else {
          if (req.method === 'GET') {
            const pools = userData?.participatingAt
            const entriesPools = await db.collection('Pool').get()
            const entriesDataPools = entriesPools.docs.map(entry => entry.data())
            const listOfPool = pools.map(
              (pool: any) => entriesDataPools.filter(item => item.id === pool)[0]
            )
            res.status(200).json(listOfPool)
          } else {
            res.status(405).json({ error: 'Method Not Allowed' })
          }
        }
      })
      .catch(e => {
        res.status(400).json({ error: (e as Error).message })
      })
  } else {
    res.status(401).end('Unauthorized')
  }
}

export default withSentry(handler)
