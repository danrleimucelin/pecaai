import React, { useMemo, useState, useEffect } from 'react'
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal
} from '@mui/material'

import { formatMonetary } from 'functions/format'
import OrderAddItemPage from 'pages/order/addItem'
import { sxModalForm } from 'styles/sx'
import ProductProps from './types'
import {
  sxContainer,
  sxButton,
  sxPriceSecondaryText,
  sxPriceText,
  Image
} from './styles'
import useOrder from 'providers/order'

const ProductElement: React.FC<ProductProps> = ({ product }) => {
  const [addingItem, setAddingItem] = useState<boolean>(false)
  const { orderCtx } = useOrder()

  const inPromotion = useMemo(
    () =>
      !!product.promotional_price &&
      !!product.price &&
      product.promotional_price < product.price,
    [product.price, product.promotional_price]
  )

  const doCloseAddItem = () => {
    setAddingItem(false)
  }

  useEffect(() => {
    setAddingItem(false)
  }, [orderCtx.data])

  return (
    <ListItem disablePadding sx={sxContainer}>
      <ListItemButton sx={sxButton} onClick={() => setAddingItem(true)}>
        <ListItemText primary={product.name} secondary={product.description} />
        <ListItemText
          primary={
            'R$ ' +
            formatMonetary(
              inPromotion ? product.promotional_price : product.price
            )
          }
          secondary={inPromotion ? 'R$ ' + formatMonetary(product.price) : ''}
          secondaryTypographyProps={{ sx: sxPriceSecondaryText }}
          sx={sxPriceText}
        />
        <Image />
      </ListItemButton>

      <Modal open={addingItem} onClose={doCloseAddItem}>
        <Box sx={sxModalForm}>
          <OrderAddItemPage product={product} onClose={doCloseAddItem} />
        </Box>
      </Modal>
    </ListItem>
  )
}

export default ProductElement
