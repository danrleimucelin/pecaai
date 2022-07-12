import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Box, Button, IconButton } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import {
  Input as InputIcon,
  RadioButtonChecked as RadioButtonCheckedIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Add as AddIcon
} from '@mui/icons-material'

import useUser from 'providers/user'
import ProductListCtx from 'context/product/list'
import IFindProductFilter from 'interfaces/FindProductFilter'
import { formatMonetary } from 'functions/format'
import { sxContainer, sxOptionsBox } from './styles'

const ProductListPage: React.FC = observer(() => {
  const { userCtx, setHeaderTitle } = useUser()
  const [productListCtx, setProductListCtx] = useState<ProductListCtx>(
    new ProductListCtx()
  )
  const [filter, setFilter] = useState<IFindProductFilter>({
    owner: !userCtx.data.admin,
    active: userCtx.data.admin ? undefined : true,
    user_id: userCtx.data.admin ? undefined : userCtx.data._id
  })

  const navigate = useNavigate()

  const find = async () => {
    await productListCtx.api().adminLoad()
  }

  useEffect(() => {
    setHeaderTitle('Lista de Produtos')
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
      width: 70,
      renderCell: ({ id }) => (
        <IconButton onClick={() => navigate('/products/' + id)}>
          <InputIcon />
        </IconButton>
      )
    },
    {
      field: 'name',
      headerName: 'Nome',
      // resizable: true,
      hideable: false,
      flex: 1,
      minWidth: 100
    },
    {
      field: 'category',
      headerName: 'Categoria',
      // resizable: true,
      minWidth: 80
    },
    {
      field: 'stock',
      headerName: 'Estoque',
      headerAlign: 'center',
      align: 'center',
      minWidth: 60
    },
    {
      field: 'price',
      headerName: 'Preço',
      headerAlign: 'center',
      align: 'right',
      minWidth: 60
    },
    {
      field: 'active',
      headerName: 'Ativo',
      headerAlign: 'center',
      align: 'center',
      width: 60,
      renderCell: ({ value }) =>
        value ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />
    }
  ]

  const rows = useMemo(() => {
    return productListCtx.data.map(
      ({
        _id,
        active,
        name,
        category,
        stock,
        control_stock,
        price,
        promotional_price
      }) => ({
        id: _id,
        active,
        name,
        category,
        stock: control_stock ? stock : '',
        price: formatMonetary(promotional_price || price) || ''
      })
    )
  }, [productListCtx.data])

  const onEnterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate('/products/0')
  }

  return (
    <Box sx={sxContainer}>
      <Box sx={sxOptionsBox}>
        <Button variant="text" onClick={onEnterClick} startIcon={<AddIcon />}>
          Novo
        </Button>
      </Box>
      <DataGrid columns={columns} rows={rows} />
    </Box>
  )
})

export default ProductListPage
