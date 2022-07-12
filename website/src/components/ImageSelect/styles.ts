import { css } from '@mui/material'

export const sxContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: rgb(111, 111, 111, 0.15);
  border-radius: 8px;

  .imgBox {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    transition: opacity 0.3s;
    cursor: pointer;

    :hover {
      opacity: 0.7;
    }
  }

  svg {
    height: auto;
    width: auto;
  }

  img {
    height: auto;
    width: auto;
    max-height: 100%;
    max-width: 100%;
  }

  * {
    color: #777;
  }
` as any

export const sxIconButton = css`
  position: absolute;
  right: 0;
  top: 0;
  height: 30px;
  width: 30px;
  padding: 0;
  margin: 0;
  background: rgba(0, 0, 0, 0.1);

  svg {
    height: 100%;
    width: 100%;
  }
` as any
