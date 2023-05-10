import { Invoice, InvoiceStatuses } from "../types/invoice";
import { isLate } from "./isLate";

export const getInvoiceColorStatus = (invoice: Invoice) => {
  const status = invoice.status;
  const isInvoiceLate = isLate(invoice.due_date, status);
  if (isInvoiceLate) return 'error';

  switch(status) {
    case InvoiceStatuses.Outstanding:
      return 'warning'
    case InvoiceStatuses.Paid:
      return 'success'
    case InvoiceStatuses.Draft: 
      return 'primary'
    default:
      return 'primary'
  }
};