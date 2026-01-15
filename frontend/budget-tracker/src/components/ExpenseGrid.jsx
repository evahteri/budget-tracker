import ExpenseCard from './ExpenseCard';

const ExpenseGrid = ({ expenses, onEdit }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
    {expenses.map(expense => (
      <ExpenseCard
        key={expense.id}
        expense={expense}
        onEdit={onEdit}
      />
    ))}
  </div>
);

export default ExpenseGrid;
