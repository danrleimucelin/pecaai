import React, { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import {
  Box,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  Typography
} from '@mui/material'
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material'

import { formatMonetary } from 'functions/format'
import useProductList from 'providers/productList'
import useOrder from 'providers/order'
import AdditionalListPage from 'pages/additionals'
import ProductProps from './types'
import {
  sxAdditionalsForm,
  sxAddBtn,
  sxContainer,
  sxPrice,
  sxRedPrice,
  sxTitle,
  sxTitleBox,
  sxAddForm,
  sxAddRightSideBox,
  sxErrorText
} from './styles'

const OrderAddItemPage: React.FC<ProductProps> = ({ product }) => {
  const { additionalProductList } = useProductList()
  const { orderCtx } = useOrder()
  const [additionalList, setAdditionalList] = useState<string[]>([])
  const [quantity, setQuantity] = useState<number>(1)

  const totalPrice = useMemo(
    () =>
      (product.promotional_price || product.price || 0) * quantity +
      additionalList.reduce(
        (acc, cur) =>
          acc +
          (additionalProductList.find(({ _id }) => _id === cur)?.price || 0) *
            quantity,
        0
      ),
    [
      additionalList,
      additionalProductList,
      product.price,
      product.promotional_price,
      quantity
    ]
  )

  const hasMoreAdditionalThanAllowed = useMemo(
    () =>
      !!product.additional_max_qty &&
      additionalList.length > product.additional_max_qty,
    [additionalList, product.additional_max_qty]
  )

  const add = (e: any) => {
    e.preventDefault()

    orderCtx.addItem({
      product_id: product._id || '',
      price: product.promotional_price || product.price || 0,
      quantity,
      discount: 0,
      total: totalPrice,
      additional_items: additionalList.map(id => {
        const item = additionalProductList.find(({ _id }) => _id === id)

        return {
          product_id: item?._id || '',
          price: item?.price || 0,
          quantity,
          discount: 0,
          total: (item?.price || 0) * quantity
        }
      })
    })

    setQuantity(1)
    setAdditionalList([])

    toast.success(product.name + ' adicionado ao carrinho.')
  }

  return (
    <Box sx={sxContainer}>
      {/* <ImageList>
        <ImageListItem></ImageListItem>
      </ImageList> */}
      <Box sx={sxTitleBox}>
        <Typography sx={sxTitle}>{product.name}</Typography>

        <Typography sx={sxPrice}>
          {'R$ ' + formatMonetary(product.promotional_price || product.price)}
        </Typography>

        {!!product.promotional_price && (
          <Typography sx={sxRedPrice}>
            {formatMonetary(product.price)}
          </Typography>
        )}
      </Box>

      <Typography>{product.description}</Typography>

      <br />

      {product.additional_product_list.length > 0 && (
        <>
          <Typography>
            Adicionais
            {!!product.additional_max_qty &&
              ' - ' + additionalList.length + '/' + product.additional_max_qty}
          </Typography>

          <Box sx={sxAdditionalsForm}>
            <AdditionalListPage
              inList={additionalList}
              setList={setAdditionalList}
              filterList={product.additional_product_list}
            />
          </Box>

          {hasMoreAdditionalThanAllowed && (
            <Typography sx={sxErrorText}>
              Você só pode selecionar {product.additional_max_qty} adicionais
            </Typography>
          )}
        </>
      )}

      <Box sx={sxAddForm}>
        <Typography>{'R$ ' + formatMonetary(totalPrice)}</Typography>

        <Box sx={sxAddRightSideBox}>
          <IconButton onClick={() => setQuantity(qt => qt + 1)}>
            <AddIcon />
          </IconButton>
          <Typography>{quantity}</Typography>
          <IconButton onClick={() => setQuantity(qt => Math.max(1, qt - 1))}>
            <RemoveIcon />
          </IconButton>

          <Button
            disabled={hasMoreAdditionalThanAllowed}
            sx={sxAddBtn}
            startIcon={<AddIcon />}
            onClick={add}
          >
            Carrinho
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default OrderAddItemPage
