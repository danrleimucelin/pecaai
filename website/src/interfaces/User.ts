import BaseInterface from './_Base'

export default interface UserInterface extends BaseInterface {
  _id?: string
  name: string
  email: string
  phone?: string
  password?: string
  cpf?: string
  cnpj?: string
  admin: boolean
}
