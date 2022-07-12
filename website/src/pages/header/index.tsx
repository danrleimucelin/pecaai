import React from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import {
  Dashboard as DashboardIcon,
  Menu as MenuIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon
} from '@mui/icons-material'

import useUser from 'providers/user'
import { sxContainer, sxUserBox, sxToolbar, sxTitle } from './styles'

const HeaderElement: React.FC = observer(() => {
  const { setShowMenu, signed, headerTitle } = useUser()

  const navigate = useNavigate()

  const doShowMenu = e => {
    e.preventDefault()
    setShowMenu(true)
  }

  const doGoToDashboard = e => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <AppBar position="fixed" color="inherit" elevation={0} sx={sxContainer}>
      <Toolbar variant="dense" disableGutters sx={sxToolbar}>
        <Box>
          <IconButton onClick={doShowMenu}>
            <MenuIcon />
          </IconButton>

          {/* <IconButton onClick={doGoToDashboard}>
            <DashboardIcon />
          </IconButton> */}
        </Box>

        <Typography sx={sxTitle}>{headerTitle}</Typography>

        <Box>
          <IconButton onClick={() => navigate('/cart')}>
            <ShoppingCartOutlinedIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
})

export default HeaderElement
