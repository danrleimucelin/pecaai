import UserCtx from 'context/user'
import User from 'interfaces/User'

export default class IUserPvd {
  userCtx: UserCtx = new UserCtx()
  signed = false
  connect: (access_token: string, user: User) => void = async () => {}
  disconnect: () => void = async () => {}
  showMenu = false
  setShowMenu: (show: boolean) => void = async () => {}
  headerTitle = ''
  setHeaderTitle: (title: string) => void = async () => {}
}
