import { Controller } from '~/application/ports/controllers/controller';
import { ResponseHandler } from '~/application/ports/responses/response-handler';
import { RequestModel } from '~/application/ports/requests/request-model';
import { RequestValidationError } from '~/application/errors/request-validation-error';
import { FindProductByIdCase, FindProductByIdRequestModel } from '~/domain/use-cases/product/find-product-by-id-case';
import { IResponseProduct } from '~/domain/models/response-service';


export class FindProductByIdController implements Controller<IResponseProduct | never> {
  constructor(
    private readonly findProductByIdUseCase: FindProductByIdCase,
    private readonly findProductsByIdPresenter: ResponseHandler<IResponseProduct>,
  ) {}

  async handleRequest(requestModel:  RequestModel<void, FindProductByIdRequestModel>) {

    if (!requestModel || !requestModel.params || !requestModel.params.id) {
      throw new RequestValidationError('Missing params');
    }

    const products = await this.findProductByIdUseCase.findById(requestModel.params);
    return this.findProductsByIdPresenter.response(products);
  }

}
