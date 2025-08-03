# GitHub Labels Setup Documentation

## Overview

This document provides a complete reference for setting up comprehensive issue labels in a GitHub repository using the GitHub CLI. These labels help organize and categorize issues effectively for project management.

## Prerequisites

- GitHub CLI installed (`gh --version` to verify)
- Authenticated with GitHub (`gh auth status` to verify)
- Repository access (owner or admin permissions)

## Authentication Setup

If not already authenticated, run:

```cmd
gh auth login
```

Follow the prompts to authenticate with GitHub.

## Label Categories Created

### 1. Type Labels (8 labels)

Purpose: Categorize the nature of the issue

```cmd
gh label create "Type: Bug" --description "Something isn't working" --color "FF6B6B"
gh label create "Type: Feature" --description "New feature request" --color "51CF66"
gh label create "Type: Enhancement" --description "Improvement to existing feature" --color "4ECDC4"
gh label create "Type: Documentation" --description "Documentation related" --color "45B7D1"
gh label create "Type: Refactor" --description "Code refactoring" --color "FFE066"
gh label create "Type: Performance" --description "Performance improvement" --color "FF9F43"
gh label create "Type: Security" --description "Security related issue" --color "E17055"
gh label create "Type: Accessibility" --description "Accessibility improvement" --color "7209B7"
```

### 2. Priority Labels (4 labels)

Purpose: Indicate urgency and importance

```cmd
gh label create "Priority: Critical" --description "Must be fixed immediately" --color "FF0000"
gh label create "Priority: High" --description "Should be fixed soon" --color "FF6B6B"
gh label create "Priority: Medium" --description "Normal priority" --color "FFE066"
gh label create "Priority: Low" --description "Low priority" --color "51CF66"
```

### 3. Component Labels (6 labels)

Purpose: Identify which part of the system is affected

```cmd
gh label create "Component: UI/UX" --description "User interface related" --color "A8E6CF"
gh label create "Component: Backend" --description "Backend/API related" --color "DDA0DD"
gh label create "Component: Testing" --description "Testing related" --color "FFA07A"
gh label create "Component: CI/CD" --description "Continuous integration" --color "98D8C8"
gh label create "Component: SEO" --description "SEO optimization" --color "F7DC6F"
gh label create "Component: Performance" --description "Performance related" --color "FFB347"
```

### 4. Status Labels (5 labels)

Purpose: Track current state of the issue

```cmd
gh label create "Status: In Progress" --description "Currently being worked on" --color "4ECDC4"
gh label create "Status: Blocked" --description "Blocked by dependencies" --color "FF6B6B"
gh label create "Status: Ready" --description "Ready for development" --color "51CF66"
gh label create "Status: Review" --description "Under review" --color "45B7D1"
gh label create "Status: Testing" --description "Being tested" --color "FFE066"
```

### 5. Difficulty Labels (3 labels)

Purpose: Help contributors choose appropriate issues

```cmd
gh label create "Difficulty: Beginner" --description "Good for beginners" --color "51CF66"
gh label create "Difficulty: Intermediate" --description "Requires some experience" --color "FFE066"
gh label create "Difficulty: Advanced" --description "Requires significant experience" --color "FF6B6B"
```

## Complete Setup Script

For future use, here's a complete script to run all commands at once:

