import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { detectLanguage, readLanguage, saveLanguage, type Language } from './language'
import { translations } from './translations'

function translate(text: string, language: Language) {
  return language === 'en' ? text : translations[text]?.[language] ?? text
}

// Read before the first render so visitors never see an initial English flash.
function initialLanguage() {
  const preferences = navigator.languages.length ? navigator.languages : [navigator.language]
  try {
    return readLanguage(window.localStorage, preferences)
  } catch {
    return detectLanguage(null, preferences)
  }
}

const LanguageContext = createContext<{
  language: Language
  setLanguage: (language: Language) => void
  t: (text: string) => string
} | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState(initialLanguage)
  const t = (text: string) => translate(text, language)

  function setLanguage(next: Language) {
    updateLanguage(next)
    try {
      saveLanguage(window.localStorage, next)
    } catch {
      // Access to localStorage itself can also be denied by the browser.
    }
  }

  useEffect(() => {
    document.documentElement.lang = language
    const title = translate('Natan Salvador — Software engineer', language)
    document.title = title
    const metadata = {
      'meta[name="description"]': translate('Natan Salvador is a software engineer who builds backends, tools, and small apps. Explore the projects.', language),
      'meta[property="og:title"]': title,
      'meta[property="og:description"]': translate('Backends, tools, and small apps. Explore the projects of Natan Salvador.', language),
    }
    for (const [selector, content] of Object.entries(metadata)) {
      document.querySelector(selector)?.setAttribute('content', content)
    }
  }, [language])

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
