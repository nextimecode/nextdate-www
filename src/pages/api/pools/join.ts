import type { NextApiRequest, NextApiResponse } from 'next'
import { db, admin } from '../../../services/firebaseAdmin'
import { withSentry } from '@sentry/nextjs'

type Data = {
  error?: string
}

async function handler(req: NextApiRequest, res: NextApiResponse<Data | any>) {
  const { poolId } = req.body
  if (req.headers.authorization) {
    if (req.method === 'POST') {
      const accessToken = req.headers.authorization.replace('Bearer ', '')
      admin
        .auth()
        .verifyIdToken(accessToken)
        .then(async decodedToken => {
          const uid = decodedToken.uid
          const poolRef = db.collection('Pool').doc(poolId)
          const poolDoc = await poolRef.get()
          const poolData = poolDoc.data()
          if (poolData) {
            const filterPoolData = poolData.participants.filter(
              (item: { uid: string }) => item.uid === uid
            )
            if (filterPoolData?.length > 0) {
              res.status(400).json({ error: 'Your already joined this pool.' })
            } else {
              let participants
              if (poolData && !poolData.participants) {
                participants = []
              }
              if (poolData && poolData.participants) {
                participants = poolData.participants
              }
              participants.push(uid)
              const updatePool = {
                participants
              }
              await poolRef.update(updatePool)
              const userRef = db.collection('User').doc(uid)
              const userDoc = await userRef.get()
              const userData = userDoc.data()
              let participatingAt
              if (userData && !userData.participatingAt) {
                participatingAt = []
              }
              if (userData && userData.participatingAt) {
                participatingAt = userData.participatingAt
              }
              participatingAt.push(poolData.id)
              const updateUser = {
                participatingAt
              }
              await userRef.update(updateUser)
              res.status(201).end()
            }
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
