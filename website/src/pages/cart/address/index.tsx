import React from 'react'
import { observer } from 'mobx-react'
import { Box, TextField, Typography } from '@mui/material'

import useOrder from 'providers/order'
import { sxForm } from './styles'

const AddressElement: React.FC = () => {
  const { orderCtx } = useOrder()

  const doOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    orderCtx.setAddressPropertie(name, value)
  }

  return (
    <Box sx={sxForm}>
      <Typography variant="h6">Endereço</Typography>

      <TextField
        id="city"
        name="city"
        label="Cidade"
        fullWidth
        value={orderCtx.data.address?.city || ''}
        onChange={doOnChange}
        variant="outlined"
      />

      <TextField
        id="district"
        name="district"
        label="Bairro"
        required
        fullWidth
        value={orderCtx.data.address?.district || ''}
        onChange={doOnChange}
        variant="outlined"
      />

      <TextField
        id="street"
        name="street"
        label="Rua"
        required
        fullWidth
        value={orderCtx.data.address?.street || ''}
        onChange={doOnChange}
        variant="outlined"
      />

      <TextField
        id="number"
        name="number"
        label="Número"
        required
        fullWidth
        value={orderCtx.data.address?.number || ''}
        onChange={doOnChange}
        variant="outlined"
      />

      <TextField
        id="complement"
        name="complement"
        label="Complemento"
        fullWidth
        value={orderCtx.data.address?.complement || ''}
        onChange={doOnChange}
        variant="outlined"
      />
    </Box>
  )
}

export default observer(AddressElement)
