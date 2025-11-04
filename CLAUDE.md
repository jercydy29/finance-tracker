# CLAUDE.md

This file provides project-specific guidance to Claude Code (claude.ai/code) when working with this finance tracker repository.

For teaching methodology and step-by-step instruction formats, see `INSTRUCTION.md`.

---

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

---

## Architecture Overview

This is a Personal Finance Tracker built with Next.js 15 using TypeScript and the App Router architecture.

### Tech Stack
- **Framework**: Next.js 15 with React 19 and TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Date handling**: date-fns
- **Storage**: LocalStorage (initial implementation)
- **Structure**: Single-page dashboard (will expand to multi-page later)

### Key Files and Structure

- `src/app/layout.tsx` - Root layout with global styles and metadata
- `src/app/page.tsx` - Main dashboard with financial overview
- `src/components/` - React components (AddTransaction, TransactionsSection, StatsCards, etc.)
- `src/features/transactions/` - Transaction types, constants, and utilities
- `src/app/globals.css` - Global styles and Tailwind configuration

### Data Models

Core financial data structures defined in `src/features/transactions/types.ts`:

**Transaction:**
```typescript
{
    id: string;              // Unique identifier
    type: 'expense' | 'income';
    category: string;        // E.g., "Food", "Transport", "Salary"
    amount: string;          // Keep as string for form handling
    description: string;     // Optional details
    date: string;           // ISO date string (YYYY-MM-DD)
}
```

**Categories:**
- **Expense**: Food, Transport, Entertainment, Utilities, Health, Shopping, Education, Other
- **Income**: Salary, Freelance, Investments, Gifts, Other

**Future Models:**
- **Budget**: Monthly spending limits per category
- **Goal**: Savings targets with progress tracking

### Design System

Professional color scheme for financial data:
- **Primary**: Amber-600 for actions and highlights
- **Success**: Emerald-600/700 for income and positive values
- **Danger**: Red-600 for expenses and warnings
- **Neutral**: Stone-50/100/200 for backgrounds and borders
- **Text**: Stone-800 for primary text, Stone-500/600 for secondary

### Current Implementation Status

**✅ Implemented:**
- Transaction CRUD (Create, Read, Update in progress, Delete)
- LocalStorage persistence with data migration safety
- Month/year filtering for transactions and charts
- Financial stats (income, expenses, balance)
- Data visualization (expense breakdown pie chart, monthly trends bar chart)
- Form validation and error handling
- Unique ID generation for transactions

**🚧 In Progress:**
- Edit transaction functionality

**❌ Not Started:**
- Budget tracking feature (placeholder exists)
- Savings goals
- Multi-page routing structure
- Data export (CSV)
- Advanced analytics

### Features Roadmap

1. **Transaction Management** (90% complete)
   - ✅ Add transactions
   - ✅ View/filter by month
   - ✅ Delete with confirmation
   - 🚧 Edit existing transactions
   - ❌ Search/advanced filtering

2. **Budget Tracking** (Not started)
   - Set monthly limits per category
   - Track progress with visual indicators
   - Alerts for overspending
   - Budget vs actual comparisons

3. **Analytics** (Basic charts done)
   - ✅ Expense breakdown by category
   - ✅ Monthly income vs expense trends
   - ❌ Year-over-year comparisons
   - ❌ Spending patterns and insights

4. **Goal Setting** (Not started)
   - Create savings goals
   - Track progress
   - Deadline management
   - Achievement notifications

5. **Data Export** (Not started)
   - CSV export functionality
   - Date range selection
   - Category filtering

6. **Multi-Page Structure** (Not started)
   - Separate routes for Transactions, Budgets, Analytics, Goals
   - Navigation system
   - Shared layouts

---

## Project-Specific Preferences

- **Do what has been asked; nothing more, nothing less**
- Prefer editing existing files over creating new ones
- Don't create documentation files unless explicitly requested
- Keep implementations simple and focused on learning
- Use TypeScript strictly - no implicit any types
- Follow existing code patterns and naming conventions
- Maintain consistent styling with Tailwind CSS utility classes

---

## Data Storage

**LocalStorage Key:** `finance-tracker-transactions`

**Data Migration:**
The app includes safety checks to ensure all transactions have unique IDs, even when loading legacy data without IDs. See `src/app/page.tsx` load effect for implementation.

**Storage Format:**
```json
[
  {
    "id": "1730678730000-0",
    "type": "expense",
    "category": "Food",
    "amount": "25.50",
    "description": "Lunch",
    "date": "2025-11-03"
  }
]
```

---

## Common Patterns Used

### State Management
- useState for local component state
- Props drilling for parent-child communication
- No global state management library (yet)

### Form Handling
- Controlled components with useState
- Inline validation with error state
- Reset form after successful submission

### List Rendering
- Always use unique IDs for keys (not array index)
- Filter and sort before rendering
- Show empty states when no data

### Data Flow
```
User Input → Component State → Parent Handler → Update State → LocalStorage → Re-render
```

---

## Notes for Claude

- User is learning React and TypeScript - explain concepts clearly
- Use the teaching methodology from `INSTRUCTION.md`
- Follow step-by-step format when implementing features
- Verify work before moving to next step
- Focus on "why" in addition to "what"
- Use concrete examples with real data in explanations
