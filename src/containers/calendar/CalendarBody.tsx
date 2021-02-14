import React from 'react';
import { Box, Text } from 'theme-ui';

import { getCellColor, getMonthDays } from '../../helpers';


const sxCalendarCell = {
  border: '1px solid',
  borderStyle:'inset',
  fontWeight: 'bold',
  padding: [2],
}

const CalendarCell = ({ idx=0, dayNumber=0, handleClick}: any): React.ReactElement => (
  <Box
    onClick={() => handleClick(idx)}
    sx={sxCalendarCell}
    className='calendar-cell'
  >
    <Text sx={{color: getCellColor({ idx, dayNumber })}}>
      {dayNumber ? dayNumber : ''}
    </Text>
  </Box>
)

const sxCalendarBody = {
  border: '1px outset',
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 14%)', // 7 cols
  gridTemplateRows: 'repeat(5, 100px)', // 5 rows
  justifyContent: 'space-evenly',
  'div.calendar-cell': {
    bg: 'white',
  },
  '.calendar-cell:nth-of-type(7n+1), .calendar-cell: nth-of-type(7n)': {
    bg: 'lightgray'
  },
}

interface CalendarBodyProps {
  showMaxCells?: number;
  currentDate: Date;
  currentMonth: string;
}

const CalendarBody = ({ showMaxCells = 35, currentMonth, currentDate }: CalendarBodyProps): React.ReactElement => {
  const Body = [];

  const monthDays = getMonthDays(currentMonth);
  // copy without alter the current date
  const newDate = new Date(currentDate);
  // move to the first day of the month
  newDate.setDate(1);
  // get the weekday
  const firstDayWeekOfTheMonth = newDate.getDay();
  // to keep track of the days of the month
  let currentDay = 0;

  for (let idx = 0; idx < showMaxCells; idx++) {
    if (idx >= firstDayWeekOfTheMonth && idx <= monthDays) {
      currentDay++;
    } else {
      // reset the value to get ignored in <CalendarCell />
      currentDay = 0;
    }

    Body.push(
      <CalendarCell
        key={idx}
        idx={idx}
        dayNumber={currentDay}
      />
    )
  }

  return (
    <Box sx={sxCalendarBody}>
      {Body}
    </Box>
  )
}

export default CalendarBody;
