
import { FindProductByIdRepository } from '~/application/ports/repositories/product/find-product-by-id-repository';
import { IResponseProduct } from '~/domain/models/response-service';
import { FindProductByIdCase, FindProductByIdRequestModel } from '~/domain/use-cases/product/find-product-by-id-case';

export class FindProductById implements FindProductByIdCase {
  
  constructor(
    private readonly findProductsBySearchRepository: FindProductByIdRepository
  ) {}

  async findById(request: FindProductByIdRequestModel): Promise<IResponseProduct> | never {
    const product = await this.findProductsBySearchRepository.findById(request.id);
    return product;
  }
}
