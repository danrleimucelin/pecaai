import React, { useMemo } from 'react'
import { Checkbox, List, ListItem, ListItemText } from '@mui/material'

import useProductList from 'providers/productList'
import AdditionalListProps from './types'
import { formatMonetary } from 'functions/format'

const AdditionalListPage: React.FC<AdditionalListProps> = ({
  inList,
  setList,
  filterList
}) => {
  const { additionalProductList } = useProductList()

  const doChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target
    if (checked) {
      setList([...inList, value])
    } else {
      setList(inList.filter(item => item !== value))
    }
  }

  return (
    <List disablePadding>
      {additionalProductList
        .filter(({ _id }) => !filterList || filterList.includes(_id || ''))
        .map(product => (
          <ListItem key={product._id} disablePadding>
            <Checkbox
              value={product._id}
              checked={inList.includes(product._id || '')}
              onChange={doChange}
            />
            <ListItemText
              primary={product.name}
              secondary={
                !!product.price && 'R$ ' + formatMonetary(product.price)
              }
            />
          </ListItem>
        ))}
    </List>
  )
}

export default AdditionalListPage
