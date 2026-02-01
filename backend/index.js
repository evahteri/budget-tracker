const express = require('express');
const app = express();

const logger = require('./services/logger');

const expensesRoutes = require('./routes/expenses.routes');
const categoriesRoutes = require('./routes/categories.routes');
const healthRoutes = require('./routes/health.routes');

app.use(express.json());

// Mount all routes
app.use('/api', expensesRoutes({ logger }));
app.use('/api', categoriesRoutes({ logger }));
app.use('/', healthRoutes({ logger }));


app.listen(3001, () => {
  logger.info('Server started on port 3001');
});