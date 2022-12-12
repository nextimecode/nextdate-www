import { Bet } from './Bet'
import { League } from './League'

export interface User {
  bets?: Array<Bet>
  email?: string | null
  friends?: Array<string>
  guests?: Array<string>
  image?: string
  displayName?: string | null
  lastScore?: number | undefined
  leagues?: Array<League>
  myInvitationId?: string
  name?: string
  position?: number | undefined
  scores?: Array
  totalScore?: number | undefined
  uid?: string
  updatePhoneNumber?: string
  wantReceiveEmail?: boolean
  metadata?: UserMetadata
  firstName?: string
  lastName?: string
  hasSentEmail?: boolean
}
