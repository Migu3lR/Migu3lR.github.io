# Implementation Plan: Professional Portfolio Site

## Overview

Build and deploy a one-page professional portfolio for Miguel Romero using Hugo with the hugo-celadon theme, hosted on GitHub Pages with automated deployment via GitHub Actions. The implementation follows a data-driven approach: most content lives in YAML data files, experience entries live as Markdown files, and the GitHub Actions workflow handles CI/CD.

## Tasks

- [x] 1. Initialize Hugo project structure and add hugo-celadon theme
  - Clear existing repo content (keep `.git/` and `.kiro/`)
  - Initialize a valid Hugo project with standard directories: `content/`, `static/`, `themes/`, `layouts/`, `data/`
  - Add hugo-celadon as a Git submodule: `git submodule add https://github.com/Yajie-Xu/hugo-celadon themes/celadon`
  - Verify `.gitmodules` file is created with the correct submodule entry
  - _Requirements: 1.1, 1.6_

- [x] 2. Create `hugo.toml` configuration file
  - Write `hugo.toml` at the project root with `baseURL`, `languageCode`, `title`, `theme = "celadon"`, and `[params]` description
  - Define `[params.homepage]` sections array: `["hero", "experience", "skills", "certifications", "education", "languages", "contact"]`
  - Add `[params.homepage.*]` blocks for each section (enable, title, layout)
  - Define `[menu]` with `[[menu.main]]` entries for About, Experience, Skills, Certifications, Education, and Contact with their anchor URLs
  - _Requirements: 1.2, 1.3, 1.4, 9.4, 9.5_

  - [ ]* 2.1 Write smoke test: hugo.toml has correct baseURL, theme, and languageCode
    - Parse `hugo.toml` and assert `baseURL = "https://migu3lr.github.io/"`, `theme = "celadon"`, `languageCode = "en-us"`
    - Assert `params.homepage.sections` contains all 7 expected section names
    - Assert `menu.main` has 6 entries with correct anchor URLs
    - _Requirements: 1.2, 1.3, 1.4, 9.4_

- [x] 3. Create profile data file and homepage index
  - Create `data/profile.yaml` with all required fields: `name`, `title`, `affiliation`, `location`, `summary`, `email`, `linkedin`, `avatar`
  - Create `content/_index.md` with front matter: `title`, `description`, and `images` (og-preview path)
  - Add placeholder profile photo at `static/images/profile.jpg` (can be a placeholder image initially)
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 11.4_

  - [ ]* 3.1 Write example test: data/profile.yaml contains all required fields and correct values
    - Load and parse `data/profile.yaml`
    - Assert `name = "Miguel Romero"`, `title = "Senior Solutions Architect"`, `location = "Bogota, Colombia"`
    - Assert `email = "miguel.romerog@outlook.com"`, `linkedin` contains `miguelromerog`
    - Assert `summary` is non-empty and mentions cloud/AWS
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 4. Create experience content files
  - Create `content/experience/_index.md` (empty or minimal front matter)
  - Create `content/experience/aws-solutions-architect.md` with front matter (`title`, `company`, `startDate: "2022-08"`, `endDate: ""`, `location`, `weight: 1`) and Markdown body with responsibilities
  - Create `content/experience/4strategies-big-data-engineer.md` (`startDate: "2022-01"`, `endDate: "2022-07"`, `weight: 2`) with responsibilities body
  - Create `content/experience/cencosud-aws-architect.md` (`startDate: "2017-07"`, `endDate: "2022-01"`, `weight: 3`) with responsibilities body
  - Create `content/experience/hardtech-it-consultant.md` (`startDate: "2015-11"`, `endDate: "2017-07"`, `weight: 4`) with responsibilities body
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ]* 4.1 Write example test: content/experience/ contains 4 position files with required front matter
    - Assert 4 Markdown files exist in `content/experience/` (excluding `_index.md`)
    - Parse each file's front matter and assert `title`, `company`, `startDate`, `weight` are present and non-empty
    - Assert AWS position has `endDate: ""` (current position)
    - _Requirements: 3.2, 3.3, 3.5_

  - [ ]* 4.2 Write property test for current position indicator (Property 4)
    - **Property 4: Current position indicator**
    - For any experience entry where `endDate` is empty or absent, the rendered output SHALL display "Present" as the end date
    - Generate arbitrary experience entries with empty `endDate`, write them to temp files, run `hugo build`, parse rendered HTML, assert "Present" appears
    - **Validates: Requirements 3.4**

