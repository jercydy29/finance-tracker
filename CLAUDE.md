# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

Start development server:
```bash
npm run dev
```

Build the application:
```bash
npm run build
```

Start production server:
```bash
npm run start
```

Lint the codebase:
```bash
npm run lint
```

Type check the codebase:
```bash
npm run type-check
```

## Architecture Overview

This is a Personal Finance Tracker built with Next.js 15 using TypeScript and the App Router architecture with the following key characteristics:

- **Framework**: Next.js 15 with React 19 and TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Date handling**: date-fns
- **Structure**: Multi-page application with dashboard and feature-specific pages

### Key Files and Structure

- `src/app/layout.tsx` - Root layout with global styles and metadata
- `src/app/page.tsx` - Main dashboard with financial overview
- `src/app/transactions/` - Transaction management pages
- `src/app/budgets/` - Budget setting and tracking pages
- `src/app/analytics/` - Charts and financial insights
- `src/components/ui/` - Reusable UI components
- `src/components/finance/` - Finance-specific components
- `src/lib/utils.ts` - Utility functions and helpers
- `src/types/finance.ts` - TypeScript type definitions
- `src/app/globals.css` - Global styles and Tailwind configuration

### Data Models

Core financial data structures:
- **Transaction**: Income/expense entries with amount, category, date, description
- **Category**: Spending categories (Food, Transport, Entertainment, etc.)
- **Budget**: Monthly spending limits per category
- **Goal**: Savings targets with progress tracking

### Design System

The finance tracker uses a professional color scheme:
- Primary: Blue-600 for financial data
- Success: Green-500 for income/positive values
- Warning: Orange-500 for budget warnings
- Danger: Red-500 for overspending
- Background: Gray-50/White for clean data presentation

### Current Implementation Status

- Project structure set up with TypeScript and Tailwind
- Dependencies installed: recharts, lucide-react, date-fns
- Ready for component and page development
- Database integration pending (will use local storage initially)

### Features to Implement

1. **Dashboard**: Overview with balance, recent transactions, budget status
2. **Transaction Management**: Add, edit, delete, categorize transactions  
3. **Budget Tracking**: Set monthly limits, track progress, alerts
4. **Analytics**: Charts showing spending trends, category breakdowns
5. **Goal Setting**: Savings goals with progress visualization
6. **Data Export**: CSV export for external analysis

# Claude Learning Guide

## Core Principle
**Start simple. Add complexity only when needed.**

## How to Learn with Claude

### 1. Ask Direct Questions
- "What is X?"
- "How does Y work?"
- "Explain Z like I'm a beginner"

### 2. Request Examples
- "Show me a simple example"
- "Can you demonstrate this?"
- "What would this look like in practice?"

### 3. Build Understanding Step-by-Step
- Start with basics
- Test your understanding
- Ask follow-up questions
- Apply what you learned

## Effective Prompting Patterns

### For Learning Concepts
```
"Explain [topic] in simple terms"
"What are the key points about [subject]?"
"Break down [complex idea] into steps"
```

### For Problem-Solving
```
"Help me understand this problem first"
"What's the simplest solution?"
"Why does this approach work?"
```

### For Code and Technical Topics
```
"Write simple, readable code for [task]"
"Explain what each line does"
"Show me the minimal working example"
```

## Anti-Patterns to Avoid

❌ **Don't ask for "the best" or "most optimal" solution first**
✅ Ask for a working solution, then improve

❌ **Don't request everything at once**
✅ Break complex tasks into smaller parts

❌ **Don't skip understanding the basics**
✅ Ensure you grasp fundamentals before advancing

## Learning Workflow

1. **Explore** - Ask what something is
2. **Understand** - Ask how it works
3. **Practice** - Try simple examples
4. **Apply** - Use in your context
5. **Iterate** - Refine and expand

## Quick Tips

- If confused, ask Claude to simplify
- Request analogies for complex topics
- Ask "why" to deepen understanding
- Test concepts with small experiments
- Focus on one thing at a time

## Example Conversation Starters

**For beginners:**
- "I'm new to [topic]. Where should I start?"
- "Can you explain [concept] without jargon?"

**For debugging:**
- "Help me understand what's happening here"
- "Let's trace through this step by step"

**For learning:**
- "What's the intuition behind [concept]?"
- "Can you give me a real-world analogy?"

## Remember

- Learning is iterative
- Questions are good
- Start small, grow gradually
- Understanding > memorization
- Mistakes are learning opportunities

---

*Focus on understanding, not perfection. Keep it simple, keep learning.*

## Preferred Step-by-Step Instruction Format

**CRITICAL: Keep steps SMALL - one small change at a time. Don't overwhelm with large code blocks.**

When providing step-by-step coding instructions, use this format:

### Step X: [Brief Title]

**WHERE:** Brief description of the location (e.g., "In `ChartsPlaceholder.tsx`, after the `availableYears` line")

**CODE:**
```typescript
// Just the code to add or change - keep it small!
const example = "code here";
```

**EXPLANATION:**

For multi-line code:
- Explain each significant line individually
- Format: **Line: `code snippet`** - explanation
- Use simple language without jargon

Then provide overall context:
- **Why we need this:** Explain the purpose
- **Before vs After:** Show what changes in behavior

**Wait for user to say "next" before proceeding to the next step.**

### Example:

```
## Step 1: Add Year State

**WHERE:** In `ChartsPlaceholder.tsx`, after the `const now = new Date();` line

**CODE:**
```typescript
const [selectedYear, setSelectedYear] = useState(now.getFullYear());
```

**EXPLANATION:**

**Line: `const [selectedYear, setSelectedYear] = useState(now.getFullYear());`**
- Creates state to track which year is selected
- `selectedYear` stores the current value
- `setSelectedYear` is the function to update it
- `now.getFullYear()` sets initial value to current year (like 2025)

**Why we need this:**
- Tracks user's year selection for filtering chart data
- **Before:** No way to remember which year user selected
- **After:** Component remembers and can filter by selected year
```

# Important Instruction Reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.