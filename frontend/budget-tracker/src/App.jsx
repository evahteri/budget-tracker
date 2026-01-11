import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getExpenses, postExpense, putExpense } from './expenses'
import './App.css'

function App() {
  const { data: expenses = [], isLoading, error } = useQuery({
    queryKey: ['expenses'],
    queryFn: getExpenses,
  })

  const addExpense = (expense) => {
    expense.preventDefault()
    const newExpense = {
      description: expense.target[0].value,
      category: expense.target[1].value,
      amount: parseFloat(expense.target[2].value),
    }
    console.log('Adding expense:', newExpense)
    postExpense(newExpense).then(() => {
      // TODO: Improve this by using React Query's way instead of reloading the page
      console.log('Expense added, reloading...')
    })
  }

  const editExpense = (expense) => {
    console.log('editing expense:', expense.id)
    console.log('expense amount:', expense.amount)
    var newExpense = expense
    newExpense.amount = parseFloat(expense.amount) + 10  // just for testing, increase amount by 10
    putExpense(expense.id, newExpense).then(() => {
      // TODO: Improve this by using React Query's way instead of reloading the page
      console.log('Expense added, reloading...')
    })
  }

  if (isLoading) return <div className="p-8">Loading...</div>
  if (error) return <div className="p-8 text-red-600">Error loading expenses</div>

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8">Budget Tracker</h1>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <form className="flex gap-4 flex-wrap" onSubmit={addExpense}>
            <input
              type="text"
              placeholder="Description"
              className="flex-1 min-w-64 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Category"
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {expenses.map((expense) => (
            <div key={expense.id} className="border rounded-lg p-4 hover:shadow-lg transition">
              <h3 className="font-semibold text-lg">{expense.description}</h3>
              <p className="text-gray-600">{expense.category}</p>
              <p className="text-2xl font-bold text-blue-800 mt-2">${expense.amount}</p>
              <button className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full" onClick={() => editExpense(expense)}>Edit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
