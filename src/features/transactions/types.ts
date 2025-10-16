export type TransactionType = 'expense' | 'income';

export interface Transaction {
    type: TransactionType;
    category: string;
    amount: string; // keep as string to match current state
    description: string;
    date: string; // ISO date string (YYYY-MM-DD)
}

