import type { NextApiRequest, NextApiResponse } from 'next'
import { db, admin } from '../../../../services/firebaseAdmin'
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
        .then(async decodedToken => {
          const uid = decodedToken.uid
          const gameRef = db.collection('Game')
          const snapshotPool = await gameRef.orderBy('date').get()
          const guessRef = db.collection('Guess')
          const snapshotGuess = await guessRef.get()
          const games = snapshotPool.docs.map(game => {
            const guesses = snapshotGuess.docs
              .map(guess => guess.data())
              .filter(
                guess => guess.userId === uid && guess.poolId === poolId && guess.gameId === game.id
              )
            if (guesses.length > 0) {
              return {
                ...game.data(),
                guesses: undefined,
                guess: guesses[0]
              }
            } else {
              return {
                ...game.data(),
                guesses: undefined,
                guess: null
              }
            }
          })
          if (games) {
            res.status(200).json(games)
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
