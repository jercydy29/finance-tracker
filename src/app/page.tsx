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

    // it take Transaction object or null and its initial value is null
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
    // Load transactions from localStorage on component mount
    useEffect(() => {
        const savedTransactions = localStorage.getItem(STORAGE_KEY);
        if (savedTransactions) {
            setTransactions(JSON.parse(savedTransactions));
        } else {
            // Add mock data if no saved transactions exist - Full year data (Jan-Nov 2025)
            const mockData: Transaction[] = [
                // January 2025
                {id:'1',type:'income',category:'Salary',amount:'5000',description:'Monthly salary',date:'2025-01-05'},
                {id:'2',type:'expense',category:'Food',amount:'250',description:'Groceries - Week 1',date:'2025-01-08'},
                {id:'3',type:'expense',category:'Transport',amount:'80',description:'Gas',date:'2025-01-10'},
                {id:'4',type:'expense',category:'Food',amount:'180',description:'Groceries - Week 2',date:'2025-01-15'},
                {id:'5',type:'expense',category:'Entertainment',amount:'120',description:'Movie night',date:'2025-01-17'},
                {id:'6',type:'expense',category:'Utilities',amount:'150',description:'Electric bill',date:'2025-01-20'},
                {id:'7',type:'expense',category:'Food',amount:'220',description:'Groceries - Week 3',date:'2025-01-22'},
                {id:'8',type:'expense',category:'Shopping',amount:'180',description:'Clothing',date:'2025-01-25'},
                {id:'9',type:'income',category:'Freelance',amount:'600',description:'Side project',date:'2025-01-28'},
                {id:'10',type:'expense',category:'Food',amount:'200',description:'Groceries - Week 4',date:'2025-01-29'},

                // February 2025
                {id:'11',type:'income',category:'Salary',amount:'5000',description:'Monthly salary',date:'2025-02-05'},
                {id:'12',type:'expense',category:'Food',amount:'280',description:'Groceries - Week 1',date:'2025-02-07'},
                {id:'13',type:'income',category:'Freelance',amount:'800',description:'Design project',date:'2025-02-08'},
                {id:'14',type:'expense',category:'Transport',amount:'75',description:'Gas',date:'2025-02-10'},
                {id:'15',type:'expense',category:'Shopping',amount:'200',description:'Valentine gift',date:'2025-02-14'},
                {id:'16',type:'expense',category:'Food',amount:'190',description:'Groceries - Week 2',date:'2025-02-14'},
                {id:'17',type:'expense',category:'Health',amount:'100',description:'Doctor visit',date:'2025-02-18'},
                {id:'18',type:'expense',category:'Food',amount:'210',description:'Groceries - Week 3',date:'2025-02-21'},
                {id:'19',type:'expense',category:'Utilities',amount:'145',description:'Water bill',date:'2025-02-22'},
                {id:'20',type:'expense',category:'Entertainment',amount:'95',description:'Restaurant',date:'2025-02-26'},

                // March 2025
                {id:'21',type:'income',category:'Salary',amount:'5000',description:'Monthly salary',date:'2025-03-05'},
                {id:'22',type:'expense',category:'Food',amount:'260',description:'Groceries - Week 1',date:'2025-03-07'},
                {id:'23',type:'expense',category:'Transport',amount:'85',description:'Gas',date:'2025-03-09'},
                {id:'24',type:'expense',category:'Entertainment',amount:'150',description:'Concert tickets',date:'2025-03-12'},
                {id:'25',type:'expense',category:'Food',amount:'195',description:'Groceries - Week 2',date:'2025-03-14'},
                {id:'26',type:'expense',category:'Utilities',amount:'140',description:'Electric bill',date:'2025-03-18'},
                {id:'27',type:'expense',category:'Education',amount:'500',description:'Online course',date:'2025-03-20'},
                {id:'28',type:'expense',category:'Food',amount:'215',description:'Groceries - Week 3',date:'2025-03-21'},
                {id:'29',type:'income',category:'Investments',amount:'350',description:'Dividend payout',date:'2025-03-25'},
                {id:'30',type:'expense',category:'Food',amount:'230',description:'Groceries - Week 4',date:'2025-03-28'},

                // April 2025
                {id:'31',type:'income',category:'Salary',amount:'5000',description:'Monthly salary',date:'2025-04-05'},
                {id:'32',type:'expense',category:'Food',amount:'275',description:'Groceries - Week 1',date:'2025-04-08'},
                {id:'33',type:'expense',category:'Transport',amount:'90',description:'Gas',date:'2025-04-10'},
                {id:'34',type:'expense',category:'Shopping',amount:'320',description:'Spring wardrobe',date:'2025-04-12'},
                {id:'35',type:'expense',category:'Food',amount:'185',description:'Groceries - Week 2',date:'2025-04-15'},
                {id:'36',type:'expense',category:'Entertainment',amount:'110',description:'Weekend trip',date:'2025-04-18'},
                {id:'37',type:'expense',category:'Utilities',amount:'155',description:'Water bill',date:'2025-04-20'},
                {id:'38',type:'expense',category:'Food',amount:'205',description:'Groceries - Week 3',date:'2025-04-22'},
                {id:'39',type:'income',category:'Freelance',amount:'950',description:'Web development',date:'2025-04-25'},
                {id:'40',type:'expense',category:'Food',amount:'190',description:'Groceries - Week 4',date:'2025-04-29'},

                // May 2025
                {id:'41',type:'income',category:'Salary',amount:'5000',description:'Monthly salary',date:'2025-05-05'},
                {id:'42',type:'expense',category:'Food',amount:'290',description:'Groceries - Week 1',date:'2025-05-07'},
                {id:'43',type:'expense',category:'Transport',amount:'95',description:'Gas',date:'2025-05-09'},
                {id:'44',type:'expense',category:'Health',amount:'250',description:'Dental checkup',date:'2025-05-12'},
                {id:'45',type:'expense',category:'Food',amount:'200',description:'Groceries - Week 2',date:'2025-05-14'},
                {id:'46',type:'expense',category:'Entertainment',amount:'175',description:'Music festival',date:'2025-05-17'},
                {id:'47',type:'expense',category:'Utilities',amount:'148',description:'Electric bill',date:'2025-05-19'},
                {id:'48',type:'expense',category:'Food',amount:'220',description:'Groceries - Week 3',date:'2025-05-21'},
                {id:'49',type:'expense',category:'Shopping',amount:'150',description:'Home decor',date:'2025-05-24'},
                {id:'50',type:'expense',category:'Food',amount:'210',description:'Groceries - Week 4',date:'2025-05-28'},

                // June 2025
                {id:'51',type:'income',category:'Salary',amount:'5000',description:'Monthly salary',date:'2025-06-05'},
                {id:'52',type:'expense',category:'Food',amount:'265',description:'Groceries - Week 1',date:'2025-06-07'},
                {id:'53',type:'income',category:'Freelance',amount:'700',description:'Logo design',date:'2025-06-08'},
                {id:'54',type:'expense',category:'Transport',amount:'88',description:'Gas',date:'2025-06-10'},
                {id:'55',type:'expense',category:'Food',amount:'195',description:'Groceries - Week 2',date:'2025-06-14'},
                {id:'56',type:'expense',category:'Entertainment',amount:'200',description:'Summer vacation',date:'2025-06-18'},
                {id:'57',type:'expense',category:'Utilities',amount:'142',description:'Water bill',date:'2025-06-20'},
                {id:'58',type:'expense',category:'Food',amount:'225',description:'Groceries - Week 3',date:'2025-06-21'},
                {id:'59',type:'expense',category:'Shopping',amount:'280',description:'Summer clothes',date:'2025-06-25'},
                {id:'60',type:'expense',category:'Food',amount:'215',description:'Groceries - Week 4',date:'2025-06-28'},

                // July 2025
                {id:'61',type:'income',category:'Salary',amount:'5000',description:'Monthly salary',date:'2025-07-05'},
                {id:'62',type:'expense',category:'Food',amount:'270',description:'Groceries - Week 1',date:'2025-07-08'},
                {id:'63',type:'expense',category:'Transport',amount:'92',description:'Gas',date:'2025-07-10'},
                {id:'64',type:'expense',category:'Entertainment',amount:'180',description:'Beach trip',date:'2025-07-12'},
                {id:'65',type:'expense',category:'Food',amount:'205',description:'Groceries - Week 2',date:'2025-07-15'},
                {id:'66',type:'expense',category:'Utilities',amount:'160',description:'Electric bill (AC)',date:'2025-07-18'},
                {id:'67',type:'income',category:'Investments',amount:'420',description:'Stock dividend',date:'2025-07-20'},
                {id:'68',type:'expense',category:'Food',amount:'235',description:'Groceries - Week 3',date:'2025-07-22'},
                {id:'69',type:'expense',category:'Health',amount:'120',description:'Gym membership',date:'2025-07-25'},
                {id:'70',type:'expense',category:'Food',amount:'220',description:'Groceries - Week 4',date:'2025-07-29'},

                // August 2025
                {id:'71',type:'income',category:'Salary',amount:'5000',description:'Monthly salary',date:'2025-08-05'},
                {id:'72',type:'expense',category:'Food',amount:'285',description:'Groceries - Week 1',date:'2025-08-07'},
                {id:'73',type:'expense',category:'Transport',amount:'87',description:'Gas',date:'2025-08-09'},
                {id:'74',type:'expense',category:'Education',amount:'450',description:'Professional certification',date:'2025-08-12'},
                {id:'75',type:'expense',category:'Food',amount:'198',description:'Groceries - Week 2',date:'2025-08-14'},
                {id:'76',type:'income',category:'Freelance',amount:'1100',description:'App development',date:'2025-08-16'},
                {id:'77',type:'expense',category:'Entertainment',amount:'145',description:'Theater show',date:'2025-08-18'},
                {id:'78',type:'expense',category:'Utilities',amount:'152',description:'Water bill',date:'2025-08-20'},
                {id:'79',type:'expense',category:'Food',amount:'228',description:'Groceries - Week 3',date:'2025-08-22'},
                {id:'80',type:'expense',category:'Food',amount:'212',description:'Groceries - Week 4',date:'2025-08-29'},

                // September 2025
                {id:'81',type:'income',category:'Salary',amount:'5000',description:'Monthly salary',date:'2025-09-05'},
                {id:'82',type:'expense',category:'Food',amount:'268',description:'Groceries - Week 1',date:'2025-09-07'},
                {id:'83',type:'expense',category:'Transport',amount:'94',description:'Gas',date:'2025-09-09'},
                {id:'84',type:'expense',category:'Shopping',amount:'240',description:'Fall clothing',date:'2025-09-12'},
                {id:'85',type:'expense',category:'Food',amount:'192',description:'Groceries - Week 2',date:'2025-09-14'},
                {id:'86',type:'expense',category:'Entertainment',amount:'130',description:'Concert',date:'2025-09-17'},
                {id:'87',type:'expense',category:'Utilities',amount:'145',description:'Electric bill',date:'2025-09-19'},
                {id:'88',type:'expense',category:'Food',amount:'218',description:'Groceries - Week 3',date:'2025-09-21'},
                {id:'89',type:'income',category:'Gifts',amount:'500',description:'Birthday money',date:'2025-09-24'},
                {id:'90',type:'expense',category:'Food',amount:'205',description:'Groceries - Week 4',date:'2025-09-28'},

                // October 2025
                {id:'91',type:'income',category:'Salary',amount:'5000',description:'Monthly salary',date:'2025-10-05'},
                {id:'92',type:'expense',category:'Food',amount:'275',description:'Groceries - Week 1',date:'2025-10-07'},
                {id:'93',type:'expense',category:'Transport',amount:'91',description:'Gas',date:'2025-10-09'},
                {id:'94',type:'expense',category:'Entertainment',amount:'165',description:'Halloween party',date:'2025-10-25'},
                {id:'95',type:'expense',category:'Food',amount:'188',description:'Groceries - Week 2',date:'2025-10-14'},
                {id:'96',type:'expense',category:'Health',amount:'180',description:'Eye exam & glasses',date:'2025-10-16'},
                {id:'97',type:'expense',category:'Utilities',amount:'138',description:'Water bill',date:'2025-10-18'},
                {id:'98',type:'expense',category:'Food',amount:'222',description:'Groceries - Week 3',date:'2025-10-21'},
                {id:'99',type:'income',category:'Freelance',amount:'850',description:'Consulting work',date:'2025-10-23'},
                {id:'100',type:'expense',category:'Food',amount:'198',description:'Groceries - Week 4',date:'2025-10-28'},

                // November 2025
                {id:'101',type:'income',category:'Salary',amount:'5000',description:'Monthly salary',date:'2025-11-05'},
                {id:'102',type:'expense',category:'Food',amount:'282',description:'Groceries - Week 1',date:'2025-11-07'},
                {id:'103',type:'expense',category:'Transport',amount:'89',description:'Gas',date:'2025-11-09'},
                {id:'104',type:'expense',category:'Shopping',amount:'195',description:'Winter prep',date:'2025-11-10'},
            ];
            setTransactions(mockData);
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

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            setTransactions((prev) => prev.filter((t) => t.id !== id));
        }
    }

    const handleEdit = (updatedTransaction: Transaction) => {
        setTransactions((prev) =>
            prev.map((t) => t.id === updatedTransaction.id ? updatedTransaction : t));
        setEditingTransaction(null);
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

                <div className="bg-white rounded-lg p-6 shadow-sm border border-stone-200 mb-8">
                    <h3 className="text-lg font-medium text-stone-800 mb-4">Budget Overview</h3>
                    <p className="text-stone-500">Budget content will go here</p>
                </div>



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
