export type SurveyUserData = {
    userId: string
    surveyId: string
    status: "in_progress" | "completed"
    insightStatus: "not_started" | "in_progress" | "completed"
    startedAt: string
    completedAt: string
}