import { forwardRef } from 'react'
import InputMask from 'react-input-mask'

const MaskFormat = forwardRef(
  ({ onChange, mask, ...restProps }: any, ref: any) => (
    <InputMask
      {...restProps}
      inputRef={ref}
      mask={mask}
      onChange={e =>
        onChange({
          target: {
            name: restProps.name,
            value: e.target.value
          }
        })
      }
    />
  )
)

export default MaskFormat
