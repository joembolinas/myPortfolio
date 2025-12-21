---
title: Epic, Architecture & Feature PRD Prompt
source: {}
author: repo-maintainer
post_slug: epic-architecture-feature-prd-prompt
categories: [prompts]
tags: [prompts, prd, architecture]
ai_note: yes
summary: Consolidated prompt template for Epic PRD, Architecture Specification, and Feature PRD producing one comprehensive Markdown output.
date: 2025-12-16
---

## Epic, Architecture & Feature PRD Prompt

This file consolidates three prompt templates used in Phase 2: the Epic PM PRD prompt, the Epic Architecture Specification prompt, and the Feature PRD prompt. Use the appropriate section when generating docs for an epic or feature. The content produced must match the sections and requirements of the original three templates, but the final deliverable should be one comprehensive Markdown file to avoid confusion when reused in other projects.

## 1) Epic Product Requirements Document (PRD) Prompt

Prompt instructions file:
-------------------------

### Epic Product Requirements Document (PRD) Prompt

## Goal

Act as an expert Product Manager for a large-scale SaaS platform. Your primary responsibility is to translate high-level ideas into detailed Epic-level Product Requirements Documents (PRDs). These PRDs will serve as the single source of truth for the engineering team and will be used to generate a comprehensive technical architecture specification for the epic.

Review the user's request for a new epic and generate a thorough PRD. If you don't have enough information, ask clarifying questions to ensure all aspects of the epic are well-defined.

## Output Format

The output must include the full Epic PRD sections defined below and, when requested, also include the Architecture Specification and/or Feature PRDs. Produce a single comprehensive Markdown file per request. For epics, save to `/docs/EPIC-PRD.md`. The file must contain the Epic PRD sections (required) and may contain the Architecture and/or Feature PRD sections (optional) as applicable. Ensure the content for each included section matches the original template definitions.

### PRD Structure

#### 1. Epic Name

- A clear, concise, and descriptive name for the epic.

#### 2. Goal

- **Problem:** Describe the user problem or business need this epic addresses (3-5 sentences).
- **Solution:** Explain how this epic solves the problem at a high level.
- **Impact:** What are the expected outcomes or metrics to be improved (e.g., user engagement, conversion rate, revenue)?

#### 3. User Personas

- Describe the target user(s) for this epic.

#### 4. High-Level User Journeys

- Describe the key user journeys and workflows enabled by this epic.

#### 5. Business Requirements

- **Functional Requirements:** A detailed, bulleted list of what the epic must deliver from a business perspective.
- **Non-Functional Requirements:** A bulleted list of constraints and quality attributes (e.g., performance, security, accessibility, data privacy).

#### 6. Success Metrics

- Key Performance Indicators (KPIs) to measure the success of the epic.

#### 7. Out of Scope

- Clearly list what is _not_ included in this epic to avoid scope creep.

#### 8. Business Value

- Estimate the business value (e.g., High, Medium, Low) with a brief justification.

## Context Template

- **Epic Idea:** [A high-level description of the epic from the user]
- **Target Users:** [Optional: Any initial thoughts on who this is for]

---

### Epic Architecture Specification

GOAL:

Act as a Senior Software Architect. Your task is to take an Epic PRD and create a high-level technical architecture specification. This document will guide the development of the epic, outlining the major components, features, and technical enablers required.

## Context Considerations

- The Epic PRD from the Product Manager.
- **Domain-driven architecture** pattern for modular, scalable applications.
- **Self-hosted and SaaS deployment** requirements.
- **Docker containerization** for all services.
- **TypeScript/Next.js** stack with App Router.
- **Turborepo monorepo** patterns.
- **tRPC** for type-safe APIs.
- **Stack Auth** for authentication.

**Note:** Do NOT write code in output unless it's pseudocode for technical situations.

## Output Format

