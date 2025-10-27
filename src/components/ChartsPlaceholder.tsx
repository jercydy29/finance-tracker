import {
    PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import type { Transaction } from "@/features/transactions/types";
import { Percent } from 'lucide-react';
type Props = {
    transactions: Transaction[];
}
export default function ChartsPlaceholder({ transactions }: Props) {

    //Get current month and year
    const now = new Date();
    const month = now.getMonth(); // 0-11
    const year = now.getFullYear(); //2025

    // Filter only expense
    const expenses = transactions.filter(t => {
        if(t.type !== 'expense') return false;

        const transactionDate = new Date(t.date);
        const transactionMonth = transactionDate.getMonth();
        const transactionYear = transactionDate.getFullYear();

        return transactionMonth === month && transactionYear === year;
    })
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

    // Process transactions for Monthly Trends
    const monthlyData: { [key: string]: { income: number; expense: number } } = {};
    transactions.forEach(transaction => {
        // Extract month year from date
        const date = new Date(transaction.date);
        const monthYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        const amount = parseFloat(transaction.amount);

        // Initialize month if it doesn't exist
        if (!monthlyData[monthYear]) {
            monthlyData[monthYear] = { income: 0, expense: 0 };
        }

        // Add to appropriate category
        if (transaction.type === 'income') {
            monthlyData[monthYear].income += amount;
        } else {
            monthlyData[monthYear].expense += amount;
        }
    });

    // Convert to array format for Recharts
    const monthlyChartData = Object.keys(monthlyData).map(month => (
        {
            month: month,
            income: monthlyData[month].income,
            expense: monthlyData[month].expense
        }
    ));
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-stone-200">
                <h3 className="text-lg font-medium text-stone-800 mb-4">Expense Breakdown</h3>
                <div className="h-64">
                    {chartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData} //passed the actual array data to the Piechart
                                    // cx and cy is to center it in the middle
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false} // whether to draw. line to the label or not
                                    label={({ name }) => name} //each slices of pie label
                                    innerRadius={20} //create the hole inside the piechart
                                    outerRadius={80} // to determine how big is the piechart form the center
                                    fill='#8884d8' // default fill color 
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}></Cell>
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `$${value}`} />
                                <Legend
                                    iconType="circle"
                                    iconSize={12}
                                    wrapperStyle={
                                        {
                                            fontSize: '12px',
                                        }
                                    }
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-64 bg-stone-50 rounded-lg flex items-center justify-center">
                            <p className="text-stone-500">No data available</p>
                        </div>
                    )}

                </div>
            </div >
            <div className="bg-white rounded-lg p-6 shadow-sm border border-stone-200">
                <h3 className="text-lg font-medium text-stone-800 mb-4">Monthly Trends</h3>
                <div className="h-64">
                    {monthlyChartData.length > 0 ? (
                        <ResponsiveContainer>
                            <BarChart data={monthlyChartData}>
                                <CartesianGrid strokeDasharray='3 3'/>
                                <XAxis dataKey='month'/>
                                <YAxis />
                                <Tooltip />
                                <Legend
                                    iconType="circle"
                                    iconSize={12}
                                    wrapperStyle={
                                        {
                                            fontSize: '12px',
                                        }
                                    }
                                />
                                <Bar dataKey='income' fill= '#10b981' />
                                <Bar dataKey='expense' fill= '#ef4444' />
                            </BarChart>
                            
                        </ResponsiveContainer>
                    ): (
                        <div className="h-64 bg-stone-50 rounded-lg flex items-center justify-center">
                            <p className="text-stone-500">No data available</p>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}

