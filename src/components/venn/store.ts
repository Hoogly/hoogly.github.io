import { atom } from 'nanostores'

type CurrentView = 'chat' | 'personal-results' | 'hr-dashboard'

export const userId = atom('')
export const pseudonym = atom('')
export const currentView = atom<CurrentView>('chat')

export const updatePseudonym = (newPseudonym: string) => {
    pseudonym.set(newPseudonym)
}

export const updateUserId = (newUserId: string) => {
    userId.set(newUserId)
}

export const updateCurrentView = (newView: CurrentView) => {
    currentView.set(newView)
}