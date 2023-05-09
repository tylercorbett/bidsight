import { Charge } from "../types/invoice";

export const removeCharge = (charge: Charge, array: Charge[]): Charge[] => {
  const index = array.findIndex(item => item.label === charge.label && item.value === charge.value);

  if (index !== -1) {
    return [...array.slice(0, index), ...array.slice(index + 1)];
  }

  return array;
}
