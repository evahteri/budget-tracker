const express = require('express')

module.exports = ({ logger }) => {
  const router = express.Router();

  router.get('/health', (request, response) => {
    logger.info('get(/health)')
    response.status(200).json({ status: 'ok' })
  })

    router.get('/', (request, response) => {
    logger.info('get(/)')
    response.status(200).json({ status: 'ok' })
  })

  return router;
};