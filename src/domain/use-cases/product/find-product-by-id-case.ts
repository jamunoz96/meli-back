import { IResponseProduct } from "~/domain/models/response-service";

export type FindProductByIdRequestModel = {
  id: string
};

export interface FindProductByIdCase {
  findById(requestModel: FindProductByIdRequestModel): Promise<IResponseProduct>;
}
