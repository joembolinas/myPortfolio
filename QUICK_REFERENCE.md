# Quick Reference - Learning Journey Dynamic Data System

## 🎯 How to Use

### Add a New Learning Item

**Step 1:** Create markdown file
```bash
content/learningJourney/term-X/your-item-name.md
```

**Step 2:** Add YAML front matter
```yaml
---
title: Your Learning Item Title
date: 2025-12-09
period: Start-End (e.g., "2024-Present")
category: education|work|skill|project|certification
description: Short one-liner description
skills: [skill1, skill2, skill3]
tags: [tag1, tag2]
term: TX-AY2025
type: learning-type
---
```

**Step 3:** Write content in markdown
```markdown
## Overview
Main overview text here.

## Key Learnings
- Learning point 1
- Learning point 2
- Learning point 3

## Achievements
- Achievement 1
- Achievement 2

## Challenges
- Challenge 1
- Challenge 2

## Technologies
- Tech 1
- Tech 2

## Next Steps
- Step 1
- Step 2
```

**Step 4:** Save and done! ✅
- Dev server auto-reloads
- New card appears in LearningJourneySection
- No code changes needed

---

## 📁 Directory Structure

```
content/learningJourney/
├── term-1/
│   ├── career-start.md
│   └── college-return.md
├── term-2/
│   ├── leetcode-journey.md
│   └── tryhackme-security.md
├── term-3/
│   └── (add new items here)
└── ... (expand as needed)
```

---

## 🎨 Category → Icon & Color Mapping

| Category | Icon | Color |
|----------|------|-------|
| education | 🎓 | `from-green-500 to-green-600` |
| work | 💼 | `from-blue-500 to-blue-600` |
| skill | ⚡ | `from-yellow-500 to-yellow-600` |
| project | 🚀 | `from-indigo-500 to-indigo-600` |
| certification | 🏆 | `from-purple-500 to-purple-600` |

(Automatic - no need to specify in markdown)

---

## 📋 YAML Front Matter Reference

```yaml
---
# REQUIRED
title: String                 # Display title
period: String               # e.g., "2018-2023" or "2024-Present"
category: String             # education, work, skill, project, certification
description: String          # One-liner for card preview

# OPTIONAL BUT RECOMMENDED
date: YYYY-MM-DD             # When this occurred
skills: [array]              # Technologies/skills (for filtering)
tags: [array]                # Search tags
term: String                 # Academic term (e.g., "T1-AY2024")
type: String                 # Type indicator

# NOT REQUIRED
(any other fields ignored)
---
```

---

## 🔄 Development Workflow

### Start Dev Server
```bash
npm run dev
```

### Edit Markdown
- Edit any `.md` file in `content/learningJourney/`
- Save file
- Dev server auto-reloads
- Changes appear instantly

### Build for Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

---

## 🧪 Testing Your New Content

After adding a new markdown file:

1. **Check dev server** is running (`npm run dev`)
2. **Open browser** at `http://localhost:5173`
3. **Navigate to** Learning Journey section
4. **Find your new card** with proper icon and color
5. **Expand card** to verify all sections display correctly

---

## ⚠️ Common Issues

### Card doesn't appear
- ✅ Check file is in `content/learningJourney/term-X/`
- ✅ Check YAML front matter is valid
- ✅ Check `period` field is not empty
- ✅ Check `category` is valid
- ✅ Restart dev server if needed

### Icon/color wrong
- ✅ Check `category` field value
- ✅ Must be: `education`, `work`, `skill`, `project`, or `certification`

### Data not updating
- ✅ Refresh browser (Ctrl+R or Cmd+R)
- ✅ Check browser console for errors
- ✅ Restart dev server (`npm run dev`)

---

## 💡 Tips

1. **Chronological Order**
   - Items automatically sorted by `period` field
   - "Present" and "Ongoing" appear at the end
   - No manual sorting needed

2. **ID Generation**
   - ID auto-generated from file path
   - Example: `term-1/career-start` from `term-1/career-start.md`

3. **Markdown Sections**
   - Bullet points automatically converted to arrays
   - Both `-` and `*` work for lists
   - Case-insensitive section headers

4. **Reusable Content**
   - Copy existing `.md` file as template
   - Update front matter
   - Write your content
   - Save and done!

---

## 🔍 Files to Know

| File | Purpose |
|------|---------|
| `content/learningJourney/` | All learning journey content |
| `src/vite/journeyDataPlugin.ts` | Vite plugin (reads & processes .md files) |
| `src/utils/iconColorGenerator.ts` | Icon/color mapping logic |
| `src/data/learningJourney.ts` | Exports data to components |
| `vite.config.ts` | Registers plugin |

---

## 🚀 Advanced: Extending the System

### To add different content types (blogs, projects, etc.):

1. Create new directory: `content/blogs/`
2. Create new plugin: `src/vite/blogsDataPlugin.ts`
3. Register plugin in `vite.config.ts`
4. Create data file: `src/data/blogs.ts`
5. Use in components: `import { blogs } from '@/data/blogs'`

Each content type gets its own virtual module and plugin!

---

## 📞 Support

- Check `IMPLEMENTATION_COMPLETE.md` for full details
- Check `LEARNING_JOURNEY_IMPLEMENTATION.md` for architecture
- Review sample `.md` files in `content/learningJourney/term-1/`
- Check dev console for error messages

---

**Last Updated:** 2025-12-09
**Status:** ✅ Ready to Use
