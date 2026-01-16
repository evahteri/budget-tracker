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

    const editExpense = async (event) => {
        const newExpense = event
        newExpense.amount = parseFloat(newExpense.amount) + 10  // Just for testing
        const responseData = await putExpense(newExpense.id, newExpense)
        setExpenses((prev) => prev.map(exp => exp.id === newExpense.id ? responseData : exp))
    }

    return {
        expenses,
        isLoading,
        error,
        addExpense,
        editExpense,
    }
}
