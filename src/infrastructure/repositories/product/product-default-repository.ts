
import { FindProductByIdRepository } from '~/application/ports/repositories/product/find-product-by-id-repository';
import { FindProductsBySearchRepository } from '~/application/ports/repositories/product/find-products-by-search-repository';
import { ProductData } from './data/product-data';

const productData = new ProductData();
const findProductByIdRepository: FindProductByIdRepository = productData;
const findProductsBySearchRepository: FindProductsBySearchRepository = productData;

export {
  findProductByIdRepository,
  findProductsBySearchRepository
};
