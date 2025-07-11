import type { Timestamp } from 'firebase/firestore'

export type Message = {
    messageId: string
    authorId: string
    text: string
    type: "user" | "system"
    createdAt: Timestamp
} 