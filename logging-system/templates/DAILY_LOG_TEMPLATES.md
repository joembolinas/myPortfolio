# Daily Project Log Templates

# Copy and paste these into project.log as needed

## MORNING ROUTINE (Start of Day)

```
# SESSION: [DATE] - [SESSION_DESCRIPTION]
[timestamp] | DAILY | START | [Today's main focus area] | PLANNED
[timestamp] | GOAL | TODAY | [3 specific things to accomplish] | PLANNED
[timestamp] | ENERGY | LEVEL | [How you're feeling - motivated/tired/focused] | NOTED
```

## THROUGHOUT THE DAY (As things happen)

```
# Learning Moments
[timestamp] | LEARNING | [SKILL] | [What you discovered/understood] | INSIGHT

# Challenges Hit
[timestamp] | CHALLENGE | [AREA] | [Problem you encountered] | OBSTACLE
[timestamp] | DEBUG | [TOOL] | [What you're investigating] | INVESTIGATING

# Solutions Found
[timestamp] | SOLUTION | [AREA] | [How you solved the problem] | RESOLVED
[timestamp] | FIX | [TOOL] | [Technical fix implemented] | COMPLETED

# Progress Made
[timestamp] | PROGRESS | [PROJECT_AREA] | [What you accomplished] | COMPLETED
[timestamp] | MILESTONE | [SKILL] | [New capability you gained] | ACHIEVED
```

## EVENING ROUTINE (End of Day)

```
[timestamp] | DAILY | SUMMARY | [What got done vs planned] | COMPLETED
[timestamp] | LEARNING | TODAY | [Key things learned] | INSIGHT
[timestamp] | CHALLENGE | TODAY | [Biggest obstacle faced] | [RESOLVED/LEARNING/OBSTACLE]
[timestamp] | REFLECTION | DAILY | [How you felt, what went well/poorly] | NOTED
[timestamp] | TOMORROW | PREP | [What to focus on next] | PLANNED
[timestamp] | CAREER | THOUGHT | [Any job search or transition insights] | NOTED
```

## WEEKLY REVIEW (Sunday Evening)

```
# WEEKLY REVIEW: Week [XX] - [Start Date] to [End Date]
[timestamp] | WEEKLY | SUMMARY | [Major accomplishments this week] | COMPLETED
[timestamp] | WEEKLY | LEARNING | [Key skills developed] | INSIGHT
[timestamp] | WEEKLY | CHALLENGES | [Major obstacles and how handled] | NOTED
[timestamp] | WEEKLY | PROGRESS | [LeetCode problems, courses, projects] | TRACKING
[timestamp] | WEEKLY | CAREER | [Job applications, portfolio updates] | TRACKING
[timestamp] | WEEKLY | GOALS | [Focus areas for next week] | PLANNED
[timestamp] | WEEKLY | REFLECTION | [Overall feelings about progress] | NOTED
```

## QUICK ENTRY SHORTCUTS

### For Learning Platforms:

```
[timestamp] | PROGRESS | LEETCODE | Solved [X] problems - [difficulty levels] | TRACKING
[timestamp] | PROGRESS | TRYHACKME | Completed [room name] - [skills practiced] | TRACKING
[timestamp] | PROGRESS | ROADMAP_SH | [Concept studied] - [understanding level] | TRACKING
```

### For Technical Issues:

```
[timestamp] | DEBUG | [TOOL] | [Issue description] | INVESTIGATING
[timestamp] | RESEARCH | [TECHNOLOGY] | [What you're learning about] | LEARNING
[timestamp] | FIX | [TOOL] | [Solution implemented] | RESOLVED
[timestamp] | CONFIG | [TOOL] | [Configuration change made] | UPDATED
```

### For Career Development:

```
[timestamp] | CAREER | APPLICATION | Applied to [company] for [position] | SUBMITTED
[timestamp] | CAREER | NETWORKING | [LinkedIn connection, community interaction] | COMPLETED
[timestamp] | CAREER | SKILL_UPDATE | [New skill to add to resume/portfolio] | NOTED
[timestamp] | CAREER | INTERVIEW | [Interview scheduled/completed with insights] | [SCHEDULED/COMPLETED]
```

### For Emotional/Motivational Tracking:

```
[timestamp] | MOTIVATION | LEVEL | [High/Medium/Low] - [reason why] | NOTED
[timestamp] | CONFIDENCE | SKILL | [Technology] - feeling [confident/learning/struggling] | NOTED
[timestamp] | BREAKTHROUGH | MOMENT | [When something finally clicked] | CELEBRATION
[timestamp] | FRUSTRATION | AREA | [What's causing stress] | OBSTACLE
```

## TIMESTAMP HELPER

Current Unix timestamp: Use online converter or:

- Windows: Get-Date -UFormat %s in PowerShell
- Or just use current time in YYYY-MM-DD HH:MM format

## AUTOMATION REMINDERS

1. Use PowerShell script: .\log-entry.ps1 -Type "LEARNING" -Component "REACT" -Description "Understanding hooks" -Status "INSIGHT"
2. Use VS Code snippets: Type "log" and press Tab
3. Set daily reminders to log morning goals and evening reflection
4. Weekly Sunday review to catch anything missed

## STATUS DEFINITIONS

- PLANNED: Something you intend to do
- IN_PROGRESS: Currently working on
- COMPLETED: Finished successfully
- RESOLVED: Problem solved
- OBSTACLE: Blocking issue encountered
- INVESTIGATING: Researching/debugging
- INSIGHT: Learning or realization gained
- POSITIVE: Good feelings/progress
- NOTED: Information recorded
- TRACKING: Ongoing progress measurement
- CELEBRATION: Achievement worth highlighting
