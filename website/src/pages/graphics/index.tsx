import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import Chart from 'react-apexcharts'
import { addDays, format, getDay, isSameDay } from 'date-fns'

import api from 'services/api'
import User from 'interfaces/User'
import Order from 'interfaces/Order'
import useUser from 'providers/user'
import { GraphicsInterface } from './types'
import { sxContainer } from './styles'

const GraphicsPage: React.FC = () => {
  const { setHeaderTitle } = useUser()
  const [orders, setOrders] = useState<GraphicsInterface | null>(null)
  const [customers, setCustomers] = useState<GraphicsInterface | null>(null)
  const [products, setProducts] = useState<GraphicsInterface | null>(null)

  useEffect(() => {
    setHeaderTitle('Gráficos e Relatórios')

    const loadOrders = async () => {
      const response = await api.get<Order[]>('/orders/graphics/last/month')

      const { data } = response

      const days = Array.from(Array(30).keys())
        .map(i => addDays(new Date(), -i))
        .reverse()

      setOrders({
        type: 'area',
        options: {
          chart: {
            id: 'basic-bar'
          },
          xaxis: {
            categories: days.map(day => format(day, 'dd/MM'))
          }
        },
        series: [
          {
            name: 'Quantidade',
            data: days.map(
              day =>
                data.filter(item =>
                  isSameDay(new Date(item.created_dtm || 0), day)
                ).length
            )
          }
        ]
      })
    }

    const loadUsers = async () => {
      const response = await api.get<User[]>('/users/graphics/last/month')

      const { data } = response

      const days = Array.from(Array(30).keys())
        .map(i => addDays(new Date(), -i))
        .reverse()

      setCustomers({
        type: 'area',
        options: {
          chart: {
            id: 'basic-bar'
          },
          xaxis: {
            categories: days.map(day => format(day, 'dd/MM'))
          }
        },
        series: [
          {
            name: 'Quantidade',
            data: days.map(
              day =>
                data.filter(item =>
                  isSameDay(new Date(item.created_dtm || 0), day)
                ).length
            )
          }
        ]
      })
    }

    const loadProducts = async () => {
      const response = await api.get('/products/graphics/orders')
      const { data } = response

      setProducts({
        type: 'bar',
        options: {
          chart: {
            id: 'basic-bar'
          },
          xaxis: {
            categories: data.map(item => item.name)
          }
        },
        series: [
          {
            name: 'Quantidade',
            data: data.map(item => item.ordersQuantity)
          }
        ]
      })
    }

    loadOrders()
    loadUsers()
    loadProducts()
  }, [])

  return (
    <Box sx={sxContainer}>
      {!!orders && (
        <>
          <Typography>Vendas no último mês</Typography>

          <Chart
            options={orders.options}
            series={orders.series}
            type={orders.type}
            width="600px"
          />
        </>
      )}

      {!!customers && (
        <>
          <Typography>Novos Clientes no último mês</Typography>

          <Chart
            options={customers.options}
            series={customers.series}
            type={customers.type}
            width="600px"
          />
        </>
      )}

      {!!products && (
        <>
          <Typography>Saída de Produtos</Typography>

          <Chart
            options={products.options}
            series={products.series}
            type={products.type}
            width="600px"
          />
        </>
      )}
    </Box>
  )
}

export default GraphicsPage
