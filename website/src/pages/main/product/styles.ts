import { css, styled } from '@mui/material'

export const sxContainer = css`` as any

export const sxButton = css`
  align-items: flex-start;
  border-radius: 8px;
` as any

export const sxPriceText = css`
  text-align: right;
  white-space: nowrap;
  min-width: fit-content;
  margin-left: 6px;
` as any

export const sxPriceSecondaryText = css`
  text-decoration: line-through;
  color: red;
` as any

export const Image = styled('img')`
  width: 80px;
  height: 80px;
  min-width: 80px;
  min-height: 80px;
  margin-left: 10px;
`
