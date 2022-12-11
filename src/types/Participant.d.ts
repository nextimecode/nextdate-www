import { Guess } from './Guess'
export interface Participant {
  id: string
  userId: string
  poolId: string
  guesses: Array<Guess>
}
