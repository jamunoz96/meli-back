import { IAuthor } from "./author"
import { IFilterService } from "./filter-service"
import { IProduct, IProducService, IProductDetail } from "./product"

export interface IResponseProductList {
  author: IAuthor
  categories: Array<string>
  items: Array<IProduct>
}

export interface IResponseProduct {
  author: IAuthor
  item: IProductDetail
}

export interface IResponseServiceProducts {
  results: Array<IProducService>
  filters: Array<IFilterService>
}
