import { Route, Routes } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { DeckPage } from '../pages/DeckPage'
import { HomePage } from '../pages/HomePage'
import { ImportPage } from '../pages/ImportPage'
import { SettingsPage } from '../pages/SettingsPage'
import { StatsPage } from '../pages/StatsPage'
import { StudyPage } from '../pages/StudyPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="study" element={<StudyPage />} />
        <Route path="deck" element={<DeckPage />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="import" element={<ImportPage />} />
      </Route>
    </Routes>
  )
}
