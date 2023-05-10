import { Invoice, InvoiceStatuses } from "../types/invoice";
import { isLate } from "./isLate";

function getStatuses(booleanArray: boolean[]): string[] {
  const statuses: string[] = [];

  if (booleanArray[0]) {
    statuses.push(InvoiceStatuses.Paid);
  }
  if (booleanArray[1]) {
    statuses.push(InvoiceStatuses.Outstanding);
  }
  if (booleanArray[2]) {
    statuses.push('Late');
  }
  if (booleanArray[3]) {
    statuses.push(InvoiceStatuses.Draft);
  }

  return statuses;
}


export function filterInvoicesByStatuses(invoices: Invoice[], checkedInputs: boolean[]): Invoice[] {
  const statuses = getStatuses(checkedInputs);
  const result: Invoice[] = [];

  invoices.forEach((invoice: Invoice) => {
    // A late invoice is defined as status === 'Oustanding' && due_date has past present day
    // in this case we want to override the 'Outstanding' filter and force it into the array
    // so that the invoice is still visible

    if (statuses.includes('Late') && isLate(invoice.due_date, invoice.status)) {
      result.push(invoice);
    } else {
      if (statuses.includes(invoice.status)) {
        result.push(invoice);
      }
    }
  });

  console.log(result, 'result');
  return result;
}
