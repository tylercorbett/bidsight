export const isLate = (dateString: string, status: string): boolean => {
  const today = new Date();
  const dateParts = dateString.split(/[-/]/);
  const upperCaseStatus = status.toUpperCase();
  
  // Parsing the date parts as integers (assuming MM-DD-YYYY or MM/DD/YYYY format)
  const month = parseInt(dateParts[0], 10);
  const day = parseInt(dateParts[1], 10);
  const year = parseInt(dateParts[2], 10);
  
  // Creating a new Date object with the provided date string
  const providedDate = new Date(year, month - 1, day); // Month is 0-based
  
  // Comparing the provided date with today's date
  const isDayBeforeToday = providedDate < today;

  if (isDayBeforeToday && (upperCaseStatus === 'OUTSTANDING')) {
    return true;
  } 
  else {
    return false;
  } 
};
