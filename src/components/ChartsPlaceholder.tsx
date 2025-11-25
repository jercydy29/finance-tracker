import {
    PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import type { Transaction } from "@/features/transactions/types";
// import { Percent } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { months } from "@/features/transactions/constants";
import { formatMonth } from "@/features/transactions/utils";
type Props = {
    transactions: Transaction[];
    selectedDate: Date;
    setSelectedDate: (d: Date) => void;
}
export default function ChartsPlaceholder({ transactions, selectedDate, setSelectedDate }: Props) {

    //Get current month and year
    const now = new Date();

    // State for year picker
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());
    const [showYearPicker, setShowYearPicker] = useState(false);
    const yearPickerRef = useRef<HTMLDivElement>(null);

    const currentMonth = now.getMonth(); // 0-11
    const currentYear = now.getFullYear(); //2025

    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const monthPickerRef = useRef<HTMLDivElement>(null);

    // Extract available years from transactions
    const availableYears = [...new Set(
        transactions.map(t => new Date(t.date).getFullYear())
    )].sort((a, b) => a - b);

    // Generate list of available month(up to current month)
    const availableMonth = transactions
        .map(t => {
            const date = new Date(t.date);
            return {
                month: date.getMonth(),
                year: date.getFullYear()
            };
        })
        .filter(({ month, year }) => {
            // only include months up to the current month/year
            if (year < currentYear) return true;
            if (year === currentYear && month <= currentMonth) return true;
            return false;
        })
        .filter((item, index, self) => {
            // remove duplicates
            return index === self.findIndex(t => t.month === item.month && t.year === item.year);
        })
        .sort((a, b) => {
            if (a.year !== b.year) return a.year - b.year;
            return a.month - b.month;
        })
    console.log(availableMonth);


    // Handle click outside to close year picker
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (yearPickerRef.current && !yearPickerRef.current.contains(event.target as Node)) {
                setShowYearPicker(false);
            }
        };
        if (showYearPicker) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [showYearPicker]);
    // Handle click outside to close month picker
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (monthPickerRef.current && !monthPickerRef.current.contains(event.target as Node)) {
                setShowMonthPicker(false);
            }
        };
        if (showMonthPicker) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.addEventListener('mousedown', handleClickOutside);
        }
    }, [showMonthPicker]);

    // Filter only expense
    const expenses = transactions.filter(t => {
        if (t.type !== 'expense') return false;

        const transactionDate = new Date(t.date);
        const transactionMonth = transactionDate.getMonth();
        const transactionYear = transactionDate.getFullYear();

        return transactionMonth === selectedDate.getMonth() && transactionYear === selectedDate.getFullYear();
    })
    // Group expenses by category and sum them up
    const expenseByCategory: { [key: string]: number } = {};

    expenses.forEach(transaction => {
        const category = transaction.category;
        const amount = transaction.amount;

        if (expenseByCategory[category]) {
            expenseByCategory[category] += amount;
        } else {
            expenseByCategory[category] = amount;
        }
    });

    // convert to array format for recharts
    const pieChartData = Object.keys(expenseByCategory).map(category => ({
        name: category,
        value: expenseByCategory[category]
    }));
    // Colors for different categories
    const COLORS = ['#f59e0b', '#ef4444', '#8b5cf6', '#10b981', '#3b82f6', '#ec4899', '#f97316', '#06b6d4', '#84cc16'];

    // Process transactions for Monthly Trends
    const monthlyData: { [key: string]: { income: number; expense: number } } = {};
    transactions
        .filter(t => new Date(t.date).getFullYear() === selectedYear)
        .forEach(transaction => {
            // Extract month year from date
            const date = new Date(transaction.date);
            const monthYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            const amount = transaction.amount;

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
    ))
    .sort((a, b) => {
        const dateA = new Date(a.month);
        const dateB = new Date(b.month);
        return dateA.getTime() - dateB.getTime();
    })

    // calculate year totals for summary
    const yearTotalIncome = monthlyChartData.reduce((sum, month) => sum + month.income, 0);
    const yearTotalExpense = monthlyChartData.reduce((sum, month) => sum + month.expense, 0);

    // Calculate minimum chart width based on data point
    const chartMinWidth = Math.max(600, monthlyChartData.length * 60)
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-stone-200">
                <div className='flex justify-between items-center mb-4'>
                    <h3 className="text-lg font-medium text-stone-800 mb-4">Expense Breakdown</h3>
                    <div className='relative' ref={monthPickerRef}>
                        <button
                            onClick={() => setShowMonthPicker(!showMonthPicker)}
                            className='flex items-center space-x-2 bg-stone-100 text-stone-700 px-4 py-2 rounded-lg text-sm font-medium
                            hover:bg-stone-200 transition-colors cursor-pointer'
                        >
                            <span>
                                {formatMonth(selectedDate)}
                            </span>
                            <span>▼</span>
                        </button>
                        {showMonthPicker && (
                            <div className='absolute right-0 top-full mt-2 bg-white border border-stone-200 rounded-lg shadow-lg p-4 z-10'>
                                <div className='w-64'>
                                    {/* year picker */}
                                    <div className='flex justify-between items-center mb-4 text-stone-800'>
                                        <button
                                            onClick={() => {
                                                const d = new Date(selectedDate);
                                                d.setFullYear(selectedDate.getFullYear() - 1);
                                                setSelectedDate(d);
                                            }}
                                            disabled={availableYears.length > 0 && selectedDate.getFullYear() <= availableYears[0]}
                                            className={`px-2 py-1 rounded ${availableYears.length > 0 && selectedDate.getFullYear() <= availableYears[0]
                                                ? 'text-stone-300 cursor-not-allowed'
                                                : 'hover:bg-stone-100 cursor-pointer'
                                                }`}
                                        >
                                            ‹
                                        </button>
                                        <p>{selectedDate.getFullYear()}</p>
                                        <button
                                            onClick={() => {
                                                const d = new Date(selectedDate);
                                                d.setFullYear(selectedDate.getFullYear() + 1);
                                                setSelectedDate(d);
                                            }}
                                            disabled={selectedDate.getFullYear() >= currentYear}
                                            className={`px-2 py-1 rounded ${selectedDate.getFullYear() >= currentYear
                                                ? 'text-stone-300 cursor-not-allowed'
                                                : 'hover:bg-stone-100 cursor-pointer'
                                                }`}
                                        >
                                            ›
                                        </button>
                                    </div>
                                    {/* current month */}
                                    <div className='mb-4'>
                                        <button
                                            onClick={() => {
                                                setSelectedDate(new Date());
                                                setShowMonthPicker(false);
                                            }}
                                            className='w-full p-2 text-sm text-stone-500 bg-stone-50 rounded hover:bg-stone-100 transition-colors cursor-pointer'
                                        >
                                            current month
                                        </button>
                                    </div>
                                    {/* month picker */}
                                    <div className='grid grid-cols-3 gap-2'>
                                        {months.map((month, index) => {
                                            const isSelected = selectedDate.getMonth() === index;
                                            const isFutureMonth = selectedDate.getFullYear() === currentYear && index > currentMonth;

                                            return (
                                                <button
                                                    key={month}
                                                    onClick={() => {
                                                        const d = new Date(selectedDate);
                                                        d.setMonth(index);
                                                        setSelectedDate(d);
                                                        setShowMonthPicker(false);
                                                    }}
                                                    // the button will be disabled if it's a future month 
                                                    disabled={isFutureMonth}
                                                    className={`px-4 py-2 text-sm rounded ${isFutureMonth
                                                        ? 'text-stone-300 cursor-not-allowed'
                                                        : isSelected
                                                            ? 'bg-amber-600 text-white hover:bg-amber-700'
                                                            : 'text-stone-700 hover:bg-stone-100'
                                                        }`}
                                                >
                                                    {month}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="h-64">
                    {pieChartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieChartData} //passed the actual array data to the Piechart
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
                                    {pieChartData.map((entry, index) => (
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
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-stone-800">Monthly Trends</h3>
                    <p className='text-xs text-stone-500 mt-1'>
                        {selectedYear}: ${yearTotalIncome.toFixed(2)} income | ${yearTotalExpense.toFixed(2)} expenses
                    </p>
                    <div className='relative' ref={yearPickerRef}>
                        <button
                            onClick={() => {
                                // console.log(selectedYear)
                                setShowYearPicker(!showYearPicker)
                            }}
                            className='flex items-center space-x-2 bg-stone-100 text-stone-700 px-4 py-2 rounded-lg text-sm font-medium
                            hover:bg-stone-200 transition-colors cursor-pointer'
                        >
                            <span>{selectedYear}</span>
                            <span>▼</span>
                        </button>
                        {showYearPicker && availableYears.length > 0 && (
                            <div className='absolute right-0 top-full mt-2  bg-white border-stone-200 rounded-lg shadow-lg p-4 z-10'>
                                <div className='flex flex-col space-y-2'>
                                    {availableYears.map(year => (
                                        <button
                                            key={year}
                                            onClick={() => {
                                                setSelectedYear(year);
                                                setShowYearPicker(false);
                                            }}
                                            className={`px-4 py-2 text-sm rounded-lg  text-left ${selectedYear === year
                                                ? 'bg-amber-600 text-white hover:bg-amber-700'
                                                : 'text-stone-700 hover:bg-stone-100'
                                                } cursor-pointer`}
                                        >
                                            {year}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="h-64 overflow-x-auto overflow-y-hidden">
                    {monthlyChartData.length > 0 ? (
                        <div style={{ minWidth: `${chartMinWidth}px`, height: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyChartData}>
                                    <CartesianGrid strokeDasharray='3 3' />
                                    <XAxis dataKey='month' />
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
                                    <Bar dataKey='income' fill='#10b981' />
                                    <Bar dataKey='expense' fill='#ef4444' />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="h-64 bg-stone-50 rounded-lg flex items-center justify-center">
                            <p className="text-stone-500">No data available</p>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}

