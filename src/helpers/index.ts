interface getCellColorProps {
  idx: number;
  dayNumber: number;
}

export function getCellColor({ idx, dayNumber }: getCellColorProps): string {
  let color = 'black';

  // for the first and last week row, we need to dye other months days
  if ((idx < 6 && dayNumber > 7) || (idx > 27 && dayNumber < 7)) {
    color = 'gray';
  }
  // to know if is a weekend day and ignore if is from another month
  if ((idx % 7 == 0 || idx % 7 === 6) && color !== 'gray') {
    color = 'blue';
  }

  return color;
}


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
export function getMonth({ date = new Date(), options = {} }): string {
  const dateOptions = {
    month: 'long',
    ...options,
  }

  return new Intl.DateTimeFormat('en-US', dateOptions).format(date);
}

export function getMonthDays(month:string): number {
  const MAPPED_MONTHS: {[key:string]: number} = {
    january: 31,
    february: 28,
    march: 31,
    april: 30,
    may: 31,
    june: 30,
    july: 31,
    august: 31,
    september: 30,
    october: 31,
    november: 30,
    december: 31,
  }

  let days = MAPPED_MONTHS[month.toLowerCase()];

  // if month february and leap year return 29

  return days;
}