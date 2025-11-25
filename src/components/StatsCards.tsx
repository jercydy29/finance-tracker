import type { Transaction } from "@/features/transactions/types"
import { filterByMonth } from '../features/transactions/utils';

type Props = {
    transactions: Transaction[];
    selectedDate: Date;
}
export default function StatsCards({ transactions, selectedDate }: Props) {
    const filteredTransactions = filterByMonth(transactions, selectedDate);
    // Calculate total income
    const totalIncome = filteredTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    // Calculate total expenses
    const totalExpenses = filteredTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum +  t.amount, 0);

    // Calculate balance
    const balance = totalIncome - totalExpenses;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-stone-200">
                <h2 className="text-sm font-medium text-stone-600 mb-2">Income</h2>
                <p className="text-2xl font-light text-emerald-700">${totalIncome.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-stone-200">
                <h2 className="text-sm font-medium text-stone-600 mb-2">Expenses</h2>
                <p className="text-2xl font-light text-red-600">${totalExpenses.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-stone-200">
                <h2 className="text-sm font-medium text-stone-600 mb-2">Balance</h2>
                <p className={`text-2xl font-light ${balance >= 0 ? 'text-emerald-700' : 'text-red-600'} `}>
                    {balance < 0 ? '-' : ''}${Math.abs(balance).toLocaleString()}
                </p>
            </div>
        </div>
    );
}

