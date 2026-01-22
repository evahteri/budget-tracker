const MONTHS = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

const ExpenseFilter = ({ categories, filter, onClick }) => (
    <div className="p-1">
        <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
            onChange={(e) => onClick.applyFilterMonth(e.target.value)}
            defaultValue={filter.month || ""}
        >
            <option value="" disabled>Select month</option>
            {MONTHS.map((month) => (
                <option key={month} value={month}>
                    {month}
                </option>
            ))}
        </select>
        <select
            name="category"
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
            onChange={(e) => onClick.applyFilterCategory(e.target.value)}
            value={filter.category || "all"}
        >
            <option value="all">All categories</option>
            {categories.map(category => (
                <option key={category.title} value={category.title}>{category.title}</option>
            ))}
        </select>
    </div>
);

export default ExpenseFilter;
