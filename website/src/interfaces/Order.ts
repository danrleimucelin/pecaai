import BaseInterface from './_Base'
import AddressInterface from './Address'
import OrderItemInterface from './OrderItem'

export default interface OrderInterface extends BaseInterface {
  user_id: string
  dtm: Date
  status: string
  freight: number
  discount: number
  total: number
  obs?: string
  delivered_dtm?: Date
  items: OrderItemInterface[]
  address?: AddressInterface
}
