import { makeAutoObservable } from 'mobx'
import ProductInterface from 'interfaces/Product'
import ProductAPI from './api'

const defProps: ProductInterface = {
  name: '',
  img_link: '',
  unit: '',
  category: '',
  control_stock: false,
  additional: false,
  additional_product_list: [],
  active: false
}

class ProductCtx {
  data: ProductInterface = { ...defProps }

  constructor() {
    makeAutoObservable(this)
  }

  api(): ProductAPI {
    return new ProductAPI(this)
  }

  set(data: ProductInterface = { ...defProps }) {
    this.data = data
  }

  setProps(props: any): void {
    this.data = { ...this.data, ...props }
  }

  setPropertie(name: string, value: any): void {
    this.data[name] = value
  }
}

export default ProductCtx
