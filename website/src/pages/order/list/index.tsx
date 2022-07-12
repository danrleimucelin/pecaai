import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Box, Button, IconButton } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Edit as EditIcon, Input as InputIcon } from '@mui/icons-material'

import useUser from 'providers/user'
import OrderListCtx from 'context/order/list'
import IFindOrderFilter from 'interfaces/FindOrderFilter'
import { formatMonetary, defaultDateTime } from 'functions/format'
import { translateStatus } from 'functions/translate'
import { sxContainer, sxOptionsBox } from './styles'

const OrderListPage: React.FC = observer(() => {
  const { userCtx, setHeaderTitle } = useUser()
  const [orderListCtx, setOrderListCtx] = useState<OrderListCtx>(
    new OrderListCtx()
  )
  const [filter, setFilter] = useState<IFindOrderFilter>({
    owner: !userCtx.data.admin,
    active: userCtx.data.admin ? undefined : true,
    user_id: userCtx.data.admin ? undefined : userCtx.data._id
  })

  const navigate = useNavigate()

  const find = async () => {
    await orderListCtx.api().load()
  }

  useEffect(() => {
    setHeaderTitle('Lista de Pedidos')
    find()
  }, [])

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', hide: true },
    {
      field: 'enter',
      headerName: 'Entrar',
      sortable: false,
      type: 'button',
      headerAlign: 'center',
      align: 'center',
      maxWidth: 70,
      renderCell: ({ id }) => (
        <IconButton onClick={() => navigate('/orders/' + id)}>
          <InputIcon />
        </IconButton>
      )
    },
    {
      field: 'dtm',
      headerName: 'Quando',
      headerAlign: 'center',
      align: 'center',
      minWidth: 90
    },
    {
      field: 'status',
      headerName: 'Estado',
      headerAlign: 'center',
      align: 'center',
      minWidth: 120
    },
    {
      field: 'total',
      headerName: 'Valor',
      headerAlign: 'center',
      align: 'right',
      minWidth: 60
    }
  ]

  userCtx.data.admin &&
    columns.push({
      field: 'fastEdit',
      headerName: 'Editar Rápido',
      headerAlign: 'center',
      align: 'center',
      width: 80,
      renderCell: ({ id }) => (
        <IconButton>
          <EditIcon />
        </IconButton>
      )
    })

  const rows = useMemo(() => {
    return orderListCtx.data.map(({ _id, dtm, status, total }) => ({
      id: _id,
      dtm: defaultDateTime(dtm),
      status: translateStatus(status),
      total: formatMonetary(total) || ''
    }))
  }, [orderListCtx.data])

  const onEnterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate('/products/register')
  }

  return (
    <Box sx={sxContainer}>
      <Box sx={sxOptionsBox}>
        {/* <Button variant="text" onClick={onEnterClick} startIcon={<AddIcon />}>
          Novo
        </Button> */}
      </Box>
      <DataGrid columns={columns} rows={rows} />
    </Box>
  )
})

export default OrderListPage
