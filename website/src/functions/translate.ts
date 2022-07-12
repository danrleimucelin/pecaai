export function translateStatus(status: string) {
  switch (status.toUpperCase()) {
    case 'PENDING':
      return 'Pendente'
    case 'COOKING':
      return 'Cozinhando'
    case 'READY':
      return 'Pronto'
    case 'DELIVERING':
      return 'Enviando'
    case 'DELIVERED':
      return 'Entregue'
    default:
      return 'Desconhecido'
  }
}
