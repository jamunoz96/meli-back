
import { FindProductsBySearch } from '~/application/use-cases/product/find-products-by-search';
import { IResponseProductList } from '~/domain/models/response-service';
import { findProductsBySearchRepository } from '~/infrastructure/repositories/product/product-default-repository';
import { FindProductsBySearchController } from '~/presentation/controllers/product/find-products-by-search-controller';
import { GenericSuccessResponse } from '~/presentation/responses/generic-success-response';

export const findProductsBySearchControllerFactory = () => {
  
  const findProductsBySearchUseCase = new FindProductsBySearch(findProductsBySearchRepository);
  const genericSuccessPresenter = new GenericSuccessResponse<IResponseProductList>();
  const findProductsBySearchController = new FindProductsBySearchController(
    findProductsBySearchUseCase,
    genericSuccessPresenter
  );

  return {
    findProductsBySearchController,
    findProductsBySearchUseCase,
    genericSuccessPresenter
  };
};
