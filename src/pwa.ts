/// <reference types="vite-plugin-pwa/client" />
import { registerSW } from 'virtual:pwa-register'

export function registerPwa() {
  registerSW({
    immediate: true,
    onRegisteredSW: (_swUrl, registration) => {
      void registration?.update()
    },
    onNeedRefresh: () => window.location.reload()
  })
}
