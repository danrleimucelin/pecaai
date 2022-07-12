import ProductInterface from 'interfaces/Product'
import api from 'services/api'
import ProductListCtx from './index'

export default class ProductListAPI {
  productListCtx: ProductListCtx

  constructor(productListCtx: ProductListCtx) {
    this.productListCtx = productListCtx
  }

  async load(): Promise<void> {
    const { data } = await api.get<ProductInterface[]>('/products/available')

    this.productListCtx.set(data)
  }

  async adminLoad(): Promise<void> {
    const { data } = await api.get<ProductInterface[]>('/products/admin')

    this.productListCtx.set(data)
  }
}
