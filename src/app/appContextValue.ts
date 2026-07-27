import { createContext, useContext } from 'react'
import type { RecallStackDatabase } from '../data/database'
import type { StudyRepository } from '../data/studyRepository'

export type AppContextValue = {
  repository: StudyRepository
  database: RecallStackDatabase
  revision: number
  refresh: () => void
}

export const AppContext = createContext<AppContextValue | null>(null)

export function useAppContext(): AppContextValue {
  const value = useContext(AppContext)
  if (!value) throw new Error('useAppContext must be used inside AppProvider')
  return value
}
