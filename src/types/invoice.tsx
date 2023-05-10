export interface Charge {
  label: string,
  cost: string
}

export type Invoice = {
  name: string,
  category: string,
  dueDate:  string,
  status: string,
}

export enum InvoiceStatuses {
  Paid = 'Paid',
  Outstanding = 'Outstanding',
  Draft = 'Draft'
}