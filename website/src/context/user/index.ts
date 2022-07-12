import { makeAutoObservable } from 'mobx'
import UserInterface from 'interfaces/User'
import UserAPI from './api'

const defProps: UserInterface = {
  name: '',
  email: '',
  admin: false
}

class UserCtx {
  data: UserInterface = { ...defProps }

  constructor() {
    makeAutoObservable(this)
  }

  api(): UserAPI {
    return new UserAPI(this)
  }

  set(data: UserInterface = { ...defProps }): void {
    this.data = data
  }

  setProps(props: any): void {
    this.data = { ...this.data, ...props }
  }

  setPropertie(name: string, value: any): void {
    this.data[name] = value
  }

  isAdmin(): boolean {
    return !!this.data.admin
  }
}

export default UserCtx
