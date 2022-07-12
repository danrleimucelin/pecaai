import ProductListCtx from 'context/product/list'
import ProductInterface from 'interfaces/Product'

export default class IProductListPvd {
  categoryList: string[]
  additionalProductList: ProductInterface[]
  productListCtx: ProductListCtx = new ProductListCtx()
  setCategoryList: (list: string[]) => void
  setAdditionalProductList: (list: ProductInterface[]) => void
}
