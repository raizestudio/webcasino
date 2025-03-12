export interface IUser {
  id: number // Pk
  username: string
  email: string
  password: string
  is_active: boolean
  is_superuser: boolean
  is_staff: boolean
  avatar: string
  created_at: string
  updated_at: string
}
