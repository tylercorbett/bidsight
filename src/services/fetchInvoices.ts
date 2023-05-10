import { formatData } from "../utils/formatData";

export const fetchInvoices = async () => {
  try {
    const response = await fetch('https://takehome.api.bidsight.io/v2/invoices');
    const data = await response.json();
    const formattedData = formatData(data);
    return formattedData;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
}