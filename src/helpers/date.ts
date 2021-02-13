


interface getMonthProps {
  date?: any;
  options?: {
    month?: string;
  }
}
/**
 * Returns the month of the giving date obj
 * @param {object} [date] - The date to work with.
 * @param {object} [options] - custom options
 * @param {string} [option.month] - the desired month format
 * @returns {string} month
 */
export function getMonth({ date = new Date(), options= {} }):string {

  const dateOptions = {
    month: 'long',
    ...options,
  }

  return new Intl.DateTimeFormat('en-US', dateOptions).format(date);
}