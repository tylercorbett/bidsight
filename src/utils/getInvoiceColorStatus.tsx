import { Invoice, InvoiceStatuses } from "../types/invoice";
import { isLate } from "./isLate";

export const getInvoiceColorStatus = (invoice: Invoice) => {
  const isInvoiceLate = isLate(invoice.dueDate, invoice.status as InvoiceStatuses);
  if (isInvoiceLate) return 'error';

  switch(invoice.status) {
    case 'Outstanding':
      return 'warning'
    case 'Paid':
      return 'success'
    case 'Draft': 
      return 'primary'
    default:
      return 'primary'
  }
};