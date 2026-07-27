import { useMemo, useState, type ReactNode } from 'react'
import type { RecallStackDatabase } from '../data/database'
import type { StudyRepository } from '../data/studyRepository'
import { AppContext } from './appContextValue'

export function AppProvider({
  repository,
  database,
  children
}: {
  repository: StudyRepository
  database: RecallStackDatabase
  children: ReactNode
}) {
  const [revision, setRevision] = useState(0)
  const value = useMemo(
    () => ({ repository, database, revision, refresh: () => setRevision((current) => current + 1) }),
    [repository, database, revision]
  )
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
