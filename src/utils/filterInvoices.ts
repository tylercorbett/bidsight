export function filterObjectsByStatus(objects: any[], status: string): any[] {
  return objects.filter((obj) => obj.status === status);
}