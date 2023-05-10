import { Invoice } from "../types/invoice";
import { capitalizeString } from "./capitalizeString";

export const formatData = (data: Invoice[]): Invoice[] => {
  const result: Invoice[] = [];

  data.forEach((invoice: Invoice) => {
    console.log('data in formatData', invoice);
    const formattedInvoice = {...invoice};
    const capitalizedStatus = capitalizeString(invoice.status);
    formattedInvoice.status = capitalizedStatus;

    result.push(formattedInvoice)
  });

  return result;
};