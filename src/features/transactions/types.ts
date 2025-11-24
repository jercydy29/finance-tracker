export type TransactionType = 'expense' | 'income';

export interface Transaction {
    id: string;
    type: TransactionType;
    category: string;
    amount: number; 
    description: string;
    date: string; // ISO date string (YYYY-MM-DD)
}

export interface Budget {
    id: string;
    category: string;
    amount: number;
}

export interface BudgetProgress {
    category: string;
    amount: number;
    spent: number;
    remaining: number;
    percentage: number;
    isOverBudget: boolean;
}