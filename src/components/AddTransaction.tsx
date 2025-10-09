"use client";
import { useState } from "react";
import { categories as defaultCategories } from "@/features/transactions/constants";
import type { Transaction } from "@/features/transactions/types";

type Props = {
    onAdd: (t: Transaction) => void;
    categories?: string[];
};

export default function AddTransaction({ onAdd, categories = defaultCategories }: Props) {
    const [showForm, setShowForm] = useState(false);
    const [newTransaction, setNewTransaction] = useState<Transaction>({
        type: "expense",
        category: "",
        amount: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
    });

    const handleSubmit = () => {
        if (newTransaction.category && newTransaction.amount) {
            onAdd(newTransaction);
            setNewTransaction({
                type: "expense",
                category: "",
                amount: "",
                description: "",
                date: new Date().toISOString().split("T")[0],
            });
            setShowForm(false);
        }
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-stone-200 mb-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-stone-800">Add Transaction</h3>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center space-x-2 bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors cursor-pointer"
                >
                    <span>+</span>
                    <span>Add New</span>
                </button>
            </div>

            <div className={`overflow-hidden transition-all duration-100 ${showForm ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="border-t border-stone-200 pt-4 p-2">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Type of transactions */}
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">Type</label>
                                <select
                                    value={newTransaction.type}
                                    onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value as Transaction["type"] })}
                                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                >
                                    <option value="expense">Expense</option>
                                    <option value="income">Income</option>
                                </select>
                            </div>
                            {/* categories */}
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
                                <select
                                    value={newTransaction.category}
                                    onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                >
                                    <option value="">Select category</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">Amount</label>
                                <input
                                    type="number"
                                    value={newTransaction.amount}
                                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    placeholder="Enter amount"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">Date</label>
                                <input
                                    type="date"
                                    value={newTransaction.date}
                                    onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
                                <input
                                    type="text"
                                    value={newTransaction.description}
                                    onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    placeholder="Enter description"
                                />
                            </div>
                            <div className="col-span-2 flex justify-end">
                                <button
                                    onClick={handleSubmit}
                                    className="bg-emerald-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 cursor-pointer"
                                >
                                    Save Transaction
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

