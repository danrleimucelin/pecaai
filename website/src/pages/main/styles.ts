import { css } from '@mui/material'

import { myColors } from 'styles/colors'
import { CategoryItemStyleProps, ContainerStyleProps } from './types'

export const sxContainer = ({ inVertical }: ContainerStyleProps) =>
  css`
    display: flex;
    flex-direction: ${inVertical ? 'column' : 'row'};
    width: 100%;
    max-width: 800px;
  ` as any

export const cssList = css`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0 10px;
` as any

export const cssListCategory = css`
  display: flex;
  flex-direction: inline;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0 10px;
` as any

export const sxCategoryList = css`
  ${cssListCategory}
` as any

export const sxProductList = css`
  ${cssList}
  flex: 1;
` as any

export const sxCategoryItem = ({ selected }: CategoryItemStyleProps) =>
  css`
    border-radius: 8px;
    border-bottom-color;
  ` as any

export const sxCategoryButton = css`
  width: 100%;
  border-radius: 8px;
` as any
