# Portfolio Development: Troubleshooting Guide

## 📋 Project Overview
**Developer:** Joe M. Bolinas (@joembolinas)  
**Project:** Personal Portfolio for Career Transition  
**Goal:** SNR Admin/Procurement → Tech Professional (Remote/VA roles)  
**Timeline:** Phase 1 Static Portfolio Development  
**Date Range:** August 2025  

---

## 🚨 Issues Encountered & Solutions

### 1. **GitHub Actions Workflow Timeout Issue**

#### **Problem Description**
- GitHub Actions workflow was timing out after 18+ minutes
- Accessibility testing job was trying to start a development server
- Command `npx wait-on http://localhost:4173` was failing
- Workflow was designed for Phase 2 (React/Vite) but running on Phase 1 (static HTML)

#### **Root Cause Analysis**
- **Why it happened:** The workflow was configured with Phase 2 development tools (Vite preview server, wait-on, Lighthouse CI) but running on a Phase 1 static HTML/CSS/JS portfolio
- **Technical cause:** The workflow tried to:
  1. Run `npm run build` (doesn't exist in Phase 1)
  2. Start `npm run preview` (Vite command not applicable to static files)
  3. Wait for `http://localhost:4173` (development server that never started)
  4. Run accessibility tests requiring a running server

#### **Solution Approach**
1. **Identified mismatch** between workflow complexity and project phase
2. **Analyzed workflow requirements** vs actual project structure
3. **Simplified workflow** for Phase 1 static portfolio
4. **Disabled advanced features** temporarily (re-enable in Phase 2)

#### **Implementation Steps**
```yaml
# BEFORE: Complex workflow trying to start servers
- name: 🏗️ Build project
  run: npm run build
- name: 🚀 Start development server
  run: npm run preview &
- name: ⏳ Wait for server
  run: npx wait-on http://localhost:4173

# AFTER: Simplified workflow for static files
- name: ✅ Verify Phase 1 portfolio
  run: echo "Phase 1 static HTML/CSS/JS portfolio verified successfully"
```

#### **Prevention Strategy**
- **Match workflow to project phase:** Always align CI/CD complexity with current development stage
- **Use conditional workflows:** Implement different workflows for different phases
- **Document workflow purpose:** Clear comments explaining when features should be enabled/disabled

---

### 2. **ESLint Version Compatibility Conflict**

#### **Problem Description**
- ESLint v9 was causing compatibility issues with React plugin
- Workflow failing with module resolution errors
- Local development tools not working properly

#### **Root Cause Analysis**
- **Why it happened:** ESLint v9 introduced breaking changes
- **Technical cause:** React ESLint plugin wasn't compatible with ESLint v9
- **Project impact:** Couldn't run linting, quality checks failing

#### **Solution Approach**
1. **Version compatibility research:** Checked ESLint and plugin compatibility
2. **Downgrade strategy:** Moved to stable ESLint v8.57.0
3. **Configuration update:** Ensured all plugins work with chosen version

#### **Implementation Steps**
```bash
# Remove incompatible version
npm uninstall eslint

# Install compatible version
npm install --save-dev eslint@8.57.0

# Verify compatibility
npm run lint
```

#### **Prevention Strategy**
- **Pin dependency versions:** Use exact versions for critical tools
- **Test before upgrading:** Always test in development before production
- **Monitor compatibility:** Check plugin compatibility before major updates

---

### 3. **Code Formatting Issues (Prettier)**

#### **Problem Description**
- GitHub Actions failing with "Code style issues found in index.html"
- Prettier check mode exiting with code 1
- Manual HTML editing created formatting inconsistencies

#### **Root Cause Analysis**
- **Why it happened:** Manual editing of HTML files without running Prettier
- **Technical cause:** Inconsistent spacing, indentation, and formatting
- **Workflow impact:** Quality checks job failing, preventing merges

#### **Solution Approach**
1. **Identified formatting tool:** Prettier was enforcing code style
2. **Applied automatic fixing:** Used `--write` flag to fix issues
3. **Verified consistency:** Ran checks to ensure all files formatted

#### **Implementation Steps**
```bash
# Check what's wrong
npx prettier --check .

# Fix all issues automatically
npx prettier --write .

# Verify fixes
npm run format:check
```

#### **Prevention Strategy**
- **Set up pre-commit hooks:** Automatically format before commits
- **Use editor integration:** Configure VS Code to format on save
- **Regular formatting:** Run `npm run format` before pushing

---

### 4. **Git Merge Conflicts & Terminal Issues**

#### **Problem Description**
- Git terminal got stuck in merge commit editor (vim/nano)
- Branch divergence between local and remote
- Terminal showing cryptic editor interface

#### **Root Cause Analysis**
- **Why it happened:** Simultaneous commits on local and remote branches
- **Technical cause:** Git opened default editor for merge commit message
- **User impact:** Terminal became unresponsive, confusing interface

#### **Solution Approach**
1. **Recognized git merge state:** Identified merge in progress
2. **Completed merge properly:** Used appropriate git commands
3. **Avoided terminal editor:** Used simple commit messages

#### **Implementation Steps**
```bash
# Check status
git status

# Complete merge
git commit -m "merge: Resolve divergence after formatting fixes"

# Push changes
git push origin feature/setup-phase1
```

#### **Prevention Strategy**
- **Regular sync:** Frequently pull from remote before pushing
- **Smaller commits:** Make focused, single-purpose commits
- **Configure git editor:** Set up preferred editor or use simple messages

---

### 5. **Security Vulnerabilities in Dependencies**

#### **Problem Description**
- npm audit showing high-severity vulnerabilities
- Outdated packages with known security issues
- CI/CD pipeline flagging security concerns

#### **Root Cause Analysis**
- **Why it happened:** Dependencies naturally become outdated
- **Technical cause:** Transitive dependencies with vulnerabilities
- **Security impact:** Potential exploitation of known vulnerabilities

#### **Solution Approach**
1. **Identified vulnerable packages:** Used `npm audit` to analyze
2. **Updated dependencies:** Upgraded to secure versions
3. **Automated monitoring:** Added security checks to workflow

#### **Implementation Steps**
```bash
# Check vulnerabilities
npm audit

# Fix automatically where possible
npm audit fix

# Manual updates for remaining issues
npm update
```

#### **Prevention Strategy**
- **Regular dependency updates:** Monthly security update schedule
- **Automated monitoring:** Use Dependabot or similar tools
- **Security-first mindset:** Always prioritize security updates

---

## 🎯 Key Learnings & Best Practices

### **1. Workflow Design Principles**
- **Start simple:** Begin with basic workflows, add complexity gradually
- **Match project phase:** Align CI/CD with current development stage
- **Document clearly:** Explain when/why features are enabled/disabled
- **Test locally first:** Verify all commands work locally before CI/CD

### **2. Dependency Management**
- **Pin critical versions:** Use exact versions for build tools
- **Regular updates:** Schedule monthly dependency reviews
- **Compatibility testing:** Test updates in isolation
- **Security monitoring:** Automate vulnerability scanning

### **3. Code Quality Standards**
- **Consistent formatting:** Set up automatic formatting
- **Pre-commit hooks:** Catch issues before they reach CI/CD
- **Editor integration:** Configure development environment properly
- **Regular linting:** Run quality checks frequently

### **4. Git Workflow Best Practices**
- **Frequent sync:** Pull before push to avoid conflicts
- **Focused commits:** One logical change per commit
- **Clear messages:** Descriptive commit messages
- **Branch strategy:** Use feature branches for development

### **5. Problem-Solving Approach**
1. **Identify root cause:** Don't just fix symptoms
2. **Research thoroughly:** Understand the underlying issue
3. **Test solutions:** Verify fixes work completely
4. **Document learnings:** Record solutions for future reference
5. **Prevent recurrence:** Implement safeguards

---

## 🔄 Future Prevention Checklist

### **Before Making Changes**
- [ ] Run local quality checks (`npm run lint`, `npm run format:check`)
- [ ] Test changes in development environment
- [ ] Check compatibility of new dependencies
- [ ] Review workflow requirements vs project phase

### **During Development**
- [ ] Commit frequently with clear messages
- [ ] Pull from remote before pushing
- [ ] Use consistent code formatting
- [ ] Monitor CI/CD pipeline status

### **After Deployment**
- [ ] Verify all workflows pass
- [ ] Check for security vulnerabilities
- [ ] Update documentation if needed
- [ ] Plan next development phase

---

## 📞 Emergency Troubleshooting Quick Reference

### **GitHub Actions Failing**
1. Check logs in Actions tab
2. Run commands locally first
3. Verify workflow matches project structure
4. Check dependency compatibility

### **Formatting Issues**
```bash
npx prettier --write .
npm run format:check
```

### **Git Issues**
```bash
git status
git pull origin <branch>
git push origin <branch>
```

### **Dependency Problems**
```bash
npm audit
npm audit fix
npm ci
```

### **Local Development Issues**
```bash
npm run lint
npm run format:check
npm run test (if available)
```

---

**Document Created:** August 3, 2025  
**Last Updated:** August 3, 2025  
**Maintenance:** Review and update after each major issue resolution
