import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import test from 'node:test'
import { translations } from '../src/translations.ts'
import { projects } from '../src/content.ts'

const sources = readdirSync(new URL('../src', import.meta.url))
  .filter(file => file.endsWith('.tsx'))
  .map(file => readFileSync(new URL(`../src/${file}`, import.meta.url), 'utf8'))
  .join('\n')

// Literal t('…') / translate('…') calls plus the translated fields of the content data.
const literalKeys = [...sources.matchAll(/\b(?:t|translate)\((['"])((?:\\.|(?!\1).)+)\1/g)].map(match => match[2].replace(/\\(.)/g, '$1'))
const contentKeys = [
  ...projects.flatMap(project => [project.category, project.description, project.details, ...project.links.map(link => link.label)]),
]

test('every displayed English string has French and Spanish translations', () => {
  const missing = [...new Set([...literalKeys, ...contentKeys])].filter(key => !translations[key]?.fr || !translations[key]?.es)
  assert.deepEqual(missing, [])
})

test('the dictionary holds no stale entries', () => {
  const used = new Set([...literalKeys, ...contentKeys])
  assert.deepEqual(Object.keys(translations).filter(key => !used.has(key)), [])
})

test('emphasis markers survive translation', () => {
  const count = text => (text.match(/\*\*/g) ?? []).length
  for (const [key, value] of Object.entries(translations)) {
    assert.equal(count(value.fr), count(key), `fr: ${key}`)
    assert.equal(count(value.es), count(key), `es: ${key}`)
  }
})
