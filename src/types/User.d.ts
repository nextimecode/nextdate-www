export interface User {
  email: string | null
  friends: Array<string>
  guests: Array<string>
  photoURL: string | null
  displayName: string | null
  myInvitationId: string
  uid: string
  phoneNumber: string
  wantReceiveEmail: boolean
  metadata: UserMetadata
  hasSentEmail: boolean
  invitation: string | null
  emailVerified: boolean
}
