export default function ChartsPlaceholder() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-stone-200">
                <h3 className="text-lg font-medium text-stone-800 mb-4">Expense Breakdown</h3>
                <div className="h-64 bg-stone-50 rounded-lg flex items-center justify-center">
                    <p className="text-stone-500">Chart will go here</p>
                </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-stone-200">
                <h3 className="text-lg font-medium text-stone-800 mb-4">Monthly Trends</h3>
                <div className="h-64 bg-stone-50 rounded-lg flex items-center justify-center">
                    <p className="text-stone-500">Chart will go here</p>
                </div>
            </div>
        </div>
    );
}

