import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'

import { formatMonetary } from 'functions/format'
import UserInterface from 'interfaces/User'
import OrderCtx from 'context/order/single'
import UserCtx from 'context/user'
import useProductList from 'providers/productList'

import OrderProps from './types'
import {
  sxAdditionalList,
  sxPrimaryItemBox,
  sxPrimaryItemText,
  sxPrimaryListItem
} from './styles'

const OrderPage: React.FC<OrderProps> = ({ order }) => {
  const { productListCtx } = useProductList()
  const [orderCtx, setOrderCtx] = useState<OrderCtx>(new OrderCtx())
  const [user, setUser] = useState<UserInterface>()

  const { id } = useParams()

  const loadUser = () => {
    const userCtx = new UserCtx()
    userCtx
      .api()
      .load(orderCtx.data.user_id)
      .then(() => setUser(userCtx.data))
  }

  useEffect(() => {
    if (order) {
      orderCtx.set(order)
      loadUser()
    } else if (id) {
      orderCtx
        .api()
        .load(id)
        .then(() => loadUser())
    }
  }, [])

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          alignSelf: 'center'
        }}
      >
        Itens
      </Typography>

      <List disablePadding>
        {orderCtx.data.items.map((item, index) => (
          <ListItem
            key={item._id || index}
            disablePadding
            sx={sxPrimaryListItem}
          >
            <Box sx={sxPrimaryItemBox}>
              <ListItemText
                sx={sxPrimaryItemText}
                primary={
                  productListCtx.data.find(({ _id }) => _id === item.product_id)
                    ?.name
                }
                secondary={
                  item.quantity +
                  '  X  R$ ' +
                  formatMonetary(item.price) +
                  '  =  R$ ' +
                  formatMonetary(item.total)
                }
              />
            </Box>

            {(item.additional_items?.length || 0) > 0 && (
              <List dense disablePadding sx={sxAdditionalList}>
                {item.additional_items?.map((additional, index) => (
                  <ListItem key={index} dense disablePadding>
                    <ListItemText
                      primary={
                        productListCtx.data.find(
                          ({ _id }) => _id === additional.product_id
                        )?.name
                      }
                      secondary={'R$ ' + formatMonetary(additional.total)}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </ListItem>
        ))}
      </List>

      <Typography variant="h6">
        Total: R$ {formatMonetary(orderCtx.data.total)}
      </Typography>
    </Box>
  )
}

export default OrderPage
