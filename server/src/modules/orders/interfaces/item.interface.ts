export interface OrderItemInterface {
  _id?: string;
  product_id: string;
  additional_items?: OrderItemInterface[];
  quantity: number;
  price: number;
  discount: number;
  total: number;
}
