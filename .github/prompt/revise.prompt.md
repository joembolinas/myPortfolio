---
agent: 'agent'
description: 'revise the specification file  optimized for Generative AI consumption.'
tools: ['changes', 'search/codebase', 'edit/editFiles', 'extensions', 'fetch', 'githubRepo', 'openSimpleBrowser', 'problems', 'runTasks', 'search', 'search/searchResults', 'runCommands/terminalLastCommand', 'runCommands/terminalSelection', 'testFailure', 'usages', 'vscodeAPI']
---

## Prompt for GitHub Copilot Agent: Implement Simplified Architecture

**Objective:** Act as a senior software architect and implement a series of pragmatic simplifications to the "Academic Journey Portfolio" project. Your goal is to accelerate initial development by adopting a leaner, more standard technology stack based on Jekyll and native GitHub Pages features, while ensuring the project remains scalable for the future.

**Context:** This task is based on the analysis and recommendations provided in `D:\AJP\GEMINI.md`. You must revise the primary specification document and create a foundational CI/CD workflow to align with these new guidelines.

### Task 1: Revise the Project Specification Document

**File to Modify:** `D:\AJP\docs\PHASE-1\Project_Specification.md`

**Instructions:**

Update the specification to reflect a simplified, Jekyll-first approach. Ensure the document remains internally consistent.

1. **Architectural Patterns (Section 4):**

   * Modify `PAT-001` to explicitly state: "Use JAMstack architecture with **Jekyll** as the primary Static Site Generator, leveraging its native support on GitHub Pages."
   * Modify `PAT-005` to: "Implement atomic design methodology for components using **Jekyll layouts and includes**."
2. **Technology Platform Dependencies (Section 9):**

   * Update `PLT-002` (Static Site Generator) constraint to: "Must be **Jekyll** to leverage native GitHub Pages builds. Custom plugins are disallowed."
3. **Component Interface (Section 5):**

   * Remove the `componentName` and `props` schema.
   * Replace it with a note: "Components will be implemented as **Jekyll includes and layouts**. The `Content Transformation Example` in Section 10 serves as the reference implementation."
4. **Deployment Configuration (Section 5):**

   * Update the `GitHub Actions Workflow` YAML example to reflect a modern, simplified GitHub Pages deployment. It should look like this:
     ```yaml
     name: Deploy Jekyll site to Pages

     on:
       push:
         branches: [main]
       workflow_dispatch:

     permissions:
       contents: read
       pages: write
       id-token: write

     jobs:
       build:
         runs-on: ubuntu-latest
         steps:
           - name: Checkout
             uses: actions/checkout@v4
           - name: Setup Pages
             uses: actions/configure-pages@v4
           - name: Build with Jekyll
             uses: actions/jekyll-build-pages@v1
             with:
               source: ./
               destination: ./_site
           - name: Upload artifact
             uses: actions/upload-pages-artifact@v3

       deploy:
         needs: build
         runs-on: ubuntu-latest
         environment:
           name: github-pages
           url: ${{ steps.deployment.outputs.page_url }}
         steps:
           - name: Deploy to GitHub Pages
             id: deployment
             uses: actions/deploy-pages@v4
     ```
5. **Test Automation Strategy (Section 7):**

   * **Remove** the following subsections entirely: `JavaScript Testing`, `E2E Testing`, `Visual Regression`.
   * **Rename** `Link Validation` to `Content & Link Validation`.
   * **Update** the `Testing Tools & Frameworks` list to only include:
     * **Content Validation:** `markdownlint` for style and structure.
     * **Link Validation:** A simple link checker (e.g., `lychee-action`).
     * **Accessibility:** `axe-core` checks can be deferred to a later phase.
   * **Update** the `CI/CD Integration` section to describe a two-stage pipeline: 1. Validate (lint, links), 2. Deploy.
   * **Remove** the `Coverage Requirements` section.
   * **Update** the `Performance Testing` section to state: "Performance will be manually audited using browser developer tools during initial phases. The `TODO` note is now resolved; automated Lighthouse CI is deferred."
6. **Final Touches:**

   * Increment the document `version` to `1.3`.
   * Update the `last_updated` date.
   * Remove the two `TODO` comments in the document.

### Task 2: Create the Initial CI/CD Workflow

**File to Create:** `.github/workflows/validate-and-deploy.yml`

**Instructions:**

Create a new GitHub Actions workflow file that implements the simplified validation and deployment strategy.

1. Use the exact YAML content provided in the revised **Deployment Configuration (Section 5)** from Task 1.
2. Add a new `validate` job that runs before the `build` job.
   * The `build` job should have a `needs: validate` dependency.
   * The `validate` job should perform two steps:
     1. **Lint Markdown:** Use a popular action like `DavidAnson/markdownlint-cli2-action` to lint all `.md` files.
     2. **Check Links:** Use an action like `lychee-action` to check for broken links in the repository. Allow it to fail on broken internal links but only warn on external ones.

**Deliverable:** After completing both tasks, confirm that the `Project_Specification.md` is updated and the new `validate-and-deploy.yml` workflow file is created.
