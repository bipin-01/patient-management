import moment, { Moment } from 'moment';
import {
  DEFAULT_DATE_FORMAT
} from '@/constants/date';

export function today(): Moment {
  return moment();
}

/**
 * Format date into given format
 */
export function formatDate(
  date: string | Date | Moment | undefined | null,
  format?: string
): string {
  return moment(date).format(format || DEFAULT_DATE_FORMAT);
}
