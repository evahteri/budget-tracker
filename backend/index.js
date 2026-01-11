const express = require('express')
const app = express()

app.use(express.json())

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

app.get('/api/expenses', (request, response) => {
  response.json(expenses)
})

app.post('/api/expenses', (request, response) => {
  const newExpense = request.body
  newExpense.id = (expenses.length + 1).toString()
  newExpense.date = new Date().toISOString().split('T')[0]
  expenses.push(newExpense)
  response.status(201).json(newExpense)
})

app.put('/api/expenses/:id', (request, response) => {
  const expense = expenses.find(e => e.id === request.params.id)
  if (expense) {
    Object.assign(expense, request.body)
    response.status(200).json(expense)
  } else {
    response.status(404).end()
  }
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)