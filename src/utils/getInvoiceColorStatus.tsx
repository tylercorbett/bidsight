import { Invoice, InvoiceStatuses } from "../types/invoice";
import { capitalizeString } from "./capitalizeString";
import { isLate } from "./isLate";

export const getInvoiceColorStatus = (invoice: Invoice) => {
  const status = capitalizeString(invoice.status);
  const isInvoiceLate = isLate(invoice.due_date, status);
  if (isInvoiceLate) return 'error';

  switch(status) {
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