- [x] 5. Create skills, certifications, education, and languages data files
  - Create `data/skills.yaml` with `categories` array containing 4 categories: Cloud Architecture, Artificial Intelligence, Data, Strategy — each with their skills list
  - Create `data/certifications.yaml` with `items` array containing all 7 certifications with `name`, `year`, `issuer`
  - Create `data/education.yaml` with `items` array containing both degrees with `degree`, `institution`, `year`
  - Create `data/languages.yaml` with `items` array containing Spanish (Native), English (B2), Portuguese (Technical-Intermediate)
  - _Requirements: 4.1, 4.2, 5.1, 5.2, 5.3, 6.1, 6.2, 6.3, 7.1, 7.2, 7.3_

  - [ ]* 5.1 Write example test: data files contain all required entries
    - Parse `data/certifications.yaml` and assert all 7 certifications are present with correct names and years
    - Parse `data/education.yaml` and assert both degrees are present with correct institution names
    - Parse `data/skills.yaml` and assert all 4 categories exist with their expected skills
    - Parse `data/languages.yaml` and assert Spanish, English, and Portuguese entries exist
    - _Requirements: 4.2, 5.3, 6.3, 7.2_

  - [ ]* 5.2 Write property test for skills completeness and category grouping (Property 3)
    - **Property 3: Skills completeness and category grouping**
    - For any set of skills defined in `data/skills.yaml`, every skill SHALL appear in the rendered output under its assigned category heading
    - Run `hugo build`, parse rendered `public/index.html`, assert each skill name appears and is within its category section
    - **Validates: Requirements 4.1, 4.4**

- [x] 6. Create contact data file
  - Create `data/contact.yaml` with `email`, `phone`, and `linkedin` fields
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [ ]* 6.1 Write property test for contact link rendering (Property 5)
    - **Property 5: Contact link rendering**
    - For any email address in contact data, rendered HTML SHALL contain a `mailto:` hyperlink; for any LinkedIn URL, rendered HTML SHALL contain an anchor with `target="_blank"`
    - Run `hugo build`, parse `public/index.html`, assert `href="mailto:miguel.romerog@outlook.com"` exists and LinkedIn anchor has `target="_blank"`
    - **Validates: Requirements 8.2, 8.4**

- [x] 7. Checkpoint — Verify Hugo build succeeds with all content
  - Run `hugo build` locally and confirm `public/` directory is generated without errors
  - Verify `public/index.html` exists and is non-empty
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Set up Vitest and fast-check testing framework
  - Initialize `package.json` with `npm init -y` (or create manually)
  - Install dev dependencies: `vitest`, `fast-check`, `js-yaml`, `node-html-parser` (pinned versions)
  - Create `vitest.config.ts` (or `.js`) with test file glob pattern pointing to `tests/`
  - Create `tests/` directory with an empty `.gitkeep` or initial test file
  - _Requirements: (testing infrastructure for all properties)_

- [x] 9. Write smoke tests for project structure and workflow file
  - Create `tests/smoke.test.ts` (or `.js`)
  - Assert Hugo project directories exist: `content/`, `static/`, `themes/`, `data/`, `layouts/`
  - Assert `.gitmodules` contains the celadon submodule entry pointing to the correct URL
  - Assert `.github/workflows/hugo.yaml` exists
  - Parse the workflow YAML and assert: trigger is `push` on `main`, `submodules: recursive` is set in the checkout step, Hugo version env var is defined
  - _Requirements: 1.1, 1.6, 10.1, 10.6_

  - [ ]* 9.1 Write property test for navigation menu completeness (Property 6)
    - **Property 6: Navigation menu completeness**
    - For any set of sections listed in `hugo.toml` under `params.homepage.sections`, every section SHALL have a corresponding entry in the rendered navigation menu with a valid anchor link
    - Run `hugo build`, parse `public/index.html`, assert each section name has a `<a href="#sectionname">` in the nav
    - **Validates: Requirements 9.1, 9.4**

