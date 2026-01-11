import axios from 'axios'

const baseUrl = '/api/expenses'

export const getExpenses = () => {
  return axios
    .get(baseUrl)
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

