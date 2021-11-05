
import { IResponseProduct } from "~/domain/models/response-service";

export interface FindProductByIdRepository {
  findById(id: string): Promise<IResponseProduct>;
}