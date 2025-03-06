export interface ICurrency {
  code: string
  name: string
  minor_unit: number
  symbol: string
  is_crypto: boolean
  can_deposit: boolean
  can_withdraw: boolean
  is_free: boolean
}