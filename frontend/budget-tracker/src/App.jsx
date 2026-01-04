import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getExpenses } from './requests'
import './App.css'

function App() {
  const { data: expenses = [], isLoading, error } = useQuery({
    queryKey: ['expenses'],
    queryFn: getExpenses,
  })

  if (isLoading) return <div className="p-8">Loading...</div>
  if (error) return <div className="p-8 text-red-600">Error loading expenses</div>

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8">Budget Tracker</h1>

      <div className="bg-white rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {expenses.map((expense) => (
            <div key={expense.id} className="border rounded-lg p-4 hover:shadow-lg transition">
              <h3 className="font-semibold text-lg">{expense.description}</h3>
              <p className="text-gray-600">{expense.category}</p>
              <p className="text-2xl font-bold text-blue-800 mt-2">${expense.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
