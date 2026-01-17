const express = require('express')

let expenses = [
  {
    id: "1",
    description: "Groceries",
    amount: 50,
    date: "2025-01-01",
    category: "Food"
  },
  {
    id: "2",
    description: "Utilities",
    amount: 100,
    date: "2025-01-03",
    category: "Bills"
  },
  {
    id: "3",
    description: "Rent",
    amount: 800,
    date: "2025-01-01",
    category: "Housing"
  }
]

module.exports = ({ logger }) => {
  const router = express.Router();

  router.get('/expenses/:category', (request, response) => {
    const category = request.params.category
    logger.info('get(/expenses/:category)', { category })
    if (category === 'all') {
      response.json(expenses)
      return
    }
    const filteredExpenses = expenses.filter(e => e.category === category)
    response.json(filteredExpenses)
  })

  router.post('/expenses', (request, response) => {
    logger.info('post(/expenses)', { body: request.body })
    const newExpense = request.body
    newExpense.id = (expenses.length + 1).toString()
    newExpense.date = new Date().toISOString().split('T')[0]
    expenses.push(newExpense)
    response.status(201).json(newExpense)
  })

  router.put('/expenses/:id', (request, response) => {
    logger.info('put(/expenses/:id)', { body: request.body })
    const expense = expenses.find(e => e.id === request.params.id)
    if (expense) {
      Object.assign(expense, request.body)
      response.status(200).json(expense)
    } else {
      response.status(404).end()
    }
  })

  return router;
};