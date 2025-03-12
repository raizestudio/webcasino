export interface IPlayerProfile {
  id: number //Pk
  level: number
  experience: number
  referral_code: string
  created_at: string
  updated_at: string

  // Relations
  user: number
}
