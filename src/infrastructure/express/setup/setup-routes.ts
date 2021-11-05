import { Application } from 'express';
import { productRoutes } from '../routes/product';
import { rateLimiter } from '../middlewares/rate-limit';

export const setupRoutes = (app: Application): void => {
  app.use('/api', rateLimiter, productRoutes);
};
