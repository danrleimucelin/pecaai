import React, { useState, useEffect, useMemo, forwardRef } from 'react'
import { observer } from 'mobx-react'
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material'
import { TransitionGroup } from 'react-transition-group'

import useLayoutController from 'layout/layoutController'
import useUser from 'providers/user'
import useProductList from 'providers/productList'
import Product from './product'
import {
  sxCategoryItem,
  sxCategoryButton,
  sxCategoryList,
  sxContainer,
  sxProductList
} from './styles'

const MainPage: React.FC = observer(() => {
  const { inVertical } = useLayoutController()
  const { setHeaderTitle } = useUser()
  const { productListCtx } = useProductList()
  const [category, setCategory] = useState<string>('')

  const productsNotAdditionals = useMemo(
    () => productListCtx.data.filter(({ additional }) => !additional),
    [productListCtx.data]
  )

  const categories = useMemo(
    () =>
      [...new Set(productsNotAdditionals.map(({ category }) => category))]
        .filter(categ => !!categ)
        .sort(),
    [productsNotAdditionals]
  )

  const products = useMemo(
    () =>
      productsNotAdditionals.filter(
        ({ category: categ }) => categ === category
      ),
    [category, productsNotAdditionals]
  )

  useEffect(() => {
    setHeaderTitle(category)
  }, [category])

  const ProductForward = forwardRef((props: any, ref) => {
    return (
      <div ref={ref} {...props}>
        <Product product={props.product} />
      </div>
    )
  })

  return (
    <Box sx={sxContainer({ inVertical })}>
      <Box>
        <Box>
          <List sx={sxCategoryList}>
            {categories.map(categ => (
              <ListItem
                key={categ}
                disablePadding
                sx={sxCategoryItem({ selected: categ === category })}
              >
                <ListItemButton
                  selected={categ === category}
                  sx={sxCategoryButton}
                  onClick={() => setCategory(categ || '')}
                >
                  <ListItemText primary={categ}></ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        <List sx={sxProductList}>
          <TransitionGroup>
            {products.map(product => (
              <Collapse key={product._id}>
                <ProductForward product={product} />
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      </Box>
    </Box>
  )
})

export default MainPage
