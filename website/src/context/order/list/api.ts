import api from 'services/api'
import OrderInterface from 'interfaces/Order'

import OrderListCtx from './index'

export default class OrderListAPI {
  orderListCtx: OrderListCtx

  constructor(productListCtx: OrderListCtx) {
    this.orderListCtx = productListCtx
  }

  async load(): Promise<void> {
    const { data } = await api.get<OrderInterface[]>('/orders/list')

    this.orderListCtx.set(data)
  }
}
