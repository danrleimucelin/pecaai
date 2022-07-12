import api from 'services/api'
import User from 'interfaces/User'
import UserCtx from './index'

export default class UserAPI {
  userCtx: UserCtx

  constructor(userCtx: UserCtx) {
    this.userCtx = userCtx
  }

  async create(user?: User): Promise<void> {
    const { name, email, phone, cpf, cnpj, password } =
      user || this.userCtx.data

    const { data } = await api.post<User>('/users', {
      name,
      email,
      phone: phone || undefined,
      cpf: cpf || undefined,
      cnpj: cnpj || undefined,
      password
    })

    this.userCtx.set({ ...data, password: undefined })
  }

  async update(user?: User) {
    const { _id, name, email, phone, cpf, cnpj, password } =
      user || this.userCtx.data

    const { data } = await api.patch<User>('/users/' + _id, {
      name,
      email,
      phone: phone || undefined,
      cpf: cpf || undefined,
      cnpj: cnpj || undefined,
      password
    })

    this.userCtx.set({ ...data, password: undefined })
  }

  async load(id?: string): Promise<void> {
    const { data } = await api.get<User>(
      '/users/' + (id || this.userCtx.data._id)
    )

    this.userCtx.set({ ...data, password: undefined })
  }

  async login(email: string, password: string): Promise<string> {
    const { data } = await api.post('/users/login', {
      email,
      password
    })

    this.userCtx.set({ ...data.user, password: undefined })
    return data.access_token
  }

  async reLogin(): Promise<string> {
    const { data } = await api.post('/users/relogin')

    this.userCtx.set({ ...data.user, password: undefined })
    return data.access_token
  }
}
