import React, { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'
import {
  Box,
  Button,
  Collapse,
  FormControlLabel,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import {
  AddCircleOutline as AddCircleOutlineIcon,
  RemoveCircleOutline as RemoveCircleOutlineIcon,
  SaveAlt
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { toast } from 'react-toastify'

import { returnOnlyNumbers } from 'functions/format'
import CurrencyFormat from 'components/CurrencyFormat'
import { sxModalForm } from 'styles/sx'
import ProductCtx from 'context/product/single'
import useUser from 'providers/user'
import useProductList from 'providers/productList'
import AdditionalListPage from 'pages/additionals'
import {
  ImageSelector,
  sxCategoryList,
  sxCheckedForm,
  sxForm,
  sxImageList,
  sxAdditionalBox,
  sxAdditionalButton
} from './styles'

const ProductPage: React.FC = observer(() => {
  const { setHeaderTitle } = useUser()
  const {
    categoryList,
    setCategoryList,
    additionalProductList,
    setAdditionalProductList
  } = useProductList()
  const [productCtx, setProductCtx] = useState<ProductCtx>(new ProductCtx())
  const [loading, setLoading] = useState<boolean>(false)
  // const [imageList, setImageList] = useState<any[]>([])
  const [image, setImage] = useState<any | null>(null)
  const [categorizing, setCategorizing] = useState<boolean>(false)
  const [showAdditionals, setShowAdditionals] = useState<boolean>(false)

  const { id } = useParams()
  const navigate = useNavigate()

  const newProduct = useMemo(
    () => !id && !productCtx.data._id,
    [id, productCtx.data._id]
  )

  useEffect(() => {
    if (id && id !== '0') {
      productCtx.api().load(id)
    }
  }, [])

  useEffect(() => {
    setHeaderTitle(newProduct ? 'Novo Produto' : productCtx.data.name)
  }, [newProduct, productCtx.data.name, setHeaderTitle])

  const doOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    productCtx.setPropertie(name, value)
  }

  const doOnBooleanChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const { name } = e.target

    productCtx.setPropertie(name, checked)
  }

  const attNewCategory = () => {
    if (
      !!productCtx.data.category &&
      !categoryList.includes(productCtx.data.category)
    ) {
      setCategoryList([...categoryList, productCtx.data.category])
    }
  }

  const attAdditional = () => {
    const list = additionalProductList.filter(
      ({ _id }) => _id !== productCtx.data._id
    )

    if (productCtx.data.additional) {
      list.push(productCtx.data)
    }

    setAdditionalProductList(list)
  }

  const doCreate = async e => {
    e.preventDefault()

    setLoading(true)
    try {
      await productCtx.api().create()
      navigate('/products/register/' + productCtx.data._id)
      toast.success('Produto criado com sucesso!')
      attNewCategory()
      attAdditional()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const doUpdate = async e => {
    e.preventDefault()

    setLoading(true)
    try {
      await productCtx.api().update()
      toast.success('Produto alterado com sucesso!')
      attNewCategory()
      attAdditional()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={sxForm}>
      <br />

      {/* <Typography sx={sxTitle}>
        {newProduct ? 'Novo Produto' : productCtx.data.name}
      </Typography>

      <br /> */}

      <TextField
        id="name"
        name="name"
        label="Nome"
        required
        fullWidth
        value={productCtx.data.name || ''}
        onChange={doOnChange}
      />

      <TextField
        id="description"
        name="description"
        label="Descrição"
        multiline
        fullWidth
        value={productCtx.data.description || ''}
        onChange={doOnChange}
      />

      <TextField
        id="obs"
        name="obs"
        label="Observações"
        multiline
        fullWidth
        value={productCtx.data.obs || ''}
        onChange={doOnChange}
      />

      <TextField
        id="price"
        name="price"
        label="Preço"
        InputProps={{
          inputComponent: CurrencyFormat
        }}
        fullWidth
        value={productCtx.data.price || ''}
        onChange={doOnChange}
      />

      <TextField
        id="promotional_price"
        name="promotional_price"
        label="Preço Promocional"
        disabled={productCtx.data.additional}
        InputProps={{
          inputComponent: CurrencyFormat
        }}
        fullWidth
        value={productCtx.data.promotional_price || ''}
        onChange={doOnChange}
      />

      <TextField
        id="category"
        name="category"
        label="Categoria"
        fullWidth
        onFocus={() => setCategorizing(true)}
        onBlur={() => setTimeout(() => setCategorizing(false), 100)}
        value={productCtx.data.category || ''}
        onChange={doOnChange}
      />

      <Collapse
        in={categorizing}
        timeout="auto"
        unmountOnExit
        sx={{ width: '100%' }}
      >
        <List disablePadding sx={sxCategoryList}>
          {categoryList
            .filter(
              categ =>
                !productCtx.data.category ||
                categ.includes(productCtx.data.category)
            )
            .map(categ => (
              <ListItem
                key={categ}
                dense
                disablePadding
                alignItems="flex-start"
              >
                <ListItemButton
                  onClick={() => productCtx.setPropertie('category', categ)}
                >
                  <ListItemText primary={categ} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Collapse>

      <FormControlLabel
        control={
          <Switch
            name="control_stock"
            color="info"
            checked={productCtx.data.control_stock}
            onChange={doOnBooleanChange}
          />
        }
        label="Controlar Estoque"
        sx={sxCheckedForm}
      />

      <Collapse
        in={productCtx.data.control_stock}
        timeout="auto"
        unmountOnExit
        sx={{ width: '100%' }}
      >
        <TextField
          id="stock"
          name="stock"
          label="Estoque"
          fullWidth
          value={productCtx.data.stock || '0'}
          onChange={doOnChange}
        />
      </Collapse>

      <FormControlLabel
        control={
          <Switch
            name="additional"
            color="info"
            checked={productCtx.data.additional}
            onChange={doOnBooleanChange}
          />
        }
        label="Produto Adicional"
        sx={sxCheckedForm}
      />

      <Collapse
        in={!productCtx.data.additional}
        timeout="auto"
        unmountOnExit
        sx={{ width: '100%' }}
      >
        <Box sx={sxAdditionalBox}>
          <Button
            size="small"
            startIcon={<AddCircleOutlineIcon />}
            endIcon={<RemoveCircleOutlineIcon />}
            onClick={() => setShowAdditionals(true)}
            sx={sxAdditionalButton}
          >
            Adicionais
          </Button>

          <TextField
            id="additional_max_qty"
            name="additional_max_qty"
            label="Quantidade Máxima"
            type="number"
            fullWidth
            value={returnOnlyNumbers(productCtx.data.additional_max_qty) || '0'}
            onChange={doOnChange}
          />
        </Box>
      </Collapse>

      <FormControlLabel
        control={
          <Switch
            name="active"
            color="info"
            checked={productCtx.data.active}
            onChange={doOnBooleanChange}
          />
        }
        label="Ativo"
        sx={sxCheckedForm}
      />

      <ImageSelector
        image={image}
        onSetImage={(img: any) => setImage(img)}
        onRemoveImage={() => setImage(null)}
        topElement={<Typography color="#555">Imagem</Typography>}
      />

      {/* <Typography>Imagens</Typography> */}

      {/* <ImageList sx={sxImageList}>
        <ImageListItem>
          <ImageSelector
            onSetImage={(image: any) => setImageList(list => [...list, image])}
            topElement={<Typography color="#555">Adicionar</Typography>}
          />
        </ImageListItem>

        {imageList.length > 0 &&
          imageList.map((image: any, index) => (
            <ImageListItem key={index}>
              <ImageSelector
                image={image}
                onSetImage={(newImg: any) =>
                  setImageList(list =>
                    list.map((img, idx) => (idx === index ? newImg : img))
                  )
                }
                onRemoveImage={() =>
                  setImageList(list => list.filter((_, idx) => idx !== index))
                }
                topElement={<Typography color="#555">{index + 1}</Typography>}
              />
            </ImageListItem>
          ))}
      </ImageList> */}

      <br />

      <LoadingButton
        color="primary"
        fullWidth
        loading={loading}
        startIcon={<SaveAlt />}
        onClick={newProduct ? doCreate : doUpdate}
      >
        {newProduct ? 'Cadastrar' : 'Atualizar'}
      </LoadingButton>

      <br />

      <Modal open={showAdditionals} onClose={() => setShowAdditionals(false)}>
        <Box sx={sxModalForm}>
          <Typography>Adicionais</Typography>

          <AdditionalListPage
            inList={productCtx.data.additional_product_list}
            setList={additional_product_list =>
              productCtx.setProps({ additional_product_list })
            }
          />
        </Box>
      </Modal>
    </Box>
  )
})

export default ProductPage
