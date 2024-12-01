const options = {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}
export const printPrice = new Intl.NumberFormat('pt-BR', options)
