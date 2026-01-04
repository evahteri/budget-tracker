const express = require('express')
const app = express()

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

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)