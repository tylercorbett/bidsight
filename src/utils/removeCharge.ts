import { Charge } from "../types/invoice";

export const removeCharge = (charge: Charge, array: Charge[]): Charge[] => {
  const index = array.findIndex(item => item.name === charge.name && item.value === charge.value);

  if (index !== -1) {
    return [...array.slice(0, index), ...array.slice(index + 1)];
  }

  return array;
}
