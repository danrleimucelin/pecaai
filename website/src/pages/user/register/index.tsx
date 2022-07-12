import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'
import { toast } from 'react-toastify'
import { isEmail } from 'class-validator'
import { Button, TextField, Box, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import {
  Login as LoginIcon,
  SaveAlt as SaveAltIcon,
  PersonAdd as PersonAddIcon
} from '@mui/icons-material'
import { cpf as validCPF, cnpj as validCNPJ } from 'cpf-cnpj-validator'

import useUser from 'providers/user'
import UserCtx from 'context/user'
import MaskFormat from 'components/MaskFormat'
import { returnNullIfEmpty, returnOnlyNumbers } from 'functions/format'
import { sxTitle, sxForm, sxSubmitButton } from './styles'

const UserPage: React.FC = observer(() => {
  const { userCtx, setHeaderTitle } = useUser()
  const [editUserCtx, setEditUserCtx] = useState<UserCtx>(new UserCtx())
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  const newUser = useMemo(() => !editUserCtx.data._id, [editUserCtx.data._id])
  const isValidEmail = useMemo(
    () => isEmail(editUserCtx.data.email),
    [editUserCtx.data.email]
  )
  const cpf = useMemo(
    () => returnNullIfEmpty(returnOnlyNumbers(editUserCtx.data.cpf)),
    [editUserCtx.data.cpf]
  )
  const cnpj = useMemo(
    () => returnNullIfEmpty(returnOnlyNumbers(editUserCtx.data.cnpj)),
    [editUserCtx.data.cnpj]
  )
  const isValidCPF = useMemo(() => !cpf || validCPF.isValid(cpf), [cpf])
  const isValidCNPJ = useMemo(() => !cnpj || validCNPJ.isValid(cnpj), [cnpj])

  useEffect(() => {
    editUserCtx.set({ ...userCtx.data })
  }, [editUserCtx, userCtx.data])

  useEffect(() => {
    setHeaderTitle(newUser ? 'Cadastrar ' : 'Usuário')
  }, [newUser])

  const doSave = async e => {
    e.preventDefault()

    setLoading(true)
    try {
      await editUserCtx.api().update()

      userCtx.set(editUserCtx.data)

      toast.success('Usuário Atualizado')
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const doRegister = async e => {
    e.preventDefault()

    if (editUserCtx.data.password !== passwordConfirm) {
      toast.error('Senha de Confirmação inválida')
      return
    }

    setLoading(true)
    try {
      const password = editUserCtx.data.password

      await editUserCtx.api().create()

      toast.success('Conta Criada')

      navigate('/login', {
        state: {
          email: editUserCtx.data.email,
          password
        }
      })
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const doOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    editUserCtx.setPropertie(name, value)
  }

  return (
    <Box component="form" autoComplete="off" noValidate sx={sxForm}>
      <br />

      {/* <Typography sx={sxTitle}>{newUser ? 'Cadastrar ' : 'Usuário'}</Typography>
      <br /> */}

      <TextField
        id="name"
        name="name"
        label="Nome"
        required
        fullWidth
        value={editUserCtx.data.name || ''}
        onChange={doOnChange}
      />

      <TextField
        id="email"
        name="email"
        label="E-mail"
        type="email"
        required
        disabled={!newUser}
        fullWidth
        error={!!editUserCtx.data.email && !isValidEmail}
        value={editUserCtx.data.email || ''}
        placeholder="E-mail"
        onChange={doOnChange}
      />

      <TextField
        id="phone"
        name="phone"
        label="Telefone"
        disabled={!newUser && !!userCtx.data.phone}
        InputProps={{
          inputComponent: MaskFormat,
          inputProps: {
            mask: '(99) 99999-9999'
          }
        }}
        fullWidth
        value={editUserCtx.data.phone || ''}
        onChange={doOnChange}
      />

      <TextField
        id="cpf"
        name="cpf"
        label="CPF"
        disabled={!newUser && !!userCtx.data.cpf}
        InputProps={{
          inputComponent: MaskFormat,
          inputProps: {
            mask: '999.999.999-99'
          }
        }}
        fullWidth
        error={!isValidCPF}
        value={editUserCtx.data.cpf || ''}
        onChange={doOnChange}
      />

      {newUser && (
        <>
          <TextField
            id="password"
            type="password"
            name="password"
            label="Senha"
            required
            fullWidth
            error={
              !!editUserCtx.data.password &&
              editUserCtx.data.password.length < 6
            }
            value={editUserCtx.data.password}
            placeholder="**********"
            onChange={doOnChange}
          />

          <TextField
            id="confirm_password"
            type="password"
            name="confirm_password"
            label="Confirmar Senha"
            required
            error={
              !!editUserCtx.data.password &&
              editUserCtx.data.password !== passwordConfirm
            }
            fullWidth
            value={passwordConfirm}
            placeholder="**********"
            onChange={e => setPasswordConfirm(e.target.value)}
          />
        </>
      )}

      <br />

      {newUser ? (
        <>
          <LoadingButton
            color="success"
            loading={loading}
            fullWidth
            startIcon={<PersonAddIcon />}
            onClick={doRegister}
            sx={sxSubmitButton}
            variant="contained"
            size="large"
          >
            Confirmar meu cadastro
          </LoadingButton>
          <Button
            color="info"
            fullWidth
            startIcon={<LoginIcon />}
            onClick={e => {
              e.preventDefault()
              navigate('/login')
            }}
            sx={sxSubmitButton}
            variant="contained"
            size="large"
          >
            Já tenho cadastro
          </Button>
        </>
      ) : (
        <LoadingButton
          loading={loading}
          fullWidth
          startIcon={<SaveAltIcon />}
          onClick={doSave}
          sx={sxSubmitButton}
          variant="contained"
          size="large"
        >
          Atualizar meus dados
        </LoadingButton>
      )}

      <br />
    </Box>
  )
})

export default UserPage
