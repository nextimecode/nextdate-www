import admin from 'firebase-admin'
import * as Sentry from '@sentry/nextjs'

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    })
  } catch (e) {
    Sentry.captureException(e)
  }
}
const db = admin.firestore()
export { admin, db }
