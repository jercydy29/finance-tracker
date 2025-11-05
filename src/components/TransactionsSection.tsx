"use client";
import { useEffect, useRef, useState } from "react";
import type { Transaction } from "@/features/transactions/types";
import { months } from "@/features/transactions/constants";
import { filterByMonth, formatMonth } from "@/features/transactions/utils";
import { Trash2 } from "lucide-react";
type Props = {
    transactions: Transaction[];
    selectedDate: Date;
    setSelectedDate: (d: Date) => void;
    onDelete: (id: string) => void;
};

export default function TransactionsSection({ transactions, selectedDate, setSelectedDate, onDelete }: Props) {
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const monthPickerRef = useRef<HTMLDivElement | null>(null);

    // get current year and calculate available years from transactions
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const availableYears = [...new Set(
        transactions.map(t => new Date(t.date).getFullYear())
    )].sort((a, b) => a - b);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (monthPickerRef.current && !monthPickerRef.current.contains(event.target as Node)) {
                setShowMonthPicker(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setShowMonthPicker(false);
            }
        };

        if (showMonthPicker) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [showMonthPicker]);

    const filteredTransactions = filterByMonth(transactions, selectedDate);
    const recent8 = [...filteredTransactions]
        .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
        .slice(0, 8);

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-stone-200">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-lg font-medium text-stone-800">Transactions for {formatMonth(selectedDate)}</h3>
                    <span className="text-sm text-stone-500">
                        {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? "s" : ""}
                    </span>
                </div>

                <div className="relative" ref={monthPickerRef}>
                    <button
                        onClick={() => setShowMonthPicker(!showMonthPicker)}
                        className="flex items-center space-x-2 bg-stone-100 text-stone-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-200 transition-colors cursor-pointer"
                    >
                        <span>{formatMonth(selectedDate)}</span>
                        <span>▼</span>
                    </button>
                    {showMonthPicker && (
                        <div className="absolute right-0 top-full mt-2 bg-white border border-stone-200 rounded-lg shadow-lg p-4 z-10">
                            <div className="w-64">
                                <div className="flex justify-between items-center mb-4">
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
                                        className={`px-2 py-1 rounded
                                            ${selectedDate.getFullYear() >= currentYear
                                                ? 'text-stone-300 cursor-not-allowed'
                                                : 'hover:bg-stone-100 cursor-pointer'
                                            }
                                            `}
                                    >
                                        ›
                                    </button>
                                </div>

                                <div className="mb-4">
                                    <button
                                        onClick={() => {
                                            setSelectedDate(new Date());
                                            setShowMonthPicker(false);
                                        }}
                                        className="w-full p-2 text-sm bg-stone-50 text-stone-600 rounded hover:bg-stone-100 transaction-colors"
                                    >
                                        Current Month
                                    </button>
                                </div>

                                <div className="grid grid-cols-3 gap-2">
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
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {filteredTransactions.length === 0 ? (
                <p className="text-stone-500">
                    {transactions.length === 0 ? "No Transactions yet. Save one above." : `No Transactions found for ${formatMonth(selectedDate)}.`}
                </p>
            ) : (
                <ul className="divide-y divide-stone-200">
                    {recent8.map((t, i) => (
                        <li key={t.id} className="py-3 flex justify-between items-center group">
                            <div>
                                <p className="text-sm font-medium text-stone-800">{t.category}</p>
                                <p className="text-xs text-stone-500">{t.description || '_'}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <p className={`text-sm font-medium ${t.type === 'expense'
                                        ? 'text-red-600'
                                        : 'text-emerald-700'
                                        }`}>
                                        {t.type === 'expense' ? '-' : '+'}${t.amount}
                                    </p>
                                </div>
                                <button
                                    onClick={() => onDelete(t.id)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1
                                     text-red-600 hover:bg-red-50 rounded text-sm cursor-pointer"
                                    title="Delete transaction"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

