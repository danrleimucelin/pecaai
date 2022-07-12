import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import { LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

import { UserProvider } from 'providers/user'
import { ProductListProvider } from 'providers/productList'
import { OrderProvider } from 'providers/order'
import IUserPvd from 'providers/user/types'
import IProductListPvd from 'providers/productList/types'
import IOrderPvd from 'providers/order/types'
import SwitchRoutes from 'routes'
import ICheckScreenSizeLyt from 'layout/layoutController/types'
import { themeMaterialUI } from 'styles/materialUI'
import CreateGlobalStyle from './styles/global'
import { LayoutControllerProvider } from 'layout/layoutController'

const globalStyles = <CreateGlobalStyle />

const App: React.FC = () => {
  return (
    <UserProvider {...new IUserPvd()}>
      <ProductListProvider {...new IProductListPvd()}>
        <OrderProvider {...new IOrderPvd()}>
          <BrowserRouter>
            {globalStyles}
            <ToastContainer autoClose={1500} theme="colored" />
            <ThemeProvider theme={themeMaterialUI}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <LayoutControllerProvider {...new ICheckScreenSizeLyt()}>
                  <SwitchRoutes />
                </LayoutControllerProvider>
              </LocalizationProvider>
            </ThemeProvider>
          </BrowserRouter>
        </OrderProvider>
      </ProductListProvider>
    </UserProvider>
  )
}

export default App
