import React from 'react'
import { observer } from 'mobx-react'
import { useNavigate } from 'react-router-dom'
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import {
  ArrowBack as ArrowBackIcon,
  Category as CategoryIcon,
  Dashboard as DashboardIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  ManageAccounts as ManageAccountsIcon,
  ViewList as ViewListIcon
} from '@mui/icons-material'

import useUser from 'providers/user'
import { IOption } from './types'
import { sxIcon, sxList } from './styles'

const MenuElement: React.FC = observer(() => {
  const { userCtx, setShowMenu, showMenu, signed, disconnect } = useUser()

  const navigate = useNavigate()

  const optionsUP: IOption[] = [
    {
      name: 'Início',
      url: '/',
      icon: <DashboardIcon />,
      show: true
    },
    {
      name: 'Relatórios',
      url: '/graphics',
      icon: <DashboardIcon />,
      show: userCtx.isAdmin()
    },
    {
      name: 'Entrar',
      url: '/login',
      icon: <LoginIcon />,
      show: !signed
    },
    {
      name: 'Cadastrar',
      url: '/user',
      icon: <ManageAccountsIcon />,
      show: !signed
    },
    {
      name: 'Usuário',
      url: '/user',
      icon: <ManageAccountsIcon />,
      show: signed
    },
    {
      name: 'Produtos',
      url: '/products',
      icon: <CategoryIcon />,
      show: userCtx.data.admin
    },
    {
      name: 'Pedidos',
      url: '/orders',
      icon: <ViewListIcon />,
      show: signed
    }
  ]

  const optionsDown: IOption[] = [
    {
      name: 'Sair',
      icon: <LogoutIcon />,
      onClick: () => {
        disconnect()
        navigate('/login')
      },
      show: signed
    }
  ]

  const doOnClick = (e, option: IOption) => {
    e.preventDefault()

    if (option.onClick) {
      option.onClick()
    }
    if (option.url) {
      navigate(option.url)
    }
    setShowMenu(false)
  }

  return (
    <Drawer open={showMenu} anchor="left" onClose={() => setShowMenu(false)}>
      <List dense disablePadding sx={sxList({ bottom: false })}>
        <li key="closeMenu" style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}></div>
          <IconButton onClick={() => setShowMenu(false)}>
            <ArrowBackIcon />
          </IconButton>
        </li>

        {optionsUP
          .filter(({ show }) => show)
          .map((option, index) => (
            <ListItemButton
              key={index}
              dense
              onClick={e => doOnClick(e, option)}
            >
              <ListItemIcon sx={sxIcon}>{option.icon}</ListItemIcon>
              <ListItemText primary={option.name} />
            </ListItemButton>
          ))}
      </List>

      <Divider />

      <List dense disablePadding sx={sxList({ bottom: true })}>
        {optionsDown
          .filter(({ show }) => show)
          .map((option, index) => (
            <ListItemButton
              key={index}
              dense
              onClick={e => doOnClick(e, option)}
            >
              <ListItemIcon sx={sxIcon}>{option.icon}</ListItemIcon>
              <ListItemText primary={option.name} />
            </ListItemButton>
          ))}
      </List>
    </Drawer>
  )
})

export default MenuElement
