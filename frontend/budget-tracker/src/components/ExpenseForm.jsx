const ExpenseForm = ({ onSubmit, categories }) => (
    <form className="flex gap-4 flex-wrap" onSubmit={onSubmit}>
        <input
            type="text"
            placeholder="Description"
            className="flex-1 min-w-64 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
            name="category"
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            {categories.map(category => (
                <option key={category.title} value={category.title}>{category.title}</option>
            ))}
        </select>
        <input
            type="number"
            placeholder="Amount"
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            step="0.01"
        />
        <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
            Add Expense
        </button>
    </form>
);

export default ExpenseForm;
