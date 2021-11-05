import { FindProductsBySearchRepository } from '~/application/ports/repositories/product/find-products-by-search-repository';
import { IResponseProductList } from '~/domain/models/response-service';
import {
  FindProductsBySearchRequestModel,
  FindProductsBySearchCase,
} from '~/domain/use-cases/product/find-products-by-search-case';

export class FindProductsBySearch implements FindProductsBySearchCase {
  
  constructor(
    private readonly findProductsBySearchRepository: FindProductsBySearchRepository
  ) {}

  async findAll(request: FindProductsBySearchRequestModel): Promise<IResponseProductList> | never {
    const products = await this.findProductsBySearchRepository.findAll(request.q);
    return products;
  }
}
