import { Controller } from '~/application/ports/controllers/controller';
import { ResponseHandler } from '~/application/ports/responses/response-handler';
import { RequestModel } from '~/application/ports/requests/request-model';
import { FindProductsBySearchRequestModel, FindProductsBySearchCase } from '~/domain/use-cases/product/find-products-by-search-case';
import { RequestValidationError } from '~/application/errors/request-validation-error';
import { IResponseProductList } from '~/domain/models/response-service';


export class FindProductsBySearchController implements Controller<IResponseProductList | never> {
  constructor(
    private readonly findProductsBySearchUseCase: FindProductsBySearchCase,
    private readonly findProductsBySearchPresenter: ResponseHandler<IResponseProductList>,
  ) {}

  async handleRequest(requestModel:  RequestModel<void, void, FindProductsBySearchRequestModel>) {

    if (!requestModel || !requestModel.query || !requestModel.query.q) {
      throw new RequestValidationError('Missing params');
    }

    const products = await this.findProductsBySearchUseCase.findAll(requestModel.query);
    return this.findProductsBySearchPresenter.response(products);
  }

}
