import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo
} from 'react'

import api from 'services/api'
import UserInterface from 'interfaces/User'
import accessTokenLS from 'local_storage/auth'
import UserCtx from 'context/user'
import IUserPvd from './types'

const UserContext = createContext<IUserPvd>(new IUserPvd())

const UserProvider: React.FC<IUserPvd> = ({ children }) => {
  const [userCtx, setUserCtx] = useState<UserCtx>(new UserCtx())
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [headerTitle, setHeaderTitle] = useState<string>('')

  const signed = useMemo(() => !!userCtx.data._id, [userCtx.data._id])

  const connect = (access_token: string, user: UserInterface) => {
    accessTokenLS.set(access_token)
    api.defaults.headers.common.Authorization = 'Bearer ' + access_token
    const ctx = new UserCtx()
    ctx.set(user)
    setUserCtx(ctx)
  }

  const disconnect = () => {
    accessTokenLS.clear()
    api.defaults.headers.common.Authorization = ''
    setUserCtx(new UserCtx())
  }

  useEffect(() => {
    const load = async () => {
      try {
        api.defaults.headers.common.Authorization =
          'Bearer ' + String(accessTokenLS.get())

        const access_token = await userCtx.api().reLogin()

        connect(access_token, userCtx.data)
      } catch (error: any) {
        api.defaults.headers.common.Authorization = ''
      }
    }

    if (accessTokenLS.exists()) {
      load()
    }
  }, [])

  useEffect(() => {
    // console.log(window.innerWidth > window.innerHeight)
    function handleResize() {
      console.log(window.innerWidth > window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <UserContext.Provider
      value={{
        userCtx,
        signed,
        connect,
        disconnect,
        showMenu,
        setShowMenu,
        headerTitle,
        setHeaderTitle
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider }

const useUser = (): IUserPvd => useContext(UserContext)

export default useUser
