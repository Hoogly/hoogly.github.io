import { initializeApp } from 'firebase/app'
import { connectFirestoreEmulator, collection, getFirestore, CollectionReference, query, orderBy, Query, doc, DocumentReference } from 'firebase/firestore'
import type { AiUnderstanding, EmployeeConcerns, EmployeeEngagement, GraphScore, Message, Pseudonym, SurveyActionPlan, SurveyUser, TypingUser, WhatsGoingWell } from './types'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'
import type { ActionPlan } from './types/ActionPlan'

export const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
})

const db = getFirestore(firebaseApp)

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
  return doc(db, `/userspaces/public/survey_users/public_survey/users/${userId}/insights/ai_understanding`) as DocumentReference<AiUnderstanding>
}

export const getSurveyUserDoc = (userId: string) => {
  return doc(db, `/userspaces/public/survey_users/public_survey/users/${userId}`) as DocumentReference<SurveyUser>
}

export const getSurveyScoreDoc = (userId: string) => {
  return doc(db, `/userspaces/public/survey_users/public_survey/users/${userId}/graphs/scores`) as DocumentReference<GraphScore>
}

export const getSurveyActionPlansQuery = (userId: string) => {
  return query(collection(db, `/userspaces/public/survey_users/public_survey/users/${userId}/action_plans`)) as Query<SurveyActionPlan>
}

export const getEmployeeEngagementDoc = () => {
  return doc(db, `/userspaces/public/survey_reports/public_survey/graphs/domain_feedback`) as DocumentReference<EmployeeEngagement>
}

export const getEmployeeConcernsDoc = () => {
  return doc(db, `/userspaces/public/survey_reports/public_survey/graphs/employee_concerns`) as DocumentReference<EmployeeConcerns>
}

export const getWhatsGoingWellDoc = () => {
  return doc(db, `/userspaces/public/survey_reports/public_survey/text/whats_going_well`) as DocumentReference<WhatsGoingWell>
}

export const getActionPlanDoc = () => {
  return doc(db, `/userspaces/public/survey_reports/public_survey/text/action_plan`) as DocumentReference<ActionPlan>
}