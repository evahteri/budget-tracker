const express = require('express')

let categories = [
    { id: "1", title: "Living", description: "Expenses related to housing and daily living." },
    { id: "2", title: "Food & Utilities", description: "Costs for groceries and household utilities." },
    { id: "3", title: "Static expenses", description: "Regular, recurring expenses that do not change often." },
    { id: "4", title: "Bills", description: "Payments for services such as electricity, water, or internet." },
    { id: "5", title: "Savings", description: "Money set aside for future use." },
    { id: "6", title: "Lunches", description: "Expenses specifically for lunch meals." },
    { id: "7", title: "Fun", description: "Entertainment and leisure activities." },
    { id: "8", title: "Transportation", description: "Costs for commuting and travel." },
    { id: "9", title: "Restaurants & Cafes", description: "Dining out and coffee shop expenses." },
    { id: "10", title: "Clothes", description: "Purchases of clothing and apparel." }
]

module.exports = ({ logger }) => {
    const router = express.Router();

    router.get('/categories', (request, response) => {
        logger.info('get(/api/categories)')
        response.json(categories)
    })

    router.post('/categories', (request, response) => {
        logger.info('post(/api/categories)', { body: request.body })
        const newCategory = request.body
        newCategory.id = (categories.length + 1).toString()
        categories.push(newCategory)
        response.status(201).json(newCategory)
    })

    router.put('/categories/:id', (request, response) => {
        logger.info('put(/api/categories/:id)', { body: request.body })
        const category = categories.find(c => c.id === request.params.id)
        if (category) {
            Object.assign(category, request.body)
            response.status(200).json(category)
        } else {
            response.status(404).end()
        }
    })

    return router;
};