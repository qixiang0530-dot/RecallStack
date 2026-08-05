import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { AppRoutes } from './app/App'
import { AppProvider } from './app/AppContext'
import { database } from './data/database'
import { seedBuiltInDeck } from './data/seed'
import { StudyRepository } from './data/studyRepository'
import { registerPwa } from './pwa'
import './styles.css'

registerPwa()

async function start() {
  await seedBuiltInDeck(database)
  const repository = new StudyRepository(database)
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <HashRouter>
        <AppProvider repository={repository} database={database}>
          <AppRoutes />
        </AppProvider>
      </HashRouter>
    </StrictMode>
  )
}

start().catch((error: unknown) => {
  const root = document.getElementById('root')
  if (root) root.textContent = error instanceof Error ? error.message : '应用启动失败'
})
