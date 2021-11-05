
import { FindProductByIdRepository } from '~/application/ports/repositories/product/find-product-by-id-repository';
import { FindProductsBySearchRepository } from '~/application/ports/repositories/product/find-products-by-search-repository';
import { axiosInstance } from '~/infrastructure/axios/axios-instance';
import { getDecimals } from '~/common/helpers/get-decimal';
import { IResponseProduct, IResponseProductList, IResponseServiceProducts } from '~/domain/models/response-service';
import { IProduct, IProductDetailService } from '~/domain/models/product';
import { IvalueFilter } from '~/domain/models/filter-service';
import { IProductDescription } from '~/domain/models/product-description';
import { ICategory } from '~/domain/models/category';
import { NotFoundError } from '~/application/errors/not-found-error';

export class ProductData implements FindProductByIdRepository, FindProductsBySearchRepository {

  async findById(id: string): Promise<IResponseProduct> {
    const promiseProductServices = Promise.all([
      axiosInstance.get<IProductDetailService>(`/items/${id}`).catch(err => {
        throw new NotFoundError('Product not exists');
      }),
      axiosInstance.get<IProductDescription>(`/items/${id}/description`).catch(err => {
        throw new NotFoundError('Product not exists');
      }),
    ])

    const [detail, productDescription] = await promiseProductServices;

    let categories: Array<string> = []
    if (detail.data.category_id) {
      categories = await this.getCategoriesByProduct(detail.data.category_id)
    }

    return {
      author: {
        name: "API",
        lastName: "API",
      },
      item: {
        id: detail.data.id,
        title: detail.data.title,
        condition: detail.data.condition,
        free_shipping: detail.data.shipping.free_shipping,
        picture: detail.data.pictures.length > 0 ? detail.data.pictures[0].secure_url : "",
        price: {
          amount: detail.data.price,
          currency: detail.data.currency_id,
          decimals: getDecimals(detail.data.price),
        },
        sold_quantity: detail.data.sold_quantity,
        description: productDescription.data.plain_text,
        categories,
      },
    }

  }

  async findAll(search: string): Promise<IResponseProductList> {

    const { data: { filters, results } } = await axiosInstance.get<IResponseServiceProducts>(`https://api.mercadolibre.com/sites/MLA/search`, {
      params: {
        q: search,
      },
    });

    const products: IProduct[] = results.map<IProduct>(
      ({ id, title, currency_id, price, address, condition, shipping, thumbnail }) => {
        return {
          id,
          title,
          price: {
            currency: currency_id,
            amount: price,
            decimals: getDecimals(price),
          },
          condition,
          free_shipping: shipping.free_shipping,
          picture: thumbnail,
          state_name: address.state_name,
        }
      },
    )

    const categoryValues: IvalueFilter[] | undefined = filters.find(
      ({ id }) => id === 'category'
    )?.values
  
    const categories: string[] = categoryValues
      ? categoryValues.flatMap(({ path_from_root }) => path_from_root.map(({ name }) => name))
      : []
  
    return {
      author: {
        name: "API",
        lastName: "API",
      },
      categories,
      items: products,
    }
  
  }

  async getCategoriesByProduct(categoryId: string): Promise<string[]> {
    const { data: categoriesProduct } = await axiosInstance.get<ICategory>(
      `/categories/${categoryId}/`,
    )
    return categoriesProduct.error ? [] : categoriesProduct.path_from_root.map(({ name }) => name)
  }

}
