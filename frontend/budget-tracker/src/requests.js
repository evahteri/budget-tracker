const baseUrl = '/api/expenses'

export const getExpenses = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch expenses')
  }
  return await response.json()
}