import { Invoice } from "../types/invoice";

export function replaceObjectInArray(arr: Invoice[], newObj: Invoice): Invoice[] {
  const updatedArray = arr.map(obj => {
    if (obj.id === newObj.id) {
      return newObj; // Replace the matching object with the new object
    }
    return obj; // Keep the existing object
  });
  return updatedArray;
}