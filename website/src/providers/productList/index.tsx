import React, { createContext, useState, useContext, useEffect } from 'react'

import ProductInterface from 'interfaces/Product'
import ProductListCtx from 'context/product/list'
import api from 'services/api'
import useUser from 'providers/user'
import IProductListPvd from './types'

const ProductListContext = createContext<IProductListPvd>(new IProductListPvd())

const ProductListProvider: React.FC<IProductListPvd> = ({ children }) => {
  const { signed } = useUser()
  const [categoryList, setCategoryList] = useState<string[]>([])
  const [additionalProductList, setAdditionalProductList] = useState<
    ProductInterface[]
  >([])
  const [productListCtx, setProductListCtx] = useState<ProductListCtx>(
    new ProductListCtx()
  )

  const signedLoad = async () => {
    const { data: categories = [] } = await api.get<string[]>(
      '/products/categories'
    )

    setCategoryList(categories.sort())

    const { data: additionals } = await api.get<ProductInterface[]>(
      '/products/additionals'
    )

    setAdditionalProductList(additionals)
  }

  useEffect(() => {
    productListCtx.api().load()
  }, [])

  useEffect(() => {
    if (!signed) return

    signedLoad()
  }, [signed])

  return (
    <ProductListContext.Provider
      value={{
        categoryList,
        additionalProductList,
        productListCtx,
        setCategoryList,
        setAdditionalProductList
      }}
    >
      {children}
    </ProductListContext.Provider>
  )
}

export { ProductListProvider }

const useProductList = (): IProductListPvd => useContext(ProductListContext)

export default useProductList
