// Feature: professional-portfolio-site, Property 1: Chronological ordering of dated content sections
// Feature: professional-portfolio-site, Property 2: Content entry field completeness
import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync, existsSync } from 'fs'
import { parse } from 'node-html-parser'
import { load } from 'js-yaml'
import path from 'path'

const ROOT = process.cwd()

// Helper to read and parse a YAML file
function readYaml(filePath: string): any {
  return load(readFileSync(path.join(ROOT, filePath), 'utf-8'))
}

// Helper to read front matter from a Markdown file
function readFrontMatter(filePath: string): any {
  const content = readFileSync(path.join(ROOT, filePath), 'utf-8')
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  return load(match[1]) as any
}

describe('Property 1: Chronological ordering of dated content sections', () => {
  it('certifications are in reverse-chronological order (most recent year first)', () => {
    const data = readYaml('data/certifications.yaml') as { items: Array<{ year: number }> }
    const years = data.items.map(item => item.year)
    for (let i = 0; i < years.length - 1; i++) {
      expect(years[i]).toBeGreaterThanOrEqual(years[i + 1])
    }
  })

  it('education entries are in reverse-chronological order (most recent year first)', () => {
    const data = readYaml('data/education.yaml') as { items: Array<{ year: number }> }
    const years = data.items.map(item => item.year)
    for (let i = 0; i < years.length - 1; i++) {
      expect(years[i]).toBeGreaterThanOrEqual(years[i + 1])
    }
  })

  it('experience entries are ordered by weight (lower weight = more recent)', () => {
    const expDir = path.join(ROOT, 'content/experience')
    const files = readdirSync(expDir).filter(f => f.endsWith('.md') && f !== '_index.md')
    const entries = files.map(f => readFrontMatter(`content/experience/${f}`))
    const sorted = [...entries].sort((a, b) => a.weight - b.weight)
    // Most recent (weight 1) should have the latest startDate
    const startDates = sorted.map(e => e.startDate)
    for (let i = 0; i < startDates.length - 1; i++) {
      expect(startDates[i] >= startDates[i + 1]).toBe(true)
    }
  })
})

describe('Property 2: Content entry field completeness', () => {
  it('all certifications have required fields: name, year, issuer', () => {
    const data = readYaml('data/certifications.yaml') as { items: Array<any> }
    for (const item of data.items) {
      expect(item.name).toBeTruthy()
      expect(item.year).toBeTruthy()
      expect(item.issuer).toBeTruthy()
    }
  })

  it('all education entries have required fields: degree, institution, year', () => {
    const data = readYaml('data/education.yaml') as { items: Array<any> }
    for (const item of data.items) {
      expect(item.degree).toBeTruthy()
      expect(item.institution).toBeTruthy()
      expect(item.year).toBeTruthy()
    }
  })

  it('all language entries have required fields: language, level', () => {
    const data = readYaml('data/languages.yaml') as { items: Array<any> }
    for (const item of data.items) {
      expect(item.language).toBeTruthy()
      expect(item.level).toBeTruthy()
    }
  })

  it('all experience files have required front matter: title, company, startDate, weight', () => {
    const expDir = path.join(ROOT, 'content/experience')
    const files = readdirSync(expDir).filter(f => f.endsWith('.md') && f !== '_index.md')
    expect(files.length).toBe(4)
    for (const f of files) {
      const fm = readFrontMatter(`content/experience/${f}`)
      expect(fm.title).toBeTruthy()
      expect(fm.company).toBeTruthy()
      expect(fm.startDate).toBeTruthy()
      expect(fm.weight).toBeDefined()
    }
  })

  it('experience files have non-empty body content (at least one responsibility)', () => {
    const expDir = path.join(ROOT, 'content/experience')
    const files = readdirSync(expDir).filter(f => f.endsWith('.md') && f !== '_index.md')
    for (const f of files) {
      const content = readFileSync(path.join(ROOT, 'content/experience', f), 'utf-8')
      // Body is everything after the closing ---
      const bodyMatch = content.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/)
      const body = bodyMatch ? bodyMatch[1].trim() : ''
      expect(body.length).toBeGreaterThan(0)
    }
  })
})

// Feature: professional-portfolio-site, Property 7: Static build output purity
// Feature: professional-portfolio-site, Property 8: Open Graph metadata presence

// Helper to recursively list all files in a directory
function listFilesRecursive(dir: string): string[] {
  const results: string[] = []
  for (const entry of readdirSync(dir)) {
    const fullPath = path.join(dir, entry)
    if (statSync(fullPath).isDirectory()) {
      results.push(...listFilesRecursive(fullPath))
    } else {
      results.push(fullPath)
    }
  }
  return results
}

describe('Property 7: Static build output purity', () => {
  const publicDir = path.join(ROOT, 'public')
  const FORBIDDEN_EXTENSIONS = ['.php', '.py', '.rb', '.cgi']

  it('public/ directory exists after hugo build', () => {
    expect(existsSync(publicDir)).toBe(true)
  })

  it('public/ contains no server-side executable scripts', () => {
    if (!existsSync(publicDir)) {
      console.warn('Skipping: public/ does not exist — run hugo build first')
      return
    }
    const files = listFilesRecursive(publicDir)
    const forbidden = files.filter(f => FORBIDDEN_EXTENSIONS.some(ext => f.endsWith(ext)))
    expect(forbidden).toHaveLength(0)
  })
})

describe('Property 8: Open Graph metadata presence', () => {
  const indexPath = path.join(ROOT, 'public/index.html')

  it('public/index.html exists', () => {
    expect(existsSync(indexPath)).toBe(true)
  })

  it('index.html contains og:title meta tag with non-empty content', () => {
    if (!existsSync(indexPath)) return
    const html = readFileSync(indexPath, 'utf-8')
    const root = parse(html)
    const ogTitle = root.querySelector('meta[property="og:title"]')
    expect(ogTitle).not.toBeNull()
    expect(ogTitle?.getAttribute('content')).toBeTruthy()
  })

  it('index.html contains og:description meta tag with non-empty content', () => {
    if (!existsSync(indexPath)) return
    const html = readFileSync(indexPath, 'utf-8')
    const root = parse(html)
    const ogDesc = root.querySelector('meta[property="og:description"]')
    expect(ogDesc).not.toBeNull()
    expect(ogDesc?.getAttribute('content')).toBeTruthy()
  })

  it('index.html contains og:image meta tag with non-empty content', () => {
    if (!existsSync(indexPath)) return
    const html = readFileSync(indexPath, 'utf-8')
    const root = parse(html)
    const ogImage = root.querySelector('meta[property="og:image"]')
    expect(ogImage).not.toBeNull()
    expect(ogImage?.getAttribute('content')).toBeTruthy()
  })
})
