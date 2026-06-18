const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/product.routes');

const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use('/api', productRoutes);

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'blacksnow-be' });
  });

  return app;
};

module.exports = { createApp };