const CART_KEY = 'PecaAi:Cart'

class CartLS {
  private cart?: string | null

  constructor() {
    this.cart = localStorage.getItem(CART_KEY)
  }

  set = (accessToken: string): void => {
    this.cart = accessToken
    localStorage.setItem(CART_KEY, accessToken)
  }

  get = () => this.cart

  clear = () => {
    this.cart = null
    localStorage.removeItem(CART_KEY)
  }

  exists = () => this.cart !== null
}

const cartLS = new CartLS()

export default cartLS
