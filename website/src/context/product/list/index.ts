import { makeAutoObservable } from 'mobx'
import ProductListAPI from './api'
import ProductInterface from 'interfaces/Product'

class ProductListCtx {
  data: ProductInterface[] = []

  constructor() {
    makeAutoObservable(this)
  }

  set(data: ProductInterface[] = []) {
    this.data = data
  }

  api(): ProductListAPI {
    return new ProductListAPI(this)
  }
}

export default ProductListCtx
