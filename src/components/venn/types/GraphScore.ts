import type { Score } from "./Score"

export type GraphScore = {
  userId: string
  surveyId: string
  scores: Score[]
}