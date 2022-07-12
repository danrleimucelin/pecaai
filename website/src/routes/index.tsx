import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'

import useUser from 'providers/user'
import HeaderElement from 'pages/header'
import MenuElement from 'pages/menu'
import UserPage from 'pages/user/register'
import LoginPage from 'pages/user/login'
import ProductListPage from 'pages/product/list'
import ProductPage from 'pages/product/single'
import CartPage from 'pages/cart'
import GraphicsPage from 'pages/graphics'
import OrderListPage from 'pages/order/list'
import OrderPage from 'pages/order/single'
import MainPage from 'pages/main'
import { sxScreen, sxContent } from './styles'

const SwitchRoutes: React.FC = () => {
  const { userCtx, signed } = useUser()

  return (
    <Box sx={sxScreen}>
      <HeaderElement />

      <MenuElement />

      <Box sx={sxContent}>
        <Routes>
          <Route path="user" element={<UserPage />} />

          <Route path="cart" element={<CartPage />} />

          {signed ? (
            <>
              <Route path="orders" element={<OrderListPage />} />

              <Route path="orders/:id" element={<OrderPage />} />

              <Route path="graphics" element={<GraphicsPage />} />

              {userCtx.data.admin ? (
                <>
                  <Route path="products" element={<ProductListPage />} />
                  <Route path="products/:id" element={<ProductPage />} />
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <Route path="login" element={<LoginPage />} />
            </>
          )}

          <Route path="*" element={<MainPage />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default SwitchRoutes