```cmd
REM Type Labels
gh label create "Type: Bug" --description "Something isn't working" --color "FF6B6B"
gh label create "Type: Feature" --description "New feature request" --color "51CF66"
gh label create "Type: Enhancement" --description "Improvement to existing feature" --color "4ECDC4"
gh label create "Type: Documentation" --description "Documentation related" --color "45B7D1"
gh label create "Type: Refactor" --description "Code refactoring" --color "FFE066"
gh label create "Type: Performance" --description "Performance improvement" --color "FF9F43"
gh label create "Type: Security" --description "Security related issue" --color "E17055"
gh label create "Type: Accessibility" --description "Accessibility improvement" --color "7209B7"

REM Priority Labels
gh label create "Priority: Critical" --description "Must be fixed immediately" --color "FF0000"
gh label create "Priority: High" --description "Should be fixed soon" --color "FF6B6B"
gh label create "Priority: Medium" --description "Normal priority" --color "FFE066"
gh label create "Priority: Low" --description "Low priority" --color "51CF66"

REM Component Labels
gh label create "Component: UI/UX" --description "User interface related" --color "A8E6CF"
gh label create "Component: Backend" --description "Backend/API related" --color "DDA0DD"
gh label create "Component: Testing" --description "Testing related" --color "FFA07A"
gh label create "Component: CI/CD" --description "Continuous integration" --color "98D8C8"
gh label create "Component: SEO" --description "SEO optimization" --color "F7DC6F"
gh label create "Component: Performance" --description "Performance related" --color "FFB347"

REM Status Labels
gh label create "Status: In Progress" --description "Currently being worked on" --color "4ECDC4"
gh label create "Status: Blocked" --description "Blocked by dependencies" --color "FF6B6B"
gh label create "Status: Ready" --description "Ready for development" --color "51CF66"
gh label create "Status: Review" --description "Under review" --color "45B7D1"
gh label create "Status: Testing" --description "Being tested" --color "FFE066"

REM Difficulty Labels
gh label create "Difficulty: Beginner" --description "Good for beginners" --color "51CF66"
gh label create "Difficulty: Intermediate" --description "Requires some experience" --color "FFE066"
gh label create "Difficulty: Advanced" --description "Requires significant experience" --color "FF6B6B"
```

## Color Scheme Reference

| Color Code | Color Name   | Usage                                                   |
| ---------- | ------------ | ------------------------------------------------------- |
| `FF0000`   | Bright Red   | Critical Priority                                       |
| `FF6B6B`   | Red          | High Priority, Bugs, Blocked                            |
| `E17055`   | Red-Orange   | Security Issues                                         |
| `FF9F43`   | Orange       | Performance (Type)                                      |
| `FFB347`   | Orange       | Performance (Component)                                 |
| `FFA07A`   | Light Orange | Testing                                                 |
| `FFE066`   | Yellow       | Medium Priority, Refactor, Testing Status, Intermediate |
| `F7DC6F`   | Light Yellow | SEO                                                     |
| `51CF66`   | Green        | Features, Low Priority, Ready, Beginner                 |
| `4ECDC4`   | Teal         | Enhancement, In Progress                                |
| `45B7D1`   | Blue         | Documentation, Review                                   |
| `A8E6CF`   | Light Green  | UI/UX                                                   |
| `98D8C8`   | Light Teal   | CI/CD                                                   |
| `DDA0DD`   | Light Purple | Backend                                                 |
| `7209B7`   | Purple       | Accessibility                                           |

## Usage Examples

### Creating an Issue with Multiple Labels

```cmd
gh issue create --title "Fix mobile navigation bug" --body "Navigation doesn't work on mobile devices" --label "Type: Bug,Priority: High,Component: UI/UX,Difficulty: Intermediate"
```

### Viewing All Labels

```cmd
gh label list
```

### Editing an Existing Label

```cmd
gh label edit "Type: Bug" --description "Updated description" --color "FF0000"
```

### Deleting a Label

```cmd
gh label delete "Label Name"
```

## Best Practices for Using These Labels

1. **Use Multiple Labels**: Combine labels from different categories for better organization
   - Example: `Type: Feature` + `Priority: Medium` + `Component: UI/UX` + `Difficulty: Beginner`

2. **Label Workflow**:
   - Start with `Type` and `Priority`
   - Add `Component` to identify affected area
   - Use `Status` to track progress
   - Add `Difficulty` to help contributors

3. **Regular Maintenance**:
   - Review and update labels as projects evolve
   - Remove unused labels periodically
   - Ensure team members understand label meanings

## Troubleshooting

### Common Issues:

1. **Authentication Error**: Run `gh auth login` again
2. **Permission Denied**: Ensure you have admin/owner access to the repository
3. **Label Already Exists**: Use `gh label edit` instead of `create`

### Verification:

- Check labels were created: Visit `https://github.com/username/repository/labels`
- Verify CLI access: `gh repo view` should show repository details

---

**Created:** August 3, 2025
**Repository:** joembolinas/myPortfolio
**Total Labels Created:** 26 labels across 5 categories
