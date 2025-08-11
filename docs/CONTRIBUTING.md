# 🤝 CONTRIBUTING GUIDELINES

Thank you for your interest in contributing to the Growth Journey Portfolio! This document provides
guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors. We expect
everyone to:

- Be respectful and considerate
- Be collaborative and constructive
- Be patient with newcomers
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Trolling, insulting, or derogatory comments
- Personal or political attacks
- Public or private harassment
- Publishing others' private information without permission

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js 18+** and npm/yarn
- **Git** for version control
- **VS Code** (recommended) with extensions:
  - ESLint
  - Prettier
  - TypeScript
  - Tailwind CSS IntelliSense

### Initial Setup

1. **Fork the repository**

   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**

   ```bash
   git clone https://github.com/your-username/growth-journey-portfolio.git
   cd growth-journey-portfolio
   ```

3. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/original-owner/growth-journey-portfolio.git
   ```

4. **Install dependencies**

   ```bash
   npm install
   ```

5. **Start development server**

   ```bash
   npm run dev
   ```

---

## 🔄 Development Workflow

### Branching Strategy

1. **Sync with upstream**

   ```bash
   git checkout main
   git pull upstream main
   git push origin main
   ```

2. **Create feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

3. **Make your changes**
   - Follow code standards
   - Write tests for new functionality
   - Update documentation as needed

4. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Use the PR template
   - Provide clear description
   - Link related issues

### Branch Naming Conventions

- **Features:** `feature/feature-name`
- **Bug Fixes:** `fix/bug-description`
- **Documentation:** `docs/documentation-update`
- **Performance:** `perf/optimization-description`
- **Refactoring:** `refactor/component-name`

---

## 📝 Code Standards

### TypeScript Guidelines

```typescript
// ✅ Good: Proper typing
interface UserProfile {
  id: string;
  name: string;
  email: string;
  skills: string[];
}

const createProfile = (data: Partial<UserProfile>): UserProfile => {
  return {
    id: generateId(),
    name: data.name || '',
    email: data.email || '',
    skills: data.skills || [],
  };
};

// ❌ Bad: Any types
const createProfile = (data: any): any => {
  return data;
};
```

### React Component Standards

```tsx
// ✅ Good: Proper component structure
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
}) => {
  const baseClasses = 'rounded-lg font-medium transition-colors';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  };
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
```

### CSS/Tailwind Standards

```tsx
// ✅ Good: Organized classes
<div className="
  flex items-center justify-between
  p-4 mb-6
  bg-white border border-gray-200 rounded-lg
  shadow-sm hover:shadow-md
  transition-shadow duration-200
">

// ❌ Bad: Disorganized classes
<div className="shadow-sm hover:shadow-md flex bg-white p-4 items-center rounded-lg border-gray-200 mb-6 border justify-between transition-shadow duration-200">
```

### File Organization

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   ├── features/        # Feature-specific components
│   └── layout/          # Layout components
├── hooks/               # Custom hooks
├── utils/               # Utility functions
├── types/               # Type definitions
└── data/                # Static data
```

### Naming Conventions

- **Components:** PascalCase (`UserProfile`, `ContactForm`)
- **Hooks:** camelCase with `use` prefix (`useLocalStorage`, `useApi`)
- **Utilities:** camelCase (`formatDate`, `validateEmail`)
- **Constants:** UPPER_SNAKE_CASE (`API_ENDPOINTS`, `DEFAULT_CONFIG`)
- **Types/Interfaces:** PascalCase (`UserData`, `ApiResponse`)

---

## 🔀 Pull Request Process

### PR Requirements

- [x] **Description:** Clear description of changes
- [x] **Issue Link:** Reference related issues
- [x] **Tests:** All tests pass
- [x] **Code Quality:** ESLint and Prettier checks pass
- [x] **Performance:** No performance regressions
- [x] **Accessibility:** No accessibility issues introduced
- [x] **Documentation:** Updated if needed

### PR Template

```markdown
## 🎯 Description

Brief description of what this PR does.

## 🔗 Related Issues

- Closes #123
- Related to #456

## 🛠️ Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## 🧪 Testing

- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing completed

## 📊 Performance Impact

- [ ] No performance impact
- [ ] Performance improved
- [ ] Performance impact acceptable

## ♿ Accessibility

- [ ] No accessibility impact
- [ ] Accessibility improved
- [ ] Accessibility tested

## 📸 Screenshots

<!-- Add screenshots for UI changes -->
```

