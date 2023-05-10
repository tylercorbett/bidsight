import { Invoice, InvoiceStatuses } from "../types/invoice";

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


export function filterObjectsByStatuses(objects: Invoice[], checkedInputs: boolean[]): any[] {
  const statuses = getStatuses(checkedInputs);
  if (statuses.includes('Late')) {

  }
  return objects.filter((obj) => statuses.includes(obj.status));
}
