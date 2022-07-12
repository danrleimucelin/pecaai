import { forwardRef } from 'react'
import NumberFormat from 'react-number-format'

const CurrencyFormat = forwardRef(
  ({ onChange, ...restProps }: any, ref: any) => (
    <NumberFormat
      {...restProps}
      getInputRef={ref}
      onValueChange={values =>
        onChange({
          target: {
            name: restProps.name,
            value: values.value
          }
        })
      }
      isNumericString
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
    />
  )
)

export default CurrencyFormat
