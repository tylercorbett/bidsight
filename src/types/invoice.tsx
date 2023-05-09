export interface Charge {
  label: string,
  value: string
}

export type Invoice = {
  name: string,
  category: string,
  dueDate:  string,
  status: string,
}