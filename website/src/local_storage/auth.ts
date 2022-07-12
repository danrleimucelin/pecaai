const ACCESS_TOKEN_KEY = 'PecaAi:AccessToken'

class AccessTokenLS {
  private accessToken?: string | null

  constructor() {
    this.accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
  }

  set = (accessToken: string): void => {
    this.accessToken = accessToken
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  }

  get = () => this.accessToken

  clear = () => {
    this.accessToken = null
    localStorage.removeItem(ACCESS_TOKEN_KEY)
  }

  exists = () => this.accessToken !== null
}

export default new AccessTokenLS()
