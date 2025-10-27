'use client'
import { useState, useEffect } from 'react'
import type { Transaction } from '@/features/transactions/types'
import AddTransaction from '@/components/AddTransaction'
import TransactionsSection from '@/components/TransactionsSection'
import StatsCards from '@/components/StatsCards'
import ChartsPlaceholder from '@/components/ChartsPlaceholder'

const STORAGE_KEY = 'finance-tracker-transactions';

export default function Dashboard() {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())

    // Load transactions from localStorage on component mount
    useEffect(() => {
        const savedTransactions = localStorage.getItem(STORAGE_KEY);
        if (savedTransactions) {
            setTransactions(JSON.parse(savedTransactions));
        }
    }, []); // Empty array means this runs once when component mounts

    // Save transactions to localStorage whenever they change
    useEffect(() => {
        if (transactions.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
        }
    }, [transactions]); // This runs whenever transactions changes

    const handleAdd = (t: Transaction) => {
        setTransactions((prev) => [...prev, t])
    }

    return (
        <div className="min-h-screen bg-stone-50 p-6" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-light text-stone-800 mb-2">Personal Finance</h1>
                    <p className="text-stone-600">Track your expenses and manage your budget</p>
                </div>

                <AddTransaction onAdd={handleAdd} />
                <StatsCards transactions={transactions} />

                <ChartsPlaceholder transactions={transactions} />

                <div className="bg-white rounded-lg p-6 shadow-sm border border-stone-200 mb-8">
                    <h3 className="text-lg font-medium text-stone-800 mb-4">Budget Overview</h3>
                    <p className="text-stone-500">Budget content will go here</p>
                </div>



                <TransactionsSection
                    transactions={transactions}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
            </div>
        </div>
    )
}
