import React from 'react';
import { Box, Text } from 'theme-ui';

import { getCellColor } from '../../_helpers';


const sxCalendarCell = {
  border: '1px solid',
  borderStyle: 'inset',
  fontWeight: 'bold',
  padding: [2],
}

interface CalendarCellProps {
  idx: number;
  dayNumber: number;
  handleClick?: (dayNumber:number) => void;
  currentMonth?: number;
  currentYear?: number;
}

const CalendarCell = ({ idx = 0, dayNumber = 0, handleClick=()=>{}}: CalendarCellProps): React.ReactElement => (
  <Box
    onClick={() => dayNumber ? handleClick(dayNumber): ()=>{}}
    sx={sxCalendarCell}
    className='calendar-cell'
  >
    <Text sx={{ color: getCellColor({ idx, dayNumber }) }}>
      {dayNumber ? dayNumber : ''}
    </Text>
  </Box>
)

export default CalendarCell;
