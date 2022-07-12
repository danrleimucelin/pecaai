import BaseInterface from './_Base'

export default interface OrderItemInterface extends BaseInterface {
  product_id: string
  additional_items?: OrderItemInterface[]
  quantity: number
  price: number
  discount: number
  total: number
}
