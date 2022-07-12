import React, { useEffect, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Box, IconButton } from '@mui/material'
import {
  AddPhotoAlternateOutlined,
  Clear as ClearIcon
} from '@mui/icons-material'

import { ImageSelectProps } from './types'
import { sxContainer, sxIconButton } from './styles'

const ImageSelectCpn: React.FC<ImageSelectProps> = ({
  className,
  image,
  onSetImage,
  onRemoveImage,
  topElement: topLabelCpn
}) => {
  const [data, setData] = useState<any>(image || '')
  const [id] = useState<string>(uuidv4())

  const objectURL = useMemo(
    () => (data ? URL.createObjectURL(data) : ''),
    [data]
  )

  useEffect(() => {
    setData(image)
  }, [image])

  const handleChange = (e: any) => {
    if (e.target.files[0]) {
      if (onSetImage) {
        onSetImage(e.target.files[0])
      } else {
        setData(e.target.files[0])
      }
    }
  }

  const remove = () => {
    if (onRemoveImage) {
      onRemoveImage()
    } else {
      setData('')
    }
  }

  return (
    <Box className={className} sx={sxContainer}>
      {!!objectURL && (
        <IconButton onClick={remove} sx={sxIconButton}>
          <ClearIcon />
        </IconButton>
      )}
      {topLabelCpn}
      <label htmlFor={id}>
        <input
          accept="image/*"
          id={id}
          type="file"
          style={{ display: 'none' }}
          onChange={handleChange}
        />
        <Box className="imgBox">
          {objectURL ? (
            <img src={objectURL} alt="image" />
          ) : (
            <AddPhotoAlternateOutlined />
          )}
        </Box>
      </label>
    </Box>
  )
}

export default ImageSelectCpn
