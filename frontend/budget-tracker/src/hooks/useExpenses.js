import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getExpenses, postExpense, putExpense } from '../api/expenses.api'
import { useState } from 'react';

export function useExpenses() {
    const queryClient = useQueryClient();
    const [filter, setFilter] = useState({ category: 'all', month: 1 });

    const newExpenseMutation = useMutation({
        mutationFn: (newExpense) => postExpense(newExpense),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses', filter.category, filter.month] });
        },
    });

    const editExpenseMutation = useMutation({
        mutationFn: ({ expenseId, updatedExpense }) => putExpense(expenseId, updatedExpense),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses', filter.category, filter.month] });
        },
    });

    const addExpense = async (event) => {
        event.preventDefault();

        const newExpense = {
            description: event.target[0].value,
            category: event.target[1].value,
            amount: parseFloat(event.target[2].value),
        };

        newExpenseMutation.mutate(newExpense);
    };

    const editExpense = async (event) => {
        const newExpense = event;
        newExpense.amount = parseFloat(newExpense.amount) + 10; // Just for testing
        editExpenseMutation.mutate({ expenseId: newExpense.id, updatedExpense: newExpense });
    };

    const applyFilterMonth = (month) => {
        const monthMap = {
            January: 1,
            February: 2,
            March: 3,
            April: 4,
            May: 5,
            June: 6,
            July: 7,
            August: 8,
            September: 9,
            October: 10,
            November: 11,
            December: 12
        };
        setFilter({ category: filter.category, month: month ? monthMap[month] : null });
    };

    const applyFilterCategory = (category) => {
        setFilter({ month: filter.month, category });
    }

    const { data: expenses = [], isLoading, error } = useQuery({
        queryKey: ['expenses', filter.category, filter.month],
        queryFn: () => getExpenses(filter.category, filter.month),
    });

    return {
        expenses,
        isLoading,
        error,
        addExpense,
        editExpense,
        applyFilterMonth,
        applyFilterCategory,
        filter,
    };
}
