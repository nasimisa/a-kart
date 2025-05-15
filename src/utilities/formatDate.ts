import { format, isValid, parse } from 'date-fns';

export const formatDate = (dateString: string) => {
  const outputFormat = 'd MMMM yyyy';
  const fallback = '-';

  if (!dateString || typeof dateString !== 'string' || dateString.trim() === '') {
    return fallback;
  }

  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/; // Matches YYYY-MM-DD
  const usDateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // Matches M/D/YYYY

  let parsedDate = new Date();

  if (!isValid(parsedDate)) {
    return '-';
  }

  if (isoDateRegex.test(dateString)) {
    parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
  }

  if (usDateRegex.test(dateString)) {
    parsedDate = parse(dateString, 'M/d/yyyy', new Date());
  }

  if (!isValid(parsedDate)) {
    return fallback;
  }

  return format(parsedDate, outputFormat);
};
