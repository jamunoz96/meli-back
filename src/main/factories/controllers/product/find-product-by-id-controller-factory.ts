import { FindProductByIdController } from '~/presentation/controllers/product/find-product-by-id-controller';
import { FindProductById } from '~/application/use-cases/product/find-product-by-id';
import { findProductByIdRepository } from '~/infrastructure/repositories/product/product-default-repository';
import { GenericSuccessResponse } from '~/presentation/responses/generic-success-response';
import { IResponseProduct } from '~/domain/models/response-service';

export const findProductByIdControllerFactory = () => {

  const findProductByIdUseCase = new FindProductById(findProductByIdRepository);
  const findProductByIdPresenter = new GenericSuccessResponse<IResponseProduct>();
  const findProductByIdController = new FindProductByIdController(
    findProductByIdUseCase,
    findProductByIdPresenter
  );

  return {
    findProductByIdRepository,
    findProductByIdUseCase,
    findProductByIdPresenter,
    findProductByIdController
  };

};
