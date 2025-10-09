export default function StatsCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-stone-200">
                <h2 className="text-sm font-medium text-stone-600 mb-2">Income</h2>
                <p className="text-2xl font-light text-emerald-700">$5,000</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-stone-200">
                <h2 className="text-sm font-medium text-stone-600 mb-2">Expenses</h2>
                <p className="text-2xl font-light text-red-600">$3,500</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-stone-200">
                <h2 className="text-sm font-medium text-stone-600 mb-2">Balance</h2>
                <p className="text-2xl font-light text-emerald-700">$1,500</p>
            </div>
        </div>
    );
}

