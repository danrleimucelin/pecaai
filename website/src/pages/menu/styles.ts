import { css } from '@mui/material'

import { myColors } from 'styles/colors'

export const sxList = ({ bottom }: { bottom: boolean }) =>
  css`
    flex: ${bottom ? 'none' : '1'};
    background: ${myColors.backgroundSeconday};

    label,
    svg,
    img,
    p,
    span {
      color: #fff;
    }
  ` as any

export const sxIcon = css`
  min-width: 40px;
` as any
