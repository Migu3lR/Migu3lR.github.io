// Feature: professional-portfolio-site, Smoke tests: project structure and workflow
import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'fs'
import { load } from 'js-yaml'
import path from 'path'

const ROOT = process.cwd()

describe('Hugo project structure', () => {
  it('content/ directory exists', () => {
    expect(existsSync(path.join(ROOT, 'content'))).toBe(true)
  })

  it('static/ directory exists', () => {
    expect(existsSync(path.join(ROOT, 'static'))).toBe(true)
  })

  it('themes/ directory exists', () => {
    expect(existsSync(path.join(ROOT, 'themes'))).toBe(true)
  })

  it('data/ directory exists', () => {
    expect(existsSync(path.join(ROOT, 'data'))).toBe(true)
  })

  it('layouts/ directory exists', () => {
    expect(existsSync(path.join(ROOT, 'layouts'))).toBe(true)
  })
})

describe('.gitmodules celadon submodule', () => {
  it('.gitmodules exists', () => {
    expect(existsSync(path.join(ROOT, '.gitmodules'))).toBe(true)
  })

  it('.gitmodules contains celadon submodule pointing to correct URL', () => {
    const content = readFileSync(path.join(ROOT, '.gitmodules'), 'utf-8')
    expect(content).toContain('themes/celadon')
    expect(content).toContain('https://github.com/Yajie-Xu/hugo-celadon')
  })
})

describe('GitHub Actions workflow file', () => {
  const workflowPath = path.join(ROOT, '.github/workflows/hugo.yaml')

  it('workflow file exists', () => {
    expect(existsSync(workflowPath)).toBe(true)
  })

  it('workflow triggers on push to main', () => {
    const content = readFileSync(workflowPath, 'utf-8')
    const workflow = load(content) as any
    expect(workflow.on?.push?.branches).toContain('main')
  })

  it('workflow checkout step uses submodules: recursive', () => {
    const content = readFileSync(workflowPath, 'utf-8')
    const workflow = load(content) as any
    const buildSteps = workflow.jobs?.build?.steps ?? []
    const checkoutStep = buildSteps.find((s: any) => s.uses?.startsWith('actions/checkout'))
    expect(checkoutStep).toBeDefined()
    expect(checkoutStep?.with?.submodules).toBe('recursive')
  })

  it('workflow defines HUGO_VERSION env var', () => {
    const content = readFileSync(workflowPath, 'utf-8')
    const workflow = load(content) as any
    const env = workflow.jobs?.build?.env ?? {}
    expect(env.HUGO_VERSION).toBeDefined()
  })
})
