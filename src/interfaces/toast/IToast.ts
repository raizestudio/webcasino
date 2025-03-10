export interface IToast {
  id: string
  message: string
  title?: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number | null
  isClosable?: boolean
}
