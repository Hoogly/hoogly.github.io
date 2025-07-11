import type { EngagementInsight } from "./EngagementInsight"

export type EmployeeEngagement = {
  averageEngagementScore: number
  insights: EngagementInsight[]
  totalEmployees: number
  totalEmployeesAnswered: number
}

export const getParticipationRate = (employeeEngagement: EmployeeEngagement) => {
  if (employeeEngagement.totalEmployees === 0) {
    return 0
  }
  return (employeeEngagement.totalEmployeesAnswered / employeeEngagement.totalEmployees) * 100
}