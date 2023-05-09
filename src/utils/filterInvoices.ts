function getStatuses(booleanArray: boolean[]): string[] {
  const statuses: string[] = [];

  if (booleanArray[0]) {
    statuses.push('Paid');
  }
  if (booleanArray[1]) {
    statuses.push('Outstanding');
  }
  if (booleanArray[2]) {
    statuses.push('Late');
  }
  if (booleanArray[3]) {
    statuses.push('Draft');
  }

  return statuses;
}


export function filterObjectsByStatuses(objects: any[], checkedInputs: boolean[]): any[] {
  const statuses = getStatuses(checkedInputs);
  return objects.filter((obj) => statuses.includes(obj.status));
}
