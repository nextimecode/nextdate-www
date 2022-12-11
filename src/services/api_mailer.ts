import axios from 'axios'
import axiosRetry from 'axios-retry'

const apiMailer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAILER_LITE_API_URL,
  headers: { Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_MAILER_LITE_API_KEY }
})

const retryDelay = (retryNumber = 0) => {
  const seconds = Math.pow(2, retryNumber) * 1000
  const randomMs = 1000 * Math.random()
  return seconds + randomMs
}

axiosRetry(apiMailer, {
  retries: 5,
  retryDelay,
  retryCondition: axiosRetry.isRetryableError
})

export default apiMailer
