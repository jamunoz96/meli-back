import { Router } from 'express';
import { findProductByIdControllerFactory } from '~/main/factories/controllers/product/find-product-by-id-controller-factory';
import { findProductsBySearchControllerFactory } from '~/main/factories/controllers/product/find-products-by-search-controller-factory';
import { expressRouteAdapter } from '../adapters/express-route-adapter';

export const productRoutes = Router();

// Controllers
const { findProductByIdController } = findProductByIdControllerFactory();
const { findProductsBySearchController } = findProductsBySearchControllerFactory();

// Routes
productRoutes.get('/items', expressRouteAdapter(findProductsBySearchController));
productRoutes.get('/items/:id', expressRouteAdapter(findProductByIdController));
