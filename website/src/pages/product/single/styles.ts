import { css, styled } from '@mui/material'
import ImageSelectCpn from 'components/ImageSelect'

export const sxForm = css`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
  max-width: 90%;
` as any

export const sxTitle = css`
  font-size: 26px;
` as any

export const ImageSelector = styled(ImageSelectCpn)`
  .imgBox {
    height: 140px;
    width: 160px;
  }
`

export const sxImageList = css`
  /* overflow-y: auto; */
  min-height: 170px;
  max-height: 334px;
` as any

export const sxCategoryList = css`
  overflow-y: auto;
  width: calc(100% - 20px);
  margin-left: 20px;
  max-height: 120px;
  border: 1px solid rgba(164, 164, 164, 0.8);
  border-radius: 4px;
  border-top: 0;
` as any

export const sxCheckedForm = css`
  width: 100%;
` as any

export const sxAdditionalBox = css`
  display: flex;
  flex-direction: row;
  align-items: center;
` as any

export const sxAdditionalButton = css`
  height: 40px;
  width: 200px;
  margin-right: 10px;
` as any