The output must include the full Architecture Specification sections defined below. When generating an architecture document as part of an epic request, include these sections inside the single comprehensive file and save to `/docs/epic-prd.md`. If the user requests only the architecture spec, still deliver it as a single-file Markdown at `/docs/epic-prd.md` containing the architecture sections.

### Specification Structure

#### 1. Epic Architecture Overview

- A brief summary of the technical approach for the epic.

#### 2. System Architecture Diagram

Create a comprehensive Mermaid diagram that illustrates the complete system architecture for this epic. The diagram should include:

- **User Layer**: Show how different user types (web browsers, mobile apps, admin interfaces) interact with the system
- **Application Layer**: Depict load balancers, application instances, and authentication services (Stack Auth)
- **Service Layer**: Include tRPC APIs, background services, workflow engines (n8n), and any epic-specific services
- **Data Layer**: Show databases (PostgreSQL), vector databases (Qdrant), caching layers (Redis), and external API integrations
- **Infrastructure Layer**: Represent Docker containerization and deployment architecture

Use clear subgraphs to organize these layers, apply consistent color coding for different component types, and show the data flow between components. Include both synchronous request paths and asynchronous processing flows where relevant to the epic.

#### 3. High-Level Features & Technical Enablers

- A list of the high-level features to be built.
- A list of technical enablers (e.g., new services, libraries, infrastructure) required to support the features.

#### 4. Technology Stack

- A list of the key technologies, frameworks, and libraries to be used.

#### 5. Technical Value

- Estimate the technical value (e.g., High, Medium, Low) with a brief justification.

#### 6. T-Shirt Size Estimate

- Provide a high-level t-shirt size estimate for the epic (e.g., S, M, L, XL).

## Context Template

- **Epic PRD:** [The content of the Epic PRD markdown file]

---

## 3) Feature PRD 

Goal:

Act as an expert Product Manager for a large-scale SaaS platform. Your primary responsibility is to take a high-level feature or enabler from an Epic and create a detailed Product Requirements Document (PRD). This PRD will serve as the single source of truth for the engineering team and will be used to generate a comprehensive technical specification.

Review the user's request for a new feature and the parent Epic, and generate a thorough PRD. If you don't have enough information, ask clarifying questions to ensure all aspects of the feature are well-defined.

## Output Format

The output must include the full Feature PRD sections defined below. When generating a feature PRD, include these sections inside the single comprehensive file and save to `/docs/{feature-name}/epic-prd.md`. If the feature is part of an epic request, include the feature PRD sections within `/docs/`epic-prd`.md` so the user receives one consolidated document containing Epic, Architecture, and Feature content as applicable.

### PRD Structure

#### 1. Feature Name

- A clear, concise, and descriptive name for the feature.

#### 2. Epic

- Link to the parent Epic PRD and Architecture documents.

#### 3. Goal

- **Problem:** Describe the user problem or business need this feature addresses (3-5 sentences).
- **Solution:** Explain how this feature solves the problem.
- **Impact:** What are the expected outcomes or metrics to be improved (e.g., user engagement, conversion rate, etc.)?

#### 4. User Personas

- Describe the target user(s) for this feature.

#### 5. User Stories

- Write user stories in the format: "As a `<user persona>`, I want to `<perform an action>` so that I can `<achieve a benefit>`."
- Cover the primary paths and edge cases.

#### 6. Requirements

- **Functional Requirements:** A detailed, bulleted list of what the system must do. Be specific and unambiguous.
- **Non-Functional Requirements:** A bulleted list of constraints and quality attributes (e.g., performance, security, accessibility, data privacy).

#### 7. Acceptance Criteria

- For each user story or major requirement, provide a set of acceptance criteria.
- Use a clear format, such as a checklist or Given/When/Then. This will be used to validate that the feature is complete and correct.

#### 8. Out of Scope

- Clearly list what is _not_ included in this feature to avoid scope creep.

## Context Template

- **Epic:** [Link to the parent Epic documents]
- **Feature Idea:** [A high-level description of the feature request from the user]
- **Target Users:** [Optional: Any initial thoughts on who this is for]
