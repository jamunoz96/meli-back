import { IResponseProductList } from "~/domain/models/response-service";

export interface FindProductsBySearchRepository {
  findAll(search: string): Promise<IResponseProductList>;
}