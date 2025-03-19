import type { ICurrency } from '@/interfaces/financial/ICurrency'

export interface IPool {
  id: number
  balance: number

  // Relations
  currency: ICurrency
}
