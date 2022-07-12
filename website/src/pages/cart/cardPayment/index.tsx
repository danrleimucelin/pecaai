// import React from 'react'
import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Box, TextField, Typography } from '@mui/material'

// import useOrder from 'providers/order'
import { sxForm } from './styles'

const PaymentElement: React.FC = () => {
  // const { orderCtx } = useOrder()

  const [payment, setPayment] = useState({
    cardName: '',
    cardNumber: '',
    cardExpiration: '',
    cardCvc: ''
  })

  function doOnChange(e): void {}

  // const doOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target
  //   orderCtx.setAddressPropertie(name, value)
  // }

  return (
    <Box sx={sxForm}>
      <Typography variant="h6">Pagamento</Typography>

      <TextField
        id="name"
        name="name"
        required
        label="Nome do Cartão"
        fullWidth
        value={''}
        onChange={doOnChange}
        variant="outlined"
      />

      <TextField
        id="number"
        name="number"
        label="Número do Cartão"
        required
        fullWidth
        value={''}
        onChange={doOnChange}
        variant="outlined"
      />

      <TextField
        id="date"
        name="date"
        label="Data de Expiração"
        required
        fullWidth
        value={''}
        onChange={doOnChange}
        variant="outlined"
      />

      <TextField
        id="cvc"
        name="cvd"
        label="Código de verificação (CVC)"
        required
        fullWidth
        value={''}
        onChange={doOnChange}
        variant="outlined"
      />
    </Box>
  )
}

export default observer(PaymentElement)
