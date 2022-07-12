import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import ICheckScreenSizeLyt from './types'

const LayoutControllerContext = createContext<ICheckScreenSizeLyt>(
  new ICheckScreenSizeLyt()
)

const LayoutControllerProvider: React.FC<ICheckScreenSizeLyt> = ({
  children
}) => {
  const [inVertical, setInVertical] = useState<boolean>(
    window.innerWidth < window.innerHeight
  )

  const { pathname } = useLocation()

  useEffect(() => {
    function handleResize() {
      setInVertical(window.innerWidth < window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [pathname])

  return (
    <LayoutControllerContext.Provider value={{ inVertical }}>
      {children}
    </LayoutControllerContext.Provider>
  )
}

export { LayoutControllerProvider }

const useLayoutController = (): ICheckScreenSizeLyt =>
  useContext(LayoutControllerContext)

export default useLayoutController
