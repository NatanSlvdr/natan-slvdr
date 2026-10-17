import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import '@fontsource/ibm-plex-mono/latin-600.css'
import App from './App'
import { LanguageProvider } from './LanguageProvider'
import './styles.css'

// Design candidates under review, previewed with ?v=crt|man|ranger|minimal.
const variants: Record<string, React.LazyExoticComponent<() => React.JSX.Element>> = {
  crt: lazy(() => import('./variants/Crt')),
  man: lazy(() => import('./variants/Man')),
  ranger: lazy(() => import('./variants/Ranger')),
  minimal: lazy(() => import('./variants/Minimal')),
}
const Variant = variants[new URLSearchParams(window.location.search).get('v') ?? '']

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>{Variant ? <Suspense fallback={null}><Variant /></Suspense> : <App />}</LanguageProvider>
  </React.StrictMode>,
)
