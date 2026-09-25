import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { useLanguage } from './LanguageProvider'
import { languages } from './language'

// Keep the custom menu anchored to the dock, with native button keyboard behavior.
export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const menuId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])
  const selectedIndex = languages.findIndex(option => option.code === language)

  useEffect(() => {
    if (!isOpen) return
    optionRefs.current[selectedIndex]?.focus()
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) setIsOpen(false)
    }
    document.addEventListener('pointerdown', dismiss)
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [isOpen, selectedIndex])

  function closeMenu() {
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  // Arrow keys move focus; Enter or Space selects through the button's click event.
  function handleMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const current = optionRefs.current.findIndex(option => option === document.activeElement)
    let next = current
    if (event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      closeMenu()
      return
    }
    if (event.key === 'Tab') {
      // Restore the trigger as the tab origin before the browser moves onward.
      closeMenu()
      return
    }
    if (event.key === 'ArrowDown') next = (current + 1) % languages.length
    else if (event.key === 'ArrowUp') next = (current - 1 + languages.length) % languages.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = languages.length - 1
    else if (event.key.length === 1 && /\p{L}/u.test(event.key) && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const match = languages.map((_, offset) => (current + offset + 1) % languages.length)
        .find(index => languages[index].name.toLocaleLowerCase().startsWith(event.key.toLocaleLowerCase()))
      if (match === undefined) return
      next = match
    } else return
    event.preventDefault()
    optionRefs.current[next]?.focus()
  }

  return (
    <div className="language-selector" ref={containerRef} onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false)
    }}>
      <button
        className="language-trigger"
        type="button"
        ref={triggerRef}
        aria-label={`${t('Language')}: ${languages[selectedIndex].name}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        onClick={() => setIsOpen(open => !open)}
        onKeyDown={event => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault()
            setIsOpen(true)
          }
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <ellipse cx="12" cy="12" rx="4" ry="9" />
          <path d="M3 12h18M5 6.5h14M5 17.5h14" />
        </svg>
        <span className="language-code" aria-hidden="true">{language.toUpperCase()}</span>
        <svg className="language-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m3 4.5 3 3 3-3" />
        </svg>
      </button>
      {isOpen && (
        <div className="language-popover">
          <div className="language-menu-heading" aria-hidden="true">{t('Language')}</div>
          <div id={menuId} role="menu" aria-label={t('Language')} onKeyDown={handleMenuKeyDown}>
            {languages.map((option, index) => (
              <button
                key={option.code}
                ref={element => { optionRefs.current[index] = element }}
                className="language-option"
                type="button"
                role="menuitemradio"
                aria-checked={language === option.code}
                tabIndex={-1}
                lang={option.code}
                onClick={() => {
                  setLanguage(option.code)
                  closeMenu()
                }}
              >
                <span className="language-option-code" aria-hidden="true">{option.code.toUpperCase()}</span>
                <span>{option.name}</span>
                {language === option.code && <svg className="language-check" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 8 3 3 7-7" /></svg>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
