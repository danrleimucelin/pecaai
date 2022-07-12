import { format } from 'date-fns'

export const returnOnlyNumbers = (value: string | any): string =>
  String(value).replace(/[^0-9]/g, '')

export const returnNullIfEmpty = (value: any): any | null => value || null

export const formatNumber = (value?: number | string) =>
  value ? Number(Intl.NumberFormat().format(Number(value))) : value

export const formatMonetary = (value?: number | string) => {
  if (!value) return value

  return Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(Number(value))
}

export const defaultDateTime = (dtm: Date | string | undefined | null) =>
  dtm ? format(new Date(dtm), 'dd/MM/yy HH:mm') : ''
