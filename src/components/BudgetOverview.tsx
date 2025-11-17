'use client'
import type { Transaction, Budget } from "@/features/transactions/types";
import { expenseCategories } from "@/features/transactions/constants";
import { useState } from "react";

interface BudgetOverviewProps {
    transactions: Transaction[]
    budgets: Budget[]
    selectedDate: Date
    onUpdateBudget: (category: string, limit: number) => void
}
export default function BudgetOverview({ transactions, budgets, selectedDate, onUpdateBudget }: BudgetOverviewProps) {
    const [showSetLimit, setShowSetLimit] = useState(false);

    const calculateBudgetProgress = () => {
        console.log(budgets);

        const selectedMonth = selectedDate.getMonth();
        const selectedYear = selectedDate.getFullYear();
        return expenseCategories.map((category) => {
            const budget = budgets.find((b) => b.category === category);
            const limit = budget?.limit || 0;

            const spent = transactions
                .filter((t) => {
                    const transactionDate = new Date(t.date);
                    return (
                        t.type === 'expense' &&
                        t.category === category &&
                        transactionDate.getMonth() === selectedMonth &&
                        transactionDate.getFullYear() === selectedYear
                    );
                })
                .reduce((sum, t) => sum + parseFloat(t.amount), 0);

            const remaining = limit - spent;
            const percentage = limit > 0 ? (spent / limit) * 100 : 0;
            const isOverBudget = spent > limit && limit > 0;
            return { category, limit, spent, remaining, percentage, isOverBudget };
        });
    }
    const getProgressColor = (percentage: number): string => {
        if (percentage < 80) return 'bg-emerald-600';
        if (percentage < 90) return 'bg-amber-500';
        return 'bg-red-600';
    }
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-stone-200 mb-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-stone-800">Budget Overview</h3>
                <button
                    className="px-3 py-2 bg-amber-600 rounded-lg hover:bg-amber-700 cursor-pointer text-white"
                    onClick={() => setShowSetLimit(!showSetLimit)}
                >
                    Set Limit
                </button>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {calculateBudgetProgress().map((item) => (
                    <div key={item.category} className="border border-stone-200 rounded-lg p-4">
                        <p className="text-stone-800 font-medium">{item.category}</p>
                        {item.limit > 0 ? (
                            <div className="mt-2">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-stone-600">
                                        ${item.spent.toFixed(2)} / ${item.limit.toFixed(2)}
                                    </span>
                                    <span className="text-stone-500">
                                        {item.percentage.toFixed(0)}%
                                    </span>
                                </div>
                                <div className="w-full bg-stone-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${getProgressColor(item.percentage)}`}
                                        style={{ width: `${Math.min(item.percentage, 100)}%` }}
                                    >

                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-stone-400 mt-2">No budget set</p>
                        )}
                    </div>
                ))}
            </div>
            {showSetLimit && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xs">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto shadow-2xl border border-stone-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-medium text-stone-800">Set Budget Limits</h3>
                            <button
                                onClick={() => setShowSetLimit(false)}
                                className="text-stone-400 hover:text-stone-600 text-2xl font-light"
                            >
                                ×
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            {expenseCategories.map((category) => {
                                const existingBudget = budgets.find((b) => b.category === category);
                                return (
                                    <div key={category} className="border border-stone-200 rounded-lg p-3">
                                        <label className="block text-sm font-medium text-stone-700 mb-2">
                                            {category}
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Enter limit"
                                            defaultValue={existingBudget?.limit || ''}
                                            onBlur={(e) => {
                                                const newLimit = parseFloat(e.target.value) || 0;
                                                onUpdateBudget(category, newLimit);
                                            }}
                                            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none
  focus:ring-2 focus:ring-amber-500"
                                        />
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}