export type SurveyUser = {
    userId: string
    surveyId: string
    status: "in_progress" | "completed"
    startedAt: string
}