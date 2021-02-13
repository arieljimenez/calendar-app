import React from 'react';
import { Box, Text } from 'theme-ui';

import { getCellColor } from '../../helpers';


const sxCalendarCell = {
  border: '1px solid',
  borderStyle:'inset',
  fontWeight: 'bold',
  padding: [2],
}

const CalendarCell = ({ idx='00', dayNumber='0', handleClick}: any): React.ReactElement => (
  <Box
    onClick={() => handleClick(idx)}
    sx={sxCalendarCell}
    className='calendar-cell'
  >
    <Text sx={{color: getCellColor({ idx, dayNumber })}}>
      {dayNumber}
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
  '.calendar-cell:nth-child(7n+1), .calendar-cell: nth-child(7n)': {
    bg: 'lightgray'
  },
}

const CalendarBody = ({ showMaxCells=35}): React.ReactElement => {
  const Body = [];

  for (let idx = 0; idx < showMaxCells; idx++) {
    Body.push(
      <CalendarCell
        key={idx}
        idx={idx}
        dayNumber={idx}
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
