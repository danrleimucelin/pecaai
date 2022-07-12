import api from 'services/api'
import ProductInterface from 'interfaces/Product'

import ProductCtx from './index'

export default class ProductAPI {
  productCtx: ProductCtx

  constructor(productCtx: ProductCtx) {
    this.productCtx = productCtx
  }

  async load(id?: string): Promise<void> {
    const { data } = await api.get<ProductInterface>(
      '/products/' + id || this.productCtx.data._id || ''
    )

    this.productCtx.set(data)
  }

  async create(data?: ProductInterface): Promise<void> {
    const { data: product } = await api.post<ProductInterface>(
      '/products',
      data || this.productCtx.data
    )

    this.productCtx.set(product)
  }

  async update(data?: ProductInterface): Promise<void> {
    const { data: product } = await api.patch<ProductInterface>(
      '/products/' + this.productCtx.data._id,
      data || this.productCtx.data
    )

    this.productCtx.set(product)
  }
}
