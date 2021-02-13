import React from 'react';
import { Box, Text } from 'theme-ui';

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const sxCalendarHeader = {
  mt: [2],
  mb: 0,
}

const sxWeekDays = {
    bg: 'sanMarino',
    border: '2px solid grey',
    display: 'flex',
    justifyContent: 'space-evenly',
}

const sxCurrentMonth = {
  fontSize: [5],
  fontWeight: ['bold'],
  mb: [2],
}

const sxDayName = {
  color: 'white',
  fontWeight: 'bold',
}
const DayName = (dayName: string): JSX.Element  => (
  <Box key={dayName} sx={sxDayName}>
    {dayName}
  </Box>
)
interface CalendarHeaderProps {
  monthName: string;
}

const CalendarHeader = ({ monthName }: CalendarHeaderProps): JSX.Element => {
  const weekDays = DAYS.map(dayName => DayName(dayName));

  return (
    <Box sx={sxCalendarHeader}>
      <Text className='currentMonth'  sx={{ textAlign: 'center', ...sxCurrentMonth}}>
        {monthName}
      </Text>
      <Box sx={sxWeekDays}>
        {weekDays}
      </Box>
    </Box>
  )
}


export default CalendarHeader;


