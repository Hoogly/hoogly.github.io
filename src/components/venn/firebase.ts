import { initializeApp } from 'firebase/app'
import { connectFirestoreEmulator, collection, getFirestore, CollectionReference, query, orderBy, Query, doc, DocumentReference } from 'firebase/firestore'
import { initializeAppCheck, ReCaptchaV3Provider, getToken } from 'firebase/app-check'
import type { AiUnderstanding, EmployeeConcerns, EmployeeEngagement, GraphScore, Message, Pseudonym, SurveyActionPlan, SurveyUser, SurveyUserData, TypingUser, WhatsGoingWell } from './types'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'
import type { ActionPlan } from './types/ActionPlan'
import { appCheckInstance } from './store'

export const firebaseApp = initializeApp({
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.PUBLIC_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
  measurementId: import.meta.env.PUBLIC_FIREBASE_MEASUREMENT_ID
})

// Initialize App Check with reCAPTCHA v3
const initializeAppCheckInstance = async () => {
  const isLocalhost = typeof window !== 'undefined' && window.location.hostname === "localhost"
  
  if (isLocalhost) {
    // Enable debug mode for localhost
    // @ts-ignore
    window.FIREBASE_APPCHECK_DEBUG_TOKEN = true
  }

  if (import.meta.env.PUBLIC_RECAPTCHA_V3_SITE_KEY) {
    try {
      const { initializeAppCheck, ReCaptchaV3Provider } = await import('firebase/app-check')
      const instance = initializeAppCheck(firebaseApp, {
        provider: new ReCaptchaV3Provider(import.meta.env.PUBLIC_RECAPTCHA_V3_SITE_KEY),
        isTokenAutoRefreshEnabled: true
      })
      
      // Update the store with the instance
      appCheckInstance.value = instance
      console.log('App Check initialized:', instance)
      return instance
    } catch (error) {
      console.error('App Check initialization failed:', error)
      return null
    }
  }
  
  return null
}

// Initialize App Check when the module loads
if (typeof window !== 'undefined') {
  initializeAppCheckInstance()
}


const db = getFirestore()

export const functions = getFunctions(firebaseApp, 'us-central1')

if (typeof window !== 'undefined' && location.hostname === "localhost") {
  connectFirestoreEmulator(db, "127.0.0.1", 5005);
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}

export const pseudonymsRef: CollectionReference<Pseudonym> = collection(db, '/userspaces/public/pseudonyms') as CollectionReference<Pseudonym>

/**
 * Get a reference to the messages collection for a specific chat room
 * @param roomId - The ID of the chat room
 * @returns Collection reference to the messages sub-collection
 */
export const getMessagesRef = (roomId: string): CollectionReference<Message> => {
  return collection(db, `/userspaces/public/chat_rooms/${roomId}/messages`) as CollectionReference<Message>
}

/**
 * Get a query for the messages collection with ordering (oldest first)
 * @param roomId - The ID of the chat room
 * @returns Query reference to the messages sub-collection ordered by createdAt
 */
export const getMessagesQuery = (roomId: string): Query<Message> => {
  const messagesCollection = collection(db, `/userspaces/public/chat_rooms/${roomId}/messages`) as CollectionReference<Message>
  return query(messagesCollection, orderBy('createdAt', 'asc'))
}

export const getTypingUsersQuery = (roomId: string): Query<TypingUser> => {
  const typingUsersCollection = collection(db, `/userspaces/public/chat_rooms/${roomId}/typing_users`) as CollectionReference<TypingUser>
  return query(typingUsersCollection)
}

export const getAiUnderstandingDoc = (userId: string) => {
  return doc(db, `/userspaces/public/survey_user_data/${userId}/sessions/public_survey/user_reports/ai_understanding`) as DocumentReference<AiUnderstanding>
}

export const getSurveyUserDataDoc = (userId: string) => {
  return doc(db, `/userspaces/public/survey_user_data/${userId}`) as DocumentReference<SurveyUserData>
}

export const getSurveyScoreDoc = (userId: string) => {
  return doc(db, `/userspaces/public/survey_user_data/${userId}/sessions/public_survey/user_reports/scores`) as DocumentReference<GraphScore>
}

export const getSurveyActionPlansQuery = (userId: string) => {
  return query(collection(db, `/userspaces/public/survey_user_data/${userId}/sessions/public_survey/user_reports/action_plans/items`)) as Query<SurveyActionPlan>
}

export const getEmployeeEngagementDoc = (userId: string) => {
  return doc(db, `/userspaces/public/survey_user_data/${userId}/sessions/public_survey/hr_reports/domain_feedback`) as DocumentReference<EmployeeEngagement>
}

export const getEmployeeConcernsDoc = (userId: string) => {
  return doc(db, `/userspaces/public/survey_user_data/${userId}/sessions/public_survey/hr_reports/employee_concerns`) as DocumentReference<EmployeeConcerns>
}

export const getWhatsGoingWellDoc = () => {
  return doc(db, `/userspaces/public/survey_reports/public_survey/text/whats_going_well`) as DocumentReference<WhatsGoingWell>
}

export const getActionPlanDoc = () => {
  return doc(db, `/userspaces/public/survey_reports/public_survey/text/action_plan`) as DocumentReference<ActionPlan>
}