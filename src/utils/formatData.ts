import { Invoice } from "../types/invoice";
import { capitalizeString } from "./capitalizeString";

function reformatCharges(arr: { [key: string]: string }[]): { label: string; cost: string }[] {
  return arr.map((obj) => {
    const [label, cost] = Object.entries(obj)[0];
    return { label, cost };
  });
}

export const formatData = (data: any[]): Invoice[] => {
  const result: Invoice[] = [];

  data.forEach((invoice: any) => {
    const formattedInvoice = {...invoice};
    const capitalizedStatus = capitalizeString(invoice.status);
    formattedInvoice.status = capitalizedStatus;

    if (invoice.charges.length > 0) {
      const reformattedCharges = reformatCharges(invoice.charges);
      formattedInvoice.charges = reformattedCharges;
    }
    result.push(formattedInvoice)
  });

  return result;
};