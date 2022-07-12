import BaseInterface from './_Base'

export default interface AddressInterface extends BaseInterface {
  street: string
  number: string
  complement?: string
  district?: string
  city?: string
  state?: string
  zipcode?: string
}
