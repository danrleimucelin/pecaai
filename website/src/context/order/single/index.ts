import { makeAutoObservable } from 'mobx'

import OrderInterface from 'interfaces/Order'
import OrderItemInterface from 'interfaces/OrderItem'
import OrderAPI from './api'

const defProps: OrderInterface = {
  user_id: '',
  dtm: new Date(),
  status: '',
  freight: 0,
  discount: 0,
  total: 0,
  items: []
}

class OrderCtx {
  data: OrderInterface = { ...defProps }

  constructor() {
    makeAutoObservable(this)
  }

  api() {
    return new OrderAPI(this)
  }

  set(data: OrderInterface = { ...defProps }) {
    this.data = data
  }

  setProps(props: any): void {
    this.data = { ...this.data, ...props }
  }

  setPropertie(name: string, value: any): void {
    this.data[name] = value
  }

  setAddressPropertie(name: string, value: any): void {
    if (!this.data.address) {
      this.data.address = {} as any
    }
    if (this.data.address) {
      this.data.address[name] = value
    }
  }

  addItem(item: OrderItemInterface) {
    // this.data.items.push(item)
    // this.data.items = [...this.data.items, item]
    this.set({ ...this.data, items: [...this.data.items, item] })

    this.computeTotal()
  }

  removeItem(itemIndex: number) {
    // this.data.items.splice(itemIndex, 1)
    this.set({
      ...this.data,
      items: this.data.items.filter((_, index) => index !== itemIndex)
    })

    this.computeTotal()
  }

  computeTotal() {
    this.data.items.forEach(item => {
      item.additional_items?.forEach(additionalItem => {
        additionalItem.total = additionalItem.price * additionalItem.quantity
      })

      item.total =
        item.quantity *
        (item.price +
          (item.additional_items?.reduce((acc, curr) => acc + curr.total, 0) ||
            0))
    })
    this.data.total = this.data.items.reduce((acc, curr) => acc + curr.total, 0)
  }
}

export default OrderCtx
