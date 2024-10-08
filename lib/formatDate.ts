import { parseISO, format } from "date-fns";

export const formatDate = (date: string): string => {
  return format(parseISO(date), "MMM dd, yyyy");
};
