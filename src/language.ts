export const languages = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
] as const

export type Language = (typeof languages)[number]['code']
export const languageStorageKey = 'portfolio-language'

export function isLanguage(value: unknown): value is Language {
  return languages.some(language => language.code === value)
}

// A saved choice wins; otherwise use the first supported browser preference.
export function detectLanguage(saved: unknown, preferences: readonly string[]): Language {
  if (isLanguage(saved)) return saved
  for (const preference of preferences) {
    const language = preference.toLowerCase().split(/[-_]/)[0]
    if (isLanguage(language)) return language
  }
  return 'en'
}

export function readLanguage(storage: Pick<Storage, 'getItem'>, preferences: readonly string[]) {
  let saved: string | null = null
  try {
    saved = storage.getItem(languageStorageKey)
  } catch {
    // Browser language detection still works when storage is blocked.
  }
  return detectLanguage(saved, preferences)
}

export function saveLanguage(storage: Pick<Storage, 'setItem'>, language: Language) {
  try {
    storage.setItem(languageStorageKey, language)
  } catch {
    // The selection remains active for this visit when storage is blocked.
  }
}
