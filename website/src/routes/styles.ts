import { css } from '@mui/material'

export const sxScreen = css`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
` as any

export const sxContent = css`
  height: calc(100% - 48px);
  width: 100%;
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
` as any
