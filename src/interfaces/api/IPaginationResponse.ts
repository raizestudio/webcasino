export interface IPaginationLink {
  next: string | null
  previous: string | null
}
export interface IPaginationResponse<T> {
  links: IPaginationLink
  count: number
  results: T[]
}
