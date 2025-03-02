export interface IUser {
  id: number
  username: string
  email: string
  password: string
  is_active: boolean
  is_superuser: boolean
  is_staff: boolean
}