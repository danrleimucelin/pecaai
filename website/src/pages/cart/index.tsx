/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import {
  AddCircleOutlineOutlined as AddCircleOutlineOutlinedIcon,
  RemoveCircleOutline as RemoveCircleOutlineIcon
} from '@mui/icons-material'
import Checkbox from '@mui/material/Checkbox'
import useOrder from 'providers/order'
import useUser from 'providers/user'
import useProductList from 'providers/productList'
import { formatMonetary } from 'functions/format'
import AddressElement from './address'
import PaymentElement from './cardPayment'
import {
  sxForm,
  sxAdditionalList,
  sxItemActionBtn,
  sxPrimaryItemBox,
  sxPrimaryItemText,
  sxPrimaryListItem
} from './styles'
import FormControlLabel from '@mui/material/FormControlLabel';

const CartPage: React.FC = () => {
  const { setHeaderTitle } = useUser()
  const { productListCtx } = useProductList()
  const { orderCtx } = useOrder()
  const [loading, setLoading] = useState<boolean>(false)
  const [retirarLocal, setRetirarLocal] = useState(false)
  const [pagDinheiro, setPagDinheiro] = useState(false)

  useEffect(() => {
    setHeaderTitle('Carrinho')

    if (!orderCtx.data.address) {
      orderCtx.api().getLastAddress()
    }
  }, [])

  const navigate = useNavigate()

  const doAddOneQuantity = (index: number) => {
    const items = [...orderCtx.data.items]
    items[index].quantity += 1
    orderCtx.setProps({ items })
    orderCtx.computeTotal()
  }

  const doRemoveOneQuantity = (index: number) => {
    const items = [...orderCtx.data.items]
    const quantity = items[index].quantity - 1
    if (quantity > 0) {
      items[index].quantity = quantity
    } else {
      items.splice(index, 1)
    }
    orderCtx.setProps({ items })
    orderCtx.computeTotal()
  }

  const doClear = () => {
    orderCtx.set()
  }

  const doConfirm = async () => {
    setLoading(true)
    try {
      await orderCtx.api().create()
    } finally {
      setLoading(false)
    }
  }

  const doGoToMain = e => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <Box sx={sxForm}>
      <br />
      <Box>
        <Button
          color="primary"
          onClick={doGoToMain}
          variant="contained"
          size="medium"
        >
          {'< Voltar'}
        </Button>
      </Box>
      <br />
      <br />
      <Typography
        variant="h6"
        sx={{
          alignSelf: 'center'
        }}
      >
        Itens do seu Pedido
      </Typography>

      <List disablePadding>
        {orderCtx.data.items.map((item, index) => (
          <ListItem key={index} disablePadding sx={sxPrimaryListItem}>
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

              <Box
                sx={{
                  display: 'flex'
                }}
              >
                <ListItemButton
                  dense
                  disableGutters
                  sx={sxItemActionBtn}
                  onClick={() => doAddOneQuantity(index)}
                >
                  <AddCircleOutlineOutlinedIcon />
                </ListItemButton>

                <ListItemButton
                  dense
                  disableGutters
                  sx={sxItemActionBtn}
                  onClick={() => doRemoveOneQuantity(index)}
                >
                  <RemoveCircleOutlineIcon />
                </ListItemButton>
              </Box>
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
      <hr />
      <br />
      <Typography variant="h6" align="center">
        Total: R$ {formatMonetary(orderCtx.data.total)}
      </Typography>

      <br />
      <hr />
      <br />
      <FormControlLabel
        control={<Checkbox
          checked={retirarLocal}
          onChange={() => setRetirarLocal(!retirarLocal)}
      />}
        label="Retirar no Local"
      />
      { retirarLocal ? '' : 
      (  <Box>
          <AddressElement />
          </Box>
      )}
          <br />
          <hr />
          <br />
      <FormControlLabel
        control={<Checkbox
        checked={pagDinheiro}
        onChange={() => setPagDinheiro(!pagDinheiro)}
        />}
        label="Pagar com Dinheiro"
      />
      { pagDinheiro ? '' : 
      ( <Box>
          <PaymentElement />
        </Box>
      )}
      <br />
      <br />

      <LoadingButton
        onClick={doConfirm}
        color="success"
        loading={loading}
        fullWidth
        variant="contained"
        size="large"
      >
        Confirmar Pedido
      </LoadingButton>

      <br />
      <br />
    </Box>
  )
}

export default CartPage
