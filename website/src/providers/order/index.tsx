import React, { createContext, useState, useContext, useEffect } from 'react'
import { observer } from 'mobx-react'
import { isToday } from 'date-fns'

import useUser from 'providers/user'
import OrderCtx from 'context/order/single'
import IOrderPvd from './types'
import cartLS from 'local_storage/cart'

const OrderContext = createContext<IOrderPvd>(new IOrderPvd())

const OrderProvider: React.FC<IOrderPvd> = observer(({ children }) => {
  const { signed } = useUser()
  const [orderCtx, setOrderCtx] = useState<OrderCtx>(new OrderCtx())

  useEffect(() => {
    const ls = cartLS.get()
    if (ls) {
      const order = JSON.parse(ls)
      if (isToday(new Date(order.dtm))) {
        orderCtx.set(order)
      }
    }
  }, [])

  useEffect(() => {
    cartLS.set(JSON.stringify(orderCtx.data))
  }, [orderCtx.data])

  return (
    <OrderContext.Provider
      value={{
        orderCtx
      }}
    >
      {children}
    </OrderContext.Provider>
  )
})

export { OrderProvider }

const useOrder = (): IOrderPvd => useContext(OrderContext)

export default useOrder
