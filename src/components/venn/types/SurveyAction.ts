export type SurveyAction = {
  title: string
  details: string
  difficulty: 'easy' | 'medium' | 'hard'
  frequency: 'daily' | 'weekly' | 'monthly'
  microDomain: string
  priority: number
  timeframe: string
}