export interface Charge {
  label: string,
  cost: string
}

export type Invoice = {
  name: string,
  category: string,
  due_date:  string,
  status: string,
  charges: Charge[],
  id: number
}

export type InvoiceBody = {
  name: string,
  category: string,
  due_date:  string,
  status: string,
}

export enum InvoiceStatuses {
  Paid = 'Paid',
  Outstanding = 'Outstanding',
  Draft = 'Draft'
}