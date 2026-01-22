const express = require('express')

let expenses = [
  {
    id: "1",
    description: "Groceries",
    amount: 50,
    date: "2026-04-01",
    category: "Food"
  },
  {
    id: "2",
    description: "Utilities",
    amount: 100,
    date: "2026-02-03",
    category: "Bills"
  },
  {
    id: "3",
    description: "Rent",
    amount: 800,
    date: "2026-01-01",
    category: "Housing"
  },
  {
    id: "4",
    description: "Food",
    amount: 800,
    date: "2026-03-10",
    category: "Food & Utilities"
  }
]

module.exports = ({ logger }) => {
  const router = express.Router();

  router.get('/expenses/:category', (request, response) => {
    const category = request.params.category
    const dateFrom = request.query.date_from
    const dateTo = request.query.date_to
    logger.info('get(/expenses/:category)', { category, dateFrom, dateTo })

    if (!dateFrom || !dateTo) {
      response.status(400).json({ error: 'date_from and date_to query parameters are required' })
      return
    }

    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);

    if (isNaN(fromDate) || isNaN(toDate)) {
      return response.status(400).json({ error: 'Invalid date format' });
    }

    const filteredExpenses = expenses.filter(e => {
      const expenseDate = new Date(e.date);
      const inRange = expenseDate >= fromDate && expenseDate <= toDate;
      const categoryMatch = category === 'all' || e.category === category;
      return categoryMatch && inRange;
    });
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