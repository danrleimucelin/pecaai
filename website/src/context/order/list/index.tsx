import { makeAutoObservable } from 'mobx'

import OrderInterface from 'interfaces/Order'
import OrderListAPI from './api'

export default class OrderListCtx {
  data: OrderInterface[] = []

  constructor() {
    makeAutoObservable(this)
  }

  set(data: OrderInterface[] = []) {
    this.data = data
  }

  api(): OrderListAPI {
    return new OrderListAPI(this)
  }
}
