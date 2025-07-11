import type { UnderstandingStatus } from "./UnderstandingStatus"

export type AiUnderstanding = {
  userId: string
  understandingStatus: UnderstandingStatus[]
}