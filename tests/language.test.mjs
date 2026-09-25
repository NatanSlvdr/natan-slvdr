import assert from 'node:assert/strict'
import test from 'node:test'
import { detectLanguage, readLanguage, saveLanguage, languageStorageKey } from '../src/language.ts'

test('first visit selects supported regional browser preferences in order', () => {
  assert.equal(detectLanguage(null, ['fr-CA', 'en-US']), 'fr')
  assert.equal(detectLanguage(null, ['es-MX', 'fr']), 'es')
  assert.equal(detectLanguage(null, ['en-GB', 'fr']), 'en')
  assert.equal(detectLanguage(null, ['de-DE', 'ES-es', 'fr']), 'es')
})

test('unsupported or missing preferences fall back to English', () => {
  assert.equal(detectLanguage(null, ['de', 'ja']), 'en')
  assert.equal(detectLanguage(null, []), 'en')
})

test('saved selection overrides browser preferences', () => {
  for (const language of ['fr', 'en', 'es']) {
    assert.equal(detectLanguage(language, ['de', 'en', 'fr']), language)
  }
})

test('invalid stored values do not prevent browser detection', () => {
  for (const saved of ['de', '', 'null', '{}']) {
    assert.equal(detectLanguage(saved, ['fr-FR']), 'fr')
  }
})

test('an explicit choice survives a subsequent visit', () => {
  const values = new Map()
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  assert.equal(readLanguage(storage, ['fr']), 'fr')
  saveLanguage(storage, 'es')
  assert.equal(values.get(languageStorageKey), 'es')
  assert.equal(readLanguage(storage, ['fr']), 'es')
})

test('blocked storage does not break detection or saving', () => {
  const blocked = {
    getItem() { throw new Error('Storage blocked') },
    setItem() { throw new Error('Storage blocked') },
  }
  assert.equal(readLanguage(blocked, ['es-ES']), 'es')
  assert.doesNotThrow(() => saveLanguage(blocked, 'fr'))
})
