export interface Data {
  id: number | string
  parent: number | string | null
  label?: string
}

export interface TableDisplay {
  index: number
  category: string
  label: string
}
