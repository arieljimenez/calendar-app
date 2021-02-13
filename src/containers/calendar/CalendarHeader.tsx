import React from 'react';
import { Box } from 'theme-ui';

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const DayName = (dayName: string): JSX.Element  => (
  <Box sx={{
    // display: 'flex-inline',
    // width: '100px',
  }}>
    {dayName}
  </Box>
)

const CalendarHeader = (): JSX.Element => {
  const Header = DAYS.map(dayName => DayName(dayName));

  return (
    <Box sx={{
      bg: 'sanMarino',
      display: 'flex',
      color: 'white',
      fontWeight: 'bold',
      border: '2px solid grey',
    }}>
      {Header}
    </Box>
  )
}


export default CalendarHeader;


