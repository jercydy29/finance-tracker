import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { Transaction } from "@/features/transactions/types";
import { Percent } from 'lucide-react';
type Props = {
    transactions: Transaction[];
}
export default function ChartsPlaceholder({ transactions }: Props) {

    // Filter only expense
    const expenses = transactions.filter(t => t.type === 'expense');
    // Group expenses by category and sum them up
    const expenseByCategory: { [key: string]: number } = {};

    expenses.forEach(transaction => {
        const category = transaction.category;
        const amount = parseFloat(transaction.amount);

        if (expenseByCategory[category]) {
            expenseByCategory[category] += amount;
        } else {
            expenseByCategory[category] = amount;
        }
    });

    // convert to array format for recharts
    const chartData = Object.keys(expenseByCategory).map(category => ({
        name: category,
        value: expenseByCategory[category]
    }));
    // Colors for different categories
    const COLORS = ['#f59e0b', '#ef4444', '#8b5cf6', '#10b981', '#3b82f6', '#ec4899', '#f97316', '#06b6d4', '#84cc16'];
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-stone-200">
                <h3 className="text-lg font-medium text-stone-800 mb-4">Expense Breakdown</h3>
                <div className="h-64">
                    {chartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name }) => name}
                                    outerRadius={80}
                                    fill='#8884d8'
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}></Cell>
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `$${value}`} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <p>hi</p>
                    )}

                </div>
            </div >
            <div className="bg-white rounded-lg p-6 shadow-sm border border-stone-200">
                <h3 className="text-lg font-medium text-stone-800 mb-4">Monthly Trends</h3>
                <div className="h-64 bg-stone-50 rounded-lg flex items-center justify-center">
                    <p className="text-stone-500">Chart will go here</p>
                </div>
            </div>
        </div >
    );
}

