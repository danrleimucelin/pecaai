import api from 'services/api'
import AddressInterface from 'interfaces/Address'
import OrderInterface from 'interfaces/Order'

import OrderCtx from './index'

export default class OrderAPI {
  orderCtx: OrderCtx

  constructor(orderCtx: OrderCtx) {
    this.orderCtx = orderCtx
  }

  async load(id?: string): Promise<void> {
    const { data } = await api.get<OrderInterface>(
      '/orders/' + id || this.orderCtx.data._id || ''
    )

    this.orderCtx.set(data)
  }

  async create(data?: OrderInterface): Promise<void> {
    const { data: product } = await api.post<OrderInterface>(
      '/orders',
      data || this.orderCtx.data
    )

    this.orderCtx.set(product)
  }

  async getLastAddress(): Promise<void> {
    const { data } = await api.get<AddressInterface>('/orders/address/last')

    this.orderCtx.setProps({
      address: data
    })
  }
}
