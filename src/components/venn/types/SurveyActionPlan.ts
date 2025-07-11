import type { SurveyAction } from './SurveyAction'

export type SurveyActionPlan = {
  id: string
  priority: number
  summary: string
  title: string
  actions: SurveyAction[]
}