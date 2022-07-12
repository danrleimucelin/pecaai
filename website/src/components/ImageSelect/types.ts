import { ReactNode } from 'react'

export interface ImageSelectProps {
  className?: string
  image?: any
  onSetImage?: (data: any) => void
  onRemoveImage?: () => void
  topElement?: ReactNode | any
  bottomElement?: ReactNode | any
}
