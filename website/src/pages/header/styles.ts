import { css, styled } from '@mui/material'

import { myColors } from 'styles/colors'

export const sxContainer = css`
  /* justify-content: space-between; */
  background: ${myColors.backgroundSeconday};

  label,
  svg,
  img,
  p,
  span {
    color: #fff;
  }
` as any

export const IconImg = styled('img')`
  height: 100%;
  width: 30px;
`

export const sxToolbar = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
` as any

export const sxUserBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
` as any

export const sxTitle = css`
  position: fixed;
  color: #fff;
  font-size: 20px;
  text-align: center;
  width: 100%;
  pointer-events: none;
` as any