- [x] 10. Write property tests for chronological ordering and field completeness
  - Create `tests/properties.test.ts`

  - [ ]* 10.1 Write property test for chronological ordering (Property 1)
    - **Property 1: Chronological ordering of dated content sections**
    - For any set of content entries with year/date fields, rendered entries SHALL appear in reverse-chronological order (most recent first)
    - Generate arbitrary sets of certifications with different years using fast-check, write to temp `data/certifications.yaml`, run `hugo build`, parse rendered HTML, assert year order is descending
    - **Validates: Requirements 3.1, 5.4, 6.4**

  - [ ]* 10.2 Write property test for content entry field completeness (Property 2)
    - **Property 2: Content entry field completeness**
    - For any content entry (experience, certification, education, language), rendered output SHALL contain all required fields: title/name, organization/institution, time period/year, and for experience at least one responsibility
    - Generate arbitrary valid entries, build, parse HTML, assert all required fields appear in output
    - **Validates: Requirements 3.2, 5.2, 6.2, 7.3**

- [x] 11. Write property tests for build output purity and Open Graph metadata
  - Create or extend `tests/properties.test.ts`

  - [ ]* 11.1 Write property test for static build output purity (Property 7)
    - **Property 7: Static build output purity**
    - For any Hugo build, `public/` SHALL contain only static file types (.html, .css, .js, .xml, .json, image formats, font formats) and SHALL NOT contain server-side executable scripts (.php, .py, .rb, .cgi)
    - After `hugo build`, recursively list all files in `public/`, assert no file has a forbidden extension
    - **Validates: Requirements 11.3**

  - [ ]* 11.2 Write example test for Open Graph metadata presence (Property 8)
    - **Property 8: Open Graph metadata presence**
    - For any build of the site, `public/index.html` SHALL contain `og:title`, `og:description`, and `og:image` meta tags in `<head>`
    - Run `hugo build`, parse `public/index.html`, assert all three OG meta tags are present with non-empty content
    - **Validates: Requirements 11.4**

- [x] 12. Create GitHub Actions deployment workflow
  - Create `.github/workflows/hugo.yaml` with the full workflow definition
  - Set trigger: `push` on `main` and `workflow_dispatch`
  - Set permissions: `contents: read`, `pages: write`, `id-token: write`
  - Set concurrency group `pages` with `cancel-in-progress: false`
  - Define `build` job: checkout with `submodules: recursive`, configure-pages, install Hugo Extended v0.147.0, run `hugo build --gc --minify --baseURL`, upload artifact from `./public`
  - Define `deploy` job: depends on `build`, uses `actions/deploy-pages@v4`
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.6_

  - [ ]* 12.1 Write integration test: workflow file has correct structure
    - Parse `.github/workflows/hugo.yaml` with a YAML parser
    - Assert `on.push.branches` includes `main`
    - Assert `jobs.build.steps` includes a step with `submodules: recursive`
    - Assert `jobs.build.env.HUGO_VERSION` is defined
    - Assert `jobs.deploy.needs` includes `build`
    - _Requirements: 10.1, 10.2, 10.3, 10.6_

- [x] 13. Add Open Graph image and sitemap configuration
  - Add `static/images/og-preview.jpg` (representative image for social previews)
  - Verify Hugo's built-in sitemap generation is active (no extra config needed by default; confirm `public/sitemap.xml` is generated after build)
  - Confirm `content/_index.md` front matter references the og-preview image path
  - _Requirements: 11.4, 11.5_

- [x] 14. Final checkpoint — Run all tests and verify full build
  - Run `npx vitest --run` and confirm all tests pass
  - Run `hugo build` and confirm `public/` is generated without errors
  - Verify `public/index.html` contains `<title>`, OG meta tags, and navigation anchors
  - Verify `public/sitemap.xml` exists
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use **fast-check** with **Vitest** as the test runner (TypeScript)
- Property tests that require a Hugo build write to temp files and run `hugo build` as a subprocess; they require Hugo to be installed in the test environment
- The `public/` directory is generated by Hugo and should be in `.gitignore` — GitHub Actions builds it fresh on every push
- The hugo-celadon theme is added as a Git submodule; always run `git submodule update --init --recursive` after cloning
- Responsive layout and keyboard accessibility (Requirements 11.1, 11.2, 9.3) are handled by the hugo-celadon theme and require manual/visual verification — no automated coding tasks are needed for those