### Review Process

1. **Automated Checks:** All CI checks must pass
2. **Code Review:** At least one reviewer approval required
3. **Testing:** Manual testing if UI changes
4. **Performance:** Lighthouse CI checks must pass
5. **Merge:** Squash and merge to main

---

## 🐛 Issue Guidelines

### Bug Reports

Use the bug report template and include:

- **Environment:** Browser, OS, device
- **Steps to Reproduce:** Clear, numbered steps
- **Expected Behavior:** What should happen
- **Actual Behavior:** What actually happens
- **Screenshots:** If applicable
- **Additional Context:** Any other relevant information

### Feature Requests

Use the feature request template and include:

- **Problem Statement:** What problem does this solve?
- **Proposed Solution:** How should it work?
- **Alternatives:** Other solutions considered
- **Acceptance Criteria:** How to know it's complete
- **Design Considerations:** UI/UX thoughts

### Issue Labels

- **Priority:** `critical`, `high`, `medium`, `low`
- **Type:** `bug`, `feature`, `enhancement`, `documentation`
- **Component:** `ui`, `performance`, `accessibility`, `seo`
- **Status:** `in-progress`, `blocked`, `ready`, `review`

---

## 🧪 Testing Requirements

### Unit Tests

```typescript
// Example unit test
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```

### Integration Tests

```typescript
// Example integration test
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from './ContactForm';

describe('ContactForm Integration', () => {
  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();

    render(<ContactForm onSubmit={mockSubmit} />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Hello world');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello world',
      });
    });
  });
});
```

### Test Coverage Requirements

- **Minimum Coverage:** 85%
- **Critical Components:** 95%
- **Utility Functions:** 100%
- **Integration Tests:** All user flows

### Running Tests

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# E2E tests
npm run test:e2e
```

---

## 📚 Documentation

### Code Documentation

```typescript
/**
 * Formats a date string for display
 * @param date - The date to format
 * @param format - The format string (default: 'MMM dd, yyyy')
 * @returns Formatted date string
 * @example
 * formatDate('2023-12-25') // 'Dec 25, 2023'
 */
export const formatDate = (date: string, format = 'MMM dd, yyyy'): string => {
  // Implementation
};
```

### Component Documentation

```tsx
/**
 * Button component with multiple variants and sizes
 *
 * @example
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Click me
 * </Button>
 */
export const Button: React.FC<ButtonProps> = ({ ... }) => {
  // Implementation
};
```

### README Updates

When adding new features, update:

- **Features section:** Add new functionality
- **Installation:** Update if new dependencies
- **Usage examples:** Show how to use new features
- **Configuration:** Document new options

---

## ⚡ Performance Guidelines

### Performance Checklist

- [x] **Code Splitting:** Large components are lazy-loaded
- [x] **Image Optimization:** All images are optimized
- [x] **Bundle Size:** Monitor bundle size impact
- [x] **Memory Leaks:** Clean up listeners and timers
- [x] **React Best Practices:** Use useMemo, useCallback appropriately

### Performance Testing

```bash
# Bundle analysis
npm run analyze

# Lighthouse CI
npm run lighthouse

# Performance profiling
npm run perf
```

---

## ♿ Accessibility Guidelines

### Accessibility Checklist

- [x] **Semantic HTML:** Use proper HTML elements
- [x] **Keyboard Navigation:** All interactive elements accessible
- [x] **Screen Readers:** Proper ARIA labels and descriptions
- [x] **Color Contrast:** Minimum 4.5:1 ratio
- [x] **Focus Management:** Visible focus indicators

### Accessibility Testing

```bash
# Automated testing
npm run a11y

# Manual testing checklist
# - Tab through all interactive elements
# - Test with screen reader
# - Verify color contrast
# - Check keyboard shortcuts
```

---

## 🎉 Recognition

Contributors will be recognized in:

- **Contributors section** in README
- **Release notes** for significant contributions
- **Annual contributor report**

---

## 📞 Getting Help

### Communication Channels

- **GitHub Discussions:** General questions and ideas
- **GitHub Issues:** Bug reports and feature requests
- **Email:** For sensitive issues

### Maintainer Response Times

- **Critical Issues:** Within 24 hours
- **Bug Reports:** Within 3-5 days
- **Feature Requests:** Within 1 week
- **Pull Requests:** Within 5-7 days

---

Thank you for contributing to the Growth Journey Portfolio! 🚀

**Document Version:** 1.0 **Last Updated:** August 3, 2025
