import { IResponseProductList } from "~/domain/models/response-service";

export type FindProductsBySearchRequestModel = {
  q: string
};

export interface FindProductsBySearchCase {
  findAll(requestModel: FindProductsBySearchRequestModel): Promise<IResponseProductList>;
}
