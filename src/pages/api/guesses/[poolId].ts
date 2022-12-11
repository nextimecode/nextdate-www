import { Pool } from './../../../types/Pool'
import { Guess } from './../../../types/Guess'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db, admin } from '../../../services/firebaseAdmin'
import { withSentry } from '@sentry/nextjs'

type Data = {
  error?: string
}

async function createGuess(
  res: NextApiResponse<Data | any>,
  firstTeamPoints: number,
  gameId: string,
  userId: string,
  poolId: string,
  secondTeamPoints: number,
  gameData: admin.firestore.DocumentData | undefined,
  gameRef: admin.firestore.DocumentReference<admin.firestore.DocumentData>
) {
  const newGuess = {
    createdAt: new Date(),
    firstTeamPoints,
    gameId,
    userId,
    poolId,
    secondTeamPoints
  } as Guess
  const responseAddGuess = await db.collection('Guess').add(newGuess)
  const guessRef = db.collection('Guess').doc(responseAddGuess.id)
  await guessRef.update({ id: responseAddGuess.id })
  let guesses
  if (gameData) {
    if (!gameData.guesses) {
      guesses = []
    } else {
      guesses = gameData.guesses
    }
  }
  guesses.push(responseAddGuess.id)
  await gameRef.update({ guesses })
}

async function handler(req: NextApiRequest, res: NextApiResponse<Data | any>) {
  const { poolId } = req.query
  const { gameId, firstTeamPoints, secondTeamPoints } = req.body
  if (req.headers.authorization) {
    if (req.method === 'POST') {
      if (typeof poolId === 'string') {
        const accessToken = req.headers.authorization.replace('Bearer ', '')
        try {
          const { uid } = await admin.auth().verifyIdToken(accessToken)
          const poolRef = db.collection('Pool').doc(poolId)
          const doc = await poolRef.get()
          if (!doc.exists) {
            res.status(404).end({ error: 'No such pool!' })
          } else {
            const hasParticipant = (doc.data() as Pool).participants.find(
              (pool: string) => pool === uid
            )
            if (!hasParticipant) {
              res
                .status(400)
                .json({ message: "You're not allowed to create a guess inside this pool!" })
            }
            const entriesGuess = await db.collection('Guess').get()
            const entriesDataGuess = entriesGuess.docs.find(
              entry =>
                entry.data().userId === uid &&
                entry.data().gameId === gameId &&
                entry.data().poolId === poolId
            )
            if (entriesDataGuess) {
              res.status(400).json({ message: 'You already created a guess in this game!' })
            } else {
              const gameRef = db.collection('Game').doc(gameId)
              const gameDoc = await gameRef.get()
              const gameData = gameDoc.data()
              if (gameData && new Date(gameData.date._seconds * 1000) < new Date()) {
                res.status(400).json({ message: 'You cannot send guesses after the game date' })
              } else {
                createGuess(
                  res,
                  firstTeamPoints,
                  gameId,
                  uid,
                  poolId,
                  secondTeamPoints,
                  gameData,
                  gameRef
                )
                res.status(200).json({ firstTeamPoints, gameId, uid, poolId, secondTeamPoints })
              }
            }
          }
        } catch (e) {
          res.status(400).json({ error: (e as Error).message })
        }
      } else {
        res.status(405).end('Required body parameters')
      }
    } else {
      res.status(405).end('Method Not Allowed')
    }
  } else {
    res.status(401).end('Unauthorized')
  }
}

export default withSentry(handler)
