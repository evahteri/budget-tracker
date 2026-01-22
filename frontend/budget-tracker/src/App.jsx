import { useExpenses } from './hooks/useExpenses';
import { useCategories } from './hooks/useCategories';
import ExpenseForm from './components/ExpenseForm';
import ExpenseGrid from './components/ExpenseGrid';
import ExpenseFilter from './components/ExpenseFilter';

function App() {
  const {
    expenses,
    isLoading,
    error,
    addExpense,
    editExpense,
    applyFilterMonth,
    applyFilterCategory,
    filter
  } = useExpenses()

  const {
    categories,
    isLoading: isCategoriesLoading,
    error: categoriesError
  } = useCategories()

  if (isLoading || isCategoriesLoading) return <div className="p-8">Loading...</div>
  if (error || categoriesError) return <div className="p-8 text-red-600">Error loading expenses or categories</div>

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8">Budget Tracker</h1>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <ExpenseForm onSubmit={addExpense} categories={categories} />
        </div>
        <div className="p-6 border-b">
          <ExpenseFilter categories={categories} filter={filter} onClick={{ applyFilterMonth, applyFilterCategory }} />
        </div>
        <ExpenseGrid expenses={expenses} onEdit={editExpense} />
      </div>
    </div>
  )
}

export default App
