import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getExpenses, postExpense, putExpense } from '../api/expenses.api'

export function useExpenses() {
  const expenseQuery = useQuery({
    queryKey: ['expenses'],
    queryFn: () => getExpenses('all'),
  })

  const { data: expensesData = [], isLoading, error } = expenseQuery

  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    setExpenses(expensesData)
  }, [expensesData])

  const addExpense = async (event) => {
    event.preventDefault()

    const newExpense = {
      description: event.target[0].value,
      category: event.target[1].value,
      amount: parseFloat(event.target[2].value),
    }

    const responseData = await postExpense(newExpense)
    newExpense.id = responseData.id

    setExpenses((prev) => [...prev, newExpense])
  }

  return {
    expenses,
    isLoading,
    error,
    addExpense,
  }
}
