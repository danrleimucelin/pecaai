import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react'
import { toast } from 'react-toastify'
import Recaptcha from 'react-google-recaptcha'
import { isEmail } from 'class-validator'
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import {
  Login as LoginIcon,
  Password as PasswordIcon,
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Report as ReportIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material'

import useUser from 'providers/user'
import {
  sxContainer,
  sxTitle,
  sxForm,
  sxSubmitButton,
  sxInputBox,
  sxInputIcon
} from './styles'

const LoginPage: React.FC = observer(() => {
  const { userCtx, connect, setHeaderTitle } = useUser()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()
  const location = useLocation()

  const isValidEmail = useMemo(
    () => !email.includes('@') || isEmail(email),
    [email]
  )

  useEffect(() => {
    setHeaderTitle('')
    const state = location.state as any
    if (state?.email) {
      setEmail(state.email)
      setPassword(state.password)
    }
  }, [])

  const doLogin = async e => {
    e.preventDefault()

    if (!isValidEmail) {
      toast.error('E-mail inválido')
      return
    }

    setLoading(true)
    try {
      const access_token = await userCtx.api().login(email, password)

      connect(access_token, userCtx.data)

      navigate('/')

      toast.success('Bem Vindo!')
    } catch (error: any) {
      toast.error('Ocorreu um erro. Verifique seu E-mail e senha.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={sxContainer}>
      <Box component="form" autoComplete="off" noValidate sx={sxForm}>
        <Typography sx={sxTitle}>Entrar na minha conta</Typography>
        <br />

        <Box sx={sxInputBox}>
          <PersonIcon sx={sxInputIcon} color="primary" />
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="email">E-mail</InputLabel>
            <Input
              id="email"
              name="email"
              required
              fullWidth
              error={!isValidEmail}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormControl>
        </Box>

        <Box sx={sxInputBox}>
          <PasswordIcon sx={sxInputIcon} color="primary" />
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="password">Senha</InputLabel>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              required
              fullWidth
              onChange={e => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>

        <br />

        <LoadingButton
          color="warning"
          fullWidth
          loading={loading}
          startIcon={<LoginIcon />}
          onClick={doLogin}
          sx={sxSubmitButton}
          variant="contained"
          size="large"
        >
          Entrar
        </LoadingButton>

        <Button
          color="info"
          fullWidth
          startIcon={<PersonAddIcon />}
          onClick={e => {
            e.preventDefault()
            navigate('/user')
          }}
          sx={sxSubmitButton}
          variant="contained"
          size="large"
        >
          Criar nova conta
        </Button>
      </Box>
    </Box>
  )
})

export default LoginPage
