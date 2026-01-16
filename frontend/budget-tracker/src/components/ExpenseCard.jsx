const ExpenseCard = ({ expense, onEdit }) => (
    <div className="border rounded-lg p-4 hover:shadow-lg transition">
        <h3 className="font-semibold text-lg">{expense.description}</h3>
        <p className="text-gray-600">{expense.category}</p>
        <p className="text-2xl font-bold text-blue-800 mt-2">
            ${expense.amount}
        </p>
        <button
            className="bg-blue-500 text-white py-2 px-4 rounded-full"
            onClick={() => onEdit(expense)}
        >
            Edit
        </button>
    </div>
);

export default ExpenseCard;
