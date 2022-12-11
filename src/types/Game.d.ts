import { Guess } from './Guess'

type DateFirebase = {
  _seconds: number
  _nanoseconds: number
}
export interface Game {
  id: string
  date: DateFirebase
  firstTeamCountryCode: string
  guesses: Array<Guess>
  secondTeamCountryCode: string
  guess?: Guess
}
