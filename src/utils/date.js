import { format, parseISO } from "date-fns";

/**
 * Format a date to a readable string
 * @param {Date|string} date - The date to format
 * @param {string} formatString - The format pattern (default: 'yyyy-MM-dd')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, formatString = "yyyy-MM-dd") => {
  if (!date) return "";

  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, formatString);
};

/**
 * Parse ISO string to Date object
 * @param {string} dateString - ISO date string
 * @returns {Date|null} Parsed date or null if invalid
 */
export const parseDate = (dateString) => {
  if (!dateString) return null;

  return parseISO(dateString);
};
