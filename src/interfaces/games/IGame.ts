export interface IGameCategory {
  id: number
  name: string
}

export interface IGame {
  id: number
  name: string
  description: string
  release_date: string
  rating: number
  preview_image: string
  created_at: string
  updated_at: string

  category: IGameCategory
}
