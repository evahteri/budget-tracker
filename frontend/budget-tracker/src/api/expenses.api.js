import axios from 'axios'

const baseUrl = '/api/expenses'

export const getExpenses = (category, month) => {
  console.log('Fetching expenses for category:', category, 'and month:', month)

  const now = new Date();
  const year = now.getUTCFullYear();
  // Use provided month (1-12), fallback to current month if not provided
  const targetMonth = month ? month - 1 : now.getUTCMonth();

  // First day of selected month
  const dateFrom = new Date(Date.UTC(year, targetMonth, 1));
  // Last day of selected month
  const dateTo = new Date(Date.UTC(year, targetMonth + 1, 0));

  return axios
    .get(`${baseUrl}/${category}`, {
      params: {
        date_from: dateFrom.toISOString().slice(0, 10),
        date_to: dateTo.toISOString().slice(0, 10)
      }
    })
    .then(response => {
      const expenses = response.data
      console.log('Fetched expenses:', expenses)
      return expenses
    })
    .catch(function (error) {
      console.log(error);
    })
}

export const postExpense = (newExpense) => {
  console.log('Posting new expense:', newExpense)
  return axios
    .post(baseUrl, newExpense)
    .then(response => {
      const responseData = response.data
      console.log('Created expenses:', responseData)
      return responseData
    })
    .catch(function (error) {
      console.log(error);
    })
}

export const putExpense = (expenseId, updatedExpense) => {
  console.log('Editing expense:', expenseId)
  return axios
    .put(`${baseUrl}/${expenseId}`, updatedExpense)
    .then(response => {
      const responseData = response.data
      console.log('Edited expenses:', responseData)
      return responseData
    })
    .catch(function (error) {
      console.log(error);
    })
}

