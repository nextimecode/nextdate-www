import type { NextApiRequest, NextApiResponse } from 'next'
import apiMailer from '../../../services/api_mailer'
import * as Sentry from '@sentry/nextjs'

type Data = {
  error?: string
}

export default async function addSubscriber(req: NextApiRequest, res: NextApiResponse<Data | any>) {
  if (req.method === 'POST') {
    try {
      const { data } = await apiMailer.post('/subscribers', req.body)
      res.status(200).json(data)
    } catch (e) {
      Sentry.captureException(e)
      res.status(400).json({ error: (e as Error).message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
