export interface User {
  name: string
  email: string
  hasSentEmail: boolean
  avatarUrl: string
  wantReceiveEmail: boolean
  participatingAt: Array<string>
  ownPools: Array<string>
  myInvitationId: string
  guess: Array<string>
  uid: string
  phoneNumber: string
  invitation: string | null
  myInvitationId: string
  firstName: string
  lastName: string
}
