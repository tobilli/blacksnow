import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import cartRoutes from './routes/cart.routes.js';
import checkoutRoutes from './routes/checkout.routes.js';

const app = express();
const PORT = process.env.PORT ?? 4000;

const require = createRequire(import.meta.url);
const expressJSDocSwagger = require('express-jsdoc-swagger');
const __dirname = path.dirname(fileURLToPath(import.meta.url));

expressJSDocSwagger(app)({
  info: { version: '1.0.0', title: 'BlackSnow API', description: 'BlackSnow e-commerce backend' },
  security: { BearerAuth: { type: 'http', scheme: 'bearer' } },
  baseDir: __dirname,
  filesPattern: './routes/*.ts',
  swaggerUIPath: '/api/docs',
  exposeSwaggerUI: true,
  exposeApiDocs: true,
  apiDocsPath: '/api/docs.json',
});

// ── Middleware ──
app.use(cors({ origin: process.env.CORS_ORIGIN ?? '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ──
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);

// ── Health ──
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'blacksnow-be', timestamp: new Date().toISOString() });
});

// ── 404 ──
app.use((_req: Request, res: Response) => {
  res.status(404).json({ status: 'error', message: 'Route not found' });
});

// ── Error handler ──
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ status: 'error', message: err.message ?? 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`\n  🏔  BlackSnow API  →  http://localhost:${PORT}/api/health\n`);
});
