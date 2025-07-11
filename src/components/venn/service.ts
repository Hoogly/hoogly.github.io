import { httpsCallable } from 'firebase/functions'
import { functions } from './firebase'

export const callStartSurveyCommand = async (userId: string, pseudonym: string) => {
  const startSurveyCommand = httpsCallable(functions, 'startSurveyCommand')
  await startSurveyCommand({
    userId,
    pseudonym,
    localTime: new Date().toISOString()
  })
}
