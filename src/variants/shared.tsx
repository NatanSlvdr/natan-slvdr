import { useEffect, useState } from 'react'
import { useLanguage } from '../LanguageProvider'
import { languages } from '../language'
import { email, github, linkedin } from '../content'

export const contacts = [
  { key: 'mail', label: email, short: 'mail', href: `mailto:${email}` },
  { key: 'github', label: 'github.com/NatanSlvdr', short: 'github', href: github },
  { key: 'linkedin', label: 'linkedin.com/in/natan-salvador', short: 'linkedin', href: linkedin },
]

export const isExternal = (href: string) => href.startsWith('http')
export const linkProps = (href: string) => isExternal(href) ? { href, target: '_blank', rel: 'noopener noreferrer' } : { href }

export function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 10_000)
    return () => clearInterval(timer)
  }, [])
  return now.toTimeString().slice(0, 5)
}

// Types a string once, character by character; reduced-motion visitors get it whole.
export function useTyped(text: string, delay = 300, speed = 45) {
  const still = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [count, setCount] = useState(still ? text.length : 0)
  useEffect(() => {
    if (still) return
    const timers = [...text].map((_, index) => window.setTimeout(() => setCount(index + 1), delay + index * speed))
    return () => timers.forEach(clearTimeout)
  }, [text, delay, speed, still])
  return { text: text.slice(0, count), done: count >= text.length }
}

export function LanguageSwitch({ className }: { className: string }) {
  const { language, setLanguage, t } = useLanguage()
  return (
    <div className={className} role="group" aria-label={t('Language')}>
      {languages.map(option => (
        <button type="button" key={option.code} lang={option.code} title={option.name} aria-pressed={language === option.code} onClick={() => setLanguage(option.code)}>
          {option.code}
        </button>
      ))}
    </div>
  )
}
