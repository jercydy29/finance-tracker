'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Transaction, Budget } from '@/features/transactions/types'
import AddTransaction from '@/components/AddTransaction'
import TransactionsSection from '@/components/TransactionsSection'
import StatsCards from '@/components/StatsCards'
import ChartsPlaceholder from '@/components/ChartsPlaceholder'
import BudgetOverview from '@/components/BudgetOverview'


export default function Dashboard() {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    // track whether data is being fetched
    // start as true because we fetch on mount
    // USed to show loading indicators to user
    const [loading, setLoading] = useState(true)
    // stores any error messages from failed database operations
    // null means no error
    // important for async operation that can fail
    const [error, setError] = useState<string | null>(null)
    const [budgets, setBudgets] = useState<Budget[]>([])

    // it take Transaction object or null and its initial value is null
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

    const fetchTransactions = async () => {
        setLoading(true);

        const { data, error } = await supabase
            .from('transactions')
            .select('*')
            .order('date', { ascending: false });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        if (data) {
            setTransactions(data);
        }

        setLoading(false);
    };
    // calling async function inside useEffect to fetch data on mount
    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleAdd = async (t: Transaction) => {
        const { error } = await supabase
            .from('transactions')
            .insert([{
                type: t.type,
                category: t.category,
                amount: t.amount,
                description: t.description,
                date: t.date
            }]);
        if (error) {
            console.error('Error adding transaction:', error);
            setError(error.message);
            return;
        }
        // Refresh transaction from database
        fetchTransactions();
    }

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            const { error } = await supabase
                .from('transactions')
                .delete()
                .eq('id', id);
            if (error) {
                console.error('Error deleting transaction:', error);
                setError(error.message);
                return;
            }
            // Refresh transactions from database
            fetchTransactions();
        }
    }

    const handleEdit = async (updatedTransaction: Transaction) => {
        const {error} = await supabase
            .from('transactions')
            .update({
                type: updatedTransaction.type,
                category: updatedTransaction.category,
                amount: updatedTransaction.amount,
                description: updatedTransaction.description,
                date: updatedTransaction.date
            })
            .eq('id', updatedTransaction.id);
            
        if (error) {
            console.error('Error updating transaction:', error);
            setError(error.message);
            return;
        }
        setEditingTransaction(null);
        fetchTransactions();
    }

    const handleUpdateBudget = (category: string, limit: number) => {
        setBudgets((prev) => {
            const existing = prev.find((b) => b.category === category);
            if (existing) {
                return prev.map((b) => b.category === category ? { category, limit } : b);
            } else {
                return [...prev, { category, limit }];
            }
        })
    }
    return (
        <div className="min-h-screen bg-stone-50 p-6" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-light text-stone-800 mb-2">Personal Finance</h1>
                    <p className="text-stone-600">Track your expenses and manage your budget</p>
                </div>

                <AddTransaction
                    onAdd={handleAdd}
                    editingTransaction={editingTransaction}
                    onEdit={handleEdit}
                    onCancelEdit={() => setEditingTransaction(null)
                    }
                />
                <StatsCards transactions={transactions}
                    selectedDate={selectedDate}
                />

                <ChartsPlaceholder transactions={transactions} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />


                <BudgetOverview transactions={transactions}
                    budgets={budgets}
                    selectedDate={selectedDate}
                    onUpdateBudget={handleUpdateBudget}
                />
                <TransactionsSection
                    transactions={transactions}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    onDelete={handleDelete}
                    onEdit={(transaction) => setEditingTransaction(transaction)}
                />
            </div>
        </div>
    )
}
